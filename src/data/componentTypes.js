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
  { id: 'ICs', name: 'Vi mạch (IC)', icon: '🔌' },
  { id: 'Instruments', name: 'Thiết bị đo', icon: '📏' },
  { id: 'Comm', name: 'Truyền thông', icon: '📶' },
  { id: 'Others', name: 'Khác', icon: '🧩' },
];

// Sinh bộ chân cho IC DIP tổng quát (dùng cho các chip họ 74xx/CD/PCF không cần
// mô phỏng logic thật — chỉ phục vụ thực hành cắm/nối dây trên breadboard).
// Quy ước chuẩn JEDEC cho gói DIP: chân GND ở vị trí giữa, chân VCC ở chân cuối
// (vd DIP-14: GND=7, VCC=14 | DIP-16: GND=8, VCC=16) — các chân còn lại đánh số
// chung chung (không gán đúng chức năng từng chân theo datasheet thật).
function genericDipPorts(pinCount) {
  const half = pinCount / 2;
  const ports = [];
  for (let i = 1; i <= half; i++) {
    const isGnd = i === half;
    ports.push({ id: `P${i}`, name: isGnd ? `${i} GND` : `${i}`, x: 8, y: 24 + (i - 1) * 20, side: 'left', type: isGnd ? 'gnd' : 'gpio' });
  }
  for (let i = 0; i < half; i++) {
    const pinNum = pinCount - i;
    const isVcc = pinNum === pinCount;
    ports.push({ id: `P${pinNum}`, name: isVcc ? `${pinNum} VCC` : `${pinNum}`, x: 212, y: 24 + i * 20, side: 'right', type: isVcc ? 'power' : 'gpio' });
  }
  return ports;
}
function dipHeight(pinCount) {
  return 24 + (pinCount / 2 - 1) * 20 + 40;
}

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

  // ESP32-S3-DevKitC-1 v1.1 (44 chân) — pin layout lấy đúng theo tài liệu chính thức
  // Espressif (docs.espressif.com/projects/esp-dev-kits), khác ESP32 thường ở chỗ:
  // I2C mặc định là GPIO8(SDA)/GPIO9(SCL) thay vì GPIO21/22; có cổng USB gốc trên
  // GPIO19/20; GPIO0/3/45/46 là strapping pin cần cẩn thận; GPIO35-37 dành cho
  // Octal PSRAM/Flash nội bộ, không nên dùng ở các module WROOM-1/WROOM-2 bản Octal.
  ESP32_S3: {
    name: 'ESP32-S3-DevKitC-1 (44 chân)',
    subtitle: 'Board',
    category: 'Boards',
    tags: ['ESP32-S3', 'WiFi', 'BLE', 'USB', '44P'],
    width: 270, height: 430,
    ports: [
      { id: '3V3_1', name: '3V3', x: 8, y: 22, side: 'left', type: 'power', voltage: 3.3 },
      { id: '3V3_2', name: '3V3', x: 8, y: 40, side: 'left', type: 'power', voltage: 3.3 },
      { id: 'RST', name: 'RST (EN)', x: 8, y: 58, side: 'left', type: 'gpio' },
      { id: 'GPIO4', name: 'GPIO4', x: 8, y: 76, side: 'left', type: 'gpio', pin: 4 },
      { id: 'GPIO5', name: 'GPIO5', x: 8, y: 94, side: 'left', type: 'gpio', pin: 5 },
      { id: 'GPIO6', name: 'GPIO6', x: 8, y: 112, side: 'left', type: 'gpio', pin: 6 },
      { id: 'GPIO7', name: 'GPIO7', x: 8, y: 130, side: 'left', type: 'gpio', pin: 7 },
      { id: 'GPIO15', name: 'GPIO15', x: 8, y: 148, side: 'left', type: 'gpio', pin: 15 },
      { id: 'GPIO16', name: 'GPIO16', x: 8, y: 166, side: 'left', type: 'gpio', pin: 16 },
      { id: 'GPIO17', name: 'GPIO17', x: 8, y: 184, side: 'left', type: 'gpio', pin: 17 },
      { id: 'GPIO18', name: 'GPIO18', x: 8, y: 202, side: 'left', type: 'gpio', pin: 18 },
      { id: 'GPIO8', name: 'GPIO8 (SDA*)', x: 8, y: 220, side: 'left', type: 'gpio', pin: 8 },
      { id: 'GPIO3', name: 'GPIO3 ⚠', x: 8, y: 238, side: 'left', type: 'gpio', pin: 3 },
      { id: 'GPIO46', name: 'GPIO46 ⚠', x: 8, y: 256, side: 'left', type: 'gpio', pin: 46 },
      { id: 'GPIO9', name: 'GPIO9 (SCL*)', x: 8, y: 274, side: 'left', type: 'gpio', pin: 9 },
      { id: 'GPIO10', name: 'GPIO10', x: 8, y: 292, side: 'left', type: 'gpio', pin: 10 },
      { id: 'GPIO11', name: 'GPIO11', x: 8, y: 310, side: 'left', type: 'gpio', pin: 11 },
      { id: 'GPIO12', name: 'GPIO12', x: 8, y: 328, side: 'left', type: 'gpio', pin: 12 },
      { id: 'GPIO13', name: 'GPIO13', x: 8, y: 346, side: 'left', type: 'gpio', pin: 13 },
      { id: 'GPIO14', name: 'GPIO14', x: 8, y: 364, side: 'left', type: 'gpio', pin: 14 },
      { id: '5V', name: '5V', x: 8, y: 382, side: 'left', type: 'power', voltage: 5 },
      { id: 'GND1', name: 'GND', x: 8, y: 400, side: 'left', type: 'gnd' },

      { id: 'GND2', name: 'GND', x: 262, y: 22, side: 'right', type: 'gnd' },
      { id: 'TX0', name: 'TX0 (43)', x: 262, y: 40, side: 'right', type: 'gpio', pin: 43 },
      { id: 'RX0', name: 'RX0 (44)', x: 262, y: 58, side: 'right', type: 'gpio', pin: 44 },
      { id: 'GPIO1', name: 'GPIO1', x: 262, y: 76, side: 'right', type: 'gpio', pin: 1 },
      { id: 'GPIO2', name: 'GPIO2', x: 262, y: 94, side: 'right', type: 'gpio', pin: 2 },
      { id: 'GPIO42', name: 'GPIO42 (JTAG)', x: 262, y: 112, side: 'right', type: 'gpio', pin: 42 },
      { id: 'GPIO41', name: 'GPIO41 (JTAG)', x: 262, y: 130, side: 'right', type: 'gpio', pin: 41 },
      { id: 'GPIO40', name: 'GPIO40 (JTAG)', x: 262, y: 148, side: 'right', type: 'gpio', pin: 40 },
      { id: 'GPIO39', name: 'GPIO39 (JTAG)', x: 262, y: 166, side: 'right', type: 'gpio', pin: 39 },
      { id: 'GPIO38', name: 'GPIO38 (RGB LED)', x: 262, y: 184, side: 'right', type: 'gpio', pin: 38 },
      { id: 'GPIO37', name: 'GPIO37 🚫', x: 262, y: 202, side: 'right', type: 'gpio', pin: 37 },
      { id: 'GPIO36', name: 'GPIO36 🚫', x: 262, y: 220, side: 'right', type: 'gpio', pin: 36 },
      { id: 'GPIO35', name: 'GPIO35 🚫', x: 262, y: 238, side: 'right', type: 'gpio', pin: 35 },
      { id: 'GPIO0', name: 'GPIO0 ⚠ (BOOT)', x: 262, y: 256, side: 'right', type: 'gpio', pin: 0 },
      { id: 'GPIO45', name: 'GPIO45 ⚠', x: 262, y: 274, side: 'right', type: 'gpio', pin: 45 },
      { id: 'GPIO48', name: 'GPIO48', x: 262, y: 292, side: 'right', type: 'gpio', pin: 48 },
      { id: 'GPIO47', name: 'GPIO47', x: 262, y: 310, side: 'right', type: 'gpio', pin: 47 },
      { id: 'GPIO21', name: 'GPIO21', x: 262, y: 328, side: 'right', type: 'gpio', pin: 21 },
      { id: 'GPIO20', name: 'GPIO20 (USB D+)', x: 262, y: 346, side: 'right', type: 'gpio', pin: 20 },
      { id: 'GPIO19', name: 'GPIO19 (USB D-)', x: 262, y: 364, side: 'right', type: 'gpio', pin: 19 },
      { id: 'GND3', name: 'GND', x: 262, y: 382, side: 'right', type: 'gnd' },
      { id: 'GND4', name: 'GND', x: 262, y: 400, side: 'right', type: 'gnd' }
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
    width: 240, height: 140,
    ports: [
      { id: 'VCC', name: 'VCC', x: 232, y: 24, side: 'right', type: 'power' },
      { id: 'GND', name: 'GND', x: 232, y: 44, side: 'right', type: 'gnd' },
      { id: 'IN', name: 'IN Signal', x: 232, y: 64, side: 'right', type: 'gpio' },
      { id: 'OUT', name: 'OUT (Tải)', x: 232, y: 84, side: 'right', type: 'power' }
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

  // LCD1602A tran (16 chan song song HD44780 — dung khi KHONG co module I2C
  // gan them) — dung 4-bit mode chuan (chi can D4-D7, khong dung D0-D3), RW noi
  // GND vi chi ghi (khong doc), V0 noi GND de tuong phan co dinh o muc ro nhat.
  LCD1602: {
    name: 'LCD1602A – 16 chân song song (HD44780)',
    subtitle: 'Display',
    category: 'Displays', tags: ['Display', 'LCD', 'HD44780', 'Parallel'],
    width: 280, height: 160,
    ports: [
      { id: 'VSS', name: 'VSS', x: 8, y: 24, side: 'left', type: 'gnd' },
      { id: 'VDD', name: 'VDD', x: 8, y: 44, side: 'left', type: 'power' },
      { id: 'V0', name: 'V0', x: 8, y: 64, side: 'left', type: 'gnd' },
      { id: 'RS', name: 'RS', x: 8, y: 84, side: 'left', type: 'gpio' },
      { id: 'RW', name: 'RW', x: 8, y: 104, side: 'left', type: 'gnd' },
      { id: 'E', name: 'E', x: 8, y: 124, side: 'left', type: 'gpio' },

      { id: 'D4', name: 'D4', x: 272, y: 24, side: 'right', type: 'gpio' },
      { id: 'D5', name: 'D5', x: 272, y: 44, side: 'right', type: 'gpio' },
      { id: 'D6', name: 'D6', x: 272, y: 64, side: 'right', type: 'gpio' },
      { id: 'D7', name: 'D7', x: 272, y: 84, side: 'right', type: 'gpio' },
      { id: 'A', name: 'A (đèn nền +)', x: 272, y: 104, side: 'right', type: 'power' },
      { id: 'K', name: 'K (đèn nền -)', x: 272, y: 124, side: 'right', type: 'gnd' }
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
  },

  BREADBOARD_SMALL: {
    name: 'Breadboard Nhỏ (400 điểm)',
    subtitle: 'Prototype',
    category: 'Others', tags: ['Breadboard'],
    width: 260, height: 150,
    ports: [
      { id: 'PW_T_PLUS', name: '+', x: 16, y: 12, side: 'top', type: 'power' },
      { id: 'PW_T_MINUS', name: '-', x: 44, y: 12, side: 'top', type: 'gnd' },
      { id: 'PW_B_PLUS', name: '+', x: 16, y: 138, side: 'bottom', type: 'power' },
      { id: 'PW_B_MINUS', name: '-', x: 44, y: 138, side: 'bottom', type: 'gnd' }
    ],
    defaultConfig: { label: 'Breadboard Small' }
  },

  BREADBOARD_MINI: {
    name: 'Breadboard Mini (170 điểm)',
    subtitle: 'Prototype',
    category: 'Others', tags: ['Breadboard'],
    width: 200, height: 110,
    ports: [
      { id: 'PW_T_PLUS', name: '+', x: 14, y: 12, side: 'top', type: 'power' },
      { id: 'PW_B_MINUS', name: '-', x: 14, y: 98, side: 'bottom', type: 'gnd' }
    ],
    defaultConfig: { label: 'Breadboard Mini' }
  },

  // ═══════════════════════════════════════════════
  // THỤ ĐỘNG BỔ SUNG (General — Tinkercad parity)
  // ═══════════════════════════════════════════════
  CAP_ELECTROLYTIC: {
    name: 'Tụ hóa (Polarized Capacitor)',
    subtitle: 'Passive',
    category: 'Passive', tags: ['Passive', 'Capacitor'],
    width: 200, height: 90,
    ports: [
      { id: 'PLUS', name: '+', x: 8, y: 30, side: 'left', type: 'gpio' },
      { id: 'MINUS', name: '−', x: 192, y: 30, side: 'right', type: 'gnd' }
    ],
    defaultConfig: { capacitance: 100, unit: 'µF', label: 'Tụ hóa' }
  },

  ZENER_DIODE: {
    name: 'Diode Zener',
    subtitle: 'Passive',
    category: 'Passive', tags: ['Passive', 'Diode'],
    width: 200, height: 90,
    ports: [
      { id: 'A', name: 'Anode', x: 8, y: 30, side: 'left', type: 'gpio' },
      { id: 'K', name: 'Cathode', x: 192, y: 30, side: 'right', type: 'gpio' }
    ],
    defaultConfig: { voltage: 5.1, label: 'Zener' }
  },

  INDUCTOR: {
    name: 'Cuộn cảm (Inductor)',
    subtitle: 'Passive',
    category: 'Passive', tags: ['Passive', 'Inductor'],
    width: 200, height: 90,
    ports: [
      { id: 'L', name: 'Lead 1', x: 8, y: 30, side: 'left', type: 'gpio' },
      { id: 'R', name: 'Lead 2', x: 192, y: 30, side: 'right', type: 'gpio' }
    ],
    defaultConfig: { inductance: 100, unit: 'µH', label: 'Inductor' }
  },

  PNP_TRANSISTOR: {
    name: 'Transistor PNP',
    subtitle: 'Passive',
    category: 'Passive', tags: ['Passive', 'Transistor'],
    width: 210, height: 100,
    ports: [
      { id: 'B', name: 'Base', x: 8, y: 40, side: 'left', type: 'gpio' },
      { id: 'C', name: 'Collector', x: 202, y: 25, side: 'right', type: 'gpio' },
      { id: 'E', name: 'Emitter', x: 202, y: 55, side: 'right', type: 'gpio' }
    ],
    defaultConfig: { label: 'PNP' }
  },

  MOSFET_N: {
    name: 'MOSFET kênh N',
    subtitle: 'Passive',
    category: 'Passive', tags: ['Passive', 'MOSFET'],
    width: 210, height: 100,
    ports: [
      { id: 'G', name: 'Gate', x: 8, y: 40, side: 'left', type: 'gpio' },
      { id: 'D', name: 'Drain', x: 202, y: 25, side: 'right', type: 'gpio' },
      { id: 'S', name: 'Source', x: 202, y: 55, side: 'right', type: 'gnd' }
    ],
    defaultConfig: { label: 'nMOS' }
  },

  MOSFET_P: {
    name: 'MOSFET kênh P',
    subtitle: 'Passive',
    category: 'Passive', tags: ['Passive', 'MOSFET'],
    width: 210, height: 100,
    ports: [
      { id: 'G', name: 'Gate', x: 8, y: 40, side: 'left', type: 'gpio' },
      { id: 'D', name: 'Drain', x: 202, y: 25, side: 'right', type: 'gpio' },
      { id: 'S', name: 'Source', x: 202, y: 55, side: 'right', type: 'power' }
    ],
    defaultConfig: { label: 'pMOS' }
  },

  IC_TIP120: {
    name: 'TIP120 (Darlington)',
    subtitle: 'Transistor',
    category: 'Passive', tags: ['Transistor', 'Darlington'],
    width: 200, height: 120,
    ports: [
      { id: 'B', name: 'Base', x: 8, y: 40, side: 'left', type: 'gpio' },
      { id: 'C', name: 'Collector', x: 192, y: 25, side: 'right', type: 'gpio' },
      { id: 'E', name: 'Emitter', x: 192, y: 55, side: 'right', type: 'gnd' }
    ],
    defaultConfig: { label: 'TIP120' }
  },

  REGULATOR_5V: {
    name: 'IC Ổn áp 5V (LM7805)',
    subtitle: 'Regulator',
    category: 'ICs', tags: ['Regulator', 'Power'],
    width: 200, height: 110,
    ports: [
      { id: 'IN', name: 'IN', x: 8, y: 40, side: 'left', type: 'power' },
      { id: 'GND', name: 'GND', x: 100, y: 104, side: 'bottom', type: 'gnd' },
      { id: 'OUT', name: 'OUT', x: 192, y: 40, side: 'right', type: 'power', voltage: 5 }
    ],
    defaultConfig: { label: 'LM7805' }
  },

  REGULATOR_3V3: {
    name: 'IC Ổn áp 3.3V',
    subtitle: 'Regulator',
    category: 'ICs', tags: ['Regulator', 'Power'],
    width: 200, height: 110,
    ports: [
      { id: 'IN', name: 'IN', x: 8, y: 40, side: 'left', type: 'power' },
      { id: 'GND', name: 'GND', x: 100, y: 104, side: 'bottom', type: 'gnd' },
      { id: 'OUT', name: 'OUT', x: 192, y: 40, side: 'right', type: 'power', voltage: 3.3 }
    ],
    defaultConfig: { label: '3.3V Regulator' }
  },

  MOTOR_DRIVER_L293D: {
    name: 'L293D – Mạch cầu H (Motor Driver)',
    subtitle: 'IC',
    category: 'ICs', tags: ['Motor Driver', 'H-Bridge', 'DIP-16'],
    width: 240, height: 200,
    ports: [
      { id: 'EN1', name: '1 EN1', x: 8, y: 24, side: 'left', type: 'gpio' },
      { id: 'IN1', name: '2 IN1', x: 8, y: 44, side: 'left', type: 'gpio' },
      { id: 'OUT1', name: '3 OUT1', x: 8, y: 64, side: 'left', type: 'gpio' },
      { id: 'GND1', name: '4 GND', x: 8, y: 84, side: 'left', type: 'gnd' },
      { id: 'GND2', name: '5 GND', x: 8, y: 104, side: 'left', type: 'gnd' },
      { id: 'OUT2', name: '6 OUT2', x: 8, y: 124, side: 'left', type: 'gpio' },
      { id: 'IN2', name: '7 IN2', x: 8, y: 144, side: 'left', type: 'gpio' },
      { id: 'VCC2', name: '8 VCC2', x: 8, y: 164, side: 'left', type: 'power' },

      { id: 'VCC1', name: '16 VCC1', x: 232, y: 24, side: 'right', type: 'power' },
      { id: 'IN4', name: '15 IN4', x: 232, y: 44, side: 'right', type: 'gpio' },
      { id: 'OUT4', name: '14 OUT4', x: 232, y: 64, side: 'right', type: 'gpio' },
      { id: 'GND3', name: '13 GND', x: 232, y: 84, side: 'right', type: 'gnd' },
      { id: 'GND4', name: '12 GND', x: 232, y: 104, side: 'right', type: 'gnd' },
      { id: 'OUT3', name: '11 OUT3', x: 232, y: 124, side: 'right', type: 'gpio' },
      { id: 'IN3', name: '10 IN3', x: 232, y: 144, side: 'right', type: 'gpio' },
      { id: 'EN2', name: '9 EN2', x: 232, y: 164, side: 'right', type: 'gpio' }
    ],
    defaultConfig: { label: 'L293D' }
  },

  RELAY_DPDT: {
    name: 'Relay DPDT',
    subtitle: 'Module',
    category: 'Actuators', tags: ['Digital', 'Relay'],
    width: 250, height: 160,
    ports: [
      { id: 'COM1', name: 'COM1', x: 8, y: 24, side: 'left', type: 'gpio' },
      { id: 'NO1', name: 'NO1', x: 8, y: 44, side: 'left', type: 'gpio' },
      { id: 'COM2', name: 'COM2', x: 8, y: 64, side: 'left', type: 'gpio' },
      { id: 'NO2', name: 'NO2', x: 8, y: 84, side: 'left', type: 'gpio' },
      { id: 'VCC', name: 'VCC', x: 242, y: 24, side: 'right', type: 'power' },
      { id: 'GND', name: 'GND', x: 242, y: 44, side: 'right', type: 'gnd' },
      { id: 'IN', name: 'IN', x: 242, y: 64, side: 'right', type: 'gpio' }
    ],
    defaultConfig: { state: false, label: 'Relay DPDT' }
  },

  // ═══════════════════════════════════════════════
  // INPUT BỔ SUNG (Tinkercad parity)
  // ═══════════════════════════════════════════════
  PUSHBUTTON: {
    name: 'Nút nhấn (Pushbutton)',
    subtitle: 'Passive',
    category: 'Sensors', tags: ['Digital', 'Button'],
    width: 200, height: 90,
    ports: [
      { id: 'A', name: 'Chân A', x: 8, y: 30, side: 'left', type: 'gpio' },
      { id: 'B', name: 'Chân B', x: 192, y: 30, side: 'right', type: 'gpio' }
    ],
    defaultConfig: { pressed: false, label: 'Pushbutton' }
  },

  SLIDE_SWITCH: {
    name: 'Công tắc gạt (Slideswitch)',
    subtitle: 'Module',
    category: 'Sensors', tags: ['Digital', 'Switch'],
    width: 220, height: 110,
    ports: [
      { id: 'COM', name: 'COM', x: 8, y: 44, side: 'left', type: 'gpio' },
      { id: 'A', name: 'A', x: 212, y: 24, side: 'right', type: 'gpio' },
      { id: 'B', name: 'B', x: 212, y: 64, side: 'right', type: 'gpio' }
    ],
    defaultConfig: { position: 'A', label: 'Slideswitch' }
  },

  PHOTODIODE: {
    name: 'Photodiode',
    subtitle: 'Passive',
    category: 'Sensors', tags: ['Analog', 'Light'],
    width: 200, height: 90,
    ports: [
      { id: 'A', name: 'Anode', x: 8, y: 30, side: 'left', type: 'gpio' },
      { id: 'K', name: 'Cathode', x: 192, y: 30, side: 'right', type: 'gpio' }
    ],
    defaultConfig: { label: 'Photodiode' }
  },

  AMBIENT_LIGHT_SENSOR: {
    name: 'Ambient Light Sensor',
    subtitle: 'Module',
    category: 'Sensors', tags: ['Analog', 'Light'],
    width: 240, height: 120,
    ports: [
      { id: 'VCC', name: 'VCC', x: 232, y: 24, side: 'right', type: 'power' },
      { id: 'GND', name: 'GND', x: 232, y: 44, side: 'right', type: 'gnd' },
      { id: 'OUT', name: 'AO', x: 232, y: 64, side: 'right', type: 'gpio' }
    ],
    defaultConfig: { value: 500, min: 0, max: 1023, label: 'Ánh sáng môi trường' }
  },

  FLEX_SENSOR: {
    name: 'Flex Sensor',
    subtitle: 'Passive',
    category: 'Sensors', tags: ['Analog', 'Flex'],
    width: 220, height: 90,
    ports: [
      { id: 'L', name: 'Lead 1', x: 8, y: 30, side: 'left', type: 'gpio' },
      { id: 'R', name: 'Lead 2', x: 212, y: 30, side: 'right', type: 'gpio' }
    ],
    defaultConfig: { bend: 0, min: 0, max: 100, label: 'Flex Sensor' }
  },

  FORCE_SENSOR: {
    name: 'Force Sensor (FSR)',
    subtitle: 'Passive',
    category: 'Sensors', tags: ['Analog', 'Force'],
    width: 200, height: 90,
    ports: [
      { id: 'L', name: 'Lead 1', x: 8, y: 30, side: 'left', type: 'gpio' },
      { id: 'R', name: 'Lead 2', x: 192, y: 30, side: 'right', type: 'gpio' }
    ],
    defaultConfig: { force: 0, min: 0, max: 100, label: 'Force Sensor' }
  },

  TILT_SENSOR: {
    name: 'Tilt Sensor (Công tắc bi)',
    subtitle: 'Passive',
    category: 'Sensors', tags: ['Digital', 'Tilt'],
    width: 200, height: 90,
    ports: [
      { id: 'L', name: 'Lead 1', x: 8, y: 30, side: 'left', type: 'gpio' },
      { id: 'R', name: 'Lead 2', x: 192, y: 30, side: 'right', type: 'gpio' }
    ],
    defaultConfig: { tilted: false, label: 'Tilt Sensor' }
  },

  KEYPAD_4X4: {
    name: 'Keypad 4x4',
    subtitle: 'Module',
    category: 'Sensors', tags: ['Digital', 'Keypad'],
    width: 260, height: 190,
    ports: [
      { id: 'R1', name: 'ROW1', x: 8, y: 24, side: 'left', type: 'gpio' },
      { id: 'R2', name: 'ROW2', x: 8, y: 44, side: 'left', type: 'gpio' },
      { id: 'R3', name: 'ROW3', x: 8, y: 64, side: 'left', type: 'gpio' },
      { id: 'R4', name: 'ROW4', x: 8, y: 84, side: 'left', type: 'gpio' },
      { id: 'C1', name: 'COL1', x: 252, y: 24, side: 'right', type: 'gpio' },
      { id: 'C2', name: 'COL2', x: 252, y: 44, side: 'right', type: 'gpio' },
      { id: 'C3', name: 'COL3', x: 252, y: 64, side: 'right', type: 'gpio' },
      { id: 'C4', name: 'COL4', x: 252, y: 84, side: 'right', type: 'gpio' }
    ],
    defaultConfig: { lastKey: '', label: 'Keypad 4x4' }
  },

  DIP_SWITCH_DPST: {
    name: 'DIP Switch DPST (2 kênh)',
    subtitle: 'Module',
    category: 'Sensors', tags: ['Digital', 'DIP Switch'],
    width: 220, height: 110,
    ports: [
      { id: 'IN1', name: 'IN1', x: 8, y: 24, side: 'left', type: 'gpio' },
      { id: 'IN2', name: 'IN2', x: 8, y: 64, side: 'left', type: 'gpio' },
      { id: 'OUT1', name: 'OUT1', x: 212, y: 24, side: 'right', type: 'gpio' },
      { id: 'OUT2', name: 'OUT2', x: 212, y: 64, side: 'right', type: 'gpio' }
    ],
    defaultConfig: { states: [false, false], label: 'DIP DPST' }
  },

  DIP_SWITCH_X4: {
    name: 'DIP Switch SPST x4',
    subtitle: 'Module',
    category: 'Sensors', tags: ['Digital', 'DIP Switch'],
    width: 220, height: 150,
    ports: [
      { id: 'IN1', name: 'IN1', x: 8, y: 24, side: 'left', type: 'gpio' },
      { id: 'IN2', name: 'IN2', x: 8, y: 44, side: 'left', type: 'gpio' },
      { id: 'IN3', name: 'IN3', x: 8, y: 64, side: 'left', type: 'gpio' },
      { id: 'IN4', name: 'IN4', x: 8, y: 84, side: 'left', type: 'gpio' },
      { id: 'OUT1', name: 'OUT1', x: 212, y: 24, side: 'right', type: 'gpio' },
      { id: 'OUT2', name: 'OUT2', x: 212, y: 44, side: 'right', type: 'gpio' },
      { id: 'OUT3', name: 'OUT3', x: 212, y: 64, side: 'right', type: 'gpio' },
      { id: 'OUT4', name: 'OUT4', x: 212, y: 84, side: 'right', type: 'gpio' }
    ],
    defaultConfig: { states: [false, false, false, false], label: 'DIP x4' }
  },

  DIP_SWITCH_X6: {
    name: 'DIP Switch SPST x6',
    subtitle: 'Module',
    category: 'Sensors', tags: ['Digital', 'DIP Switch'],
    width: 220, height: 190,
    ports: [
      { id: 'IN1', name: 'IN1', x: 8, y: 24, side: 'left', type: 'gpio' },
      { id: 'IN2', name: 'IN2', x: 8, y: 44, side: 'left', type: 'gpio' },
      { id: 'IN3', name: 'IN3', x: 8, y: 64, side: 'left', type: 'gpio' },
      { id: 'IN4', name: 'IN4', x: 8, y: 84, side: 'left', type: 'gpio' },
      { id: 'IN5', name: 'IN5', x: 8, y: 104, side: 'left', type: 'gpio' },
      { id: 'IN6', name: 'IN6', x: 8, y: 124, side: 'left', type: 'gpio' },
      { id: 'OUT1', name: 'OUT1', x: 212, y: 24, side: 'right', type: 'gpio' },
      { id: 'OUT2', name: 'OUT2', x: 212, y: 44, side: 'right', type: 'gpio' },
      { id: 'OUT3', name: 'OUT3', x: 212, y: 64, side: 'right', type: 'gpio' },
      { id: 'OUT4', name: 'OUT4', x: 212, y: 84, side: 'right', type: 'gpio' },
      { id: 'OUT5', name: 'OUT5', x: 212, y: 104, side: 'right', type: 'gpio' },
      { id: 'OUT6', name: 'OUT6', x: 212, y: 124, side: 'right', type: 'gpio' }
    ],
    defaultConfig: { states: [false, false, false, false, false, false], label: 'DIP x6' }
  },

  // ═══════════════════════════════════════════════
  // OUTPUT BỔ SUNG (Tinkercad parity)
  // ═══════════════════════════════════════════════
  LIGHT_BULB: {
    name: 'Bóng đèn sợi đốt (Light bulb)',
    subtitle: 'Actuator',
    category: 'Actuators', tags: ['Digital', 'Bulb'],
    width: 220, height: 110,
    ports: [
      { id: 'A', name: 'Chân (+)', x: 212, y: 30, side: 'right', type: 'gpio' },
      { id: 'K', name: 'Chân (-)', x: 212, y: 56, side: 'right', type: 'gnd' }
    ],
    defaultConfig: { label: 'Light bulb' }
  },

  NEOPIXEL: {
    name: 'NeoPixel (1 LED)',
    subtitle: 'Actuator',
    category: 'Actuators', tags: ['Digital', 'NeoPixel', 'WS2812'],
    width: 230, height: 120,
    ports: [
      { id: 'VCC', name: 'VCC (5V)', x: 222, y: 24, side: 'right', type: 'power' },
      { id: 'DIN', name: 'DIN', x: 222, y: 44, side: 'right', type: 'gpio' },
      { id: 'GND', name: 'GND', x: 222, y: 64, side: 'right', type: 'gnd' }
    ],
    defaultConfig: { color: '#FFFFFF', brightness: 255, label: 'NeoPixel' }
  },

  NEOPIXEL_RING: {
    name: 'NeoPixel Ring',
    subtitle: 'Actuator',
    category: 'Actuators', tags: ['Digital', 'NeoPixel', 'WS2812'],
    width: 230, height: 130,
    ports: [
      { id: 'VCC', name: 'VCC (5V)', x: 222, y: 24, side: 'right', type: 'power' },
      { id: 'DIN', name: 'DIN', x: 222, y: 44, side: 'right', type: 'gpio' },
      { id: 'DOUT', name: 'DOUT', x: 222, y: 64, side: 'right', type: 'gpio' },
      { id: 'GND', name: 'GND', x: 222, y: 84, side: 'right', type: 'gnd' }
    ],
    // ledCount điều chỉnh được trong config — gộp chung 12/16/24 đèn của Tinkercad
    // thành 1 loại linh kiện (chân cắm giống hệt nhau, chỉ khác số LED hiển thị)
    defaultConfig: { ledCount: 12, color: '#FFFFFF', label: 'NeoPixel Ring' }
  },

  NEOPIXEL_STRIP: {
    name: 'NeoPixel Strip',
    subtitle: 'Actuator',
    category: 'Actuators', tags: ['Digital', 'NeoPixel', 'WS2812'],
    width: 250, height: 130,
    ports: [
      { id: 'VCC', name: 'VCC (5V)', x: 242, y: 24, side: 'right', type: 'power' },
      { id: 'DIN', name: 'DIN', x: 242, y: 44, side: 'right', type: 'gpio' },
      { id: 'DOUT', name: 'DOUT', x: 242, y: 64, side: 'right', type: 'gpio' },
      { id: 'GND', name: 'GND', x: 242, y: 84, side: 'right', type: 'gnd' }
    ],
    // Gộp chung các độ dài 4/6/8/10/12/16/20 LED của Tinkercad thành 1 loại,
    // số LED chỉnh trong config thay vì tạo 7 linh kiện gần như giống hệt nhau
    defaultConfig: { ledCount: 8, color: '#FFFFFF', label: 'NeoPixel Strip' }
  },

  VIBRATION_MOTOR: {
    name: 'Vibration Motor',
    subtitle: 'Actuator',
    category: 'Actuators', tags: ['Digital', 'Motor', 'Vibration'],
    width: 210, height: 100,
    ports: [
      { id: 'POS', name: 'Positive (+)', x: 202, y: 30, side: 'right', type: 'gpio' },
      { id: 'NEG', name: 'GND (-)', x: 202, y: 56, side: 'right', type: 'gnd' }
    ],
    defaultConfig: { label: 'Vibration Motor' }
  },

  DC_MOTOR_ENCODER: {
    name: 'DC Motor with Encoder',
    subtitle: 'Actuator',
    category: 'Actuators', tags: ['Motor', 'Encoder'],
    width: 260, height: 160,
    ports: [
      { id: 'M_POS', name: 'M (+)', x: 8, y: 24, side: 'left', type: 'gpio' },
      { id: 'M_NEG', name: 'M (-)', x: 8, y: 44, side: 'left', type: 'gnd' },
      { id: 'ENC_VCC', name: 'ENC VCC', x: 252, y: 24, side: 'right', type: 'power' },
      { id: 'ENC_GND', name: 'ENC GND', x: 252, y: 44, side: 'right', type: 'gnd' },
      { id: 'ENC_A', name: 'ENC A', x: 252, y: 64, side: 'right', type: 'gpio' },
      { id: 'ENC_B', name: 'ENC B', x: 252, y: 84, side: 'right', type: 'gpio' }
    ],
    defaultConfig: { speed: 0, label: 'DC Motor + Encoder' }
  },

  IR_REMOTE: {
    name: 'IR Remote (Điều khiển từ xa)',
    subtitle: 'Virtual Control',
    category: 'Actuators', tags: ['IR', 'Remote'],
    width: 180, height: 260,
    ports: [],
    defaultConfig: { lastCode: '0xFF00FF', label: 'IR Remote' }
  },

  // ═══════════════════════════════════════════════
  // NGUỒN ĐIỆN BỔ SUNG
  // ═══════════════════════════════════════════════
  BATTERY_1V5: {
    name: 'Pin AA 1.5V',
    subtitle: 'Nguồn điện',
    category: 'Power', tags: ['Power', 'Battery'],
    width: 200, height: 110,
    ports: [
      { id: 'VCC', name: '+', x: 192, y: 34, side: 'right', type: 'power', voltage: 1.5 },
      { id: 'GND', name: '−', x: 192, y: 74, side: 'right', type: 'gnd' }
    ],
    defaultConfig: { label: 'Pin 1.5V' }
  },

  COIN_CELL_3V: {
    name: 'Pin cúc áo 3V (Coin Cell)',
    subtitle: 'Nguồn điện',
    category: 'Power', tags: ['Power', 'Battery'],
    width: 180, height: 100,
    ports: [
      { id: 'VCC', name: '+', x: 172, y: 30, side: 'right', type: 'power', voltage: 3 },
      { id: 'GND', name: '−', x: 172, y: 66, side: 'right', type: 'gnd' }
    ],
    defaultConfig: { label: 'Coin Cell 3V' }
  },

  SOLAR_CELL: {
    name: 'Pin năng lượng mặt trời (Solar Cell)',
    subtitle: 'Nguồn điện',
    category: 'Power', tags: ['Power', 'Solar'],
    width: 220, height: 140,
    ports: [
      { id: 'VCC', name: '+', x: 212, y: 40, side: 'right', type: 'power', voltage: 5 },
      { id: 'GND', name: '−', x: 212, y: 90, side: 'right', type: 'gnd' }
    ],
    defaultConfig: { light: 100, label: 'Solar Cell' }
  },

  // ═══════════════════════════════════════════════
  // VI ĐIỀU KHIỂN BỔ SUNG
  // ═══════════════════════════════════════════════
  MICROBIT: {
    name: 'BBC micro:bit',
    subtitle: 'Board',
    category: 'Boards', tags: ['micro:bit', 'ARM'],
    width: 240, height: 260,
    ports: [
      { id: '3V', name: '3V', x: 8, y: 24, side: 'left', type: 'power', voltage: 3.3 },
      { id: 'P0', name: 'P0', x: 8, y: 44, side: 'left', type: 'analog' },
      { id: 'P1', name: 'P1', x: 8, y: 64, side: 'left', type: 'analog' },
      { id: 'P2', name: 'P2', x: 8, y: 84, side: 'left', type: 'analog' },
      { id: 'GND1', name: 'GND', x: 8, y: 104, side: 'left', type: 'gnd' },

      { id: 'P8', name: 'P8', x: 232, y: 24, side: 'right', type: 'gpio' },
      { id: 'P12', name: 'P12', x: 232, y: 44, side: 'right', type: 'gpio' },
      { id: 'P13', name: 'P13', x: 232, y: 64, side: 'right', type: 'gpio' },
      { id: 'P14', name: 'P14', x: 232, y: 84, side: 'right', type: 'gpio' },
      { id: 'P15', name: 'P15', x: 232, y: 104, side: 'right', type: 'gpio' },
      { id: 'P16', name: 'P16', x: 232, y: 124, side: 'right', type: 'gpio' }
    ],
    defaultConfig: { label: 'micro:bit' }
  },

  ATTINY85: {
    name: 'ATtiny85',
    subtitle: 'IC / MCU',
    category: 'Boards', tags: ['ATtiny', 'AVR', 'DIP-8'],
    width: 200, height: 140,
    ports: [
      { id: 'P5', name: 'PB5/RST', x: 8, y: 24, side: 'left', type: 'gpio' },
      { id: 'P3', name: 'PB3', x: 8, y: 44, side: 'left', type: 'gpio' },
      { id: 'P4', name: 'PB4', x: 8, y: 64, side: 'left', type: 'gpio' },
      { id: 'GND', name: 'GND', x: 8, y: 84, side: 'left', type: 'gnd' },

      { id: 'VCC', name: 'VCC', x: 192, y: 24, side: 'right', type: 'power' },
      { id: 'P2', name: 'PB2', x: 192, y: 44, side: 'right', type: 'gpio' },
      { id: 'P1', name: 'PB1', x: 192, y: 64, side: 'right', type: 'gpio' },
      { id: 'P0', name: 'PB0', x: 192, y: 84, side: 'right', type: 'gpio' }
    ],
    defaultConfig: { label: 'ATtiny85' }
  },

  // ═══════════════════════════════════════════════
  // THIẾT BỊ ĐO (Instruments)
  // ═══════════════════════════════════════════════
  MULTIMETER: {
    name: 'Đồng hồ vạn năng (Multimeter)',
    subtitle: 'Instrument',
    category: 'Instruments', tags: ['Measurement'],
    width: 220, height: 170,
    ports: [
      { id: 'PROBE_RED', name: 'VΩmA (+)', x: 212, y: 30, side: 'right', type: 'gpio' },
      { id: 'PROBE_BLACK', name: 'COM (-)', x: 212, y: 56, side: 'right', type: 'gnd' }
    ],
    defaultConfig: { mode: 'DCV', reading: 0, label: 'Multimeter' }
  },

  POWER_SUPPLY: {
    name: 'Bộ nguồn (Power Supply)',
    subtitle: 'Instrument',
    category: 'Instruments', tags: ['Measurement', 'Power'],
    width: 240, height: 170,
    ports: [
      { id: 'OUT_PLUS', name: 'OUT (+)', x: 232, y: 30, side: 'right', type: 'power', voltage: 5 },
      { id: 'OUT_MINUS', name: 'OUT (-)', x: 232, y: 56, side: 'right', type: 'gnd' }
    ],
    defaultConfig: { voltage: 5, current: 1, label: 'Power Supply' }
  },

  FUNCTION_GENERATOR: {
    name: 'Máy phát xung (Function Generator)',
    subtitle: 'Instrument',
    category: 'Instruments', tags: ['Measurement', 'Signal'],
    width: 240, height: 170,
    ports: [
      { id: 'OUT', name: 'OUT', x: 232, y: 30, side: 'right', type: 'gpio' },
      { id: 'GND', name: 'GND', x: 232, y: 56, side: 'right', type: 'gnd' }
    ],
    defaultConfig: { waveform: 'sine', frequency: 1000, label: 'Function Generator' }
  },

  OSCILLOSCOPE: {
    name: 'Máy hiện sóng (Oscilloscope)',
    subtitle: 'Instrument',
    category: 'Instruments', tags: ['Measurement', 'Signal'],
    width: 260, height: 190,
    ports: [
      { id: 'CH1', name: 'CH1', x: 8, y: 30, side: 'left', type: 'gpio' },
      { id: 'CH2', name: 'CH2', x: 8, y: 56, side: 'left', type: 'gpio' },
      { id: 'GND', name: 'GND', x: 8, y: 82, side: 'left', type: 'gnd' }
    ],
    defaultConfig: { label: 'Oscilloscope' }
  },

  // ═══════════════════════════════════════════════
  // ĐẦU NỐI (Connectors)
  // ═══════════════════════════════════════════════
  PIN_HEADER_8: {
    name: '8 Pin Header',
    subtitle: 'Connector',
    category: 'Others', tags: ['Connector', 'Header'],
    width: 160, height: 200,
    ports: [
      { id: 'P1', name: '1', x: 152, y: 20, side: 'right', type: 'gpio' },
      { id: 'P2', name: '2', x: 152, y: 40, side: 'right', type: 'gpio' },
      { id: 'P3', name: '3', x: 152, y: 60, side: 'right', type: 'gpio' },
      { id: 'P4', name: '4', x: 152, y: 80, side: 'right', type: 'gpio' },
      { id: 'P5', name: '5', x: 152, y: 100, side: 'right', type: 'gpio' },
      { id: 'P6', name: '6', x: 152, y: 120, side: 'right', type: 'gpio' },
      { id: 'P7', name: '7', x: 152, y: 140, side: 'right', type: 'gpio' },
      { id: 'P8', name: '8', x: 152, y: 160, side: 'right', type: 'gpio' }
    ],
    defaultConfig: { label: '8 Pin Header' }
  },

  USB_CONNECTOR_A: {
    name: 'USB Standard A',
    subtitle: 'Connector',
    category: 'Others', tags: ['Connector', 'USB'],
    width: 200, height: 120,
    ports: [
      { id: 'VCC', name: 'VCC', x: 192, y: 24, side: 'right', type: 'power', voltage: 5 },
      { id: 'DM', name: 'D-', x: 192, y: 44, side: 'right', type: 'gpio' },
      { id: 'DP', name: 'D+', x: 192, y: 64, side: 'right', type: 'gpio' },
      { id: 'GND', name: 'GND', x: 192, y: 84, side: 'right', type: 'gnd' }
    ],
    defaultConfig: { label: 'USB-A' }
  },

  // ═══════════════════════════════════════════════
  // IC ANALOG (pinout thật, đáng tin cậy)
  // ═══════════════════════════════════════════════
  IC_555: {
    name: 'IC 555 Timer',
    subtitle: 'IC',
    category: 'ICs', tags: ['Timer', 'DIP-8'],
    width: 200, height: 110,
    ports: [
      { id: 'P1', name: '1 GND', x: 8, y: 24, side: 'left', type: 'gnd' },
      { id: 'P2', name: '2 TRIG', x: 8, y: 44, side: 'left', type: 'gpio' },
      { id: 'P3', name: '3 OUT', x: 8, y: 64, side: 'left', type: 'gpio' },
      { id: 'P4', name: '4 RESET', x: 8, y: 84, side: 'left', type: 'gpio' },

      { id: 'P8', name: '8 VCC', x: 192, y: 24, side: 'right', type: 'power' },
      { id: 'P7', name: '7 DISCH', x: 192, y: 44, side: 'right', type: 'gpio' },
      { id: 'P6', name: '6 THRES', x: 192, y: 64, side: 'right', type: 'gpio' },
      { id: 'P5', name: '5 CTRL', x: 192, y: 84, side: 'right', type: 'gpio' }
    ],
    defaultConfig: { label: '555 Timer' }
  },

  IC_741: {
    name: 'IC opAmp 741',
    subtitle: 'IC',
    category: 'ICs', tags: ['OpAmp', 'DIP-8'],
    width: 200, height: 110,
    ports: [
      { id: 'P1', name: '1 OFS1', x: 8, y: 24, side: 'left', type: 'gpio' },
      { id: 'P2', name: '2 IN-', x: 8, y: 44, side: 'left', type: 'gpio' },
      { id: 'P3', name: '3 IN+', x: 8, y: 64, side: 'left', type: 'gpio' },
      { id: 'P4', name: '4 V-', x: 8, y: 84, side: 'left', type: 'power' },

      { id: 'P8', name: '8 NC', x: 192, y: 24, side: 'right', type: 'gpio' },
      { id: 'P7', name: '7 V+', x: 192, y: 44, side: 'right', type: 'power' },
      { id: 'P6', name: '6 OUT', x: 192, y: 64, side: 'right', type: 'gpio' },
      { id: 'P5', name: '5 OFS2', x: 192, y: 84, side: 'right', type: 'gpio' }
    ],
    defaultConfig: { label: 'opAmp 741' }
  },

  IC_4N35: {
    name: '4N35 Optocoupler',
    subtitle: 'IC',
    category: 'ICs', tags: ['Optocoupler', 'DIP-6'],
    width: 200, height: 100,
    ports: [
      { id: 'P1', name: '1 Anode', x: 8, y: 24, side: 'left', type: 'gpio' },
      { id: 'P2', name: '2 Cathode', x: 8, y: 44, side: 'left', type: 'gpio' },
      { id: 'P3', name: '3 NC', x: 8, y: 64, side: 'left', type: 'gpio' },

      { id: 'P4', name: '4 Emitter', x: 192, y: 24, side: 'right', type: 'gpio' },
      { id: 'P5', name: '5 Collector', x: 192, y: 44, side: 'right', type: 'gpio' },
      { id: 'P6', name: '6 Base', x: 192, y: 64, side: 'right', type: 'gpio' }
    ],
    defaultConfig: { label: '4N35' }
  },

  // ═══════════════════════════════════════════════
  // IC SỐ HỌ 74xx / CD / PCF — pin GND/VCC theo đúng chuẩn DIP,
  // các chân còn lại đánh số chung chung (xem ghi chú genericDipPorts phía trên)
  // ═══════════════════════════════════════════════
  IC_556: { name: 'IC 556 Dual Timer', subtitle: 'IC', category: 'ICs', tags: ['Timer', 'DIP-14'], width: 220, height: dipHeight(14), ports: genericDipPorts(14), defaultConfig: { label: '556 Dual Timer' } },
  IC_LM339: { name: 'LM339 Quad Comparator', subtitle: 'IC', category: 'ICs', tags: ['Comparator', 'DIP-14'], width: 220, height: dipHeight(14), ports: genericDipPorts(14), defaultConfig: { label: 'LM339' } },
  IC_LM393: { name: 'LM393 Dual Comparator', subtitle: 'IC', category: 'ICs', tags: ['Comparator', 'DIP-8'], width: 220, height: dipHeight(8), ports: genericDipPorts(8), defaultConfig: { label: 'LM393' } },
  IC_74HC00: { name: '74HC00 – Quad NAND gate', subtitle: 'IC', category: 'ICs', tags: ['Logic', 'NAND', 'DIP-14'], width: 220, height: dipHeight(14), ports: genericDipPorts(14), defaultConfig: { label: '74HC00' } },
  IC_74HC02: { name: '74HC02 – Quad NOR gate', subtitle: 'IC', category: 'ICs', tags: ['Logic', 'NOR', 'DIP-14'], width: 220, height: dipHeight(14), ports: genericDipPorts(14), defaultConfig: { label: '74HC02' } },
  IC_74HC08: { name: '74HC08 – Quad AND gate', subtitle: 'IC', category: 'ICs', tags: ['Logic', 'AND', 'DIP-14'], width: 220, height: dipHeight(14), ports: genericDipPorts(14), defaultConfig: { label: '74HC08' } },
  IC_74HC32: { name: '74HC32 – Quad OR gate', subtitle: 'IC', category: 'ICs', tags: ['Logic', 'OR', 'DIP-14'], width: 220, height: dipHeight(14), ports: genericDipPorts(14), defaultConfig: { label: '74HC32' } },
  IC_74HC86: { name: '74HC86 – Quad XOR gate', subtitle: 'IC', category: 'ICs', tags: ['Logic', 'XOR', 'DIP-14'], width: 220, height: dipHeight(14), ports: genericDipPorts(14), defaultConfig: { label: '74HC86' } },
  IC_74HC04: { name: '74HC04 – Hex Inverter', subtitle: 'IC', category: 'ICs', tags: ['Logic', 'Inverter', 'DIP-14'], width: 220, height: dipHeight(14), ports: genericDipPorts(14), defaultConfig: { label: '74HC04' } },
  IC_74HC14: { name: '74HC14 – Inverting Schmitt Trigger', subtitle: 'IC', category: 'ICs', tags: ['Logic', 'Schmitt', 'DIP-14'], width: 220, height: dipHeight(14), ports: genericDipPorts(14), defaultConfig: { label: '74HC14' } },
  IC_74HC132: { name: '74HC132 – Quad NAND Schmitt Trigger', subtitle: 'IC', category: 'ICs', tags: ['Logic', 'Schmitt', 'NAND', 'DIP-14'], width: 220, height: dipHeight(14), ports: genericDipPorts(14), defaultConfig: { label: '74HC132' } },
  IC_74HC10: { name: '74HC10 – Triple 3-Input NAND gate', subtitle: 'IC', category: 'ICs', tags: ['Logic', 'NAND', 'DIP-14'], width: 220, height: dipHeight(14), ports: genericDipPorts(14), defaultConfig: { label: '74HC10' } },
  IC_74HC11: { name: '74HC11 – Triple 3-Input AND gate', subtitle: 'IC', category: 'ICs', tags: ['Logic', 'AND', 'DIP-14'], width: 220, height: dipHeight(14), ports: genericDipPorts(14), defaultConfig: { label: '74HC11' } },
  IC_74HC27: { name: '74HC27 – Triple 3-Input NOR gate', subtitle: 'IC', category: 'ICs', tags: ['Logic', 'NOR', 'DIP-14'], width: 220, height: dipHeight(14), ports: genericDipPorts(14), defaultConfig: { label: '74HC27' } },
  IC_74HC20: { name: '74HC20 – Dual 4-Input NAND gate', subtitle: 'IC', category: 'ICs', tags: ['Logic', 'NAND', 'DIP-14'], width: 220, height: dipHeight(14), ports: genericDipPorts(14), defaultConfig: { label: '74HC20' } },
  IC_74HC21: { name: '74HC21 – Dual 4-Input AND gate', subtitle: 'IC', category: 'ICs', tags: ['Logic', 'AND', 'DIP-14'], width: 220, height: dipHeight(14), ports: genericDipPorts(14), defaultConfig: { label: '74HC21' } },
  IC_74HC73: { name: '74HC73 – Dual J-K Flip Flop', subtitle: 'IC', category: 'ICs', tags: ['Logic', 'Flip-Flop', 'DIP-14'], width: 220, height: dipHeight(14), ports: genericDipPorts(14), defaultConfig: { label: '74HC73' } },
  IC_74HC74: { name: '74HC74 – Dual D Flip Flop', subtitle: 'IC', category: 'ICs', tags: ['Logic', 'Flip-Flop', 'DIP-14'], width: 220, height: dipHeight(14), ports: genericDipPorts(14), defaultConfig: { label: '74HC74' } },
  IC_74HC93: { name: '74HC93 – 4-Bit Binary Counter', subtitle: 'IC', category: 'ICs', tags: ['Logic', 'Counter', 'DIP-14'], width: 220, height: dipHeight(14), ports: genericDipPorts(14), defaultConfig: { label: '74HC93' } },
  IC_74HC75: { name: '74HC75 – 4-Bit Latch', subtitle: 'IC', category: 'ICs', tags: ['Logic', 'Latch', 'DIP-16'], width: 220, height: dipHeight(16), ports: genericDipPorts(16), defaultConfig: { label: '74HC75' } },
  IC_74HC283: { name: '74HC283 – 4-Bit Adder', subtitle: 'IC', category: 'ICs', tags: ['Logic', 'Adder', 'DIP-16'], width: 220, height: dipHeight(16), ports: genericDipPorts(16), defaultConfig: { label: '74HC283' } },
  IC_74HC595: { name: '74HC595 – 8-Bit Shift Register', subtitle: 'IC', category: 'ICs', tags: ['Logic', 'Shift Register', 'DIP-16'], width: 220, height: dipHeight(16), ports: genericDipPorts(16), defaultConfig: { label: '74HC595' } },
  IC_74HC4017: { name: '74HC4017 – Johnson Decade Counter', subtitle: 'IC', category: 'ICs', tags: ['Logic', 'Counter', 'DIP-16'], width: 220, height: dipHeight(16), ports: genericDipPorts(16), defaultConfig: { label: '74HC4017' } },
  IC_CD4511: { name: 'CD4511 – 7-Segment Decoder', subtitle: 'IC', category: 'ICs', tags: ['Logic', 'Decoder', 'DIP-16'], width: 220, height: dipHeight(16), ports: genericDipPorts(16), defaultConfig: { label: 'CD4511' } },
  IC_PCF8574: { name: 'PCF8574 – 8-port I2C Expander', subtitle: 'IC', category: 'ICs', tags: ['I2C', 'Expander', 'DIP-16'], width: 220, height: dipHeight(16), ports: genericDipPorts(16), defaultConfig: { label: 'PCF8574' } }
};
