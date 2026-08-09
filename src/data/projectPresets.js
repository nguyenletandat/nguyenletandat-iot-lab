/**
 * Realistic Sample IoT Projects for Arduino & ESP32 Virtual Simulator
 * Environmental Engineering IoT 6-Session Curriculum Edition (LCD1602 Integrated for ALL Labs)
 */

export const PROJECT_PRESETS = {
  // ═══════════════════════════════════════════════
  // BÀI MỞ ĐẦU — Mạch điện cơ bản, làm quen trước khi vào Buổi 1-6 IoT
  // ═══════════════════════════════════════════════
  intro4: {
    name: 'N1: Pin Khoai tây nối tiếp',
    desc: 'Giảng viên hướng dẫn: Nguyễn Lê Tấn Đạt. Bài mở đầu 1: Ghép nối tiếp 4 củ khoai tây (đinh kẽm + cuộn dây đồng) thành 1 nguồn điện sinh học, thắp sáng đèn LED. KHÔNG cần vi điều khiển hay viết code.',
    code: `// Bài này KHÔNG dùng vi điều khiển — không cần viết code!
// Mỗi củ khoai tây là 1 "pin sinh học" nhỏ (phản ứng hoá học giữa đinh kẽm và dây đồng).
// Ghép nối tiếp nhiều củ (cực đồng củ này -> đinh kẽm củ kế tiếp) để cộng dồn điện áp.
// Lưu ý thực tế: 1 củ khoai tây cho ra rất ít điện áp (~0.5V), cần ghép NHIỀU củ nối
// tiếp mới đủ thắp sáng LED thật — mô phỏng này đơn giản hoá, chỉ kiểm tra vòng kín.`,
    components: [
      { id: 'p1', type: 'POTATO', x: 60, y: 180, config: {} },
      { id: 'p2', type: 'POTATO', x: 410, y: 180, config: {} },
      { id: 'p3', type: 'POTATO', x: 760, y: 180, config: {} },
      { id: 'p4', type: 'POTATO', x: 1110, y: 180, config: {} },
      { id: 'led1', type: 'LED', x: 1460, y: 100, config: {} }
    ],
    wires: [
      { id: 'w1', from: { componentId: 'p1', portId: 'CU' }, to: { componentId: 'p2', portId: 'NAIL' }, color: '#1F2937' },
      { id: 'w2', from: { componentId: 'p2', portId: 'CU' }, to: { componentId: 'p3', portId: 'NAIL' }, color: '#1F2937' },
      { id: 'w3', from: { componentId: 'p3', portId: 'CU' }, to: { componentId: 'p4', portId: 'NAIL' }, color: '#1F2937' },
      { id: 'w4', from: { componentId: 'p4', portId: 'CU' }, to: { componentId: 'led1', portId: 'A' }, color: '#EF4444' },
      { id: 'w5', from: { componentId: 'led1', portId: 'K' }, to: { componentId: 'p1', portId: 'NAIL' }, color: '#1F2937', waypoints: [{ x: 1672, y: 340 }, { x: 20, y: 340 }, { x: 20, y: 220 }] }
    ]
  },

  intro1: {
    name: 'N2: Đèn LED sáng với Pin 9V',
    desc: 'Giảng viên hướng dẫn: Nguyễn Lê Tấn Đạt. Bài mở đầu 2: Mạch điện cơ bản nhất — Pin 9V, điện trở và đèn LED, KHÔNG cần vi điều khiển hay viết code. Đèn LED tự sáng khi nối đúng vòng kín.',
    code: `// Bài này KHÔNG dùng vi điều khiển — không cần viết code!
// Đèn LED sẽ tự sáng khi bạn nối đúng mạch kín:
// Pin 9V (+) -> Điện trở -> LED (chân dài: Anode) -> LED (chân ngắn: Cathode) -> Pin 9V (-)
// Hãy quan sát đèn LED trong khi kéo dây nối trên canvas — không cần bấm "Chạy".`,
    components: [
      { id: 'bat1', type: 'BATTERY_9V', x: 60, y: 100, config: {} },
      { id: 'r1', type: 'RESISTOR', x: 380, y: 60, config: { resistance: 330 } },
      { id: 'led1', type: 'LED', x: 380, y: 220, config: {} }
    ],
    wires: [
      { id: 'w1', from: { componentId: 'bat1', portId: 'VCC' }, to: { componentId: 'r1', portId: 'L' }, color: '#EF4444' },
      { id: 'w2', from: { componentId: 'r1', portId: 'R' }, to: { componentId: 'led1', portId: 'A' }, color: '#F59E0B' },
      { id: 'w3', from: { componentId: 'led1', portId: 'K' }, to: { componentId: 'bat1', portId: 'GND' }, color: '#1F2937' }
    ]
  },

  intro2: {
    name: 'N3: Dãy 7 đèn LED chạy (LED Chaser)',
    desc: 'Giảng viên hướng dẫn: Nguyễn Lê Tấn Đạt. Bài mở đầu 3: Điều khiển 7 đèn LED sáng đuổi nhau lần lượt bằng Arduino Uno — làm quen digitalWrite() và pinMode() trên nhiều chân cùng lúc.',
    code: `// BÀI MỞ ĐẦU 3: DÃY 7 ĐÈN LED CHẠY (LED CHASER)
#define LED1 2
#define LED2 3
#define LED3 4
#define LED4 5
#define LED5 6
#define LED6 7
#define LED7 8

void setup() {
  pinMode(LED1, OUTPUT);
  pinMode(LED2, OUTPUT);
  pinMode(LED3, OUTPUT);
  pinMode(LED4, OUTPUT);
  pinMode(LED5, OUTPUT);
  pinMode(LED6, OUTPUT);
  pinMode(LED7, OUTPUT);
}

void loop() {
  digitalWrite(LED1, HIGH); delay(100); digitalWrite(LED1, LOW);
  digitalWrite(LED2, HIGH); delay(100); digitalWrite(LED2, LOW);
  digitalWrite(LED3, HIGH); delay(100); digitalWrite(LED3, LOW);
  digitalWrite(LED4, HIGH); delay(100); digitalWrite(LED4, LOW);
  digitalWrite(LED5, HIGH); delay(100); digitalWrite(LED5, LOW);
  digitalWrite(LED6, HIGH); delay(100); digitalWrite(LED6, LOW);
  digitalWrite(LED7, HIGH); delay(100); digitalWrite(LED7, LOW);
}`,
    components: [
      { id: 'uno1', type: 'ARDUINO_UNO', x: 60, y: 40, config: {} },
      { id: 'led1', type: 'LED', x: 460, y: 20, config: {} },
      { id: 'r1', type: 'RESISTOR', x: 460, y: 150, config: {} },
      { id: 'led2', type: 'LED', x: 720, y: 20, config: {} },
      { id: 'r2', type: 'RESISTOR', x: 720, y: 150, config: {} },
      { id: 'led3', type: 'LED', x: 980, y: 20, config: {} },
      { id: 'r3', type: 'RESISTOR', x: 980, y: 150, config: {} },
      { id: 'led4', type: 'LED', x: 1240, y: 20, config: {} },
      { id: 'r4', type: 'RESISTOR', x: 1240, y: 150, config: {} },
      { id: 'led5', type: 'LED', x: 1500, y: 20, config: {} },
      { id: 'r5', type: 'RESISTOR', x: 1500, y: 150, config: {} },
      { id: 'led6', type: 'LED', x: 1760, y: 20, config: {} },
      { id: 'r6', type: 'RESISTOR', x: 1760, y: 150, config: {} },
      { id: 'led7', type: 'LED', x: 2020, y: 20, config: {} },
      { id: 'r7', type: 'RESISTOR', x: 2020, y: 150, config: {} }
    ],
    wires: [
      { id: 'w1a', from: { componentId: 'uno1', portId: 'D2' }, to: { componentId: 'r1', portId: 'L' }, color: '#F59E0B' },
      { id: 'w1b', from: { componentId: 'r1', portId: 'R' }, to: { componentId: 'led1', portId: 'A' }, color: '#F59E0B' },
      { id: 'w1c', from: { componentId: 'led1', portId: 'K' }, to: { componentId: 'uno1', portId: 'GND_A' }, color: '#10B981', waypoints: [{ x: 672, y: 260 }, { x: 8, y: 260 }, { x: 8, y: 124 }] },

      { id: 'w2a', from: { componentId: 'uno1', portId: 'D3' }, to: { componentId: 'r2', portId: 'L' }, color: '#3B82F6' },
      { id: 'w2b', from: { componentId: 'r2', portId: 'R' }, to: { componentId: 'led2', portId: 'A' }, color: '#3B82F6' },
      { id: 'w2c', from: { componentId: 'led2', portId: 'K' }, to: { componentId: 'uno1', portId: 'GND_A' }, color: '#10B981', waypoints: [{ x: 932, y: 275 }, { x: 16, y: 275 }, { x: 16, y: 124 }] },

      { id: 'w3a', from: { componentId: 'uno1', portId: 'D4' }, to: { componentId: 'r3', portId: 'L' }, color: '#8B5CF6' },
      { id: 'w3b', from: { componentId: 'r3', portId: 'R' }, to: { componentId: 'led3', portId: 'A' }, color: '#8B5CF6' },
      { id: 'w3c', from: { componentId: 'led3', portId: 'K' }, to: { componentId: 'uno1', portId: 'GND_A' }, color: '#10B981', waypoints: [{ x: 1192, y: 290 }, { x: 24, y: 290 }, { x: 24, y: 124 }] },

      { id: 'w4a', from: { componentId: 'uno1', portId: 'D5' }, to: { componentId: 'r4', portId: 'L' }, color: '#06B6D4' },
      { id: 'w4b', from: { componentId: 'r4', portId: 'R' }, to: { componentId: 'led4', portId: 'A' }, color: '#06B6D4' },
      { id: 'w4c', from: { componentId: 'led4', portId: 'K' }, to: { componentId: 'uno1', portId: 'GND_A' }, color: '#10B981', waypoints: [{ x: 1452, y: 305 }, { x: 32, y: 305 }, { x: 32, y: 124 }] },

      { id: 'w5a', from: { componentId: 'uno1', portId: 'D6' }, to: { componentId: 'r5', portId: 'L' }, color: '#EC4899' },
      { id: 'w5b', from: { componentId: 'r5', portId: 'R' }, to: { componentId: 'led5', portId: 'A' }, color: '#EC4899' },
      { id: 'w5c', from: { componentId: 'led5', portId: 'K' }, to: { componentId: 'uno1', portId: 'GND_A' }, color: '#10B981', waypoints: [{ x: 1712, y: 320 }, { x: 40, y: 320 }, { x: 40, y: 124 }] },

      { id: 'w6a', from: { componentId: 'uno1', portId: 'D7' }, to: { componentId: 'r6', portId: 'L' }, color: '#14B8A6' },
      { id: 'w6b', from: { componentId: 'r6', portId: 'R' }, to: { componentId: 'led6', portId: 'A' }, color: '#14B8A6' },
      { id: 'w6c', from: { componentId: 'led6', portId: 'K' }, to: { componentId: 'uno1', portId: 'GND_A' }, color: '#10B981', waypoints: [{ x: 1972, y: 335 }, { x: 48, y: 335 }, { x: 48, y: 124 }] },

      { id: 'w7a', from: { componentId: 'uno1', portId: 'D8' }, to: { componentId: 'r7', portId: 'L' }, color: '#6366F1' },
      { id: 'w7b', from: { componentId: 'r7', portId: 'R' }, to: { componentId: 'led7', portId: 'A' }, color: '#6366F1' },
      { id: 'w7c', from: { componentId: 'led7', portId: 'K' }, to: { componentId: 'uno1', portId: 'GND_A' }, color: '#10B981', waypoints: [{ x: 2232, y: 350 }, { x: 56, y: 350 }, { x: 56, y: 124 }] }
    ]
  },

  intro3: {
    name: 'N4: Đèn LED nhấp nháy cơ bản (chân 13)',
    desc: 'Giảng viên hướng dẫn: Nguyễn Lê Tấn Đạt. Bài mở đầu 4: Mạch "Blink" kinh điển — 1 đèn LED nhấp nháy qua chân số 13 của Arduino Uno, bài đầu tiên khi học lập trình vi điều khiển.',
    code: `// BÀI MỞ ĐẦU 4: BLINK - ĐÈN LED NHẤP NHÁY CƠ BẢN
#define LED_PIN 13

void setup() {
  pinMode(LED_PIN, OUTPUT);
}

void loop() {
  digitalWrite(LED_PIN, HIGH);
  delay(500);
  digitalWrite(LED_PIN, LOW);
  delay(500);
}`,
    components: [
      { id: 'uno1', type: 'ARDUINO_UNO', x: 60, y: 40, config: {} },
      { id: 'led1', type: 'LED', x: 420, y: 40, config: {} },
      { id: 'r1', type: 'RESISTOR', x: 420, y: 180, config: {} }
    ],
    wires: [
      { id: 'w1', from: { componentId: 'uno1', portId: 'D13' }, to: { componentId: 'led1', portId: 'A' }, color: '#EF4444' },
      { id: 'w2', from: { componentId: 'led1', portId: 'K' }, to: { componentId: 'r1', portId: 'L' }, color: '#1F2937' },
      { id: 'w3', from: { componentId: 'r1', portId: 'R' }, to: { componentId: 'uno1', portId: 'GND_A' }, color: '#1F2937' }
    ]
  },

  intro5: {
    name: 'N5: Pin Chanh nối tiếp thắp sáng LED',
    desc: 'Giảng viên hướng dẫn: Nguyễn Lê Tấn Đạt. Bài mở đầu 5: Ghép nối tiếp 3 quả chanh thành nguồn điện sinh học, thắp sáng đèn LED — cùng nguyên lý pin khoai tây nhưng dùng axit citric trong chanh.',
    code: `// Bài này KHÔNG dùng vi điều khiển — không cần viết code!
// Axit citric trong chanh phản ứng với đinh kẽm và dây đồng, sinh ra dòng điện nhỏ.
// Ghép nối tiếp 3 quả chanh (cực đồng quả này -> đinh kẽm quả kế tiếp) để đủ thắp LED.
// Lưu ý thực tế: mô phỏng này đơn giản hoá, chỉ kiểm tra vòng kín, không tính điện áp.`,
    components: [
      { id: 'l1', type: 'LEMON', x: 60, y: 180, config: {} },
      { id: 'l2', type: 'LEMON', x: 410, y: 180, config: {} },
      { id: 'l3', type: 'LEMON', x: 760, y: 180, config: {} },
      { id: 'led1', type: 'LED', x: 1110, y: 100, config: {} }
    ],
    wires: [
      { id: 'w1', from: { componentId: 'l1', portId: 'CU' }, to: { componentId: 'l2', portId: 'NAIL' }, color: '#1F2937' },
      { id: 'w2', from: { componentId: 'l2', portId: 'CU' }, to: { componentId: 'l3', portId: 'NAIL' }, color: '#1F2937' },
      { id: 'w3', from: { componentId: 'l3', portId: 'CU' }, to: { componentId: 'led1', portId: 'A' }, color: '#EF4444' },
      { id: 'w4', from: { componentId: 'led1', portId: 'K' }, to: { componentId: 'l1', portId: 'NAIL' }, color: '#1F2937', waypoints: [{ x: 1322, y: 330 }, { x: 20, y: 330 }, { x: 20, y: 218 }] }
    ]
  },

  env_lab1: {
    name: 'B1: Quan trắc Khí hậu (DHT11 + LCD)',
    desc: 'Giảng viên hướng dẫn: Nguyễn Lê Tấn Đạt. Buổi 1: Đọc Nhiệt độ & Độ ẩm không khí bằng DHT11, hiển thị chỉ số liên tục lên màn hình LCD1602 và Serial Monitor. Board: ESP32-S3-DevKitC-1.',
    code: `// BUỔI 1: TỔNG QUAN IOT & QUAN TRẮC KHÍ HẬU CƠ BẢN (board ESP32-S3-DevKitC-1)
// Cảm biến DHT11 (Chân GPIO15) & Màn hình LCD1602 I2C (SCL: GPIO9, SDA: GPIO8 — mặc định của ESP32-S3, KHÁC ESP32 thường dùng D21/D22)

#include <LiquidCrystal.h>

#define DHT_PIN 15

LiquidCrystal lcd;

void setup() {
  Serial.begin(115200);
  pinMode(DHT_PIN, INPUT);

  lcd.begin(16, 2);
  lcd.setCursor(0, 0);
  lcd.print("TRAM QUAN TRAC");
  lcd.setCursor(0, 1);
  lcd.print("KHI HAU KMT v1.0");
  delay(1500);
}

void loop() {
  // Đọc dữ liệu Nhiệt độ & Độ ẩm LIVE liên tục từ Cảm biến DHT11 (Chân D15)
  int temp = analogRead(DHT_PIN);          // Nhiệt độ live từ slider (°C)
  int humi = dhtReadHumidity(DHT_PIN);    // Độ ẩm live từ slider (%)

  Serial.print("[KMT IoT] Nhiet do: ");
  Serial.print(temp);
  Serial.print(" C | Do am: ");
  Serial.print(humi);
  Serial.println(" %");

  lcd.setCursor(0, 0);
  lcd.print("Temp: ");
  lcd.print(temp);
  lcd.print(" C     ");

  lcd.setCursor(0, 1);
  lcd.print("Humi: ");
  lcd.print(humi);
  lcd.print(" %     ");

  delay(600);
}`,
    components: [
      { id: 'esp1', type: 'ESP32_S3', x: 60, y: 60, config: {} },
      { id: 'dht1', type: 'DHT11', x: 420, y: 50, config: { value: 28, humidity: 65 } },
      { id: 'lcd1', type: 'LCD1602', x: 420, y: 240, config: { textLine1: 'Temp: 28 C', textLine2: 'Humi: 65 %' } }
    ],
    wires: [
      { id: 'w1', from: { componentId: 'esp1', portId: '5V' }, to: { componentId: 'dht1', portId: 'VCC' }, color: '#EF4444' },
      { id: 'w2', from: { componentId: 'esp1', portId: 'GND1' }, to: { componentId: 'dht1', portId: 'GND' }, color: '#10B981' },
      { id: 'w3', from: { componentId: 'esp1', portId: 'GPIO15' }, to: { componentId: 'dht1', portId: 'DATA' }, color: '#F59E0B' },
      { id: 'w4', from: { componentId: 'esp1', portId: '5V' }, to: { componentId: 'lcd1', portId: 'VCC' }, color: '#EF4444' },
      { id: 'w5', from: { componentId: 'esp1', portId: 'GND2' }, to: { componentId: 'lcd1', portId: 'GND' }, color: '#10B981' },
      { id: 'w6', from: { componentId: 'esp1', portId: 'GPIO9' }, to: { componentId: 'lcd1', portId: 'SCL' }, color: '#3B82F6' },
      { id: 'w7', from: { componentId: 'esp1', portId: 'GPIO8' }, to: { componentId: 'lcd1', portId: 'SDA' }, color: '#8B5CF6' }
    ]
  },

  env_lab2: {
    name: 'B2: Quan trắc Nước & Cảnh báo Ngập',
    desc: 'Giảng viên hướng dẫn: Nguyễn Lê Tấn Đạt. Buổi 2: Đo mực nước (HC-SR04) & Nhiệt độ nguồn nước (DS18B20), hiển thị LCD1602 và phát cảnh báo ngập lụt. Board: ESP32-S3-DevKitC-1.',
    code: `// BUỔI 2: QUAN TRẮC NGUỒN NƯỚC & CẢNH BÁO NGẬP LỤT (board ESP32-S3-DevKitC-1)
// Siêu âm HC-SR04 (Trig: GPIO5, Echo: GPIO18), DS18B20 (GPIO4), LCD1602 I2C (SCL: GPIO9, SDA: GPIO8)

#include <LiquidCrystal.h>

#define TRIG_PIN 5
#define ECHO_PIN 18
#define TEMP_PIN 4

LiquidCrystal lcd;

void setup() {
  Serial.begin(115200);
  pinMode(TRIG_PIN, OUTPUT);
  pinMode(ECHO_PIN, INPUT);

  lcd.begin(16, 2);
  lcd.setCursor(0, 0);
  lcd.print("QUAN TRAC NUOC");
  lcd.setCursor(0, 1);
  lcd.print("KMT WATER LAB");
  delay(1500);
}

void loop() {
  // Đọc khoảng cách mực nước LIVE từ Siêu âm HC-SR04
  digitalWrite(TRIG_PIN, LOW);
  delayMicroseconds(2);
  digitalWrite(TRIG_PIN, HIGH);
  delayMicroseconds(10);
  digitalWrite(TRIG_PIN, LOW);

  long duration = pulseIn(ECHO_PIN, HIGH);
  int distanceCm = duration * 0.034 / 2;
  int waterTemp = analogRead(TEMP_PIN); // Nhiệt độ nước LIVE từ DS18B20

  Serial.print("[NUOC] Muc nuoc: ");
  Serial.print(distanceCm);
  Serial.print(" cm | Nhiet do nuoc: ");
  Serial.print(waterTemp);
  Serial.println(" C");

  lcd.setCursor(0, 0);
  lcd.print("MucNuoc: ");
  lcd.print(distanceCm);
  lcd.print(" cm   ");

  lcd.setCursor(0, 1);
  if (distanceCm < 15) {
    lcd.print("CANH BAO: NGAP! ");
  } else {
    lcd.print("NhietDo: ");
    lcd.print(waterTemp);
    lcd.print(" C ");
  }

  delay(600);
}`,
    components: [
      { id: 'esp1', type: 'ESP32_S3', x: 60, y: 60, config: {} },
      { id: 'sonar1', type: 'HC_SR04', x: 420, y: 40, config: { distance: 12 } },
      { id: 'ds18', type: 'DS18B20', x: 500, y: 300, config: { temp: 26 } },
      { id: 'lcd1', type: 'LCD1602', x: 420, y: 460, config: { textLine1: 'MucNuoc: 12 cm', textLine2: 'CANH BAO: NGAP!' } }
    ],
    wires: [
      { id: 'w1', from: { componentId: 'esp1', portId: '5V' }, to: { componentId: 'sonar1', portId: 'VCC' }, color: '#EF4444' },
      { id: 'w2', from: { componentId: 'esp1', portId: 'GND1' }, to: { componentId: 'sonar1', portId: 'GND' }, color: '#10B981' },
      { id: 'w3', from: { componentId: 'esp1', portId: 'GPIO5' }, to: { componentId: 'sonar1', portId: 'TRIG' }, color: '#3B82F6' },
      { id: 'w4', from: { componentId: 'esp1', portId: 'GPIO18' }, to: { componentId: 'sonar1', portId: 'ECHO' }, color: '#8B5CF6' },
      { id: 'w5', from: { componentId: 'esp1', portId: '3V3_1' }, to: { componentId: 'ds18', portId: 'VCC' }, color: '#EF4444' },
      { id: 'w6', from: { componentId: 'esp1', portId: 'GND2' }, to: { componentId: 'ds18', portId: 'GND' }, color: '#10B981' },
      { id: 'w7', from: { componentId: 'esp1', portId: 'GPIO4' }, to: { componentId: 'ds18', portId: 'DATA' }, color: '#F59E0B' },
      { id: 'w8', from: { componentId: 'esp1', portId: '5V' }, to: { componentId: 'lcd1', portId: 'VCC' }, color: '#EF4444' },
      { id: 'w9', from: { componentId: 'esp1', portId: 'GND1' }, to: { componentId: 'lcd1', portId: 'GND' }, color: '#10B981' },
      { id: 'w10', from: { componentId: 'esp1', portId: 'GPIO9' }, to: { componentId: 'lcd1', portId: 'SCL' }, color: '#06B6D4' },
      { id: 'w11', from: { componentId: 'esp1', portId: 'GPIO8' }, to: { componentId: 'lcd1', portId: 'SDA' }, color: '#EC4899' }
    ]
  },

  env_lab3: {
    name: 'B3: Tưới cây Tự động (Soil + Bơm Relay)',
    desc: 'Giảng viên hướng dẫn: Nguyễn Lê Tấn Đạt. Buổi 3: Giám sát độ ẩm đất. Tự động bật Module Relay kích hoạt Máy bơm nước khi đất bị khô dưới ngưỡng cài đặt. Board: ESP32-S3-DevKitC-1.',
    code: `// BUỔI 3: QUAN TRẮC ĐẤT & HỆ THỐNG TƯỚI CÂY TỰ ĐỘNG (board ESP32-S3-DevKitC-1)
// Cảm biến Độ ẩm đất (GPIO6), Module Relay Bơm nước (GPIO7), LCD1602 I2C (SCL: GPIO9, SDA: GPIO8)
// Lưu ý: GPIO34/GPIO26 dùng trên ESP32 thường KHÔNG tồn tại trên ESP32-S3 nên đã đổi sang GPIO6/GPIO7.

#include <LiquidCrystal.h>

#define SOIL_PIN 6
#define RELAY_PIN 7

LiquidCrystal lcd;

void setup() {
  Serial.begin(115200);
  pinMode(RELAY_PIN, OUTPUT);
  digitalWrite(RELAY_PIN, LOW);

  lcd.begin(16, 2);
  lcd.setCursor(0, 0);
  lcd.print("HE THONG TUOI");
  lcd.setCursor(0, 1);
  lcd.print("TUDONG SAN SANG");
  delay(1500);
}

void loop() {
  int soilVal = analogRead(SOIL_PIN); // Đọc độ ẩm đất LIVE từ cảm biến
  Serial.print("[DAT] Do am dat: ");
  Serial.println(soilVal);

  lcd.setCursor(0, 0);
  lcd.print("DoAmDat: ");
  lcd.print(soilVal);
  lcd.print("   ");

  if (soilVal < 400) {
    digitalWrite(RELAY_PIN, HIGH); // Bật máy bơm
    Serial.println("-> DAT KHO! DANG BAT MAY BOM...");
    lcd.setCursor(0, 1);
    lcd.print("BOM: DANG TUOI! ");
  } else {
    digitalWrite(RELAY_PIN, LOW); // Tắt máy bơm
    lcd.setCursor(0, 1);
    lcd.print("BOM: TAT (DU AM)");
  }

  delay(600);
}`,
    components: [
      { id: 'esp1', type: 'ESP32_S3', x: 60, y: 60, config: {} },
      { id: 'soil1', type: 'SOIL_MOISTURE', x: 460, y: 40, config: { moisture: 250 } },
      { id: 'relay1', type: 'RELAY', x: 460, y: 340, config: {} },
      { id: 'pump1', type: 'DC_MOTOR', x: 760, y: 340, config: {} },
      { id: 'lcd1', type: 'LCD1602', x: 460, y: 680, config: { textLine1: 'DoAmDat: 250', textLine2: 'BOM: DANG TUOI!' } }
    ],
    wires: [
      { id: 'w1', from: { componentId: 'esp1', portId: '3V3_1' }, to: { componentId: 'soil1', portId: 'VCC' }, color: '#EF4444' },
      { id: 'w2', from: { componentId: 'esp1', portId: 'GND1' }, to: { componentId: 'soil1', portId: 'GND' }, color: '#10B981' },
      { id: 'w3', from: { componentId: 'esp1', portId: 'GPIO6' }, to: { componentId: 'soil1', portId: 'AO' }, color: '#F59E0B' },
      { id: 'w4', from: { componentId: 'esp1', portId: '5V' }, to: { componentId: 'relay1', portId: 'VCC' }, color: '#EF4444' },
      { id: 'w5', from: { componentId: 'esp1', portId: 'GND2' }, to: { componentId: 'relay1', portId: 'GND' }, color: '#10B981' },
      { id: 'w6', from: { componentId: 'esp1', portId: 'GPIO7' }, to: { componentId: 'relay1', portId: 'IN' }, color: '#3B82F6' },
      { id: 'w7', from: { componentId: 'relay1', portId: 'OUT' }, to: { componentId: 'pump1', portId: 'POS' }, color: '#EF4444' },
      { id: 'w8', from: { componentId: 'esp1', portId: 'GND1' }, to: { componentId: 'pump1', portId: 'NEG' }, color: '#10B981' },
      { id: 'w9', from: { componentId: 'esp1', portId: '5V' }, to: { componentId: 'lcd1', portId: 'VCC' }, color: '#EF4444' },
      { id: 'w10', from: { componentId: 'esp1', portId: 'GND1' }, to: { componentId: 'lcd1', portId: 'GND' }, color: '#10B981' },
      { id: 'w11', from: { componentId: 'esp1', portId: 'GPIO9' }, to: { componentId: 'lcd1', portId: 'SCL' }, color: '#06B6D4' },
      { id: 'w12', from: { componentId: 'esp1', portId: 'GPIO8' }, to: { componentId: 'lcd1', portId: 'SDA' }, color: '#8B5CF6' }
    ]
  },

  env_lab4: {
    name: 'B4: Cảnh báo Khí độc (MQ-2 + Còi + Quạt)',
    desc: 'Giảng viên hướng dẫn: Nguyễn Lê Tấn Đạt. Buổi 4: Đo nồng độ Khí Gas/Khói bằng MQ-2. Bật Còi hú + Quạt thông gió qua Relay khi nồng độ nguy hiểm, tự tắt còi khi an toàn. Board: ESP32-S3-DevKitC-1.',
    code: `// BUỔI 4: CẢNH BÁO RÒ RỈ KHÍ ĐỘC & KHÓI THẢI MÔI TRƯỜNG (board ESP32-S3-DevKitC-1)
// Cảm biến Gas MQ-2 (GPIO11), Còi hú (GPIO12), Relay Quạt (GPIO14), LCD1602 I2C (SCL: GPIO9, SDA: GPIO8)
// Lưu ý: GPIO35/GPIO27 dùng trên ESP32 thường KHÔNG tồn tại/bị hạn chế trên ESP32-S3 nên đã đổi sang GPIO11/GPIO12.

#include <LiquidCrystal.h>

#define GAS_PIN 11
#define BUZZER_PIN 12
#define FAN_RELAY_PIN 14

LiquidCrystal lcd;

void setup() {
  Serial.begin(115200);
  pinMode(BUZZER_PIN, OUTPUT);
  pinMode(FAN_RELAY_PIN, OUTPUT);

  lcd.begin(16, 2);
  lcd.setCursor(0, 0);
  lcd.print("GIAM SAT KHI DOC");
  lcd.setCursor(0, 1);
  lcd.print("KHONG KHI KMT");
  delay(1500);
}

void loop() {
  int gasPpm = analogRead(GAS_PIN); // Đọc nồng độ Gas LIVE từ slider
  Serial.print("[KHI THAI] Nong do Gas MQ-2: ");
  Serial.print(gasPpm);
  Serial.println(" PPM");

  lcd.setCursor(0, 0);
  lcd.print("Gas PPM: ");
  lcd.print(gasPpm);
  lcd.print("   ");

  if (gasPpm > 300) {
    digitalWrite(BUZZER_PIN, HIGH);    // Bật còi hú
    digitalWrite(FAN_RELAY_PIN, HIGH); // Bật quạt hút thông gió
    Serial.println("⚠️ CANH BAO O NHIEM KHI THAI! BAT QUAT THONG GIO!");

    lcd.setCursor(0, 1);
    lcd.print("DANGER! FAN: ON ");
  } else {
    digitalWrite(BUZZER_PIN, LOW);     // Tắt hoàn toàn còi hú khi nồng độ an toàn
    noTone(BUZZER_PIN);
    digitalWrite(FAN_RELAY_PIN, LOW); // Tắt quạt hút

    lcd.setCursor(0, 1);
    lcd.print("Status: AN TOAN ");
  }

  delay(600);
}`,
    components: [
      { id: 'esp1',    type: 'ESP32_S3', x: 60,  y: 60,  config: {} },
      { id: 'mq2_1',  type: 'MQ2',     x: 460, y: 40,  config: { gasLevel: 650 } },
      { id: 'buzzer1',type: 'BUZZER',  x: 460, y: 340, config: {} },
      { id: 'relay1', type: 'RELAY',   x: 460, y: 680, config: {} },
      { id: 'fan1',   type: 'DC_MOTOR',x: 760, y: 680, config: {} },
      { id: 'lcd1',   type: 'LCD1602', x: 460, y: 1020, config: { textLine1: 'Gas PPM: 650', textLine2: 'DANGER! FAN: ON' } }
    ],
    wires: [
      { id: 'w1',  from: { componentId: 'esp1',    portId: '5V'    }, to: { componentId: 'mq2_1',  portId: 'VCC' }, color: '#EF4444' },
      { id: 'w2',  from: { componentId: 'esp1',    portId: 'GND1' }, to: { componentId: 'mq2_1',  portId: 'GND' }, color: '#10B981' },
      { id: 'w3',  from: { componentId: 'esp1',    portId: 'GPIO11' }, to: { componentId: 'mq2_1',  portId: 'AO'  }, color: '#F59E0B' },
      { id: 'w4',  from: { componentId: 'esp1',    portId: 'GPIO12' }, to: { componentId: 'buzzer1',portId: 'POS' }, color: '#EC4899' },
      { id: 'w5',  from: { componentId: 'esp1',    portId: 'GND2' }, to: { componentId: 'buzzer1',portId: 'NEG' }, color: '#10B981' },
      { id: 'w6',  from: { componentId: 'esp1',    portId: '5V'    }, to: { componentId: 'relay1', portId: 'VCC' }, color: '#EF4444' },
      { id: 'w7',  from: { componentId: 'esp1',    portId: 'GND1' }, to: { componentId: 'relay1', portId: 'GND' }, color: '#10B981' },
      { id: 'w8',  from: { componentId: 'esp1',    portId: 'GPIO14' }, to: { componentId: 'relay1', portId: 'IN'  }, color: '#3B82F6' },
      { id: 'w9',  from: { componentId: 'relay1',  portId: 'OUT'  }, to: { componentId: 'fan1',   portId: 'POS' }, color: '#EF4444' },
      { id: 'w10', from: { componentId: 'esp1',    portId: 'GND1' }, to: { componentId: 'fan1',   portId: 'NEG' }, color: '#10B981' },
      { id: 'w11', from: { componentId: 'esp1',    portId: '5V'    }, to: { componentId: 'lcd1',   portId: 'VCC' }, color: '#EF4444' },
      { id: 'w12', from: { componentId: 'esp1',    portId: 'GND1' }, to: { componentId: 'lcd1',   portId: 'GND' }, color: '#10B981' },
      { id: 'w13', from: { componentId: 'esp1',    portId: 'GPIO9'  }, to: { componentId: 'lcd1',   portId: 'SCL' }, color: '#06B6D4' },
      { id: 'w14', from: { componentId: 'esp1',    portId: 'GPIO8'  }, to: { componentId: 'lcd1',   portId: 'SDA' }, color: '#8B5CF6' }
    ]
  },

  env_lab5: {
    name: 'B5: Trạm HMI Môi trường (LCD + CB)',
    desc: 'Giảng viên hướng dẫn: Nguyễn Lê Tấn Đạt. Buổi 5: Xây dựng Giao diện Hiển thị HMI tại chỗ bằng Màn hình LCD1602 tích hợp cảm biến Khí độc MQ-2 & Nhiệt ẩm DHT11, có đèn LED cảnh báo khi khí gas vượt ngưỡng. Board: ESP32-S3-DevKitC-1.',
    code: `// BUỔI 5: GIAO DIỆN HMI TẠI CHỖ CHO TRẠM QUAN TRẮC MÔI TRƯỜNG (board ESP32-S3-DevKitC-1)
// LCD1602 I2C (SCL: GPIO9, SDA: GPIO8), DHT11 (GPIO15), MQ-2 (GPIO11), LED cảnh báo (GPIO16)
// Lưu ý: GPIO34 dùng trên ESP32 thường KHÔNG tồn tại trên ESP32-S3 nên đã đổi sang GPIO11.

#include <LiquidCrystal.h>

#define DHT_PIN 15
#define GAS_PIN 11
#define LED_PIN 16

LiquidCrystal lcd;

void setup() {
  Serial.begin(115200);
  pinMode(DHT_PIN, INPUT);
  pinMode(LED_PIN, OUTPUT);

  lcd.begin(16, 2);
  lcd.setCursor(0, 0);
  lcd.print("TRAM HMI KMT");
  lcd.setCursor(0, 1);
  lcd.print("SAN SANG HE THONG");
  delay(1500);
}

void loop() {
  // Đọc dữ liệu Nhiệt độ, Độ ẩm & Nồng độ Khí Gas LIVE
  int temp = analogRead(DHT_PIN);
  int humi = dhtReadHumidity(DHT_PIN);
  int gasPpm = analogRead(GAS_PIN);

  Serial.print("HMI Update -> Temp: ");
  Serial.print(temp);
  Serial.print(" C | Humi: ");
  Serial.print(humi);
  Serial.print(" % | Gas: ");
  Serial.print(gasPpm);
  Serial.println(" PPM");

  lcd.setCursor(0, 0);
  lcd.print("T:");
  lcd.print(temp);
  lcd.print("C H:");
  lcd.print(humi);
  lcd.print("%    ");

  lcd.setCursor(0, 1);
  lcd.print("Gas PPM: ");
  lcd.print(gasPpm);
  lcd.print("   ");

  // Đèn LED cảnh báo — bật khi nồng độ khí gas vượt ngưỡng an toàn
  if (gasPpm > 300) {
    digitalWrite(LED_PIN, HIGH);
  } else {
    digitalWrite(LED_PIN, LOW);
  }

  delay(600);
}`,
    components: [
      { id: 'esp1', type: 'ESP32_S3', x: 60, y: 60, config: {} },
      { id: 'lcd1', type: 'LCD1602', x: 460, y: 40, config: { textLine1: 'T:29C H:60%', textLine2: 'Gas PPM: 180' } },
      { id: 'dht1', type: 'DHT11', x: 460, y: 370, config: { value: 29, humidity: 60 } },
      { id: 'mq2_1', type: 'MQ2', x: 460, y: 680, config: { gasLevel: 180 } },
      { id: 'r1', type: 'RESISTOR', x: 460, y: 1020, config: {} },
      { id: 'led1', type: 'LED', x: 460, y: 1150, config: {} }
    ],
    wires: [
      { id: 'w1', from: { componentId: 'esp1', portId: '5V' }, to: { componentId: 'lcd1', portId: 'VCC' }, color: '#EF4444' },
      { id: 'w2', from: { componentId: 'esp1', portId: 'GND1' }, to: { componentId: 'lcd1', portId: 'GND' }, color: '#10B981' },
      { id: 'w3', from: { componentId: 'esp1', portId: 'GPIO9' }, to: { componentId: 'lcd1', portId: 'SCL' }, color: '#3B82F6' },
      { id: 'w4', from: { componentId: 'esp1', portId: 'GPIO8' }, to: { componentId: 'lcd1', portId: 'SDA' }, color: '#8B5CF6' },
      { id: 'w5', from: { componentId: 'esp1', portId: '5V' }, to: { componentId: 'dht1', portId: 'VCC' }, color: '#EF4444' },
      { id: 'w6', from: { componentId: 'esp1', portId: 'GND2' }, to: { componentId: 'dht1', portId: 'GND' }, color: '#10B981' },
      { id: 'w7', from: { componentId: 'esp1', portId: 'GPIO15' }, to: { componentId: 'dht1', portId: 'DATA' }, color: '#F59E0B' },
      { id: 'w8', from: { componentId: 'esp1', portId: '5V' }, to: { componentId: 'mq2_1', portId: 'VCC' }, color: '#EF4444' },
      { id: 'w9', from: { componentId: 'esp1', portId: 'GND1' }, to: { componentId: 'mq2_1', portId: 'GND' }, color: '#10B981' },
      { id: 'w10', from: { componentId: 'esp1', portId: 'GPIO11' }, to: { componentId: 'mq2_1', portId: 'AO' }, color: '#06B6D4' },
      { id: 'w11', from: { componentId: 'esp1', portId: 'GPIO16' }, to: { componentId: 'r1', portId: 'L' }, color: '#EC4899' },
      { id: 'w12', from: { componentId: 'r1', portId: 'R' }, to: { componentId: 'led1', portId: 'A' }, color: '#EC4899' },
      { id: 'w13', from: { componentId: 'led1', portId: 'K' }, to: { componentId: 'esp1', portId: 'GND3' }, color: '#10B981' }
    ]
  },

  env_lab6: {
    name: 'B6: Trạm Môi trường Đa thông số IoT',
    desc: 'Giảng viên hướng dẫn: Nguyễn Lê Tấn Đạt. Buổi 6: Đồ án Đa cảm biến tổng hợp: Nhiệt ẩm, Mực nước, Khí độc. Hiển thị LCD1602, đẩy Cloud Telemetry & bật đèn LED cảnh báo khi có thông số nguy hiểm. Board: ESP32-S3-DevKitC-1.',
    code: `// BUỔI 6: ĐỒ ÁN TỔNG HỢP — TRẠM QUAN TRẮC MÔI TRƯỜNG ĐA THÔNG SỐ IOT (board ESP32-S3-DevKitC-1)
// Tích hợp Đa cảm biến & Tự động đẩy dữ liệu Telemetry lên IoT Cloud
// LCD1602 I2C (SCL: GPIO9, SDA: GPIO8), LED cảnh báo (GPIO16)
// Lưu ý: GPIO35 dùng trên ESP32 thường KHÔNG tồn tại trên ESP32-S3 nên đã đổi sang GPIO11.

#include <LiquidCrystal.h>

#define DHT_PIN 15
#define GAS_PIN 11
#define TRIG_PIN 5
#define ECHO_PIN 18
#define LED_PIN 16

LiquidCrystal lcd;

void setup() {
  Serial.begin(115200);
  pinMode(TRIG_PIN, OUTPUT);
  pinMode(ECHO_PIN, INPUT);
  pinMode(LED_PIN, OUTPUT);

  lcd.begin(16, 2);
  lcd.setCursor(0, 0);
  lcd.print("IOT ENV STATION");
  lcd.setCursor(0, 1);
  lcd.print("SYSTEM ONLINE");
  delay(1500);
}

void loop() {
  // Đọc dữ liệu LIVE liên tục từ các cảm biến trên canvas
  int temp = analogRead(DHT_PIN);
  int humi = dhtReadHumidity(DHT_PIN);
  int gasPpm = analogRead(GAS_PIN);

  digitalWrite(TRIG_PIN, LOW);
  delayMicroseconds(2);
  digitalWrite(TRIG_PIN, HIGH);
  delayMicroseconds(10);
  digitalWrite(TRIG_PIN, LOW);
  long duration = pulseIn(ECHO_PIN, HIGH);
  int waterLevel = duration * 0.034 / 2;

  // Gửi chuỗi telemetry JSON qua Cloud MQTT/HTTP
  Serial.print("{\\"station\\":\\"KMT_LAB_01\\", \\"temp\\":");
  Serial.print(temp);
  Serial.print(", \\"humi\\":");
  Serial.print(humi);
  Serial.print(", \\"gas\\":");
  Serial.print(gasPpm);
  Serial.print(", \\"water\\":");
  Serial.print(waterLevel);
  Serial.println("}");

  lcd.setCursor(0, 0);
  lcd.print("T:");
  lcd.print(temp);
  lcd.print("C H:");
  lcd.print(humi);
  lcd.print("% G:");
  lcd.print(gasPpm);

  lcd.setCursor(0, 1);
  lcd.print("Water: ");
  lcd.print(waterLevel);
  lcd.print("cm OK  ");

  // Đèn LED cảnh báo — bật khi khí gas cao HOẶC mực nước dâng ngập (giống ngưỡng Buổi 2 & 4)
  if (gasPpm > 300 || waterLevel < 15) {
    digitalWrite(LED_PIN, HIGH);
  } else {
    digitalWrite(LED_PIN, LOW);
  }

  delay(600);
}`,
    components: [
      { id: 'esp1', type: 'ESP32_S3', x: 60, y: 60, config: {} },
      { id: 'dht1', type: 'DHT11', x: 460, y: 40, config: { value: 28, humidity: 62 } },
      { id: 'mq2_1', type: 'MQ2', x: 460, y: 340, config: { gasLevel: 110 } },
      { id: 'sonar1', type: 'HC_SR04', x: 460, y: 680, config: { distance: 45 } },
      { id: 'lcd1', type: 'LCD1602', x: 460, y: 1020, config: { textLine1: 'T:28C H:62% G:110', textLine2: 'Water: 45cm OK' } },
      { id: 'r1', type: 'RESISTOR', x: 460, y: 1280, config: {} },
      { id: 'led1', type: 'LED', x: 460, y: 1410, config: {} }
    ],
    wires: [
      { id: 'w1', from: { componentId: 'esp1', portId: '5V' }, to: { componentId: 'dht1', portId: 'VCC' }, color: '#EF4444' },
      { id: 'w2', from: { componentId: 'esp1', portId: 'GND1' }, to: { componentId: 'dht1', portId: 'GND' }, color: '#10B981' },
      { id: 'w3', from: { componentId: 'esp1', portId: 'GPIO15' }, to: { componentId: 'dht1', portId: 'DATA' }, color: '#F59E0B' },
      { id: 'w4', from: { componentId: 'esp1', portId: '5V' }, to: { componentId: 'mq2_1', portId: 'VCC' }, color: '#EF4444' },
      { id: 'w5', from: { componentId: 'esp1', portId: 'GND2' }, to: { componentId: 'mq2_1', portId: 'GND' }, color: '#10B981' },
      { id: 'w6', from: { componentId: 'esp1', portId: 'GPIO11' }, to: { componentId: 'mq2_1', portId: 'AO' }, color: '#06B6D4' },
      { id: 'w7', from: { componentId: 'esp1', portId: '5V' }, to: { componentId: 'sonar1', portId: 'VCC' }, color: '#EF4444' },
      { id: 'w8', from: { componentId: 'esp1', portId: 'GND1' }, to: { componentId: 'sonar1', portId: 'GND' }, color: '#10B981' },
      { id: 'w9', from: { componentId: 'esp1', portId: 'GPIO5' }, to: { componentId: 'sonar1', portId: 'TRIG' }, color: '#3B82F6' },
      { id: 'w10', from: { componentId: 'esp1', portId: 'GPIO18' }, to: { componentId: 'sonar1', portId: 'ECHO' }, color: '#8B5CF6' },
      { id: 'w11', from: { componentId: 'esp1', portId: '5V' }, to: { componentId: 'lcd1', portId: 'VCC' }, color: '#EF4444' },
      { id: 'w12', from: { componentId: 'esp1', portId: 'GND1' }, to: { componentId: 'lcd1', portId: 'GND' }, color: '#10B981' },
      { id: 'w13', from: { componentId: 'esp1', portId: 'GPIO9' }, to: { componentId: 'lcd1', portId: 'SCL' }, color: '#14B8A6' },
      { id: 'w14', from: { componentId: 'esp1', portId: 'GPIO8' }, to: { componentId: 'lcd1', portId: 'SDA' }, color: '#EC4899' },
      { id: 'w15', from: { componentId: 'esp1', portId: 'GPIO16' }, to: { componentId: 'r1', portId: 'L' }, color: '#6366F1' },
      { id: 'w16', from: { componentId: 'r1', portId: 'R' }, to: { componentId: 'led1', portId: 'A' }, color: '#6366F1' },
      { id: 'w17', from: { componentId: 'led1', portId: 'K' }, to: { componentId: 'esp1', portId: 'GND3' }, color: '#10B981' }
    ]
  }
};
