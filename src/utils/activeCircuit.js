/**
 * Active Circuit Engine — xác định linh kiện đầu ra (LED, RGB LED, Buzzer, Relay,
 * Động cơ DC) có đang thực sự được kích hoạt hay không DỰA TRÊN trạng thái chân
 * thật (sim.pinStates) do code Arduino/ESP32 điều khiển qua digitalWrite/analogWrite
 * — khác với trước đây các linh kiện này chỉ "sáng/kêu/quay" suốt lúc mô phỏng đang
 * chạy (isSimulating) bất kể code có bật/tắt chân đó hay không.
 *
 * Dùng chung cấu trúc Union-Find + PASS_THROUGH_PORTS với passiveCircuit.js để tín
 * hiệu vẫn "đi xuyên" qua các linh kiện thụ động nối tiếp (vd điện trở) giữa chân
 * board và linh kiện đầu ra, giống hệt cách mạch điện thật dẫn tín hiệu.
 */
import { COMPONENT_TYPES } from '../data/componentTypes';
import { UnionFind, nodeKey } from './unionFind';
import { PASS_THROUGH_PORTS } from './passiveCircuit';

// Cổng "tín hiệu điều khiển" của từng loại linh kiện đầu ra — chỉ cần 1 cực vì đây
// là thiết bị 2 chân đơn giản (không mô phỏng chiều dòng điện thực tế).
const CONTROL_PORT_BY_TYPE = {
  LED: 'A',
  LIGHT_BULB: 'A',
  BUZZER: 'POS',
  DC_MOTOR: 'POS',
  RELAY: 'IN',
};

// RGB LED có 3 kênh màu độc lập, mỗi kênh 1 chân điều khiển riêng
const RGB_CONTROL_PORTS = { RGB_LED: ['R', 'G', 'B'] };

/**
 * Trả về Map<componentId, boolean | {R,G,B: boolean}> cho biết linh kiện đầu ra
 * đó có đang "bật" hay không, dựa trên chân board nó nối tới (xuyên qua điện trở/
 * linh kiện thụ động nếu có) hiện đang ở mức HIGH (digitalWrite/analogWrite > 0).
 * Chỉ có ý nghĩa khi đang chạy mô phỏng code — trả về Map rỗng nếu pinStates rỗng.
 */
export function computeActiveOutputs(components, wires, pinStates) {
  const result = new Map();
  if (!pinStates || Object.keys(pinStates).length === 0) return result;

  const uf = new UnionFind();

  for (const w of wires) {
    uf.union(nodeKey(w.from.componentId, w.from.portId), nodeKey(w.to.componentId, w.to.portId));
  }
  for (const c of components) {
    const passPorts = PASS_THROUGH_PORTS[c.type];
    if (passPorts) {
      uf.union(nodeKey(c.id, passPorts[0]), nodeKey(c.id, passPorts[1]));
    }
  }

  // Đánh dấu mọi "nhóm liên thông" (uf root) có chứa 1 chân board đang ở mức HIGH
  const hotRoots = new Set();
  for (const c of components) {
    const proto = COMPONENT_TYPES[c.type];
    if (!proto) continue;
    for (const port of proto.ports) {
      if (port.pin === undefined) continue;
      const isHigh = pinStates[port.pin]?.val > 0;
      if (isHigh) hotRoots.add(uf.find(nodeKey(c.id, port.id)));
    }
  }

  const isPortHot = (compId, portId) => hotRoots.has(uf.find(nodeKey(compId, portId)));

  for (const c of components) {
    const rgbPorts = RGB_CONTROL_PORTS[c.type];
    if (rgbPorts) {
      const channels = {};
      for (const port of rgbPorts) channels[port] = isPortHot(c.id, port);
      result.set(c.id, channels);
      continue;
    }
    const controlPort = CONTROL_PORT_BY_TYPE[c.type];
    if (controlPort) {
      result.set(c.id, isPortHot(c.id, controlPort));
    }
  }

  return result;
}
