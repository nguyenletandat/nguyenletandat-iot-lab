/**
 * Passive Circuit Engine — kiểm tra mạch điện KHÔNG dùng vi điều khiển
 * (pin 9V, pin khoai tây/chanh + điện trở + LED) có tạo thành vòng kín hay không,
 * để đèn LED tự sáng khi nối dây đúng — giống hệt mạch thật, không cần bấm "Chạy"
 * hay viết code.
 *
 * Đơn giản hóa có chủ đích: chỉ kiểm tra TÍNH LIÊN THÔNG của mạch (có vòng kín hay
 * không), KHÔNG tính điện áp/dòng điện thực tế. Vì vậy 1 củ khoai tây hoặc 1 quả
 * chanh trong mô phỏng này cũng đủ làm sáng đèn, dù thực tế cần ghép nối tiếp nhiều
 * quả mới đủ điện áp — đây là điểm cần lưu ý khi giảng dạy.
 */
import { COMPONENT_TYPES } from '../data/componentTypes';

// Các linh kiện thụ động dẫn điện xuyên qua 2 chân (coi như dây dẫn cho mục đích kiểm tra vòng kín)
const PASS_THROUGH_PORTS = {
  RESISTOR: ['L', 'R'],
  DIODE: ['A', 'K'],
  CAPACITOR: ['L', 'R'],
  ZENER_DIODE: ['A', 'K'],
  INDUCTOR: ['L', 'R'],
  CAP_ELECTROLYTIC: ['PLUS', 'MINUS'],
  PHOTODIODE: ['A', 'K'],
  FLEX_SENSOR: ['L', 'R'],
  FORCE_SENSOR: ['L', 'R'],
  TILT_SENSOR: ['L', 'R'],
  PUSHBUTTON: ['A', 'B'],
};

// Các nguồn điện — 2 cực được coi là "nối thông" với nhau để kiểm tra vòng kín
// (không mô phỏng điện áp/cực tính thực tế)
const SOURCE_PORTS = {
  BATTERY_9V: ['VCC', 'GND'],
  POTATO: ['CU', 'NAIL'],
  LEMON: ['CU', 'NAIL'],
  BATTERY_1V5: ['VCC', 'GND'],
  COIN_CELL_3V: ['VCC', 'GND'],
  SOLAR_CELL: ['VCC', 'GND'],
};

// Các linh kiện "tải" sẽ sáng/kích hoạt khi mạch tạo thành vòng kín (giống LED)
const GLOWING_LOAD_TYPES = {
  LED: { anodeType: 'gpio', cathodeType: 'gnd' },
  LIGHT_BULB: { anodeType: 'gpio', cathodeType: 'gnd' },
};

const nodeKey = (compId, portId) => `${compId}:${portId}`;

class UnionFind {
  constructor() { this.parent = new Map(); }
  ensure(x) { if (!this.parent.has(x)) this.parent.set(x, x); }
  find(x) {
    this.ensure(x);
    while (this.parent.get(x) !== x) {
      this.parent.set(x, this.parent.get(this.parent.get(x)));
      x = this.parent.get(x);
    }
    return x;
  }
  union(a, b) {
    const ra = this.find(a), rb = this.find(b);
    if (ra !== rb) this.parent.set(ra, rb);
  }
}

/**
 * Trả về Set các id của LED đang sáng do mạch thụ động (nguồn pin) tạo thành vòng kín.
 * Không liên quan tới mô phỏng code Arduino/ESP32 (isSimulating) — hoạt động độc lập,
 * giống mạch điện thật là cứ nối đúng dây là có điện, không cần "chạy" gì cả.
 */
export function computeLitLeds(components, wires) {
  const lit = new Set();
  const hasSource = components.some(c => SOURCE_PORTS[c.type]);
  if (!hasSource) return lit;

  const uf = new UnionFind();

  for (const w of wires) {
    const a = nodeKey(w.from.componentId, w.from.portId);
    const b = nodeKey(w.to.componentId, w.to.portId);
    uf.union(a, b);
  }

  for (const c of components) {
    const passPorts = PASS_THROUGH_PORTS[c.type];
    if (passPorts) {
      uf.union(nodeKey(c.id, passPorts[0]), nodeKey(c.id, passPorts[1]));
    }
    const srcPorts = SOURCE_PORTS[c.type];
    if (srcPorts) {
      uf.union(nodeKey(c.id, srcPorts[0]), nodeKey(c.id, srcPorts[1]));
    }
  }

  for (const c of components) {
    const loadSpec = GLOWING_LOAD_TYPES[c.type];
    if (!loadSpec) continue;
    const proto = COMPONENT_TYPES[c.type];
    const anodePort = proto.ports.find(p => p.type === loadSpec.anodeType)?.id;
    const cathodePort = proto.ports.find(p => p.type === loadSpec.cathodeType)?.id;
    const a = nodeKey(c.id, anodePort);
    const k = nodeKey(c.id, cathodePort);
    if (uf.parent.has(a) && uf.parent.has(k) && uf.find(a) === uf.find(k)) {
      lit.add(c.id);
    }
  }

  return lit;
}
