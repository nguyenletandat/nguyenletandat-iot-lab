/**
 * Realistic Sample IoT Projects for Arduino & ESP32 Virtual Simulator
 * Environmental Engineering IoT — 4 Bài Nền Tảng Edition
 * (board ESP32 DevKit V1 30-pin + màn hình OLED SSD1306 I2C — khớp đúng bộ
 * "ESP32 Basic Starter Kit" sinh viên đang sở hữu, xem componentTypes.js)
 */

export const PROJECT_PRESETS = {
  // ═══════════════════════════════════════════════
  // BÀI MỞ ĐẦU — Mạch điện cơ bản, làm quen trước khi vào Buổi 1-4 IoT
  // ═══════════════════════════════════════════════
  intro4: {
    name: 'N1: Pin Khoai tây nối tiếp',
    desc: 'Giảng viên hướng dẫn: Nguyễn Lê Tấn Đạt. Bài mở đầu 1: Ghép nối tiếp 4 củ khoai tây (đinh kẽm + cuộn dây đồng) thành 1 nguồn điện sinh học, thắp sáng đèn LED. KHÔNG cần vi điều khiển hay viết code.',
    longDesc: `Mục tiêu: Làm quen mạch điện đơn giản nhất — hiểu nguyên lý "pin sinh học" trước khi học vi điều khiển.
Linh kiện: 4 củ khoai tây (mỗi củ là 1 nguồn điện nhỏ), 1 đèn LED.
Nguyên lý: Đinh kẽm (cực âm) và dây đồng (cực dương) cắm vào khoai tây tạo phản ứng hoá học sinh ra dòng điện (~0.5V/củ). Ghép nối tiếp — nối cực đồng củ này sang đinh kẽm củ kế tiếp — để cộng dồn điện áp đủ thắp sáng LED.
Không cần viết code: hãy quan sát đèn LED tự sáng ngay khi bạn nối đúng vòng kín trên canvas.`,
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

  intro5: {
    name: 'N2: Pin Chanh nối tiếp thắp sáng LED',
    desc: 'Giảng viên hướng dẫn: Nguyễn Lê Tấn Đạt. Bài mở đầu 2: Ghép nối tiếp 3 quả chanh thành nguồn điện sinh học, thắp sáng đèn LED — cùng nguyên lý pin khoai tây nhưng dùng axit citric trong chanh.',
    longDesc: `Mục tiêu: Củng cố nguyên lý pin sinh học với vật liệu khác — chanh (dùng axit citric thay vì phản ứng khoáng chất như khoai tây).
Linh kiện: 3 quả chanh, 1 đèn LED.
Nguyên lý: Axit citric trong chanh phản ứng với đinh kẽm và dây đồng sinh dòng điện nhỏ (~0.7V/quả) — cao hơn khoai tây nên chỉ cần 3 quả (thay vì 4 củ khoai tây) là đủ sáng LED.
Không cần viết code — mạch tự hoạt động khi nối đúng vòng kín.`,
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

  intro1: {
    name: 'N3: Đèn LED sáng với Pin 9V',
    desc: 'Giảng viên hướng dẫn: Nguyễn Lê Tấn Đạt. Bài mở đầu 3: Mạch điện cơ bản nhất — Pin 9V, điện trở và đèn LED, KHÔNG cần vi điều khiển hay viết code. Đèn LED tự sáng khi nối đúng vòng kín.',
    longDesc: `Mục tiêu: Bài mạch điện cơ bản nhất — hiểu định luật mạch kín và vai trò của điện trở hạn dòng.
Linh kiện: Pin 9V, 1 điện trở 330Ω, 1 đèn LED.
Nguyên lý: Dòng điện chỉ chạy khi mạch tạo thành vòng kín: Pin(+) → Điện trở → LED (chân dài Anode → chân ngắn Cathode) → Pin(-). Điện trở có nhiệm vụ giới hạn dòng điện qua LED để không làm cháy LED.
Không cần viết code — kéo dây nối đúng là đèn tự sáng.`,
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
    name: 'N4: Dãy 7 đèn LED chạy (LED Chaser)',
    desc: 'Giảng viên hướng dẫn: Nguyễn Lê Tấn Đạt. Bài mở đầu 4: Điều khiển 7 đèn LED sáng đuổi nhau lần lượt bằng Arduino Uno — làm quen digitalWrite() và pinMode() trên nhiều chân cùng lúc.',
    longDesc: `Mục tiêu: Làm quen digitalWrite() và pinMode() khi điều khiển NHIỀU chân cùng lúc bằng Arduino.
Linh kiện: Arduino Uno R3, 7 đèn LED, 7 điện trở (chân D2-D8).
Nguyên lý: Mỗi LED nối vào 1 chân số của Arduino qua 1 điện trở hạn dòng, chân còn lại (Cathode) về GND chung.
Giải thích code: Trong loop(), lần lượt bật rồi tắt từng LED theo thứ tự D2→D8, mỗi đèn sáng 100ms rồi tắt trước khi đèn kế tiếp sáng — tạo hiệu ứng "đèn chạy" (chaser).`,
    code: `// BÀI MỞ ĐẦU 4: DÃY 7 ĐÈN LED CHẠY (LED CHASER)
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
    name: 'N5: Đèn LED nhấp nháy cơ bản (chân 13)',
    desc: 'Giảng viên hướng dẫn: Nguyễn Lê Tấn Đạt. Bài mở đầu 5: Mạch "Blink" kinh điển — 1 đèn LED nhấp nháy qua chân số 13 của Arduino Uno, bài đầu tiên khi học lập trình vi điều khiển.',
    longDesc: `Mục tiêu: Bài "Hello World" của lập trình vi điều khiển — điều khiển 1 chân số cơ bản nhất.
Linh kiện: Arduino Uno R3, 1 đèn LED, 1 điện trở (chân D13).
Nguyên lý: digitalWrite(pin, HIGH) đưa chân lên 5V làm LED sáng; digitalWrite(pin, LOW) đưa chân về 0V làm LED tắt.
Giải thích code: loop() lặp lại vô hạn: bật LED → chờ 500ms → tắt LED → chờ 500ms, tạo hiệu ứng nhấp nháy đều đặn 1 giây/chu kỳ.`,
    code: `// BÀI MỞ ĐẦU 5: BLINK - ĐÈN LED NHẤP NHÁY CƠ BẢN
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

  env_lab1: {
    name: 'B1: Hệ thống Quan trắc Mực nước & Cảnh báo Ngập (HC-SR04 + DS18B20)',
    desc: 'Giảng viên hướng dẫn: Nguyễn Lê Tấn Đạt. Buổi 1: Đo mực nước (HC-SR04) & Nhiệt độ nguồn nước (DS18B20), hiển thị OLED SSD1306 và phát cảnh báo ngập lụt. Board: ESP32 DevKit V1.',
    longDesc: `Mục tiêu: Đo khoảng cách bằng sóng siêu âm (HC-SR04) kết hợp cảm biến nhiệt độ chống nước (DS18B20), phát cảnh báo khi mực nước dâng cao.
Linh kiện: ESP32 DevKit V1, HC-SR04 (Trig: GPIO5, Echo: GPIO18), DS18B20 (GPIO4), OLED SSD1306 0.96" I2C (SDA: GPIO21, SCL: GPIO22).
Nguyên lý HC-SR04: phát xung TRIG 10µs, đo thời gian ECHO trả về (pulseIn), suy ra khoảng cách = thời gian × 0.034 / 2 (vận tốc âm thanh).
Giải thích code: nếu khoảng cách < 15cm (mực nước dâng cao, cảm biến gần mặt nước) → OLED hiện "CANH BAO: NGAP!", ngược lại hiện nhiệt độ nước bình thường.`,
    code: `// BUỔI 1: HỆ THỐNG QUAN TRẮC MỰC NƯỚC & CẢNH BÁO NGẬP (board ESP32 DevKit V1)
// Siêu âm HC-SR04 (Trig: GPIO5, Echo: GPIO18), DS18B20 (GPIO4), OLED SSD1306 I2C (SDA: GPIO21, SCL: GPIO22)

#include <Wire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>

#define TRIG_PIN 5
#define ECHO_PIN 18
#define TEMP_PIN 4
#define SCREEN_WIDTH 128
#define SCREEN_HEIGHT 64

Adafruit_SSD1306 display(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, -1);

void setup() {
  Serial.begin(115200);
  pinMode(TRIG_PIN, OUTPUT);
  pinMode(ECHO_PIN, INPUT);

  display.begin(SSD1306_SWITCHCAPVCC, 0x3C);
  display.clearDisplay();
  display.setTextSize(1);
  display.setTextColor(WHITE);
  display.setCursor(0, 0);
  display.println("QUAN TRAC NUOC");
  display.setCursor(0, 20);
  display.println("KMT WATER LAB");
  display.display();
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

  display.clearDisplay();
  display.setCursor(0, 0);
  display.print("MucNuoc: ");
  display.print(distanceCm);
  display.println(" cm");

  display.setCursor(0, 20);
  if (distanceCm < 15) {
    display.println("CANH BAO: NGAP!");
  } else {
    display.print("NhietDo: ");
    display.print(waterTemp);
    display.println(" C");
  }
  display.display();

  delay(600);
}`,
    components: [
      { id: 'esp1', type: 'ESP32', x: 60, y: 60, config: {} },
      { id: 'bb1', type: 'BREADBOARD', x: 60, y: 540, config: {} },
      { id: 'sonar1', type: 'HC_SR04', x: 460, y: 40, config: { distance: 12 } },
      { id: 'ds18', type: 'DS18B20', x: 540, y: 300, config: { temp: 26 } },
      { id: 'oled1', type: 'OLED_SSD1306', x: 460, y: 480, config: { line1: 'MucNuoc: 12 cm', line2: 'CANH BAO: NGAP!' } }
    ],
    wires: [
      { id: 'w1a', from: { componentId: 'esp1', portId: 'VIN' }, to: { componentId: 'bb1', portId: 'PW_T_PLUS' }, color: '#EF4444' },
      { id: 'w1c', from: { componentId: 'esp1', portId: 'GND1' }, to: { componentId: 'bb1', portId: 'PW_T_MINUS' }, color: '#10B981' },
      { id: 'w1d', from: { componentId: 'esp1', portId: '3V3' }, to: { componentId: 'bb1', portId: 'PW_B_PLUS' }, color: '#EF4444' },
      { id: 'w1e', from: { componentId: 'esp1', portId: 'GND2' }, to: { componentId: 'bb1', portId: 'PW_B_MINUS' }, color: '#10B981' },
      { id: 'w1', from: { componentId: 'bb1', portId: 'PW_T_PLUS' }, to: { componentId: 'sonar1', portId: 'VCC' }, color: '#EF4444' },
      { id: 'w2', from: { componentId: 'bb1', portId: 'PW_T_MINUS' }, to: { componentId: 'sonar1', portId: 'GND' }, color: '#10B981' },
      { id: 'w3', from: { componentId: 'esp1', portId: 'D5' }, to: { componentId: 'sonar1', portId: 'TRIG' }, color: '#3B82F6' },
      { id: 'w4', from: { componentId: 'esp1', portId: 'D18' }, to: { componentId: 'sonar1', portId: 'ECHO' }, color: '#8B5CF6' },
      { id: 'w5', from: { componentId: 'bb1', portId: 'PW_B_PLUS' }, to: { componentId: 'ds18', portId: 'VCC' }, color: '#EF4444' },
      { id: 'w6', from: { componentId: 'bb1', portId: 'PW_B_MINUS' }, to: { componentId: 'ds18', portId: 'GND' }, color: '#10B981' },
      { id: 'w7', from: { componentId: 'esp1', portId: 'D4' }, to: { componentId: 'ds18', portId: 'DATA' }, color: '#F59E0B' },
      { id: 'w8', from: { componentId: 'bb1', portId: 'PW_B_PLUS' }, to: { componentId: 'oled1', portId: 'VCC' }, color: '#EF4444' },
      { id: 'w9', from: { componentId: 'bb1', portId: 'PW_B_MINUS' }, to: { componentId: 'oled1', portId: 'GND' }, color: '#10B981' },
      { id: 'w10', from: { componentId: 'esp1', portId: 'D21' }, to: { componentId: 'oled1', portId: 'SDA' }, color: '#06B6D4' },
      { id: 'w11', from: { componentId: 'esp1', portId: 'D22' }, to: { componentId: 'oled1', portId: 'SCL' }, color: '#EC4899' }
    ]
  },

  env_lab2: {
    name: 'B2: Hệ thống Tưới cây Tự động (Soil + Relay + Bơm)',
    desc: 'Giảng viên hướng dẫn: Nguyễn Lê Tấn Đạt. Buổi 2: Giám sát độ ẩm đất. Tự động bật Module Relay kích hoạt Máy bơm nước khi đất bị khô dưới ngưỡng cài đặt. Board: ESP32 DevKit V1.',
    longDesc: `Mục tiêu: Hệ thống tưới cây tự động — cảm biến độ ẩm đất điều khiển Relay đóng/ngắt máy bơm.
Linh kiện: ESP32 DevKit V1, cảm biến độ ẩm đất (GPIO34), Relay 5V (GPIO26) điều khiển máy bơm DC, OLED SSD1306 0.96" I2C (SDA: GPIO21, SCL: GPIO22).
Nguyên lý Relay: là công tắc điện tử — chân IN nhận tín hiệu digitalWrite từ ESP32 (dòng nhỏ) để đóng/ngắt tiếp điểm công suất lớn (an toàn cho vi điều khiển).
Giải thích code: nếu độ ẩm đất < 400 (đất khô) → bật Relay (bơm chạy); ngược lại tắt Relay (đất đã đủ ẩm).`,
    code: `// BUỔI 2: HỆ THỐNG TƯỚI CÂY TỰ ĐỘNG (board ESP32 DevKit V1)
// Cảm biến Độ ẩm đất (GPIO34, ADC chỉ đọc), Module Relay Bơm nước (GPIO26), OLED SSD1306 I2C (SDA: GPIO21, SCL: GPIO22)

#include <Wire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>

#define SOIL_PIN 34
#define RELAY_PIN 26
#define SCREEN_WIDTH 128
#define SCREEN_HEIGHT 64

Adafruit_SSD1306 display(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, -1);

void setup() {
  Serial.begin(115200);
  pinMode(RELAY_PIN, OUTPUT);
  digitalWrite(RELAY_PIN, LOW);

  display.begin(SSD1306_SWITCHCAPVCC, 0x3C);
  display.clearDisplay();
  display.setTextSize(1);
  display.setTextColor(WHITE);
  display.setCursor(0, 0);
  display.println("HE THONG TUOI");
  display.setCursor(0, 20);
  display.println("TUDONG SAN SANG");
  display.display();
  delay(1500);
}

void loop() {
  int soilVal = analogRead(SOIL_PIN); // Đọc độ ẩm đất LIVE từ cảm biến
  Serial.print("[DAT] Do am dat: ");
  Serial.println(soilVal);

  display.clearDisplay();
  display.setCursor(0, 0);
  display.print("DoAmDat: ");
  display.println(soilVal);

  display.setCursor(0, 20);
  if (soilVal < 400) {
    digitalWrite(RELAY_PIN, HIGH); // Bật máy bơm
    Serial.println("-> DAT KHO! DANG BAT MAY BOM...");
    display.println("BOM: DANG TUOI!");
  } else {
    digitalWrite(RELAY_PIN, LOW); // Tắt máy bơm
    display.println("BOM: TAT (DU AM)");
  }
  display.display();

  delay(600);
}`,
    components: [
      { id: 'esp1', type: 'ESP32', x: 60, y: 60, config: {} },
      { id: 'bb1', type: 'BREADBOARD', x: 60, y: 540, config: {} },
      { id: 'soil1', type: 'SOIL_MOISTURE', x: 460, y: 40, config: { moisture: 250 } },
      { id: 'relay1', type: 'RELAY', x: 460, y: 340, config: {} },
      { id: 'pump1', type: 'DC_MOTOR', x: 760, y: 340, config: {} },
      { id: 'oled1', type: 'OLED_SSD1306', x: 460, y: 700, config: { line1: 'DoAmDat: 250', line2: 'BOM: DANG TUOI!' } }
    ],
    wires: [
      { id: 'w1a', from: { componentId: 'esp1', portId: '3V3' }, to: { componentId: 'bb1', portId: 'PW_B_PLUS' }, color: '#EF4444' },
      { id: 'w1c', from: { componentId: 'esp1', portId: 'GND1' }, to: { componentId: 'bb1', portId: 'PW_B_MINUS' }, color: '#10B981' },
      { id: 'w1d', from: { componentId: 'esp1', portId: 'VIN' }, to: { componentId: 'bb1', portId: 'PW_T_PLUS' }, color: '#EF4444' },
      { id: 'w1e', from: { componentId: 'esp1', portId: 'GND2' }, to: { componentId: 'bb1', portId: 'PW_T_MINUS' }, color: '#10B981' },
      { id: 'w1', from: { componentId: 'bb1', portId: 'PW_B_PLUS' }, to: { componentId: 'soil1', portId: 'VCC' }, color: '#EF4444' },
      { id: 'w2', from: { componentId: 'bb1', portId: 'PW_B_MINUS' }, to: { componentId: 'soil1', portId: 'GND' }, color: '#10B981' },
      { id: 'w3', from: { componentId: 'esp1', portId: 'D34' }, to: { componentId: 'soil1', portId: 'AO' }, color: '#F59E0B' },
      { id: 'w4', from: { componentId: 'bb1', portId: 'PW_T_PLUS' }, to: { componentId: 'relay1', portId: 'VCC' }, color: '#EF4444' },
      { id: 'w5', from: { componentId: 'bb1', portId: 'PW_T_MINUS' }, to: { componentId: 'relay1', portId: 'GND' }, color: '#10B981' },
      { id: 'w6', from: { componentId: 'esp1', portId: 'D26' }, to: { componentId: 'relay1', portId: 'IN' }, color: '#3B82F6' },
      { id: 'w7', from: { componentId: 'relay1', portId: 'OUT' }, to: { componentId: 'pump1', portId: 'POS' }, color: '#EF4444' },
      { id: 'w8', from: { componentId: 'bb1', portId: 'PW_T_MINUS' }, to: { componentId: 'pump1', portId: 'NEG' }, color: '#10B981' },
      { id: 'w9', from: { componentId: 'bb1', portId: 'PW_B_PLUS' }, to: { componentId: 'oled1', portId: 'VCC' }, color: '#EF4444' },
      { id: 'w10', from: { componentId: 'bb1', portId: 'PW_B_MINUS' }, to: { componentId: 'oled1', portId: 'GND' }, color: '#10B981' },
      { id: 'w11', from: { componentId: 'esp1', portId: 'D21' }, to: { componentId: 'oled1', portId: 'SDA' }, color: '#06B6D4' },
      { id: 'w12', from: { componentId: 'esp1', portId: 'D22' }, to: { componentId: 'oled1', portId: 'SCL' }, color: '#EC4899' }
    ]
  },

  env_lab3: {
    name: 'B3: Hệ thống Cảnh báo Khí độc (MQ-2 + Còi + Quạt)',
    desc: 'Giảng viên hướng dẫn: Nguyễn Lê Tấn Đạt. Buổi 3: Đo nồng độ Khí Gas/Khói bằng MQ-2. Bật Còi hú + Quạt thông gió qua Relay khi nồng độ nguy hiểm, tự tắt còi khi an toàn. Board: ESP32 DevKit V1.',
    longDesc: `Mục tiêu: Cảnh báo khí độc — đo nồng độ khí Gas/Khói (MQ-2), bật còi + quạt thông gió khi nguy hiểm.
Linh kiện: ESP32 DevKit V1, MQ-2 (GPIO35), Buzzer (GPIO27), Relay điều khiển Quạt (GPIO14), OLED SSD1306 0.96" I2C (SDA: GPIO21, SCL: GPIO22).
Giải thích code: nếu nồng độ Gas > 300 PPM → bật còi hú (digitalWrite HIGH) VÀ bật Relay quạt hút thông gió; khi nồng độ trở lại an toàn thì tắt cả 2 (kèm noTone() tắt hẳn còi).
Lưu ý giảng dạy: đây là ngưỡng minh hoạ (300 PPM), thực tế cần tra theo datasheet MQ-2 và hiệu chuẩn cảm biến.`,
    code: `// BUỔI 3: HỆ THỐNG CẢNH BÁO KHÍ ĐỘC (board ESP32 DevKit V1)
// Cảm biến Gas MQ-2 (GPIO35, ADC chỉ đọc), Còi hú (GPIO27), Relay Quạt (GPIO14), OLED SSD1306 I2C (SDA: GPIO21, SCL: GPIO22)

#include <Wire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>

#define GAS_PIN 35
#define BUZZER_PIN 27
#define FAN_RELAY_PIN 14
#define SCREEN_WIDTH 128
#define SCREEN_HEIGHT 64

Adafruit_SSD1306 display(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, -1);

void setup() {
  Serial.begin(115200);
  pinMode(BUZZER_PIN, OUTPUT);
  pinMode(FAN_RELAY_PIN, OUTPUT);

  display.begin(SSD1306_SWITCHCAPVCC, 0x3C);
  display.clearDisplay();
  display.setTextSize(1);
  display.setTextColor(WHITE);
  display.setCursor(0, 0);
  display.println("GIAM SAT KHI DOC");
  display.setCursor(0, 20);
  display.println("KHONG KHI KMT");
  display.display();
  delay(1500);
}

void loop() {
  int gasPpm = analogRead(GAS_PIN); // Đọc nồng độ Gas LIVE từ slider
  Serial.print("[KHI THAI] Nong do Gas MQ-2: ");
  Serial.print(gasPpm);
  Serial.println(" PPM");

  display.clearDisplay();
  display.setCursor(0, 0);
  display.print("Gas PPM: ");
  display.println(gasPpm);

  display.setCursor(0, 20);
  if (gasPpm > 300) {
    digitalWrite(BUZZER_PIN, HIGH);    // Bật còi hú
    digitalWrite(FAN_RELAY_PIN, HIGH); // Bật quạt hút thông gió
    Serial.println("CANH BAO O NHIEM KHI THAI! BAT QUAT THONG GIO!");
    display.println("DANGER! FAN: ON");
  } else {
    digitalWrite(BUZZER_PIN, LOW);     // Tắt hoàn toàn còi hú khi nồng độ an toàn
    noTone(BUZZER_PIN);
    digitalWrite(FAN_RELAY_PIN, LOW); // Tắt quạt hút
    display.println("Status: AN TOAN");
  }
  display.display();

  delay(600);
}`,
    components: [
      { id: 'esp1',    type: 'ESP32', x: 60,  y: 60,  config: {} },
      { id: 'bb1',    type: 'BREADBOARD', x: 60, y: 540, config: {} },
      { id: 'mq2_1',  type: 'MQ2',     x: 460, y: 40,  config: { gasLevel: 650 } },
      { id: 'buzzer1',type: 'BUZZER',  x: 460, y: 340, config: {} },
      { id: 'relay1', type: 'RELAY',   x: 460, y: 680, config: {} },
      { id: 'fan1',   type: 'DC_MOTOR',x: 760, y: 680, config: {} },
      { id: 'oled1',   type: 'OLED_SSD1306', x: 460, y: 1040, config: { line1: 'Gas PPM: 650', line2: 'DANGER! FAN: ON' } }
    ],
    wires: [
      { id: 'w0a', from: { componentId: 'esp1',    portId: 'VIN'    }, to: { componentId: 'bb1',    portId: 'PW_T_PLUS' }, color: '#EF4444' },
      { id: 'w0b', from: { componentId: 'esp1',    portId: 'GND1' }, to: { componentId: 'bb1',    portId: 'PW_T_MINUS' }, color: '#10B981' },
      { id: 'w0c', from: { componentId: 'esp1',    portId: '3V3'    }, to: { componentId: 'bb1',    portId: 'PW_B_PLUS' }, color: '#EF4444' },
      { id: 'w0d', from: { componentId: 'esp1',    portId: 'GND2' }, to: { componentId: 'bb1',    portId: 'PW_B_MINUS' }, color: '#10B981' },
      { id: 'w1',  from: { componentId: 'bb1',     portId: 'PW_T_PLUS' }, to: { componentId: 'mq2_1',  portId: 'VCC' }, color: '#EF4444' },
      { id: 'w2',  from: { componentId: 'bb1',     portId: 'PW_T_MINUS' }, to: { componentId: 'mq2_1',  portId: 'GND' }, color: '#10B981' },
      { id: 'w3',  from: { componentId: 'esp1',    portId: 'D35' }, to: { componentId: 'mq2_1',  portId: 'AO'  }, color: '#F59E0B' },
      { id: 'w4',  from: { componentId: 'esp1',    portId: 'D27' }, to: { componentId: 'buzzer1',portId: 'POS' }, color: '#EC4899' },
      { id: 'w5',  from: { componentId: 'bb1',     portId: 'PW_T_MINUS' }, to: { componentId: 'buzzer1',portId: 'NEG' }, color: '#10B981' },
      { id: 'w6',  from: { componentId: 'bb1',     portId: 'PW_T_PLUS' }, to: { componentId: 'relay1', portId: 'VCC' }, color: '#EF4444' },
      { id: 'w7',  from: { componentId: 'bb1',     portId: 'PW_T_MINUS' }, to: { componentId: 'relay1', portId: 'GND' }, color: '#10B981' },
      { id: 'w8',  from: { componentId: 'esp1',    portId: 'D14' }, to: { componentId: 'relay1', portId: 'IN'  }, color: '#3B82F6' },
      { id: 'w9',  from: { componentId: 'relay1',  portId: 'OUT'  }, to: { componentId: 'fan1',   portId: 'POS' }, color: '#EF4444' },
      { id: 'w10', from: { componentId: 'bb1',     portId: 'PW_T_MINUS' }, to: { componentId: 'fan1',   portId: 'NEG' }, color: '#10B981' },
      { id: 'w11', from: { componentId: 'bb1',     portId: 'PW_B_PLUS' }, to: { componentId: 'oled1',   portId: 'VCC' }, color: '#EF4444' },
      { id: 'w12', from: { componentId: 'bb1',     portId: 'PW_B_MINUS' }, to: { componentId: 'oled1',   portId: 'GND' }, color: '#10B981' },
      { id: 'w13', from: { componentId: 'esp1',    portId: 'D21' }, to: { componentId: 'oled1',   portId: 'SDA' }, color: '#8B5CF6' },
      { id: 'w14', from: { componentId: 'esp1',    portId: 'D22' }, to: { componentId: 'oled1',   portId: 'SCL' }, color: '#06B6D4' }
    ]
  },

  env_lab4: {
    name: 'B4: Hệ thống Quan trắc Khí hậu Tự động (DHT11 + OLED)',
    desc: 'Giảng viên hướng dẫn: Nguyễn Lê Tấn Đạt. Buổi 4: Đọc Nhiệt độ & Độ ẩm không khí bằng DHT11, hiển thị chỉ số liên tục lên màn hình OLED SSD1306 và Serial Monitor. Board: ESP32 DevKit V1.',
    longDesc: `Mục tiêu: Bài nền tảng 4/4 — đọc cảm biến số (DHT11) và hiển thị dữ liệu lên màn hình OLED, kỹ năng nền tảng dùng chung cho cả 4 hệ thống trong chuỗi bài thực hành này.
Linh kiện: ESP32 DevKit V1, DHT11 (GPIO15), OLED SSD1306 0.96" I2C (SDA: GPIO21, SCL: GPIO22).
Giải thích code: setup() khởi tạo Serial + OLED (giao tiếp I2C) và hiện màn hình chào. loop() đọc nhiệt độ/độ ẩm từ DHT11 mỗi 600ms, in ra Serial Monitor VÀ cập nhật màn hình OLED.
Lưu ý giảng dạy: dhtReadHumidity() là hàm mô phỏng riêng của trình giả lập này (không có trong thư viện DHT thật) để đơn giản hoá việc đọc độ ẩm.`,
    code: `// BUỔI 4: HỆ THỐNG QUAN TRẮC KHÍ HẬU TỰ ĐỘNG (board ESP32 DevKit V1)
// Cảm biến DHT11 (Chân GPIO15) & OLED SSD1306 I2C (SDA: GPIO21, SCL: GPIO22)

#include <Wire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>

#define DHT_PIN 15
#define SCREEN_WIDTH 128
#define SCREEN_HEIGHT 64

Adafruit_SSD1306 display(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, -1);

void setup() {
  Serial.begin(115200);
  pinMode(DHT_PIN, INPUT);

  display.begin(SSD1306_SWITCHCAPVCC, 0x3C);
  display.clearDisplay();
  display.setTextSize(1);
  display.setTextColor(WHITE);
  display.setCursor(0, 0);
  display.println("TRAM QUAN TRAC");
  display.setCursor(0, 20);
  display.println("KHI HAU KMT v1.0");
  display.display();
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

  display.clearDisplay();
  display.setCursor(0, 0);
  display.print("Temp: ");
  display.print(temp);
  display.println(" C");

  display.setCursor(0, 20);
  display.print("Humi: ");
  display.print(humi);
  display.println(" %");
  display.display();

  delay(600);
}`,
    components: [
      { id: 'esp1', type: 'ESP32', x: 60, y: 60, config: {} },
      { id: 'bb1', type: 'BREADBOARD', x: 60, y: 540, config: {} },
      { id: 'dht1', type: 'DHT11', x: 460, y: 40, config: { value: 28, humidity: 65 } },
      { id: 'oled1', type: 'OLED_SSD1306', x: 460, y: 260, config: { line1: 'Temp: 28 C', line2: 'Humi: 65 %' } }
    ],
    wires: [
      { id: 'w1', from: { componentId: 'esp1', portId: 'VIN' }, to: { componentId: 'bb1', portId: 'PW_T_PLUS' }, color: '#EF4444' },
      { id: 'w2', from: { componentId: 'esp1', portId: 'GND1' }, to: { componentId: 'bb1', portId: 'PW_T_MINUS' }, color: '#10B981' },
      { id: 'w1b', from: { componentId: 'bb1', portId: 'PW_T_PLUS' }, to: { componentId: 'dht1', portId: 'VCC' }, color: '#EF4444' },
      { id: 'w2b', from: { componentId: 'bb1', portId: 'PW_T_MINUS' }, to: { componentId: 'dht1', portId: 'GND' }, color: '#10B981' },
      { id: 'w3', from: { componentId: 'esp1', portId: 'D15' }, to: { componentId: 'dht1', portId: 'DATA' }, color: '#F59E0B' },
      { id: 'w4', from: { componentId: 'bb1', portId: 'PW_T_PLUS' }, to: { componentId: 'oled1', portId: 'VCC' }, color: '#EF4444' },
      { id: 'w5', from: { componentId: 'bb1', portId: 'PW_T_MINUS' }, to: { componentId: 'oled1', portId: 'GND' }, color: '#10B981' },
      { id: 'w6', from: { componentId: 'esp1', portId: 'D21' }, to: { componentId: 'oled1', portId: 'SDA' }, color: '#06B6D4' },
      { id: 'w7', from: { componentId: 'esp1', portId: 'D22' }, to: { componentId: 'oled1', portId: 'SCL' }, color: '#EC4899' }
    ]
  },
};
