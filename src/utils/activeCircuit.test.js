import { describe, it, expect } from 'vitest';
import { computeActiveOutputs } from './activeCircuit';

const wire = (id, fromId, fromPort, toId, toPort) => ({
  id, from: { componentId: fromId, portId: fromPort }, to: { componentId: toId, portId: toPort },
});

describe('computeActiveOutputs — trạng thái thực của linh kiện đầu ra khi mô phỏng code', () => {
  it('LED sáng khi chân board nối tới đang ở mức HIGH', () => {
    const components = [
      { id: 'esp1', type: 'ARDUINO_UNO', x: 0, y: 0, config: {} },
      { id: 'led1', type: 'LED', x: 0, y: 0, config: {} },
    ];
    const wires = [
      wire('w1', 'esp1', 'D4', 'led1', 'A'),
      wire('w2', 'led1', 'K', 'esp1', 'GND_A'),
    ];
    const out = computeActiveOutputs(components, wires, { 4: { val: 1 } });
    expect(out.get('led1')).toBe(true);
  });

  it('LED tắt khi chân board đang ở mức LOW', () => {
    const components = [
      { id: 'esp1', type: 'ARDUINO_UNO', x: 0, y: 0, config: {} },
      { id: 'led1', type: 'LED', x: 0, y: 0, config: {} },
    ];
    const wires = [
      wire('w1', 'esp1', 'D4', 'led1', 'A'),
      wire('w2', 'led1', 'K', 'esp1', 'GND_A'),
    ];
    const out = computeActiveOutputs(components, wires, { 4: { val: 0 } });
    expect(out.get('led1')).toBe(false);
  });

  it('LED vẫn sáng đúng khi nối qua điện trở nối tiếp (pass-through)', () => {
    const components = [
      { id: 'esp1', type: 'ARDUINO_UNO', x: 0, y: 0, config: {} },
      { id: 'r1', type: 'RESISTOR', x: 0, y: 0, config: {} },
      { id: 'led1', type: 'LED', x: 0, y: 0, config: {} },
    ];
    const wires = [
      wire('w1', 'esp1', 'D4', 'r1', 'L'),
      wire('w2', 'r1', 'R', 'led1', 'A'),
      wire('w3', 'led1', 'K', 'esp1', 'GND_A'),
    ];
    const out = computeActiveOutputs(components, wires, { 4: { val: 1 } });
    expect(out.get('led1')).toBe(true);
  });

  it('trả về Map rỗng khi chưa có pinStates nào (chưa mô phỏng)', () => {
    const components = [{ id: 'led1', type: 'LED', x: 0, y: 0, config: {} }];
    const out = computeActiveOutputs(components, [], {});
    expect(out.size).toBe(0);
  });

  it('RGB LED tính đúng từng kênh màu độc lập', () => {
    const components = [
      { id: 'esp1', type: 'ARDUINO_UNO', x: 0, y: 0, config: {} },
      { id: 'rgb1', type: 'RGB_LED', x: 0, y: 0, config: {} },
    ];
    const wires = [
      wire('w1', 'esp1', 'D2', 'rgb1', 'R'),
      wire('w2', 'esp1', 'D3', 'rgb1', 'G'),
      wire('w3', 'esp1', 'D4', 'rgb1', 'B'),
    ];
    const out = computeActiveOutputs(components, wires, { 2: { val: 1 }, 3: { val: 0 }, 4: { val: 1 } });
    expect(out.get('rgb1')).toEqual({ R: true, G: false, B: true });
  });

  it('Relay bật đúng theo chân IN, không bị ảnh hưởng bởi chân VCC', () => {
    const components = [
      { id: 'esp1', type: 'ARDUINO_UNO', x: 0, y: 0, config: {} },
      { id: 'relay1', type: 'RELAY', x: 0, y: 0, config: {} },
    ];
    const wires = [
      wire('w1', 'esp1', 'D7', 'relay1', 'IN'),
      wire('w2', 'esp1', '5V', 'relay1', 'VCC'),
    ];
    const out = computeActiveOutputs(components, wires, { 7: { val: 1 } });
    expect(out.get('relay1')).toBe(true);
  });

  it('Động cơ DC nối QUA Relay (relay.OUT -> motor.POS) vẫn quay đúng khi relay.IN HIGH (B3: đất khô -> bật bơm)', () => {
    const components = [
      { id: 'esp1', type: 'ESP32_S3', x: 0, y: 0, config: {} },
      { id: 'relay1', type: 'RELAY', x: 0, y: 0, config: {} },
      { id: 'pump1', type: 'DC_MOTOR', x: 0, y: 0, config: {} },
    ];
    const wires = [
      wire('w1', 'esp1', 'GPIO7', 'relay1', 'IN'),
      wire('w2', 'relay1', 'OUT', 'pump1', 'POS'),
      wire('w3', 'esp1', 'GND1', 'pump1', 'NEG'),
    ];
    const outOn = computeActiveOutputs(components, wires, { 7: { val: 1 } });
    expect(outOn.get('relay1')).toBe(true);
    expect(outOn.get('pump1')).toBe(true);

    const outOff = computeActiveOutputs(components, wires, { 7: { val: 0 } });
    expect(outOff.get('relay1')).toBe(false);
    expect(outOff.get('pump1')).toBe(false);
  });

  it('Linh kiện chưa nối dây tới board nào thì không bật dù có pinStates khác đang HIGH', () => {
    const components = [
      { id: 'esp1', type: 'ARDUINO_UNO', x: 0, y: 0, config: {} },
      { id: 'led1', type: 'LED', x: 0, y: 0, config: {} },
    ];
    const out = computeActiveOutputs(components, [], { 4: { val: 1 } });
    expect(out.get('led1')).toBe(false);
  });

  it('Không tính linh kiện không thuộc danh sách đầu ra (vd RESISTOR)', () => {
    const components = [{ id: 'r1', type: 'RESISTOR', x: 0, y: 0, config: {} }];
    const out = computeActiveOutputs(components, [], { 4: { val: 1 } });
    expect(out.has('r1')).toBe(false);
  });
});
