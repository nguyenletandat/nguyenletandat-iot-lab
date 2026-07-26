/**
 * Simulation Engine — quản lý vòng đời mô phỏng: audio, "system interface" (pinMode,
 * digitalWrite, Servo/LCD/OLED giả lập...) mà code Arduino transpile ra sẽ gọi vào.
 * Tách khỏi App.jsx để component chính chỉ còn lo phần UI/orchestration.
 */
import { useRef } from 'react';
import { SimulationRunner } from '../utils/simulator';
import { COMPONENT_TYPES } from '../data/componentTypes';
import { useCanvasStore } from '../stores/canvasStore';
import { useSimulationStore } from '../stores/simulationStore';

const CONTROL_BOARD_TYPES = ['ESP32', 'ESP32_V4', 'ARDUINO_UNO', 'ARDUINO_NANO', 'ARDUINO_MEGA', 'ESP8266'];

const ANALOG_SENSOR_LOOKUP = [
  ['SOIL_MOISTURE', 'moisture'],
  ['MQ2', 'gasLevel'],
  ['LDR', 'value'],
  ['POTENTIOMETER', 'position'],
  ['DHT11', 'value'],
  ['DHT22', 'value'],
  ['DS18B20', 'temp'],
  ['DS18B20', 'value'],
  ['BMP280', 'temp'],
  ['ACS712', 'current'],
  ['RAIN_SENSOR', 'rainLevel'],
];

export function useSimulationEngine(code) {
  const sim = useSimulationStore();
  const audioCtxRef = useRef(null);
  const oscillatorRef = useRef(null);
  const simulationRunnerRef = useRef(null);

  const initAudio = () => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
  };

  // Đọc giá trị cảm biến đang nối với 1 pin của board — luôn đọc live từ store
  const getConnectedSensorValue = (pin, sensorType, configKey, defaultValue = 0) => {
    const comps = useCanvasStore.getState().components;
    const wrs = useCanvasStore.getState().wires;

    const board = comps.find(c => CONTROL_BOARD_TYPES.includes(c.type));
    if (!board) {
      const fallback = comps.find(c => c.type === sensorType);
      return fallback?.config?.[configKey] !== undefined ? fallback.config[configKey] : defaultValue;
    }

    const boardProto = COMPONENT_TYPES[board.type];
    const boardPort = boardProto?.ports.find(p => p.pin === pin || p.id === `D${pin}` || p.id === `A${pin}` || p.id === `VP` || p.id === `VN`);
    if (boardPort) {
      const connWire = wrs.find(w =>
        (w.from.componentId === board.id && w.from.portId === boardPort.id) ||
        (w.to.componentId === board.id && w.to.portId === boardPort.id)
      );

      if (connWire) {
        const targetRef = connWire.from.componentId === board.id ? connWire.to : connWire.from;
        const targetComp = comps.find(c => c.id === targetRef.componentId);
        if (targetComp && targetComp.config?.[configKey] !== undefined) {
          return targetComp.config[configKey];
        }
      }
    }

    // Fallback: đọc trực tiếp cảm biến cùng loại trên canvas
    const fallback = comps.find(c => c.type === sensorType);
    return fallback?.config?.[configKey] !== undefined ? fallback.config[configKey] : defaultValue;
  };

  const createSystemInterface = () => ({
    pinMode: (pin, mode) => sim.setPinStates(prev => ({ ...prev, [pin]: { ...prev[pin], mode, val: prev[pin]?.val || 0 } })),
    digitalWrite: (pin, value) => sim.setPinStates(prev => ({ ...prev, [pin]: { ...prev[pin], val: value } })),
    digitalRead: (pin) => {
      const pirMotion = getConnectedSensorValue(pin, 'PIR', 'motion', null);
      if (pirMotion !== null) return pirMotion ? 1 : 0;
      const flameVal = getConnectedSensorValue(pin, 'FLAME', 'detected', null);
      if (flameVal !== null) return flameVal ? 1 : 0;
      const touchVal = getConnectedSensorValue(pin, 'TOUCH_SENSOR', 'touched', null);
      if (touchVal !== null) return touchVal ? 1 : 0;
      const btnVal = getConnectedSensorValue(pin, 'BUTTON', 'pressed', null);
      if (btnVal !== null) return btnVal ? 1 : 0;
      return sim.pinStates[pin]?.val || 0;
    },
    analogRead: (pin) => {
      for (const [type, key] of ANALOG_SENSOR_LOOKUP) {
        const v = getConnectedSensorValue(pin, type, key, null);
        if (v !== null) return v;
      }
      return 0;
    },
    analogWrite: (pin, value) => sim.setPinStates(prev => ({ ...prev, [pin]: { ...prev[pin], pwm: value } })),
    pulseIn: (pin, value) => {
      const distCm = getConnectedSensorValue(pin, 'HC_SR04', 'distance', 25);
      return Math.round((distCm * 2) / 0.034);
    },
    map: (x, in_min, in_max, out_min, out_max) => (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min,
    constrain: (x, a, b) => Math.max(a, Math.min(b, x)),
    delay: (ms) => new Promise(resolve => setTimeout(resolve, ms)),
    delayMicroseconds: (us) => new Promise(resolve => setTimeout(resolve, Math.max(1, Math.round(us / 1000)))),
    tone: (pin, frequency, duration) => {
      if (!sim.audioEnabled) return;
      initAudio();
      try {
        if (oscillatorRef.current) oscillatorRef.current.stop();
        const osc = audioCtxRef.current.createOscillator();
        const gainNode = audioCtxRef.current.createGain();
        osc.connect(gainNode);
        gainNode.connect(audioCtxRef.current.destination);
        osc.type = 'square';
        osc.frequency.setValueAtTime(frequency, audioCtxRef.current.currentTime);
        gainNode.gain.setValueAtTime(0.04, audioCtxRef.current.currentTime);
        osc.start();
        oscillatorRef.current = osc;
        if (duration) {
          osc.stop(audioCtxRef.current.currentTime + (duration / 1000));
          setTimeout(() => { if (oscillatorRef.current === osc) oscillatorRef.current = null; }, duration);
        }
      } catch (e) {}
    },
    noTone: (pin) => {
      if (oscillatorRef.current) { try { oscillatorRef.current.stop(); } catch (e) {} oscillatorRef.current = null; }
    },
    readHumidity: (pin) => getConnectedSensorValue(pin, 'DHT11', 'humidity', 65),
    DHT: class {
      constructor(pin) { this.pin = pin; }
      begin() {}
      readTemperature() { return getConnectedSensorValue(this.pin, 'DHT11', 'value', 28); }
      readHumidity() { return getConnectedSensorValue(this.pin, 'DHT11', 'humidity', 65); }
    },
    DallasTemperature: class {
      constructor() {}
      begin() {}
      requestTemperatures() {}
      getTempCByIndex() {
        const comps = useCanvasStore.getState().components;
        const ds = comps.find(c => c.type === 'DS18B20');
        return ds?.config?.temp !== undefined ? ds.config.temp : 25;
      }
    },
    Servo: class {
      constructor() {}
      attach(pin) { sim.logToConsole(`Servo attached to pin ${pin}`); }
      write(angle) {
        useCanvasStore.getState().components.forEach(c => {
          if (c.type === 'SERVO') {
            useCanvasStore.getState().updateComponentConfig(c.id, 'angle', angle);
          }
        });
      }
    },
    LiquidCrystal: class {
      constructor() { this.row = 0; }
      begin() {}
      clear() {
        useCanvasStore.getState().components.forEach(c => {
          if (c.type === 'LCD1602') {
            useCanvasStore.getState().updateComponentConfig(c.id, 'textLine1', '');
            useCanvasStore.getState().updateComponentConfig(c.id, 'textLine2', '');
          }
        });
      }
      setCursor(col, row) { this.row = row; }
      print(text) {
        useCanvasStore.getState().components.forEach(c => {
          if (c.type === 'LCD1602') {
            const key = this.row === 1 ? 'textLine2' : 'textLine1';
            useCanvasStore.getState().updateComponentConfig(c.id, key, String(text));
          }
        });
      }
    },
    SSD1306: class {
      constructor() { this.line = 'line1'; }
      display() {}
      setTextSize() {}
      setTextColor() {}
      clearDisplay() {
        useCanvasStore.getState().components.forEach(c => {
          if (c.type === 'OLED_SSD1306') {
            useCanvasStore.getState().updateComponentConfig(c.id, 'line1', '');
            useCanvasStore.getState().updateComponentConfig(c.id, 'line2', '');
            useCanvasStore.getState().updateComponentConfig(c.id, 'line3', '');
          }
        });
      }
      setCursor(x, y) {
        this.line = y > 30 ? 'line3' : y > 15 ? 'line2' : 'line1';
      }
      print(text) {
        useCanvasStore.getState().components.forEach(c => {
          if (c.type === 'OLED_SSD1306') {
            const key = this.line || 'line1';
            const cur = c.config[key] || '';
            useCanvasStore.getState().updateComponentConfig(c.id, key, cur + String(text));
          }
        });
      }
      println(text) { this.print(text); }
    },
    serialPrintln: (val) => sim.logToConsole(String(val)),
    serialPrint: (val) => sim.logToConsole(String(val)),
    resetAudio: () => {
      if (oscillatorRef.current) { try { oscillatorRef.current.stop(); } catch (e) {} oscillatorRef.current = null; }
    },
  });

  const startSimulation = () => {
    initAudio();
    sim.clearLogs();
    const sys = createSystemInterface();
    simulationRunnerRef.current = new SimulationRunner(sys);
    simulationRunnerRef.current.run(
      code,
      (err) => { sim.logToConsole(`🔴 LỖI: ${err}`); sim.setIsSimulating(false); },
      (log) => sim.logToConsole(`ℹ️ ${log}`)
    );
    sim.setIsSimulating(true);
  };

  const stopSimulation = () => {
    if (simulationRunnerRef.current) simulationRunnerRef.current.stop();
    sim.setPinStates({});
    sim.setIsSimulating(false);
    sim.logToConsole('⏹️ Đã dừng mô phỏng.');
  };

  return { startSimulation, stopSimulation };
}
