/**
 * Canvas Interactions — pan/zoom, kéo thả linh kiện, vẽ dây nối, waypoint,
 * thêm/xoá linh kiện & auto-tools (Auto Line, Auto Connect I2C).
 * Tách khỏi App.jsx: đây thuần là logic thao tác trên canvas mạch điện.
 */
import { useRef } from 'react';
import { COMPONENT_TYPES } from '../data/componentTypes';
import { useCanvasStore } from '../stores/canvasStore';

const I2C_MODULE_TYPES = ['OLED_SSD1306', 'LCD1602', 'BMP280', 'DS3231', 'ADXL345'];
const CONTROL_BOARD_TYPES = ['ESP32', 'ESP32_V4', 'ARDUINO_UNO', 'ARDUINO_NANO', 'ARDUINO_MEGA', 'ESP8266'];

export function useCanvasInteractions({ canvas, sim, isReadOnly = false }) {
  const canvasRef = useRef(null);

  // ─── IoT Labs Auto Tools ──────────────────────
  const handleAutoLine = () => {
    if (isReadOnly) return;
    canvas.pushHistory();
    canvas.setWires(canvas.wires.map(w => ({ ...w, waypoints: [] })));
    sim.logToConsole('⚡ Đã tự động sắp xếp & đi lại đường dây nối.');
  };

  const handleAutoConnectI2C = () => {
    if (isReadOnly) return;
    const currentComps = useCanvasStore.getState().components;
    const currentWires = useCanvasStore.getState().wires;

    const board = currentComps.find(c => CONTROL_BOARD_TYPES.includes(c.type));
    if (!board) {
      sim.logToConsole('⚠️ Chưa có bo mạch điều khiển trên canvas.');
      return;
    }

    const i2cModules = currentComps.filter(c => I2C_MODULE_TYPES.includes(c.type));
    if (i2cModules.length === 0) {
      sim.logToConsole('ℹ️ Không tìm thấy Màn hình LCD / Module I2C nào trên canvas.');
      return;
    }

    canvas.pushHistory();
    const newWires = [...currentWires];

    i2cModules.forEach(mod => {
      const modProto = COMPONENT_TYPES[mod.type];
      const vccPort = modProto?.ports.find(p => p.id === 'VCC' || p.id === 'VDD')?.id || 'VCC';
      const gndPort = modProto?.ports.find(p => p.id === 'GND' || p.id === 'VSS')?.id || 'GND';

      const addIfMissing = (fromPort, toPort, color) => {
        const exists = newWires.some(w =>
          (w.from.componentId === board.id && w.from.portId === fromPort && w.to.componentId === mod.id && w.to.portId === toPort) ||
          (w.from.componentId === mod.id && w.from.portId === toPort && w.to.componentId === board.id && w.to.portId === fromPort)
        );
        if (!exists) {
          newWires.push({
            id: `wire_i2c_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
            from: { componentId: board.id, portId: fromPort },
            to: { componentId: mod.id, portId: toPort },
            waypoints: [],
            color,
          });
        }
      };

      if (board.type.startsWith('ESP32')) {
        addIfMissing('VIN', vccPort, '#EF4444');
        addIfMissing('GND1', gndPort, '#10B981');
        addIfMissing('D22', 'SCL', '#3B82F6');
        addIfMissing('D21', 'SDA', '#8B5CF6');
      } else if (board.type === 'ARDUINO_UNO') {
        addIfMissing('5V', vccPort, '#EF4444');
        addIfMissing('GND_A', gndPort, '#10B981');
        addIfMissing('A5_A', 'SCL', '#3B82F6');
        addIfMissing('A4_A', 'SDA', '#8B5CF6');
      } else if (board.type === 'ARDUINO_NANO') {
        addIfMissing('5V', vccPort, '#EF4444');
        addIfMissing('GND1', gndPort, '#10B981');
        addIfMissing('A5', 'SCL', '#3B82F6');
        addIfMissing('A4', 'SDA', '#8B5CF6');
      } else if (board.type === 'ARDUINO_MEGA') {
        addIfMissing('5V', vccPort, '#EF4444');
        addIfMissing('GND_A', gndPort, '#10B981');
        addIfMissing('D21', 'SCL', '#3B82F6');
        addIfMissing('D20', 'SDA', '#8B5CF6');
      }
    });

    canvas.setWires(newWires);
    sim.logToConsole(`🔌 Đã tự động kết nối Màn hình LCD / I2C (${i2cModules.length} module) vào bo mạch ${board.type}.`);
  };

  // ─── Canvas Interactions ──────────────────────
  const handleMouseDownCanvas = (e) => {
    if (e.target.tagName === 'svg' || e.target.classList.contains('canvas-grid')) {
      if (canvas.isPlacingNote && !isReadOnly && canvasRef.current) {
        const rect = canvasRef.current.getBoundingClientRect();
        const rawX = (e.clientX - rect.left - canvas.pan.x) / canvas.zoom;
        const rawY = (e.clientY - rect.top - canvas.pan.y) / canvas.zoom;
        const gridX = Math.round(rawX / 10) * 10;
        const gridY = Math.round(rawY / 10) * 10;
        canvas.addNote({
          id: `note_${Date.now()}`,
          x: gridX,
          y: gridY,
          text: '',
          color: '#FEF08A',
        });
        return;
      }
      canvas.setIsPanning(true);
      canvas.setPanStart({ x: e.clientX - canvas.pan.x, y: e.clientY - canvas.pan.y });
      if (!e.shiftKey) canvas.clearSelection();
      canvas.setWireStart(null);
      canvas.setDraggingWaypoint(null);
    }
  };

  const handleMouseDownComponent = (e, id) => {
    e.stopPropagation();
    if (sim.isSimulating || isReadOnly) return;
    const comp = canvas.components.find(c => c.id === id);
    if (comp) {
      canvas.setDraggingCompId(id);
      canvas.selectComponent(id, e.shiftKey);
      const clientX = e.clientX || e.touches?.[0]?.clientX;
      const clientY = e.clientY || e.touches?.[0]?.clientY;
      canvas.setDragOffset({
        x: (clientX - canvas.pan.x) / canvas.zoom - comp.x,
        y: (clientY - canvas.pan.y) / canvas.zoom - comp.y,
      });
    }
  };

  const handleMouseDownWaypoint = (e, wireId, index) => {
    e.stopPropagation();
    if (sim.isSimulating || isReadOnly) return;
    canvas.setDraggingWaypoint({ wireId, index });
    canvas.selectWire(wireId);
  };

  const handleMouseMove = (e) => {
    const clientX = e.clientX || e.touches?.[0]?.clientX;
    const clientY = e.clientY || e.touches?.[0]?.clientY;

    if (canvas.isPanning) {
      canvas.setPan({ x: clientX - canvas.panStart.x, y: clientY - canvas.panStart.y });
      return;
    }

    if (canvas.draggingCompId) {
      const rawX = (clientX - canvas.pan.x) / canvas.zoom - canvas.dragOffset.x;
      const rawY = (clientY - canvas.pan.y) / canvas.zoom - canvas.dragOffset.y;
      const gridX = Math.round(rawX / 10) * 10;
      const gridY = Math.round(rawY / 10) * 10;
      canvas.updateComponentPosition(canvas.draggingCompId, gridX, gridY);
      return;
    }

    if (canvas.draggingWaypoint && canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      const rawX = (clientX - rect.left - canvas.pan.x) / canvas.zoom;
      const rawY = (clientY - rect.top - canvas.pan.y) / canvas.zoom;
      const gridX = Math.round(rawX / 10) * 10;
      const gridY = Math.round(rawY / 10) * 10;
      canvas.updateWireWaypoint(canvas.draggingWaypoint.wireId, canvas.draggingWaypoint.index, gridX, gridY);
      return;
    }

    if (canvas.wireStart && canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      canvas.setMousePos({
        x: (clientX - rect.left - canvas.pan.x) / canvas.zoom,
        y: (clientY - rect.top - canvas.pan.y) / canvas.zoom,
      });
    }
  };

  const handleMouseUp = () => {
    if (canvas.draggingCompId || canvas.draggingWaypoint) canvas.pushHistory();
    canvas.setDraggingCompId(null);
    canvas.setDraggingWaypoint(null);
    canvas.setIsPanning(false);
  };

  const handleWheel = (e) => {
    e.preventDefault();
    const factor = e.deltaY < 0 ? 1.1 : 0.9;
    canvas.setZoom(canvas.zoom * factor);
  };

  const handleTouchStart = (e) => {
    if (e.touches.length === 1) {
      const touch = e.touches[0];
      handleMouseDownCanvas({ ...e, clientX: touch.clientX, clientY: touch.clientY, target: e.target });
    }
  };

  const handleTouchMove = (e) => {
    if (e.touches.length === 1) {
      handleMouseMove({ clientX: e.touches[0].clientX, clientY: e.touches[0].clientY });
    }
  };

  const addComponentToCanvas = (type) => {
    if (isReadOnly) return;
    const proto = COMPONENT_TYPES[type];
    if (!proto) return;
    const newId = `${type.toLowerCase()}_${Date.now().toString().slice(-4)}`;
    const newComp = {
      id: newId, type,
      x: Math.round((-canvas.pan.x + 220) / canvas.zoom / 10) * 10,
      y: Math.round((-canvas.pan.y + 160) / canvas.zoom / 10) * 10,
      config: proto.defaultConfig ? { ...proto.defaultConfig } : {},
    };
    canvas.addComponent(newComp);
    canvas.selectComponent(newId);

    // 🚀 Automatically connect LCD / I2C module to control board if present!
    if (I2C_MODULE_TYPES.includes(type)) {
      setTimeout(() => {
        handleAutoConnectI2C();
      }, 60);
    }
  };

  const deleteSelected = () => {
    if (sim.isSimulating || isReadOnly) return;
    if (canvas.selectedCompIds.length > 0) {
      canvas.removeComponents(canvas.selectedCompIds);
    } else if (canvas.selectedWireIds.length > 0) {
      canvas.removeWires(canvas.selectedWireIds);
    }
  };

  const getPortCanvasCoords = (componentId, portId) => {
    const comp = canvas.components.find(c => c.id === componentId);
    if (!comp) return { x: 0, y: 0, side: 'left', name: portId };
    const proto = COMPONENT_TYPES[comp.type];
    const port = proto?.ports.find(p => p.id === portId);
    if (!port) return { x: 0, y: 0, side: 'left', name: portId };
    return { x: comp.x + port.x, y: comp.y + port.y, side: port.side, name: port.name || port.id };
  };

  const handlePortClick = (e, componentId, portId, portType) => {
    e.stopPropagation();
    if (sim.isSimulating || isReadOnly) return;
    const coords = getPortCanvasCoords(componentId, portId);
    if (!canvas.wireStart) {
      canvas.setWireStart({ componentId, portId, x: coords.x, y: coords.y, portType });
      canvas.setMousePos(coords);
    } else {
      if (canvas.wireStart.componentId === componentId) { canvas.setWireStart(null); return; }
      canvas.addWire({
        id: `wire_${Date.now()}`,
        from: { componentId: canvas.wireStart.componentId, portId: canvas.wireStart.portId },
        to: { componentId, portId },
        waypoints: [],
        color: canvas.wireStart.portType === 'gnd' ? '#10B981' : canvas.wireStart.portType === 'power' ? '#EF4444' : '#2563EB',
      });
      canvas.setWireStart(null);
    }
  };

  const selectWire = (e, wireId) => {
    e.stopPropagation();
    if (sim.isSimulating) return;
    canvas.selectWire(wireId, e.shiftKey);
  };

  const handleDoubleClickWire = (e, wireId) => {
    e.stopPropagation();
    if (sim.isSimulating || isReadOnly || !canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const rawX = (e.clientX - rect.left - canvas.pan.x) / canvas.zoom;
    const rawY = (e.clientY - rect.top - canvas.pan.y) / canvas.zoom;
    const gridX = Math.round(rawX / 10) * 10;
    const gridY = Math.round(rawY / 10) * 10;
    canvas.addWireWaypoint(wireId, { x: gridX, y: gridY });
  };

  const handleDoubleClickWaypoint = (e, wireId, index) => {
    e.stopPropagation();
    if (sim.isSimulating || isReadOnly) return;
    canvas.removeWireWaypoint(wireId, index);
  };

  // Vẽ dây bo góc mềm (như Tinkercad) thay vì góc vuông nhọn: nối các điểm gấp khúc
  // bằng đường cong bezier bậc 2 nhỏ tại mỗi góc, thay vì rẽ vuông 90° đột ngột.
  const roundedPathFromPoints = (points, radius = 7) => {
    if (points.length < 2) return '';
    if (points.length === 2) return `M ${points[0].x} ${points[0].y} L ${points[1].x} ${points[1].y}`;

    let d = `M ${points[0].x} ${points[0].y}`;
    for (let i = 1; i < points.length - 1; i++) {
      const prev = points[i - 1];
      const curr = points[i];
      const next = points[i + 1];
      const v1x = prev.x - curr.x, v1y = prev.y - curr.y;
      const v2x = next.x - curr.x, v2y = next.y - curr.y;
      const len1 = Math.hypot(v1x, v1y);
      const len2 = Math.hypot(v2x, v2y);
      const r = Math.min(radius, len1 / 2, len2 / 2);

      if (r <= 0.5 || len1 === 0 || len2 === 0) {
        d += ` L ${curr.x} ${curr.y}`;
        continue;
      }
      const p1x = curr.x + (v1x / len1) * r;
      const p1y = curr.y + (v1y / len1) * r;
      const p2x = curr.x + (v2x / len2) * r;
      const p2y = curr.y + (v2y / len2) * r;
      d += ` L ${p1x} ${p1y} Q ${curr.x} ${curr.y} ${p2x} ${p2y}`;
    }
    const last = points[points.length - 1];
    d += ` L ${last.x} ${last.y}`;
    return d;
  };

  const generateWirePath = (start, end, waypoints = [], wireIndex = 0) => {
    let points;

    if (!waypoints || waypoints.length === 0) {
      // Calculate a pseudo-random offset based on wire index to prevent overlap
      const offset = 20 + ((wireIndex * 15) % 80);
      const dirStart = start.side === 'right' ? 1 : start.side === 'left' ? -1 : 0;
      const dirEnd = end.side === 'right' ? 1 : end.side === 'left' ? -1 : 0;

      const pt1x = start.x + (dirStart !== 0 ? dirStart * offset : 0);
      const pt1y = start.y + (start.side === 'top' ? -offset : start.side === 'bottom' ? offset : 0);

      const pt2x = end.x + (dirEnd !== 0 ? dirEnd * offset : 0);
      const pt2y = end.y + (end.side === 'top' ? -offset : end.side === 'bottom' ? offset : 0);

      // If going from left to left, or right to right, we can just do a C-shape
      if (start.side === end.side && start.side !== 'top' && start.side !== 'bottom') {
        const maxOffset = Math.max(Math.abs(pt1x - start.x), Math.abs(pt2x - end.x));
        const outX = start.side === 'left' ? Math.min(start.x, end.x) - maxOffset : Math.max(start.x, end.x) + maxOffset;
        points = [
          { x: start.x, y: start.y },
          { x: outX, y: start.y },
          { x: outX, y: end.y },
          { x: end.x, y: end.y },
        ];
      } else {
        // Default S-shape with 5 segments
        const midY = (pt1y + pt2y) / 2 + ((wireIndex * 10) % 40) - 20;
        points = [
          { x: start.x, y: start.y },
          { x: pt1x, y: pt1y },
          { x: pt1x, y: midY },
          { x: pt2x, y: midY },
          { x: pt2x, y: pt2y },
          { x: end.x, y: end.y },
        ];
      }
    } else {
      points = [{ x: start.x, y: start.y }, ...waypoints, { x: end.x, y: end.y }];
    }

    return roundedPathFromPoints(points);
  };

  const getWireHandles = (wire, start, end) => {
    if (wire.waypoints && wire.waypoints.length > 0) {
      return wire.waypoints.map((wp, idx) => ({ ...wp, isCustom: true, index: idx, type: 'corner' }));
    }
    const midX = Math.round((start.x + end.x) / 2 / 10) * 10;
    return [
      { x: midX, y: start.y, isDefaultCorner: true, cornerIndex: 0, type: 'corner' },
      { x: midX, y: end.y, isDefaultCorner: true, cornerIndex: 1, type: 'corner' },
      { x: Math.round((start.x + midX) / 2 / 10) * 10, y: start.y, isDefaultMid: true, type: 'mid' },
      { x: midX, y: Math.round((start.y + end.y) / 2 / 10) * 10, isDefaultMid: true, type: 'mid' },
      { x: Math.round((midX + end.x) / 2 / 10) * 10, y: end.y, isDefaultMid: true, type: 'mid' },
    ];
  };

  return {
    canvasRef,
    handleAutoLine,
    handleAutoConnectI2C,
    handleMouseDownCanvas,
    handleMouseDownComponent,
    handleMouseDownWaypoint,
    handleMouseMove,
    handleMouseUp,
    handleWheel,
    handleTouchStart,
    handleTouchMove,
    addComponentToCanvas,
    deleteSelected,
    getPortCanvasCoords,
    handlePortClick,
    selectWire,
    handleDoubleClickWire,
    handleDoubleClickWaypoint,
    generateWirePath,
    getWireHandles,
  };
}
