/**
 * Comprehensive IoT Hardware Catalog Data — Full IoT Labs Card Layout Edition
 * 45+ devices with exact IoT Labs Maker Card pin layouts
 */

export const COMPONENT_CATEGORIES = [
  { id: 'ALL', name: 'Tất cả', icon: '📦' },
  { id: 'Power', name: '🔋 Nguồn điện', icon: '🔋' },
  { id: 'EnvSensors', name: '🌱 CB Môi trường', icon: '🌱' },
  { id: 'Boards', name: 'Bo mạch', icon: '🔲' },
  { id: 'Sensors', name: 'Cảm biến', icon: '📡' },
  { id: 'Actuators', name: 'Đầu ra / Bơm', icon: '⚡' },
  { id: 'Displays', name: 'Hiển thị', icon: '🖥️' },
  { id: 'Passive', name: 'Thụ động', icon: '🔧' },
  { id: 'Comm', name: 'Truyền thông', icon: '📶' },
  { id: 'Others', name: 'Khác', icon: '🧩' },
];

export const COMPONENT_TYPES = {
  // ═══════════════════════════════════════════════
  // BOARDS
  // ═══════════════════════════════════════════════
  ESP32: {
    name: 'ESP32 DevKit V1 (30 pins)',
    subtitle: 'Board',
    category: 'Boards',
    tags: ['ESP32', 'WiFi', 'BLE', '30P'],
    width: 270, height: 320,
    ports: [
      { id: 'EN', name: 'EN_L1', x: 8, y: 22, side: 'left', type: 'gpio' },
      { id: 'VP', name: 'GPIO36_L2', x: 8, y: 40, side: 'left', type: 'analog', pin: 36 },
      { id: 'VN', name: 'GPIO39_L3', x: 8, y: 58, side: 'left', type: 'analog', pin: 39 },
      { id: 'D34', name: 'GPIO34_L4', x: 8, y: 76, side: 'left', type: 'gpio', pin: 34 },
      { id: 'D35', name: 'GPIO35_L5', x: 8, y: 94, side: 'left', type: 'gpio', pin: 35 },
      { id: 'D32', name: 'GPIO32_L6', x: 8, y: 112, side: 'left', type: 'gpio', pin: 32 },
      { id: 'D33', name: 'GPIO33_L7', x: 8, y: 130, side: 'left', type: 'gpio', pin: 33 },
      { id: 'D25', name: 'GPIO25_L8', x: 8, y: 148, side: 'left', type: 'gpio', pin: 25 },
      { id: 'D26', name: 'GPIO26_L9', x: 8, y: 166, side: 'left', type: 'gpio', pin: 26 },
      { id: 'D27', name: 'GPIO27_L10', x: 8, y: 184, side: 'left', type: 'gpio', pin: 27 },
      { id: 'D14', name: 'GPIO14_L11', x: 8, y: 202, side: 'left', type: 'gpio', pin: 14 },
      { id: 'D12', name: 'GPIO12_L12', x: 8, y: 220, side: 'left', type: 'gpio', pin: 12 },
      { id: 'GND1', name: 'GND_L13', x: 8, y: 238, side: 'left', type: 'gnd' },
      { id: 'D13', name: 'GPIO13_L14', x: 8, y: 256, side: 'left', type: 'gpio', pin: 13 },
      { id: 'VIN', name: 'VIN_L15', x: 8, y: 274, side: 'left', type: 'power', voltage: 5 },

      { id: 'D23', name: 'GPIO23_R1', x: 262, y: 22, side: 'right', type: 'gpio', pin: 23 },
      { id: 'D22', name: 'GPIO22_R2', x: 262, y: 40, side: 'right', type: 'gpio', pin: 22 },
      { id: 'TX0', name: 'GPIO1_R3', x: 262, y: 58, side: 'right', type: 'gpio', pin: 1 },
      { id: 'RX0', name: 'GPIO3_R4', x: 262, y: 76, side: 'right', type: 'gpio', pin: 3 },
      { id: 'D21', name: 'GPIO21_R5', x: 262, y: 94, side: 'right', type: 'gpio', pin: 21 },
      { id: 'D19', name: 'GPIO19_R6', x: 262, y: 112, side: 'right', type: 'gpio', pin: 19 },
      { id: 'D18', name: 'GPIO18_R7', x: 262, y: 130, side: 'right', type: 'gpio', pin: 18 },
      { id: 'D5', name: 'GPIO5_R8', x: 262, y: 148, side: 'right', type: 'gpio', pin: 5 },
      { id: 'D17', name: 'GPIO17_R9', x: 262, y: 166, side: 'right', type: 'gpio', pin: 17 },
      { id: 'D16', name: 'GPIO16_R10', x: 262, y: 184, side: 'right', type: 'gpio', pin: 16 },
      { id: 'D4', name: 'GPIO4_R11', x: 262, y: 202, side: 'right', type: 'gpio', pin: 4 },
      { id: 'D2', name: 'GPIO2_R12', x: 262, y: 220, side: 'right', type: 'gpio', pin: 2 },
      { id: 'D15', name: 'GPIO15_R13', x: 262, y: 238, side: 'right', type: 'gpio', pin: 15 },
      { id: 'GND2', name: 'GND_R14', x: 262, y: 256, side: 'right', type: 'gnd' },
      { id: '3V3', name: '3V3_R15', x: 262, y: 274, side: 'right', type: 'power', voltage: 3.3 }
    ]
  },

  ESP32_V4: {
    name: 'ESP32 DevKit V4',
    subtitle: 'Board',
    category: 'Boards',
    tags: ['ESP32', 'WiFi', 'BLE', '38P'],
    width: 270, height: 320,
    ports: [
      { id: '3V3', name: '3V3', x: 8, y: 22, side: 'left', type: 'power', voltage: 3.3 },
      { id: 'EN', name: 'EN', x: 8, y: 40, side: 'left', type: 'gpio' },
      { id: 'VP', name: 'GPIO36', x: 8, y: 58, side: 'left', type: 'analog', pin: 36 },
      { id: 'VN', name: 'GPIO39', x: 8, y: 76, side: 'left', type: 'analog', pin: 39 },
      { id: 'D34', name: 'GPIO34', x: 8, y: 94, side: 'left', type: 'gpio', pin: 34 },
      { id: 'D35', name: 'GPIO35', x: 8, y: 112, side: 'left', type: 'gpio', pin: 35 },
      { id: 'D32', name: 'GPIO32', x: 8, y: 130, side: 'left', type: 'gpio', pin: 32 },
      { id: 'D33', name: 'GPIO33', x: 8, y: 148, side: 'left', type: 'gpio', pin: 33 },
      { id: 'D25', name: 'GPIO25', x: 8, y: 166, side: 'left', type: 'gpio', pin: 25 },
      { id: 'D26', name: 'GPIO26', x: 8, y: 184, side: 'left', type: 'gpio', pin: 26 },
      { id: 'D27', name: 'GPIO27', x: 8, y: 202, side: 'left', type: 'gpio', pin: 27 },
      { id: 'D14', name: 'GPIO14', x: 8, y: 220, side: 'left', type: 'gpio', pin: 14 },
      { id: 'D12', name: 'GPIO12', x: 8, y: 238, side: 'left', type: 'gpio', pin: 12 },
      { id: 'D13', name: 'GPIO13', x: 8, y: 256, side: 'left', type: 'gpio', pin: 13 },
      { id: 'GND1', name: 'GND', x: 8, y: 274, side: 'left', type: 'gnd' },

      { id: 'VIN', name: 'VIN (5V)', x: 262, y: 22, side: 'right', type: 'power', voltage: 5 },
      { id: 'GND2', name: 'GND', x: 262, y: 40, side: 'right', type: 'gnd' },
      { id: 'D23', name: 'GPIO23', x: 262, y: 58, side: 'right', type: 'gpio', pin: 23 },
      { id: 'D22', name: 'GPIO22', x: 262, y: 76, side: 'right', type: 'gpio', pin: 22 },
      { id: 'D1', name: 'GPIO1', x: 262, y: 94, side: 'right', type: 'gpio', pin: 1 },
      { id: 'D3', name: 'GPIO3', x: 262, y: 112, side: 'right', type: 'gpio', pin: 3 },
      { id: 'D21', name: 'GPIO21', x: 262, y: 130, side: 'right', type: 'gpio', pin: 21 },
      { id: 'D19', name: 'GPIO19', x: 262, y: 148, side: 'right', type: 'gpio', pin: 19 },
      { id: 'D18', name: 'GPIO18', x: 262, y: 166, side: 'right', type: 'gpio', pin: 18 },
      { id: 'D5', name: 'GPIO5', x: 262, y: 184, side: 'right', type: 'gpio', pin: 5 },
      { id: 'D17', name: 'GPIO17', x: 262, y: 202, side: 'right', type: 'gpio', pin: 17 },
      { id: 'D16', name: 'GPIO16', x: 262, y: 220, side: 'right', type: 'gpio', pin: 16 },
      { id: 'D4', name: 'GPIO4', x: 262, y: 238, side: 'right', type: 'gpio', pin: 4 },
      { id: 'D2', name: 'GPIO2', x: 262, y: 256, side: 'right', type: 'gpio', pin: 2 },
      { id: 'D15', name: 'GPIO15', x: 262, y: 274, side: 'right', type: 'gpio', pin: 15 }
    ]
  },

  ARDUINO_UNO: {
    name: 'Arduino Uno R3',
    subtitle: 'Board',
    category: 'Boards',
    tags: ['Arduino', 'AVR', '5V', 'USB'],
    width: 270, height: 300,
    ports: [
      { id: 'RESET', name: 'RESET', x: 8, y: 24, side: 'left', type: 'gpio' },
      { id: '3.3V', name: '3.3V', x: 8, y: 44, side: 'left', type: 'power', voltage: 3.3 },
      { id: '5V', name: '5V', x: 8, y: 64, side: 'left', type: 'power', voltage: 5 },
      { id: 'GND_A', name: 'GND', x: 8, y: 84, side: 'left', type: 'gnd' },
      { id: 'GND_B', name: 'GND', x: 8, y: 104, side: 'left', type: 'gnd' },
      { id: 'VIN_A', name: 'VIN', x: 8, y: 124, side: 'left', type: 'power' },
      { id: 'A0_A', name: 'A0', x: 8, y: 154, side: 'left', type: 'analog', pin: 0 },
      { id: 'A1_A', name: 'A1', x: 8, y: 174, side: 'left', type: 'analog', pin: 1 },
      { id: 'A2_A', name: 'A2', x: 8, y: 194, side: 'left', type: 'analog', pin: 2 },
      { id: 'A3_A', name: 'A3', x: 8, y: 214, side: 'left', type: 'analog', pin: 3 },
      { id: 'A4_A', name: 'A4', x: 8, y: 234, side: 'left', type: 'analog', pin: 4 },
      { id: 'A5_A', name: 'A5', x: 8, y: 254, side: 'left', type: 'analog', pin: 5 },

      { id: 'D0', name: 'D0 (RX)', x: 262, y: 24, side: 'right', type: 'gpio', pin: 0 },
      { id: 'D1', name: 'D1 (TX)', x: 262, y: 44, side: 'right', type: 'gpio', pin: 1 },
      { id: 'D2', name: 'D2', x: 262, y: 64, side: 'right', type: 'gpio', pin: 2 },
      { id: 'D3', name: 'D3 ~', x: 262, y: 84, side: 'right', type: 'gpio', pin: 3 },
      { id: 'D4', name: 'D4', x: 262, y: 104, side: 'right', type: 'gpio', pin: 4 },
      { id: 'D5', name: 'D5 ~', x: 262, y: 124, side: 'right', type: 'gpio', pin: 5 },
      { id: 'D6', name: 'D6 ~', x: 262, y: 144, side: 'right', type: 'gpio', pin: 6 },
      { id: 'D7', name: 'D7', x: 262, y: 164, side: 'right', type: 'gpio', pin: 7 },
      { id: 'D8', name: 'D8', x: 262, y: 184, side: 'right', type: 'gpio', pin: 8 },
      { id: 'D9', name: 'D9 ~', x: 262, y: 204, side: 'right', type: 'gpio', pin: 9 },
      { id: 'D10', name: 'D10 ~', x: 262, y: 224, side: 'right', type: 'gpio', pin: 10 },
      { id: 'D11', name: 'D11 ~', x: 262, y: 244, side: 'right', type: 'gpio', pin: 11 },
      { id: 'D12', name: 'D12', x: 262, y: 264, side: 'right', type: 'gpio', pin: 12 },
      { id: 'D13', name: 'D13 (LED)', x: 262, y: 284, side: 'right', type: 'gpio', pin: 13 }
    ]
  },

  ARDUINO_NANO: {
    name: 'Arduino Nano V3',
    subtitle: 'Board',
    category: 'Boards',
    tags: ['Arduino', 'AVR', 'Nano'],
    width: 240, height: 250,
    ports: [
      { id: 'D1', name: 'D1/TX', x: 8, y: 24, side: 'left', type: 'gpio', pin: 1 },
      { id: 'D0', name: 'D0/RX', x: 8, y: 44, side: 'left', type: 'gpio', pin: 0 },
      { id: 'RST', name: 'RST', x: 8, y: 64, side: 'left', type: 'gpio' },
      { id: 'GND1', name: 'GND', x: 8, y: 84, side: 'left', type: 'gnd' },
      { id: 'D2', name: 'D2', x: 8, y: 104, side: 'left', type: 'gpio', pin: 2 },
      { id: 'D3', name: 'D3~', x: 8, y: 124, side: 'left', type: 'gpio', pin: 3 },
      { id: 'D4', name: 'D4', x: 8, y: 144, side: 'left', type: 'gpio', pin: 4 },
      { id: 'D5', name: 'D5~', x: 8, y: 164, side: 'left', type: 'gpio', pin: 5 },

      { id: 'VIN', name: 'VIN', x: 232, y: 24, side: 'right', type: 'power', voltage: 5 },
      { id: 'GND2', name: 'GND', x: 232, y: 44, side: 'right', type: 'gnd' },
      { id: '5V', name: '5V', x: 232, y: 64, side: 'right', type: 'power', voltage: 5 },
      { id: 'A7', name: 'A7', x: 232, y: 84, side: 'right', type: 'analog', pin: 7 },
      { id: 'A6', name: 'A6', x: 232, y: 104, side: 'right', type: 'analog', pin: 6 },
      { id: 'A5', name: 'A5', x: 232, y: 124, side: 'right', type: 'analog', pin: 5 },
      { id: 'A4', name: 'A4', x: 232, y: 144, side: 'right', type: 'analog', pin: 4 },
      { id: 'A3', name: 'A3', x: 232, y: 164, side: 'right', type: 'analog', pin: 3 }
    ]
  },

  ARDUINO_MEGA: {
    name: 'Arduino Mega 2560',
    subtitle: 'Board',
    category: 'Boards',
    tags: ['Arduino', 'Mega'],
    width: 270, height: 300,
    ports: [
      { id: '5V', name: '5V', x: 8, y: 24, side: 'left', type: 'power', voltage: 5 },
      { id: '3V3', name: '3.3V', x: 8, y: 44, side: 'left', type: 'power', voltage: 3.3 },
      { id: 'GND1', name: 'GND', x: 8, y: 64, side: 'left', type: 'gnd' },
      { id: 'A0', name: 'A0', x: 8, y: 94, side: 'left', type: 'analog', pin: 0 },
      { id: 'A1', name: 'A1', x: 8, y: 114, side: 'left', type: 'analog', pin: 1 },
      { id: 'A2', name: 'A2', x: 8, y: 134, side: 'left', type: 'analog', pin: 2 },
      { id: 'A3', name: 'A3', x: 8, y: 154, side: 'left', type: 'analog', pin: 3 },

      { id: 'D2', name: 'D2', x: 262, y: 24, side: 'right', type: 'gpio', pin: 2 },
      { id: 'D3', name: 'D3~', x: 262, y: 44, side: 'right', type: 'gpio', pin: 3 },
      { id: 'D4', name: 'D4', x: 262, y: 64, side: 'right', type: 'gpio', pin: 4 },
      { id: 'D5', name: 'D5~', x: 262, y: 84, side: 'right', type: 'gpio', pin: 5 },
      { id: 'D6', name: 'D6~', x: 262, y: 104, side: 'right', type: 'gpio', pin: 6 },
      { id: 'D7', name: 'D7', x: 262, y: 124, side: 'right', type: 'gpio', pin: 7 }
    ]
  },

  ESP8266: {
    name: 'ESP8266 NodeMCU V3',
    subtitle: 'Board',
    category: 'Boards',
    tags: ['ESP8266', 'WiFi'],
    width: 240, height: 260,
    ports: [
      { id: '3V3', name: '3V3', x: 8, y: 24, side: 'left', type: 'power', voltage: 3.3 },
      { id: 'GND1', name: 'GND', x: 8, y: 44, side: 'left', type: 'gnd' },
      { id: 'D1', name: 'D1 (GPIO5)', x: 8, y: 64, side: 'left', type: 'gpio', pin: 5 },
      { id: 'D2', name: 'D2 (GPIO4)', x: 8, y: 84, side: 'left', type: 'gpio', pin: 4 },
      { id: 'D3', name: 'D3 (GPIO0)', x: 8, y: 104, side: 'left', type: 'gpio', pin: 0 },
      { id: 'D4', name: 'D4 (GPIO2)', x: 8, y: 124, side: 'left', type: 'gpio', pin: 2 },

      { id: 'VIN', name: 'VIN', x: 232, y: 24, side: 'right', type: 'power', voltage: 5 },
      { id: 'GND2', name: 'GND', x: 232, y: 44, side: 'right', type: 'gnd' },
      { id: 'D0', name: 'D0 (GPIO16)', x: 232, y: 64, side: 'right', type: 'gpio', pin: 16 },
      { id: 'D8', name: 'D8 (GPIO15)', x: 232, y: 84, side: 'right', type: 'gpio', pin: 15 },
      { id: 'A0', name: 'A0 (ADC)', x: 232, y: 104, side: 'right', type: 'analog', pin: 0 }
    ]
  },

  // ═══════════════════════════════════════════════
  // SENSORS & MODULES
  // ═══════════════════════════════════════════════
  DS18B20: {
    name: 'DS18B20 – Nhiệt độ chống nước',
    subtitle: 'Module',
    category: 'Sensors', tags: ['OneWire', 'Temperature'],
    width: 250, height: 120,
    ports: [
      { id: 'VCC', name: 'VCC', x: 242, y: 24, side: 'right', type: 'power' },
      { id: 'GND', name: 'GND', x: 242, y: 44, side: 'right', type: 'gnd' },
      { id: 'DATA', name: 'DATA', x: 242, y: 64, side: 'right', type: 'gpio' }
    ],
    defaultConfig: { value: 25.0, label: 'Nhiệt độ (°C)' }
  },

  BMP280: {
    name: 'BMP280 – Áp suất & Nhiệt độ',
    subtitle: 'Module',
    category: 'Sensors', tags: ['I2C', 'Pressure'],
    width: 240, height: 130,
    ports: [
      { id: 'VCC', name: 'VCC', x: 8, y: 24, side: 'left', type: 'power' },
      { id: 'GND', name: 'GND', x: 8, y: 44, side: 'left', type: 'gnd' },
      { id: 'SCL', name: 'SCL', x: 8, y: 64, side: 'left', type: 'gpio' },
      { id: 'SDA', name: 'SDA', x: 232, y: 24, side: 'right', type: 'gpio' },
      { id: 'CSB', name: 'CSB', x: 232, y: 44, side: 'right', type: 'gpio' },
      { id: 'SDO', name: 'SDO', x: 232, y: 64, side: 'right', type: 'gpio' }
    ],
    defaultConfig: { pressure: 1013, temp: 26, label: 'Áp suất' }
  },

  ADXL345: {
    name: 'ADXL345 – Gia tốc kế 3 trục',
    subtitle: 'Module',
    category: 'Sensors', tags: ['I2C', 'SPI', 'Accel'],
    width: 250, height: 140,
    ports: [
      { id: 'VCC', name: 'VCC', x: 8, y: 24, side: 'left', type: 'power' },
      { id: 'GND', name: 'GND', x: 8, y: 44, side: 'left', type: 'gnd' },
      { id: 'SCL', name: 'SCL', x: 8, y: 64, side: 'left', type: 'gpio' },
      { id: 'SDA', name: 'SDA', x: 8, y: 84, side: 'left', type: 'gpio' },
      { id: 'CS', name: 'CS', x: 242, y: 24, side: 'right', type: 'gpio' },
      { id: 'ALT', name: 'ALT', x: 242, y: 44, side: 'right', type: 'gpio' },
      { id: 'INT1', name: 'INT1', x: 242, y: 64, side: 'right', type: 'gpio' },
      { id: 'INT2', name: 'INT2', x: 242, y: 84, side: 'right', type: 'gpio' }
    ],
    defaultConfig: { accelX: 0, accelY: 0, accelZ: 9.8, label: 'Gia tốc' }
  },

  DS3231: {
    name: 'DS3231 Real-Time Clock Module',
    subtitle: 'Sensor',
    category: 'Sensors', tags: ['I2C', 'RTC'],
    width: 260, height: 130,
    ports: [
      { id: 'VCC', name: 'VCC', x: 8, y: 24, side: 'left', type: 'power' },
      { id: 'GND', name: 'GND', x: 8, y: 44, side: 'left', type: 'gnd' },
      { id: 'SCL', name: 'SCL', x: 8, y: 64, side: 'left', type: 'gpio' },
      { id: 'SDA', name: 'SDA', x: 252, y: 24, side: 'right', type: 'gpio' },
      { id: 'SQW', name: 'SQW', x: 252, y: 44, side: 'right', type: 'gpio' },
      { id: '32K', name: '32K', x: 252, y: 64, side: 'right', type: 'gpio' }
    ],
    defaultConfig: { label: 'DS3231 RTC' }
  },

  ACS712: {
    name: 'ACS712 – Cảm biến dòng điện Hall',
    subtitle: 'Module',
    category: 'Sensors', tags: ['Current', 'Analog'],
    width: 260, height: 120,
    ports: [
      { id: 'VCC', name: 'VCC', x: 8, y: 24, side: 'left', type: 'power' },
      { id: 'GND', name: 'GND', x: 8, y: 44, side: 'left', type: 'gnd' },
      { id: 'VOUT', name: 'VOUT', x: 8, y: 64, side: 'left', type: 'gpio' },
      { id: 'IP_PLUS', name: 'IP+', x: 252, y: 24, side: 'right', type: 'power' },
      { id: 'IP_MINUS', name: 'IP-', x: 252, y: 44, side: 'right', type: 'power' }
    ],
    defaultConfig: { current: 1.5, label: 'Dòng điện (A)' }
  },

  HC_SR04: {
    name: 'HC-SR04 – Siêu âm',
    subtitle: 'Sensor',
    category: 'Sensors', tags: ['Digital', 'Ultrasonic'],
    width: 250, height: 130,
    ports: [
      { id: 'VCC', name: 'VCC', x: 8, y: 24, side: 'left', type: 'power' },
      { id: 'TRIG', name: 'TRIG', x: 8, y: 44, side: 'left', type: 'gpio' },
      { id: 'ECHO', name: 'ECHO', x: 242, y: 24, side: 'right', type: 'gpio' },
      { id: 'GND', name: 'GND', x: 242, y: 44, side: 'right', type: 'gnd' }
    ],
    defaultConfig: { distance: 25, min: 2, max: 400, label: 'Khoảng cách (cm)' }
  },

  DHT11: {
    name: 'DHT11 – Nhiệt độ & Độ ẩm',
    subtitle: 'Module',
    category: 'Sensors', tags: ['Digital', 'Temperature'],
    width: 240, height: 120,
    ports: [
      { id: 'VCC', name: 'VCC', x: 232, y: 24, side: 'right', type: 'power' },
      { id: 'GND', name: 'GND', x: 232, y: 44, side: 'right', type: 'gnd' },
      { id: 'DATA', name: 'DATA', x: 232, y: 64, side: 'right', type: 'gpio' }
    ],
    defaultConfig: { value: 28, humidity: 65, min: 0, max: 50, label: 'Nhiệt độ (°C)' }
  },

  DHT22: {
    name: 'DHT22 – Nhiệt độ cao cấp',
    subtitle: 'Module',
    category: 'Sensors', tags: ['Digital', 'Temperature'],
    width: 240, height: 120,
    ports: [
      { id: 'VCC', name: 'VCC', x: 232, y: 24, side: 'right', type: 'power' },
      { id: 'GND', name: 'GND', x: 232, y: 44, side: 'right', type: 'gnd' },
      { id: 'DATA', name: 'DATA', x: 232, y: 64, side: 'right', type: 'gpio' }
    ],
    defaultConfig: { value: 25.5, humidity: 55, min: -40, max: 80, label: 'Nhiệt độ (°C)' }
  },

  LDR: {
    name: 'LDR – Cảm biến ánh sáng',
    subtitle: 'Sensor',
    category: 'Sensors', tags: ['Analog', 'Light'],
    width: 240, height: 120,
    ports: [
      { id: 'VCC', name: 'VCC', x: 232, y: 24, side: 'right', type: 'power' },
      { id: 'GND', name: 'GND', x: 232, y: 44, side: 'right', type: 'gnd' },
      { id: 'OUT', name: 'AO', x: 232, y: 64, side: 'right', type: 'gpio' }
    ],
    defaultConfig: { value: 450, min: 0, max: 1023, label: 'Ánh sáng' }
  },

  SOIL_MOISTURE: {
    name: 'Cảm biến Độ ẩm đất',
    subtitle: 'Module',
    category: 'Sensors', tags: ['Analog', 'Soil'],
    width: 240, height: 120,
    ports: [
      { id: 'VCC', name: 'VCC', x: 232, y: 24, side: 'right', type: 'power' },
      { id: 'GND', name: 'GND', x: 232, y: 44, side: 'right', type: 'gnd' },
      { id: 'AO', name: 'AO', x: 232, y: 64, side: 'right', type: 'gpio' }
    ],
    defaultConfig: { moisture: 350, min: 0, max: 1023, label: 'Độ ẩm đất' }
  },

  MQ2: {
    name: 'MQ-2 – Khí Gas / Khói',
    subtitle: 'Module',
    category: 'Sensors', tags: ['Analog', 'Gas'],
    width: 240, height: 120,
    ports: [
      { id: 'VCC', name: 'VCC', x: 232, y: 24, side: 'right', type: 'power' },
      { id: 'GND', name: 'GND', x: 232, y: 44, side: 'right', type: 'gnd' },
      { id: 'AO', name: 'AO', x: 232, y: 64, side: 'right', type: 'gpio' }
    ],
    defaultConfig: { gasLevel: 120, min: 0, max: 1023, label: 'Nồng độ Gas' }
  },

  PIR: {
    name: 'PIR – Chuyển động',
    subtitle: 'Sensor',
    category: 'Sensors', tags: ['Digital', 'Motion'],
    width: 240, height: 120,
    ports: [
      { id: 'VCC', name: 'VCC', x: 232, y: 24, side: 'right', type: 'power' },
      { id: 'OUT', name: 'OUT', x: 232, y: 44, side: 'right', type: 'gpio' },
      { id: 'GND', name: 'GND', x: 232, y: 64, side: 'right', type: 'gnd' }
    ],
    defaultConfig: { motion: false, label: 'Chuyển động' }
  },

  FLAME: {
    name: 'Flame – Cảm biến lửa',
    subtitle: 'Module',
    category: 'Sensors', tags: ['Digital', 'Flame'],
    width: 240, height: 120,
    ports: [
      { id: 'VCC', name: 'VCC', x: 232, y: 24, side: 'right', type: 'power' },
      { id: 'GND', name: 'GND', x: 232, y: 44, side: 'right', type: 'gnd' },
      { id: 'DO', name: 'DO', x: 232, y: 64, side: 'right', type: 'gpio' }
    ],
    defaultConfig: { detected: false, label: 'Ngọn lửa' }
  },

  POTENTIOMETER: {
    name: 'Biến trở xoay 10k',
    subtitle: 'Module',
    category: 'Sensors', tags: ['Analog', 'Potentiometer'],
    width: 240, height: 120,
    ports: [
      { id: 'VCC', name: 'VCC', x: 232, y: 24, side: 'right', type: 'power' },
      { id: 'OUT', name: 'SIG', x: 232, y: 44, side: 'right', type: 'gpio' },
      { id: 'GND', name: 'GND', x: 232, y: 64, side: 'right', type: 'gnd' }
    ],
    defaultConfig: { position: 512, min: 0, max: 1023, label: 'Biến trở' }
  },

  IR_RECEIVER: {
    name: 'IR Receiver VS1838B',
    subtitle: 'Sensor',
    category: 'Sensors', tags: ['Digital', 'IR'],
    width: 240, height: 120,
    ports: [
      { id: 'OUT', name: 'SIG', x: 232, y: 24, side: 'right', type: 'gpio' },
      { id: 'GND', name: 'GND', x: 232, y: 44, side: 'right', type: 'gnd' },
      { id: 'VCC', name: 'VCC', x: 232, y: 64, side: 'right', type: 'power' }
    ],
    defaultConfig: { code: 0xFF00FF, label: 'Mã IR' }
  },

  TOUCH_SENSOR: {
    name: 'Touch Sensor TTP223',
    subtitle: 'Module',
    category: 'Sensors', tags: ['Digital', 'Touch'],
    width: 240, height: 120,
    ports: [
      { id: 'VCC', name: 'VCC', x: 232, y: 24, side: 'right', type: 'power' },
      { id: 'OUT', name: 'SIG', x: 232, y: 44, side: 'right', type: 'gpio' },
      { id: 'GND', name: 'GND', x: 232, y: 64, side: 'right', type: 'gnd' }
    ],
    defaultConfig: { touched: false, label: 'Chạm' }
  },

  RAIN_SENSOR: {
    name: 'Cảm biến mưa',
    subtitle: 'Module',
    category: 'Sensors', tags: ['Analog', 'Rain'],
    width: 240, height: 120,
    ports: [
      { id: 'VCC', name: 'VCC', x: 232, y: 24, side: 'right', type: 'power' },
      { id: 'GND', name: 'GND', x: 232, y: 44, side: 'right', type: 'gnd' },
      { id: 'AO', name: 'AO', x: 232, y: 64, side: 'right', type: 'gpio' }
    ],
    defaultConfig: { rainLevel: 100, min: 0, max: 1023, label: 'Mưa' }
  },

  // ═══════════════════════════════════════════════
  // ACTUATORS & DISPLAYS
  // ═══════════════════════════════════════════════
  LED: {
    name: 'Đèn LED 5mm',
    subtitle: 'Actuator',
    category: 'Actuators', tags: ['Digital', 'LED'],
    width: 220, height: 110,
    ports: [
      { id: 'A', name: 'Anode (+)', x: 212, y: 30, side: 'right', type: 'gpio' },
      { id: 'K', name: 'Cathode (-)', x: 212, y: 56, side: 'right', type: 'gnd' }
    ],
    defaultConfig: { color: '#EF4444', label: 'LED' }
  },

  RGB_LED: {
    name: 'RGB LED – 3 màu',
    subtitle: 'Actuator',
    category: 'Actuators', tags: ['PWM', 'RGB'],
    width: 240, height: 130,
    ports: [
      { id: 'R', name: 'Red', x: 232, y: 20, side: 'right', type: 'gpio' },
      { id: 'GND', name: 'GND (-)', x: 232, y: 40, side: 'right', type: 'gnd' },
      { id: 'G', name: 'Green', x: 232, y: 60, side: 'right', type: 'gpio' },
      { id: 'B', name: 'Blue', x: 232, y: 80, side: 'right', type: 'gpio' }
    ],
    defaultConfig: { label: 'RGB LED' }
  },

  BUZZER: {
    name: 'Buzzer – Còi báo',
    subtitle: 'Actuator',
    category: 'Actuators', tags: ['Digital', 'Sound'],
    width: 220, height: 110,
    ports: [
      { id: 'POS', name: 'Positive (+)', x: 212, y: 30, side: 'right', type: 'gpio' },
      { id: 'NEG', name: 'Negative (-)', x: 212, y: 56, side: 'right', type: 'gnd' }
    ],
    defaultConfig: { label: 'Buzzer' }
  },

  SERVO: {
    name: 'SG90 Servo Motor',
    subtitle: 'Actuator',
    category: 'Actuators', tags: ['PWM', 'Servo'],
    width: 240, height: 120,
    ports: [
      { id: 'PWM', name: 'Signal', x: 232, y: 24, side: 'right', type: 'gpio' },
      { id: 'VCC', name: 'VCC', x: 232, y: 44, side: 'right', type: 'power' },
      { id: 'GND', name: 'GND', x: 232, y: 64, side: 'right', type: 'gnd' }
    ],
    defaultConfig: { angle: 90, min: 0, max: 180, label: 'Servo' }
  },

  RELAY: {
    name: 'Relay 1 kênh 5V',
    subtitle: 'Module',
    category: 'Actuators', tags: ['Digital', 'Relay'],
    width: 240, height: 120,
    ports: [
      { id: 'VCC', name: 'VCC', x: 232, y: 24, side: 'right', type: 'power' },
      { id: 'GND', name: 'GND', x: 232, y: 44, side: 'right', type: 'gnd' },
      { id: 'IN', name: 'IN Signal', x: 232, y: 64, side: 'right', type: 'gpio' }
    ],
    defaultConfig: { state: false, label: 'Relay' }
  },

  DC_MOTOR: {
    name: 'Fan Motor 5V',
    subtitle: 'Actuator',
    category: 'Actuators', tags: ['Motor', 'Fan'],
    width: 220, height: 110,
    ports: [
      { id: 'POS', name: 'Positive (+)', x: 212, y: 30, side: 'right', type: 'gpio' },
      { id: 'NEG', name: 'GND (-)', x: 212, y: 56, side: 'right', type: 'gnd' }
    ],
    defaultConfig: { speed: 0, label: 'Fan' }
  },

  STEPPER_28BYJ: {
    name: 'Stepper 28BYJ-48',
    subtitle: 'Module',
    category: 'Actuators', tags: ['Motor', 'Stepper'],
    width: 250, height: 140,
    ports: [
      { id: 'IN1', name: 'IN1', x: 242, y: 20, side: 'right', type: 'gpio' },
      { id: 'IN2', name: 'IN2', x: 242, y: 40, side: 'right', type: 'gpio' },
      { id: 'IN3', name: 'IN3', x: 242, y: 60, side: 'right', type: 'gpio' },
      { id: 'IN4', name: 'IN4', x: 242, y: 80, side: 'right', type: 'gpio' },
      { id: 'VCC', name: 'VCC', x: 242, y: 100, side: 'right', type: 'power' }
    ],
    defaultConfig: { steps: 0, label: 'Stepper' }
  },

  LASER: {
    name: 'Laser Diode 650nm',
    subtitle: 'Actuator',
    category: 'Actuators', tags: ['Digital', 'Laser'],
    width: 220, height: 110,
    ports: [
      { id: 'SIG', name: 'Signal', x: 212, y: 30, side: 'right', type: 'gpio' },
      { id: 'GND', name: 'GND', x: 212, y: 56, side: 'right', type: 'gnd' }
    ],
    defaultConfig: { label: 'Laser' }
  },

  BUTTON: {
    name: 'Push Button Module',
    subtitle: 'Actuator',
    category: 'Actuators', tags: ['Digital', 'Button'],
    width: 220, height: 110,
    ports: [
      { id: 'VCC', name: 'VCC', x: 212, y: 24, side: 'right', type: 'power' },
      { id: 'OUT', name: 'SIG', x: 212, y: 44, side: 'right', type: 'gpio' },
      { id: 'GND', name: 'GND', x: 212, y: 64, side: 'right', type: 'gnd' }
    ],
    defaultConfig: { pressed: false, label: 'Button' }
  },

  LCD1602: {
    name: 'LCD 16x2 I2C / HD44780',
    subtitle: 'Display',
    category: 'Displays', tags: ['Display', 'LCD', 'I2C'],
    width: 280, height: 160,
    ports: [
      { id: 'VCC', name: 'VCC', x: 8, y: 24, side: 'left', type: 'power' },
      { id: 'GND', name: 'GND', x: 8, y: 44, side: 'left', type: 'gnd' },
      { id: 'SCL', name: 'SCL', x: 8, y: 64, side: 'left', type: 'gpio' },
      { id: 'SDA', name: 'SDA', x: 8, y: 84, side: 'left', type: 'gpio' },

      { id: 'VSS', name: 'VSS', x: 272, y: 24, side: 'right', type: 'gnd' },
      { id: 'VDD', name: 'VDD', x: 272, y: 44, side: 'right', type: 'power' },
      { id: 'RS', name: 'RS', x: 272, y: 64, side: 'right', type: 'gpio' },
      { id: 'EN', name: 'EN', x: 272, y: 84, side: 'right', type: 'gpio' },
      { id: 'D4', name: 'D4', x: 272, y: 104, side: 'right', type: 'gpio' },
      { id: 'D5', name: 'D5', x: 272, y: 124, side: 'right', type: 'gpio' }
    ],
    defaultConfig: { textLine1: 'IoT Labs Maker', textLine2: 'Virtual Hardware', label: 'LCD' }
  },

  OLED_SSD1306: {
    name: 'OLED 0.96" SSD1306',
    subtitle: 'Display',
    category: 'Displays', tags: ['Display', 'OLED'],
    width: 250, height: 130,
    ports: [
      { id: 'GND', name: 'GND', x: 8, y: 24, side: 'left', type: 'gnd' },
      { id: 'VCC', name: 'VCC', x: 8, y: 44, side: 'left', type: 'power' },
      { id: 'SCL', name: 'SCL', x: 242, y: 24, side: 'right', type: 'gpio' },
      { id: 'SDA', name: 'SDA', x: 242, y: 44, side: 'right', type: 'gpio' }
    ],
    defaultConfig: { line1: 'ESP32 Weather', label: 'OLED' }
  },

  SEVEN_SEGMENT: {
    name: '7-Segment Display',
    subtitle: 'Display',
    category: 'Displays', tags: ['Display', '7Seg'],
    width: 230, height: 130,
    ports: [
      { id: 'A', name: 'A', x: 222, y: 20, side: 'right', type: 'gpio' },
      { id: 'B', name: 'B', x: 222, y: 38, side: 'right', type: 'gpio' },
      { id: 'C', name: 'C', x: 222, y: 56, side: 'right', type: 'gpio' },
      { id: 'D', name: 'D', x: 222, y: 74, side: 'right', type: 'gpio' },
      { id: 'GND', name: 'GND', x: 222, y: 92, side: 'right', type: 'gnd' }
    ],
    defaultConfig: { digit: 8, label: '7-Seg' }
  },

  // ═══════════════════════════════════════════════
  // NGUỒN ĐIỆN (bài nhập môn — mạch không vi điều khiển)
  // ═══════════════════════════════════════════════
  BATTERY_9V: {
    name: 'Pin 9V',
    subtitle: 'Nguồn điện',
    category: 'Power', tags: ['Power', 'Battery'],
    width: 220, height: 130,
    ports: [
      { id: 'VCC', name: '+', x: 212, y: 40, side: 'right', type: 'power', voltage: 9 },
      { id: 'GND', name: '−', x: 212, y: 90, side: 'right', type: 'gnd' }
    ],
    defaultConfig: { label: 'Pin 9V' }
  },

  POTATO: {
    name: 'Khoai tây (Pin sinh học)',
    subtitle: 'Nguồn điện',
    category: 'Power', tags: ['Power', 'Bio-battery'],
    width: 200, height: 120,
    ports: [
      { id: 'CU', name: 'Đồng (+)', x: 192, y: 40, side: 'right', type: 'power', voltage: 0.5 },
      { id: 'NAIL', name: 'Kẽm (−)', x: 8, y: 40, side: 'left', type: 'gnd' }
    ],
    defaultConfig: { label: 'Khoai tây' }
  },

  LEMON: {
    name: 'Chanh (Pin sinh học)',
    subtitle: 'Nguồn điện',
    category: 'Power', tags: ['Power', 'Bio-battery'],
    width: 200, height: 110,
    ports: [
      { id: 'CU', name: 'Đồng (+)', x: 192, y: 38, side: 'right', type: 'power', voltage: 0.7 },
      { id: 'NAIL', name: 'Kẽm (−)', x: 8, y: 38, side: 'left', type: 'gnd' }
    ],
    defaultConfig: { label: 'Chanh' }
  },

  // ═══════════════════════════════════════════════
  // PASSIVE & COMM
  // ═══════════════════════════════════════════════
  RESISTOR: {
    name: 'Điện trở',
    subtitle: 'Passive',
    category: 'Passive', tags: ['Passive', 'Resistor'],
    width: 200, height: 90,
    ports: [
      { id: 'L', name: 'Lead 1', x: 8, y: 30, side: 'left', type: 'gpio' },
      { id: 'R', name: 'Lead 2', x: 192, y: 30, side: 'right', type: 'gpio' }
    ],
    defaultConfig: { resistance: 220, unit: 'Ω', label: 'Resistor' }
  },

  CAPACITOR: {
    name: 'Tụ điện gốm',
    subtitle: 'Passive',
    category: 'Passive', tags: ['Passive'],
    width: 200, height: 90,
    ports: [
      { id: 'L', name: 'Lead 1', x: 8, y: 30, side: 'left', type: 'gpio' },
      { id: 'R', name: 'Lead 2', x: 192, y: 30, side: 'right', type: 'gpio' }
    ],
    defaultConfig: { capacitance: 100, unit: 'nF', label: 'Capacitor' }
  },

  DIODE: {
    name: 'Diode 1N4007',
    subtitle: 'Passive',
    category: 'Passive', tags: ['Passive'],
    width: 200, height: 90,
    ports: [
      { id: 'A', name: 'Anode', x: 8, y: 30, side: 'left', type: 'gpio' },
      { id: 'K', name: 'Cathode', x: 192, y: 30, side: 'right', type: 'gpio' }
    ],
    defaultConfig: { label: 'Diode' }
  },

  TRANSISTOR: {
    name: 'Transistor NPN',
    subtitle: 'Passive',
    category: 'Passive', tags: ['Passive'],
    width: 210, height: 100,
    ports: [
      { id: 'B', name: 'Base', x: 8, y: 40, side: 'left', type: 'gpio' },
      { id: 'C', name: 'Collector', x: 202, y: 25, side: 'right', type: 'gpio' },
      { id: 'E', name: 'Emitter', x: 202, y: 55, side: 'right', type: 'gpio' }
    ],
    defaultConfig: { label: 'Transistor' }
  },

  BLUETOOTH_HC05: {
    name: 'Bluetooth HC-05',
    subtitle: 'Module',
    category: 'Comm', tags: ['BT', 'Serial'],
    width: 240, height: 120,
    ports: [
      { id: 'VCC', name: 'VCC', x: 232, y: 20, side: 'right', type: 'power' },
      { id: 'GND', name: 'GND', x: 232, y: 40, side: 'right', type: 'gnd' },
      { id: 'TX', name: 'TX', x: 232, y: 60, side: 'right', type: 'gpio' },
      { id: 'RX', name: 'RX', x: 232, y: 80, side: 'right', type: 'gpio' }
    ],
    defaultConfig: { baudRate: 9600, label: 'HC-05' }
  },

  RFID_RC522: {
    name: 'RFID RC522',
    subtitle: 'Module',
    category: 'Comm', tags: ['RFID'],
    width: 250, height: 140,
    ports: [
      { id: 'SDA', name: 'SDA', x: 242, y: 20, side: 'right', type: 'gpio' },
      { id: 'SCK', name: 'SCK', x: 242, y: 40, side: 'right', type: 'gpio' },
      { id: 'MOSI', name: 'MOSI', x: 242, y: 60, side: 'right', type: 'gpio' },
      { id: 'MISO', name: 'MISO', x: 242, y: 80, side: 'right', type: 'gpio' },
      { id: 'GND', name: 'GND', x: 242, y: 100, side: 'right', type: 'gnd' }
    ],
    defaultConfig: { label: 'RFID' }
  },

  BREADBOARD: {
    name: 'Breadboard 830 điểm',
    subtitle: 'Prototype',
    category: 'Others', tags: ['Breadboard'],
    width: 320, height: 180,
    ports: [
      { id: 'PW_T_PLUS', name: '+', x: 20, y: 12, side: 'top', type: 'power' },
      { id: 'PW_T_MINUS', name: '-', x: 50, y: 12, side: 'top', type: 'gnd' },
      { id: 'PW_B_PLUS', name: '+', x: 20, y: 168, side: 'bottom', type: 'power' },
      { id: 'PW_B_MINUS', name: '-', x: 50, y: 168, side: 'bottom', type: 'gnd' }
    ],
    defaultConfig: { label: 'Breadboard' }
  }
};
