import { describe, it, expect } from 'vitest';
import { computeLitLeds } from './passiveCircuit';

const wire = (id, fromId, fromPort, toId, toPort) => ({
  id, from: { componentId: fromId, portId: fromPort }, to: { componentId: toId, portId: toPort },
});

describe('computeLitLeds — mạch thụ động (pin + LED, không vi điều khiển)', () => {
  it('không sáng nếu canvas không có nguồn điện nào', () => {
    const components = [{ id: 'led1', type: 'LED', x: 0, y: 0, config: {} }];
    const lit = computeLitLeds(components, []);
    expect(lit.size).toBe(0);
  });

  it('không sáng nếu LED chưa được nối dây (dù có nguồn trên canvas)', () => {
    const components = [
      { id: 'bat1', type: 'BATTERY_9V', x: 0, y: 0, config: {} },
      { id: 'led1', type: 'LED', x: 0, y: 0, config: {} },
    ];
    const lit = computeLitLeds(components, []);
    expect(lit.has('led1')).toBe(false);
  });

  it('sáng khi Pin 9V -> điện trở -> LED -> Pin 9V tạo thành vòng kín', () => {
    const components = [
      { id: 'bat1', type: 'BATTERY_9V', x: 0, y: 0, config: {} },
      { id: 'r1', type: 'RESISTOR', x: 0, y: 0, config: {} },
      { id: 'led1', type: 'LED', x: 0, y: 0, config: {} },
    ];
    const wires = [
      wire('w1', 'bat1', 'VCC', 'r1', 'L'),
      wire('w2', 'r1', 'R', 'led1', 'A'),
      wire('w3', 'led1', 'K', 'bat1', 'GND'),
    ];
    const lit = computeLitLeds(components, wires);
    expect(lit.has('led1')).toBe(true);
  });

  it('không sáng nếu mạch hở (thiếu dây nối cực âm về nguồn)', () => {
    const components = [
      { id: 'bat1', type: 'BATTERY_9V', x: 0, y: 0, config: {} },
      { id: 'r1', type: 'RESISTOR', x: 0, y: 0, config: {} },
      { id: 'led1', type: 'LED', x: 0, y: 0, config: {} },
    ];
    const wires = [
      wire('w1', 'bat1', 'VCC', 'r1', 'L'),
      wire('w2', 'r1', 'R', 'led1', 'A'),
      // thiếu dây K -> GND
    ];
    const lit = computeLitLeds(components, wires);
    expect(lit.has('led1')).toBe(false);
  });

  it('4 củ khoai tây nối tiếp vẫn tạo vòng kín thắp sáng LED (mô phỏng đơn giản hóa, bỏ qua ngưỡng điện áp)', () => {
    const components = [
      { id: 'p1', type: 'POTATO', x: 0, y: 0, config: {} },
      { id: 'p2', type: 'POTATO', x: 0, y: 0, config: {} },
      { id: 'p3', type: 'POTATO', x: 0, y: 0, config: {} },
      { id: 'p4', type: 'POTATO', x: 0, y: 0, config: {} },
      { id: 'led1', type: 'LED', x: 0, y: 0, config: {} },
    ];
    const wires = [
      wire('w1', 'p1', 'CU', 'p2', 'NAIL'),
      wire('w2', 'p2', 'CU', 'p3', 'NAIL'),
      wire('w3', 'p3', 'CU', 'p4', 'NAIL'),
      wire('w4', 'p4', 'CU', 'led1', 'A'),
      wire('w5', 'led1', 'K', 'p1', 'NAIL'),
    ];
    const lit = computeLitLeds(components, wires);
    expect(lit.has('led1')).toBe(true);
  });

  it('điện trở dẫn điện xuyên qua 2 chân (pass-through) đúng như dây dẫn', () => {
    const components = [
      { id: 'bat1', type: 'BATTERY_9V', x: 0, y: 0, config: {} },
      { id: 'r1', type: 'RESISTOR', x: 0, y: 0, config: {} },
      { id: 'r2', type: 'RESISTOR', x: 0, y: 0, config: {} },
      { id: 'led1', type: 'LED', x: 0, y: 0, config: {} },
    ];
    const wires = [
      wire('w1', 'bat1', 'VCC', 'r1', 'L'),
      wire('w2', 'r1', 'R', 'r2', 'L'),
      wire('w3', 'r2', 'R', 'led1', 'A'),
      wire('w4', 'led1', 'K', 'bat1', 'GND'),
    ];
    const lit = computeLitLeds(components, wires);
    expect(lit.has('led1')).toBe(true);
  });
});
