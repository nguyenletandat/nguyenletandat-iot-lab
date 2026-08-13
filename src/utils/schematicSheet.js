import { COMPONENT_TYPES } from '../data/componentTypes';

// Sinh ký hiệu tham chiếu (reference designator) kiểu bản vẽ nguyên lý chuẩn
// (R1, D2, U1...) dựa theo loại linh kiện — ưu tiên bảng riêng cho các loại
// phổ biến, còn lại suy ra từ category khai báo trong componentTypes.js.
const TYPE_PREFIX = {
  RESISTOR: 'R', POTENTIOMETER: 'RV', LDR: 'R', PHOTODIODE: 'D',
  CAPACITOR: 'C', CAP_ELECTROLYTIC: 'C',
  DIODE: 'D', ZENER_DIODE: 'D', LED: 'D', RGB_LED: 'D', LASER: 'D',
  INDUCTOR: 'L',
  BUZZER: 'BZ',
  RELAY: 'K',
  DC_MOTOR: 'M', SERVO: 'M', STEPPER_28BYJ: 'M',
  PUSHBUTTON: 'SW', SLIDESWITCH: 'SW', BUTTON: 'SW',
  BATTERY_9V: 'BT',
};
const CATEGORY_PREFIX = {
  Boards: 'U', Sensors: 'U', Displays: 'U', Comm: 'U', ICs: 'U',
  Instruments: 'U', Others: 'U', Power: 'BT', Passive: 'R', Actuators: 'D',
};

function isBreadboard(comp) {
  return typeof comp.type === 'string' && comp.type.startsWith('BREADBOARD');
}

function getPrefix(comp, proto) {
  return TYPE_PREFIX[comp.type] || CATEGORY_PREFIX[proto?.category] || 'U';
}

function getPortAbs(comp, proto, portId) {
  const port = proto?.ports?.find(p => p.id === portId);
  if (!port) return null;
  return { x: comp.x + port.x, y: comp.y + port.y, side: port.side, id: port.id, type: port.type };
}

// Dùng port.id (VD "GPIO6", "GND1") thay vì port.name hiển thị (VD "GPIO8 (SDA*)",
// "OUT (Tải)") để tên net luôn ngắn gọn, thuần ASCII, không lẫn ký tự có dấu/ngoặc.
function shortNetToken(id) {
  return String(id).replace(/[^A-Za-z0-9]/g, '').toUpperCase().slice(0, 8);
}

// Dây nối xa nhau trên trang giấy được thay bằng CỜ TÊN LƯỚI (net flag) thay vì
// kéo 1 đường dây dài xuyên hết trang — đúng quy ước bản vẽ nguyên lý thật, thay
// vì thuật toán auto-router đầy đủ (union-find theo net) vốn phức tạp hơn nhiều.
const DIRECT_WIRE_MAX_DIST = 260;

export function computeSchematicSheetPlan(components, wires) {
  const byId = {};
  components.forEach(c => { byId[c.id] = c; });

  const items = components
    .filter(c => !isBreadboard(c))
    .map(c => ({ comp: c, proto: COMPONENT_TYPES[c.type] || { width: 240, height: 120, ports: [] } }));

  // Sinh ref-des theo đúng thứ tự linh kiện được thêm vào mạch (ổn định, không đổi
  // khi mở lại trang) — bỏ qua breadboard vì nó không phải 1 linh kiện điện tử thật,
  // trên sơ đồ nguyên lý thật cũng không được vẽ ra (chỉ dùng để cắm dây thực hành).
  const counters = {};
  const refDesById = {};
  items.forEach(({ comp, proto }) => {
    const prefix = getPrefix(comp, proto);
    counters[prefix] = (counters[prefix] || 0) + 1;
    refDesById[comp.id] = `${prefix}${counters[prefix]}`;
  });

  // Bỏ qua breadboard bằng cách "nối tắt" ảo: mọi dây cắm vào cùng 1 chân rail của
  // breadboard được gom thành 1 nhóm, chọn linh kiện có nhiều chân nhất (thường là
  // board điều khiển) làm "nguồn", rồi tạo dây ảo nối thẳng nguồn → từng thiết bị
  // còn lại trong nhóm — mô phỏng đúng bản chất điện (cùng 1 net) mà không cần vẽ
  // breadboard lên trang giấy.
  const railGroups = new Map();
  const normalWires = [];
  wires.forEach(w => {
    const fromComp = byId[w.from.componentId];
    const toComp = byId[w.to.componentId];
    if (!fromComp || !toComp) return;
    const fromBB = isBreadboard(fromComp);
    const toBB = isBreadboard(toComp);
    if (!fromBB && !toBB) { normalWires.push(w); return; }
    const bbEnd = fromBB ? w.from : w.to;
    const otherEnd = fromBB ? w.to : w.from;
    const key = `${bbEnd.componentId}:${bbEnd.portId}`;
    if (!railGroups.has(key)) railGroups.set(key, { members: [], color: w.color });
    railGroups.get(key).members.push(otherEnd);
  });

  const virtualWires = [];
  railGroups.forEach((group) => {
    if (group.members.length < 2) return;
    let source = group.members[0];
    let maxPorts = -1;
    group.members.forEach(m => {
      const c = byId[m.componentId];
      const n = COMPONENT_TYPES[c?.type]?.ports?.length || 0;
      if (n > maxPorts) { maxPorts = n; source = m; }
    });
    group.members.forEach(m => {
      if (m === source) return;
      virtualWires.push({
        id: `virtual_${source.componentId}_${source.portId}_${m.componentId}_${m.portId}`,
        from: source, to: m, color: group.color, isVirtual: true,
      });
    });
  });

  const allWires = [...normalWires, ...virtualWires];

  const directWires = [];
  const flags = [];

  allWires.forEach(w => {
    const fromComp = byId[w.from.componentId];
    const toComp = byId[w.to.componentId];
    if (!fromComp || !toComp || isBreadboard(fromComp) || isBreadboard(toComp)) return;
    const fromProto = COMPONENT_TYPES[fromComp.type];
    const toProto = COMPONENT_TYPES[toComp.type];
    const a = getPortAbs(fromComp, fromProto, w.from.portId);
    const b = getPortAbs(toComp, toProto, w.to.portId);
    if (!a || !b) return;

    const dist = Math.hypot(a.x - b.x, a.y - b.y);
    const isGround = a.type === 'gnd' || b.type === 'gnd';

    if (!w.isVirtual && dist <= DIRECT_WIRE_MAX_DIST) {
      directWires.push({ id: w.id, a, b, color: w.color || '#94A3B8' });
      return;
    }

    // Nối xa (hoặc đi qua breadboard) → gắn cờ tên lưới ở mỗi đầu thay vì kéo dây dài.
    // Chọn linh kiện có nhiều chân hơn (thường là board) làm "gốc" đặt tên net để
    // tên net luôn mang tính mô tả (VD "U1_GND") thay vì tuỳ theo thứ tự dây.
    const aPortCount = fromProto?.ports?.length || 0;
    const bPortCount = toProto?.ports?.length || 0;
    const anchor = aPortCount >= bPortCount
      ? { refDes: refDesById[fromComp.id], portId: a.id }
      : { refDes: refDesById[toComp.id], portId: b.id };
    const label = `${anchor.refDes}_${shortNetToken(anchor.portId)}`;
    const color = w.color || '#94A3B8';

    flags.push({ id: `${w.id}_a`, x: a.x, y: a.y, side: a.side, label, color, isGround });
    flags.push({ id: `${w.id}_b`, x: b.x, y: b.y, side: b.side, label, color, isGround });
  });

  // Nhiều dây ảo khác nhau (nhiều thiết bị dùng chung 1 rail breadboard) có thể
  // cùng bắt nguồn từ đúng 1 chân vật lý (VD chân GND2 của board) → loại trùng cờ
  // nhãn trước khi vẽ để không chồng chữ lên nhau tại cùng 1 điểm.
  const seenFlagKeys = new Set();
  const dedupedFlags = flags.filter(f => {
    const key = `${Math.round(f.x)}:${Math.round(f.y)}:${f.side}:${f.label}`;
    if (seenFlagKeys.has(key)) return false;
    seenFlagKeys.add(key);
    return true;
  });

  // Các chân sát nhau (thường cách nhau ~18-20px trên board/module nhiều chân) vẫn
  // có thể khiến 2 cờ nhãn kề nhau chồng lên nhau dù khác tên — dàn cờ ra xa dần
  // theo thứ tự vị trí trên cùng 1 cạnh linh kiện để luôn đọc được.
  const edgeBuckets = new Map();
  dedupedFlags.forEach(f => {
    const alongAxis = (f.side === 'left' || f.side === 'right') ? 'y' : 'x';
    const perpAxis = alongAxis === 'y' ? 'x' : 'y';
    const key = `${f.side}:${Math.round(f[perpAxis] / 30)}`;
    if (!edgeBuckets.has(key)) edgeBuckets.set(key, []);
    edgeBuckets.get(key).push(f);
  });
  edgeBuckets.forEach(group => {
    if (group.length < 2) return;
    const alongAxis = (group[0].side === 'left' || group[0].side === 'right') ? 'y' : 'x';
    group.sort((a, b) => a[alongAxis] - b[alongAxis]);
    group.forEach((f, i) => { f.stubRank = i; });
  });

  const bounds = items.reduce((acc, { comp, proto }) => {
    acc.minX = Math.min(acc.minX, comp.x);
    acc.minY = Math.min(acc.minY, comp.y);
    acc.maxX = Math.max(acc.maxX, comp.x + (proto.width || 240));
    acc.maxY = Math.max(acc.maxY, comp.y + (proto.height || 120));
    return acc;
  }, { minX: Infinity, minY: Infinity, maxX: -Infinity, maxY: -Infinity });

  if (!items.length) Object.assign(bounds, { minX: 0, minY: 0, maxX: 400, maxY: 300 });

  return {
    items: items.map(({ comp, proto }) => ({ comp, proto, refDes: refDesById[comp.id] })),
    directWires,
    flags: dedupedFlags,
    bounds,
  };
}
