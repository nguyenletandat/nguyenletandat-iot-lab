import React, { useState } from 'react';
import { BookOpen, Cpu, Zap, Droplets, Wind, BarChart3, CheckCircle2, ChevronDown, ChevronRight, Code2, Wrench, AlertTriangle } from 'lucide-react';

// Import ảnh trực tiếp qua Vite — tự động xử lý base path đúng cho GitHub Pages
import imgESP32 from '../assets/theory-images/esp32_pinout.webp';
import imgIoTArch from '../assets/theory-images/iot_architecture.webp';
import imgHCSR04 from '../assets/theory-images/hcsr04_water_level.webp';
import imgSoilPump from '../assets/theory-images/soil_relay_pump.webp';
import imgMQ2Gas from '../assets/theory-images/mq2_gas_alarm.webp';
import imgLCD1602 from '../assets/theory-images/lcd1602_grid.webp';

const SESSIONS = [
  {
    id: 1,
    icon: <Cpu className="w-5 h-5" />,
    title: 'Buổi 1: Giới thiệu IoT & Mạch điện Cơ bản',
    color: 'from-blue-500 to-cyan-500',
    accent: '#3B82F6',
    theory: [
      {
        title: '1.1 IoT trong Kỹ thuật Môi trường là gì?',
        image: imgIoTArch,
        imageCaption: 'Kiến trúc hệ thống IoT Môi trường 4 lớp: Cảm biến → Mạng → Nền tảng → Ứng dụng',
        content: `Internet of Things (IoT) trong Kỹ thuật Môi trường là việc sử dụng mạng lưới các thiết bị cảm biến thông minh để đo lường, thu thập và truyền dữ liệu môi trường theo thời gian thực. Thay vì đo thủ công định kỳ, hệ thống IoT cho phép giám sát liên tục 24/7, cảnh báo tự động và phân tích xu hướng dài hạn.

🏗️ Kiến trúc hệ thống IoT Môi trường gồm 4 lớp:

• Lớp 1 — Cảm biến (Perception): DHT11, MQ-2, HC-SR04, DS18B20 thu thập dữ liệu vật lý
• Lớp 2 — Mạng (Network): ESP32 WiFi/Bluetooth kết nối và truyền dữ liệu
• Lớp 3 — Nền tảng (Platform): Cloud server lưu trữ và xử lý dữ liệu (ThingSpeak, Firebase)
• Lớp 4 — Ứng dụng (Application): Dashboard web/mobile, cảnh báo SMS/Email

🌍 Ứng dụng thực tế tại Việt Nam:
• Trạm quan trắc không khí AQI tại TP.HCM, Hà Nội
• Hệ thống cảnh báo lũ lụt tự động ĐBSCL
• Quan trắc chất lượng nước sông Sài Gòn
• Giám sát nước thải khu công nghiệp
• Hệ thống tưới tiêu thông minh nông nghiệp CNC

📚 Lộ trình 4 hệ thống nền tảng sẽ học trong khoá này:
  Buổi 2 — Quan trắc Mực nước & Cảnh báo Ngập
  Buổi 3 — Tưới cây Tự động
  Buổi 4 — Cảnh báo Khí độc
  Buổi 5 — Quan trắc Khí hậu Tự động
  Buổi 6 — Các nhóm trình bày đồ án & tổng hợp giải đáp`,
      },
      {
        title: '1.2 Vi điều khiển ESP32-S3 — Trái tim của Trạm IoT',
        image: imgESP32,
        imageCaption: 'Sơ đồ chân minh hoạ dòng ESP32 nói chung — board thực tế dùng trong khoá học là ESP32-S3-DevKitC-1 (xem bảng GPIO thực tế bên dưới)',
        content: `ESP32-S3 là vi điều khiển 32-bit lưỡng nhân (Dual-Core) của Espressif Systems, tích hợp sẵn WiFi & Bluetooth — bản dùng trong khoá học này là ESP32-S3-DevKitC-1 (44 chân).

📋 Thông số kỹ thuật quan trọng:
• CPU: Xtensa LX7 Dual-Core, xung nhịp tới 240 MHz
• Flash: 16 MB | PSRAM: 8 MB (bản N16R8)
• GPIO: 44 chân, nhiều chân hỗ trợ ADC 12-bit (0–4095)
• Kết nối: WiFi 802.11 b/g/n, Bluetooth 5 (LE)
• Nguồn điện: 3.3V logic, cấp nguồn qua cổng USB-C 5V

🔌 Các chân GPIO dùng xuyên suốt 4 bài thực hành (Buổi 2-5):
┌─────────────────────────────────────────────┐
│ 5V / 3V3 / GND → Cấp nguồn qua Breadboard   │
│ GPIO1, GPIO2   → LCD1602A: chân RS, E       │
│ GPIO8,9,10,13  → LCD1602A: chân D4-D7       │
│ GPIO4, GPIO5   → DS18B20 DATA, HC-SR04 TRIG │
│ GPIO18         → HC-SR04 ECHO               │
│ GPIO6, GPIO7   → Cảm biến Đất, Relay Bơm    │
│ GPIO11,12,14   → MQ-2, Còi, Relay Quạt      │
│ GPIO15         → DHT11 DATA                 │
└─────────────────────────────────────────────┘

⚠️ Lưu ý quan trọng:
Board ESP32-S3-DevKitC-1 bản N16R8 dành riêng GPIO35-37 cho bộ nhớ Octal PSRAM nội bộ — KHÔNG được dùng làm GPIO thường. Toàn bộ 4 bài thực hành trong khoá học đã chọn sẵn các chân GPIO an toàn ở trên, không xung đột.`,
      },
      {
        title: '1.3 Làm quen Mạch điện Cơ bản — 5 Bài khởi động (N1-N5)',
        content: `Trước khi lập trình cảm biến, hãy làm quen với 5 mạch điện cơ bản nhất trong tab "Thực hành trên mạch" (chọn lần lượt N1 → N5) — chưa cần viết code, chỉ cần hiểu nguyên lý và kéo dây đúng.

🥔 N1-N2 — Pin sinh học (Khoai tây / Chanh):
• Đinh kẽm (cực âm) + dây đồng (cực dương) cắm vào khoai tây/chanh tạo phản ứng hoá học sinh ra dòng điện nhỏ (~0.5–0.7V mỗi củ/quả)
• Ghép NỐI TIẾP nhiều củ/quả (cực đồng củ này → đinh kẽm củ kế tiếp) để cộng dồn điện áp đủ thắp sáng 1 đèn LED
• Bài học: khái niệm "nguồn điện" và cách ghép nối tiếp, trước khi dùng nguồn điện tử thật (pin, ESP32)

🔋 N3 — Pin 9V + Điện trở + LED:
• Mạch điện cơ bản nhất: Pin(+) → Điện trở → LED (chân dài Anode → chân ngắn Cathode) → Pin(−)
• Điện trở có nhiệm vụ giới hạn dòng điện qua LED — thiếu điện trở sẽ làm cháy LED
• Bài học: định luật mạch kín và vai trò điện trở hạn dòng

💡 N4-N5 — Arduino Uno: Blink & LED Chaser:
• N5 (Blink): digitalWrite(pin, HIGH/LOW) + delay() — bài "Hello World" của lập trình vi điều khiển
• N4 (LED Chaser): điều khiển NHIỀU chân digital cùng lúc (D2-D8), mỗi đèn sáng rồi tắt lần lượt tạo hiệu ứng đèn chạy
• Bài học: pinMode(OUTPUT), digitalWrite() và tư duy điều khiển tuần tự nhiều thiết bị — nền tảng cho cả 4 hệ thống IoT sắp học ở Buổi 2-5`,
      },
    ],
    code: `// N5: BLINK - "HELLO WORLD" CỦA LẬP TRÌNH VI ĐIỀU KHIỂN
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
    components: ['Arduino Uno R3', 'LED', 'Điện trở 220–330Ω', 'Pin 9V', 'Khoai tây / Chanh (N1-N2)'],
    wiring: [
      'N5 (Blink): Uno.D13 → LED.Anode | LED.Cathode → Điện trở → Uno.GND',
      'N4 (LED Chaser): Uno.D2-D8 → mỗi LED qua 1 điện trở → GND chung',
      'N3 (Pin 9V): Pin9V(+) → Điện trở → LED → Pin9V(−)',
      'N1-N2 (Pin sinh học): Đinh kẽm/dây đồng ghép nối tiếp nhiều củ/quả → LED',
    ],
    practiceHint: 'N1 đến N5',
  },

  {
    id: 2,
    icon: <Droplets className="w-5 h-5" />,
    title: 'Buổi 2: Hệ thống Quan trắc Mực nước & Cảnh báo Ngập',
    color: 'from-cyan-500 to-blue-600',
    accent: '#0891B2',
    theory: [
      {
        title: '2.1 Bài toán Quan trắc Mực nước & Ngập lụt tại Việt Nam',
        content: `Ngập lụt là thảm họa môi trường nghiêm trọng nhất tại Việt Nam — đặc biệt tại ĐBSCL và các đô thị lớn như TP.HCM, Cần Thơ, An Giang.

🌊 Số liệu thực tế đáng lo ngại:
• Mỗi năm, lũ lụt gây thiệt hại hơn 1 tỷ USD tại VN
• Trên 20,000 km² ĐBSCL bị ngập theo mùa lũ
• TP.HCM có hơn 40 điểm ngập kinh niên
• Biến đổi khí hậu làm lũ về sớm hơn và kéo dài hơn

📡 Hệ thống cảnh báo ngập lụt IoT có thể:
• Phát hiện mực nước tăng trước 15–30 phút
• Tự động phát cảnh báo qua SMS/loa phát thanh/app
• Ghi lại dữ liệu lịch sử để phân tích mô hình lũ
• Điều phối hệ thống bơm thoát nước tự động`,
      },
      {
        title: '2.2 Cảm biến HC-SR04 — Nguyên lý đo mực nước bằng Siêu âm',
        image: imgHCSR04,
        imageCaption: 'Nguyên lý hoạt động HC-SR04: sóng siêu âm phản xạ từ mặt nước → tính khoảng cách',
        content: `HC-SR04 sử dụng sóng siêu âm (40 kHz) để đo khoảng cách không tiếp xúc — lý tưởng để đo mực nước mà không cần nhúng cảm biến vào nước.

⚙️ Nguyên lý hoạt động (5 bước):
  1. ESP32 gửi xung điện 10µs vào chân TRIG (HIGH 10µs rồi LOW)
  2. HC-SR04 tự động phát 8 xung siêu âm 40kHz
  3. Sóng âm truyền đến bề mặt nước và phản xạ trở về
  4. Chân ECHO giữ mức HIGH trong suốt thời gian sóng âm di chuyển
  5. ESP32 đo thời gian ECHO HIGH → tính khoảng cách

📐 Công thức tính khoảng cách:
  distance_cm = duration × 0.034 / 2
  Trong đó:
    duration = thời gian ECHO HIGH (µs)
    0.034    = tốc độ âm thanh ÷ 1000 (0.034 cm/µs)
    ÷ 2      = chia đôi vì sóng đi và về

📊 Thông số kỹ thuật:
• Khoảng đo: 2 cm – 400 cm, độ chính xác ±3 mm
• Góc phát sóng: ~15° (cần hướng thẳng xuống mặt nước)
• Điện áp: 5V, chân: VCC, TRIG, ECHO, GND

🔌 Đấu nối (qua Breadboard cấp nguồn):
  HC-SR04.VCC/GND → Breadboard rail 5V/GND
  HC-SR04.TRIG → ESP32.GPIO5 (dây xanh lá)
  HC-SR04.ECHO → ESP32.GPIO18 (dây tím)`,
      },
      {
        title: '2.3 Cảm biến DS18B20 — Nhiệt độ nước chống thấm',
        content: `DS18B20 là cảm biến nhiệt độ kỹ thuật số 1-Wire, có phiên bản chống thấm nước (dạng đầu dò inox), lý tưởng đo nhiệt độ sông hồ, ao nuôi thủy sản.

📋 Thông số kỹ thuật:
• Dải đo: -55°C đến +125°C, độ chính xác ±0.5°C
• Giao thức: Dallas 1-Wire (hỗ trợ nhiều cảm biến trên 1 bus)
• Điện áp: 3.0V – 5.5V
• Trong thực tế BẮT BUỘC có điện trở kéo 4.7kΩ giữa DATA và VCC (mạch mô phỏng đã đơn giản hoá phần này)

🔌 Đấu nối với ESP32 (qua Breadboard, rail 3.3V):
  DS18B20.VCC  → Breadboard rail 3V3 (dây đỏ)
  DS18B20.DATA → ESP32.GPIO4 (dây vàng)
  DS18B20.GND  → Breadboard rail GND (dây đen)

⚠️ Trên phần cứng thật: không có điện trở 4.7kΩ → DS18B20 không hoạt động!`,
      },
    ],
    code: `// BUỔI 2: HỆ THỐNG QUAN TRẮC MỰC NƯỚC & CẢNH BÁO NGẬP (board ESP32-S3-DevKitC-1)
// Siêu âm HC-SR04 (Trig: GPIO5, Echo: GPIO18), DS18B20 (GPIO4), LCD1602A 16 chân song song (RS:1, E:2, D4-D7: 8/9/10/13)

#include <LiquidCrystal.h>

#define TRIG_PIN 5
#define ECHO_PIN 18
#define TEMP_PIN 4
#define LCD_RS 1
#define LCD_E  2
#define LCD_D4 8
#define LCD_D5 9
#define LCD_D6 10
#define LCD_D7 13

LiquidCrystal lcd(LCD_RS, LCD_E, LCD_D4, LCD_D5, LCD_D6, LCD_D7);

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
    components: ['ESP32-S3-DevKitC-1', 'HC-SR04 Ultrasonic Sensor', 'DS18B20 (chống nước)', 'LCD1602A 16 chân (song song)', 'Breadboard'],
    wiring: [
      'HC-SR04.VCC/GND → Breadboard rail 5V/GND | HC-SR04.TRIG → ESP32.GPIO5 | ECHO → ESP32.GPIO18',
      'DS18B20.VCC/GND → Breadboard rail 3V3/GND | DS18B20.DATA → ESP32.GPIO4',
      'LCD1602A.RS → ESP32.GPIO1 | LCD.E → ESP32.GPIO2 | LCD.D4-D7 → ESP32.GPIO8/9/10/13',
      'LCD.VDD, LCD.A (đèn nền +) → Breadboard rail 5V | LCD.VSS, LCD.RW, LCD.V0, LCD.K → Breadboard rail GND',
    ],
    practiceHint: 'B1',
  },

  {
    id: 3,
    icon: <Droplets className="w-5 h-5" />,
    title: 'Buổi 3: Hệ thống Tưới cây Tự động',
    color: 'from-green-500 to-emerald-600',
    accent: '#10B981',
    theory: [
      {
        title: '3.1 Nông nghiệp IoT & Quản lý nước tưới thông minh',
        content: `Nông nghiệp chiếm ~70% tổng lượng nước ngọt toàn cầu. Hệ thống tưới thông minh IoT tiết kiệm 30–50% lượng nước mà không ảnh hưởng đến năng suất cây trồng.

🌱 Tác động môi trường của tưới tiêu không kiểm soát:
• Tưới quá mức → Rửa trôi đất và phân bón → Ô nhiễm nước ngầm
• Tưới không đủ → Cây héo, đất xói mòn, năng suất giảm
• Phân bón bị cuốn trôi → Phú dưỡng hóa ao hồ (Algae bloom)

🤖 Hệ thống tưới IoT tự động:
• Đọc độ ẩm đất thực tế từng khu vực
• Chỉ tưới khi đất khô dưới ngưỡng cài đặt
• Kết hợp dữ liệu thời tiết từ API để dự báo`,
      },
      {
        title: '3.2 Cảm biến Đất, Relay & Máy bơm — Sơ đồ hệ thống tưới tự động',
        image: imgSoilPump,
        imageCaption: 'Sơ đồ hệ thống tưới tự động: Soil Sensor → ESP32 → Relay → Máy bơm nước',
        content: `Cảm biến độ ẩm đất đo điện trở giữa 2 điện cực cắm vào đất. Đất ẩm dẫn điện tốt hơn đất khô.

📊 Thang giá trị ADC của Sensor Điện trở:
  0    – 300  → ĐẤT RẤT ẨM (đang ngập nước)
  300  – 600  → ĐỘ ẨM BÌNH THƯỜNG (lý tưởng cho cây)
  600  – 900  → ĐẤT KHÔ (cần tưới sớm)
  900  – 4095 → ĐẤT RẤT KHÔ (cây thiếu nước nghiêm trọng)

⚠️ Lưu ý: Giá trị ADC đảo ngược với độ ẩm thực!
  ADC thấp = Đất ẩm | ADC cao = Đất khô

🔌 Đấu nối Cảm biến Đất (qua Breadboard):
  Soil.VCC/GND → Breadboard rail 3V3/GND
  Soil.AO  → ESP32.GPIO6 (ADC Analog Input)

🔌 Đấu nối Relay + Bơm:
  Relay.VCC/GND → Breadboard rail 5V/GND
  Relay.IN  → ESP32.GPIO7 (tín hiệu điều khiển)
  Relay.OUT → Cực (+) nguồn Bơm (đóng/ngắt qua rơ-le)
  Bơm.(−) → Breadboard rail GND`,
      },
      {
        title: '3.3 Module Relay — Điều khiển thiết bị công suất lớn',
        content: `Module Relay là cầu nối cho phép ESP32 (3.3V) điều khiển an toàn các thiết bị công suất lớn như máy bơm 220V AC hoặc bơm 12V DC.

📍 Sơ đồ cực tải Relay (module relay thực tế):
  COM (Common)        → Kết nối nguồn dương của bơm
  NO  (Normally Open) → Mở khi chưa kích, đóng khi kích
  NC  (Normally Closed) → Đóng khi chưa kích, mở khi kích
(Mạch mô phỏng trong khoá học đơn giản hoá relay thành 4 chân VCC/GND/IN/OUT — OUT tương đương cực NO+COM đã đấu sẵn)

💡 Dùng cực NO + COM cho hệ thống tưới:
  Khi Relay OFF (chưa kích) → Bơm tắt (mạch hở)
  Khi Relay ON  (đã kích)   → Bơm chạy (mạch đóng)

📝 Logic điều khiển trong code:
  if (soilVal < 400) {
    digitalWrite(RELAY_PIN, HIGH); // Bật bơm
  } else {
    digitalWrite(RELAY_PIN, LOW);  // Tắt bơm
  }

🚨 Quy tắc an toàn điện:
  • KHÔNG chạm tay vào cực 220V khi đang vận hành
  • Luôn ngắt nguồn 220V trước khi đấu nối`,
      },
    ],
    code: `// BUỔI 3: HỆ THỐNG TƯỚI CÂY TỰ ĐỘNG (board ESP32-S3-DevKitC-1)
// Cảm biến Độ ẩm đất (GPIO6), Module Relay Bơm nước (GPIO7), LCD1602A 16 chân song song (RS:1, E:2, D4-D7: 8/9/10/13)
// Lưu ý: GPIO34/GPIO26 dùng trên ESP32 thường KHÔNG tồn tại trên ESP32-S3 nên đã đổi sang GPIO6/GPIO7.

#include <LiquidCrystal.h>

#define SOIL_PIN 6
#define RELAY_PIN 7
#define LCD_RS 1
#define LCD_E  2
#define LCD_D4 8
#define LCD_D5 9
#define LCD_D6 10
#define LCD_D7 13

LiquidCrystal lcd(LCD_RS, LCD_E, LCD_D4, LCD_D5, LCD_D6, LCD_D7);

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
    components: ['ESP32-S3-DevKitC-1', 'Soil Moisture Sensor', 'Module Relay 5V', 'DC Motor/Bơm nước', 'LCD1602A 16 chân (song song)', 'Breadboard'],
    wiring: [
      'Soil.VCC/GND → Breadboard rail 3V3/GND | Soil.AO → ESP32.GPIO6',
      'Relay.VCC/GND → Breadboard rail 5V/GND | Relay.IN → ESP32.GPIO7',
      'Relay.OUT → Bơm(+) | Bơm(−) → Breadboard rail GND',
      'LCD1602A.RS → ESP32.GPIO1 | LCD.E → ESP32.GPIO2 | LCD.D4-D7 → ESP32.GPIO8/9/10/13',
    ],
    practiceHint: 'B2',
  },

  {
    id: 4,
    icon: <Wind className="w-5 h-5" />,
    title: 'Buổi 4: Hệ thống Cảnh báo Khí độc',
    color: 'from-orange-500 to-red-600',
    accent: '#F97316',
    theory: [
      {
        title: '4.1 Ngưỡng an toàn khí độc theo tiêu chuẩn QCVN',
        content: `Hiểu rõ ngưỡng an toàn là cơ sở thiết kế hệ thống cảnh báo đúng đắn.

🌫️ Các khí độc phổ biến cần giám sát (theo QCVN):

┌──────────┬──────────────┬────────────────────────────────┐
│ Khí      │ Ngưỡng an toàn│ Tác hại khi vượt ngưỡng       │
├──────────┼──────────────┼────────────────────────────────┤
│ CO       │ < 9 ppm/8h   │ Ngộ độc máu, tử vong >1600 ppm│
│ CH4/LPG  │ < 1000 ppm   │ Cháy nổ khi 5–15% thể tích    │
│ NH3      │ < 25 ppm     │ Kích ứng mắt, phổi             │
│ H2S      │ < 1 ppm      │ Độc cực cao, mùi trứng thối   │
│ NO2      │ < 100 µg/m³  │ Gây viêm phổi, hen suyễn      │
└──────────┴──────────────┴────────────────────────────────┘

📋 Tiêu chuẩn Việt Nam liên quan:
• QCVN 05:2023/BTNMT: Chất lượng không khí xung quanh
• QCVN 19:2009/BTNMT: Khí thải công nghiệp`,
      },
      {
        title: '4.2 Cảm biến MQ-2, Còi báo & Quạt thông gió — Sơ đồ hệ thống',
        image: imgMQ2Gas,
        imageCaption: 'Hệ thống cảnh báo khí độc MQ-2: thang đo PPM, còi hú và relay quạt thông gió',
        content: `MQ-2 là cảm biến bán dẫn (Metal Oxide Semiconductor) phát hiện được nhiều loại khí: LPG, Propane, Methane, Alcohol, Hydrogen, Smoke.

🔬 Nguyên lý hoạt động:
• Phần tử nhạy: Lớp SnO₂ (Thiếc dioxide) nung nóng 200–400°C
• Khi có khí: SnO₂ giảm điện trở → điện áp AO tăng
• Không có khí: SnO₂ điện trở cao → AO thấp

📊 Thang đo thực nghiệm MQ-2 (ADC 12-bit):
  AO < 200   → Không khí sạch (SAFE ✅)
  AO 200–300 → Khí nhẹ, theo dõi (WATCH ⚠️)
  AO > 300   → Nguy hiểm, cảnh báo (DANGER 🚨)

🔊 Buzzer — Phát âm thanh cảnh báo:
  digitalWrite(BUZZER_PIN, HIGH); // Bật còi
  noTone(BUZZER_PIN);             // Tắt âm thanh hoàn toàn

🌀 Relay Quạt thông gió:
  Khi khí độc > ngưỡng → BẬT quạt hút khí ra ngoài
  Khi không khí sạch  → TẮT quạt tiết kiệm điện

🔌 Đấu nối (qua Breadboard):
  MQ-2.VCC/GND → Breadboard rail 5V/GND | MQ-2.AO → ESP32.GPIO11
  Buzzer.+ → ESP32.GPIO12 | Buzzer.− → Breadboard rail GND
  Relay.IN → ESP32.GPIO14 (điều khiển quạt)
  Relay.OUT → Fan.VCC (quạt bật/tắt qua relay) | Fan.GND → Breadboard rail GND`,
      },
    ],
    code: `// BUỔI 4: HỆ THỐNG CẢNH BÁO KHÍ ĐỘC (board ESP32-S3-DevKitC-1)
// Cảm biến Gas MQ-2 (GPIO11), Còi hú (GPIO12), Relay Quạt (GPIO14), LCD1602A 16 chân song song (RS:1, E:2, D4-D7: 8/9/10/13)
// Lưu ý: GPIO35/GPIO27 dùng trên ESP32 thường KHÔNG tồn tại/bị hạn chế trên ESP32-S3 nên đã đổi sang GPIO11/GPIO12.

#include <LiquidCrystal.h>

#define GAS_PIN 11
#define BUZZER_PIN 12
#define FAN_RELAY_PIN 14
#define LCD_RS 1
#define LCD_E  2
#define LCD_D4 8
#define LCD_D5 9
#define LCD_D6 10
#define LCD_D7 13

LiquidCrystal lcd(LCD_RS, LCD_E, LCD_D4, LCD_D5, LCD_D6, LCD_D7);

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
    Serial.println("CANH BAO O NHIEM KHI THAI! BAT QUAT THONG GIO!");

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
    components: ['ESP32-S3-DevKitC-1', 'MQ-2 Gas Sensor', 'Buzzer', 'Module Relay 5V', 'Quạt mini DC', 'LCD1602A 16 chân (song song)', 'Breadboard'],
    wiring: [
      'MQ-2.VCC/GND → Breadboard rail 5V/GND | MQ-2.AO → ESP32.GPIO11',
      'Buzzer.+ → ESP32.GPIO12 | Buzzer.− → Breadboard rail GND',
      'Relay.VCC/GND → Breadboard rail 5V/GND | Relay.IN → ESP32.GPIO14',
      'Relay.OUT → Quạt(+) | Quạt(−) → Breadboard rail GND',
      'LCD1602A.RS → ESP32.GPIO1 | LCD.E → ESP32.GPIO2 | LCD.D4-D7 → ESP32.GPIO8/9/10/13',
    ],
    practiceHint: 'B3',
  },

  {
    id: 5,
    icon: <BarChart3 className="w-5 h-5" />,
    title: 'Buổi 5: Hệ thống Quan trắc Khí hậu Tự động',
    color: 'from-violet-500 to-purple-600',
    accent: '#7C3AED',
    theory: [
      {
        title: '5.1 Cảm biến DHT11 & Màn hình LCD1602A — Sơ đồ đấu nối song song',
        content: `DHT11 là cảm biến tích hợp đo đồng thời Nhiệt độ và Độ ẩm không khí, giao tiếp qua giao thức 1-Wire đơn giản.

📊 Thông số kỹ thuật DHT11:
• Dải đo Nhiệt độ: 0°C – 50°C, độ chính xác ±2°C
• Dải đo Độ ẩm: 20% – 95% RH, độ chính xác ±5%
• Điện áp: 3.3V – 5V | Tần số lấy mẫu tối đa: 1 lần/giây
• Chân: VCC (nguồn), DATA (tín hiệu 1-wire), GND (mass)

🔌 Đấu nối DHT11 với ESP32 (qua Breadboard cấp nguồn):
  DHT11.VCC  → Breadboard rail 5V (dây đỏ)
  DHT11.DATA → ESP32.GPIO15 (dây vàng)
  DHT11.GND  → Breadboard rail GND (dây đen)

📐 LCD1602A dùng trong khoá học này là bản TRẦN 16 chân song song (KHÔNG phải module I²C) — cần đấu đủ các chân điều khiển thay vì chỉ 2 chân SDA/SCL:
  VSS/GND, VDD/VCC, V0 (tương phản), RS, RW, E, D4-D7, A/K (đèn nền)

🔌 Đấu nối LCD1602A với ESP32 (chế độ 4-bit song song):
  LCD.VSS, LCD.RW, LCD.V0, LCD.K  → Breadboard rail GND
  LCD.VDD, LCD.A (đèn nền +)      → Breadboard rail 5V
  LCD.RS → ESP32.GPIO1 | LCD.E → ESP32.GPIO2
  LCD.D4-D7 → ESP32.GPIO8 / GPIO9 / GPIO10 / GPIO13
  (V0 nối GND cho tương phản rõ nhất, RW nối GND vì mạch chỉ GHI không ĐỌC từ LCD)`,
      },
      {
        title: '5.2 Thiết kế giao diện LCD 16x2 tối ưu',
        image: imgLCD1602,
        imageCaption: 'Sơ đồ lưới ký tự LCD 16x2 — bố trí thông tin với setCursor() và print() hiệu quả',
        content: `Với chỉ 32 ký tự (16×2), cần thiết kế bố cục hiển thị thật thông minh để truyền đạt tối đa thông tin.

📐 Nguyên tắc thiết kế LCD hiệu quả:
• Dòng 0: Thông số chính (Nhiệt độ, Độ ẩm)
• Dòng 1: Thông số phụ hoặc trạng thái hệ thống
• Dùng chữ viết tắt: T=Temp, H=Humi, G=Gas
• Luôn thêm khoảng trắng cuối để xóa ký tự dư

🗂️ Bố cục tối ưu cho trạm môi trường:
  Hàng 0: "Temp: 28 C     " ← 16 ký tự
  Hàng 1: "Humi: 65 %     " ← 16 ký tự

📍 Tọa độ setCursor(col, row):
  setCursor(0, 0) → Đầu dòng 1 (góc trên trái)
  setCursor(8, 0) → Giữa dòng 1
  setCursor(0, 1) → Đầu dòng 2
  setCursor(8, 1) → Giữa dòng 2

⚠️ Các lỗi phổ biến cần tránh:
  ❌ Dùng lcd.clear() mỗi vòng loop() → gây nhấp nháy màn hình
  ❌ Quên delay ≥1000ms giữa hai lần đọc DHT11
  ❌ Thiếu khoảng trắng cuối lcd.print() → chữ cũ còn sót lại`,
      },
    ],
    code: `// BUỔI 5: HỆ THỐNG QUAN TRẮC KHÍ HẬU TỰ ĐỘNG (board ESP32-S3-DevKitC-1)
// Cảm biến DHT11 (Chân GPIO15) & LCD1602A 16 chân song song (RS:1, E:2, D4-D7: 8/9/10/13)

#include <LiquidCrystal.h>

#define DHT_PIN 15
#define LCD_RS 1
#define LCD_E  2
#define LCD_D4 8
#define LCD_D5 9
#define LCD_D6 10
#define LCD_D7 13

LiquidCrystal lcd(LCD_RS, LCD_E, LCD_D4, LCD_D5, LCD_D6, LCD_D7);

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
    components: ['ESP32-S3-DevKitC-1', 'DHT11 (nhiệt ẩm không khí)', 'LCD1602A 16 chân (song song)', 'Breadboard'],
    wiring: [
      'DHT11.VCC/GND → Breadboard rail 5V/GND | DHT11.DATA → ESP32.GPIO15',
      'LCD1602A.RS → ESP32.GPIO1 | LCD.E → ESP32.GPIO2',
      'LCD1602A.D4-D7 → ESP32.GPIO8 / GPIO9 / GPIO10 / GPIO13',
      'LCD.VDD, LCD.A → Breadboard rail 5V | LCD.VSS, LCD.RW, LCD.V0, LCD.K → Breadboard rail GND',
    ],
    practiceHint: 'B4',
  },

  {
    id: 6,
    icon: <CheckCircle2 className="w-5 h-5" />,
    title: 'Buổi 6: Trình bày Đồ án & Tổng hợp Giải đáp',
    color: 'from-rose-500 to-pink-600',
    accent: '#E11D48',
    theory: [
      {
        title: '6.1 Cấu trúc buổi Trình bày Đồ án',
        content: `Buổi 6 không giới thiệu cảm biến mới — đây là buổi các nhóm trình bày lại 1 trong 4 hệ thống đã học (hoặc phối hợp mở rộng nhiều hệ thống), giảng viên tổng hợp và giải đáp thắc mắc chung.

📝 Mỗi nhóm trình bày cần có:
• Nguyên lý hoạt động của (các) cảm biến chính trong hệ thống chọn
• Sơ đồ đấu nối đầy đủ (dùng nút "Xuất sơ đồ" trong tab Thực hành để in bản vẽ chuẩn kỹ thuật)
• Giải thích luồng code trong loop(): đọc cảm biến → xử lý điều kiện → xuất tín hiệu cảnh báo/điều khiển
• Demo chạy trực tiếp trên mạch ảo (kéo thanh trượt cảm biến để kích hoạt cảnh báo)
• 1 đề xuất cải tiến hoặc mở rộng thực tế (thêm cảm biến, gửi Cloud, thêm mức cảnh báo...)

⏱️ Thời lượng gợi ý: 8–10 phút trình bày + 3–5 phút hỏi đáp mỗi nhóm.

✅ Tiêu chí chấm điểm tham khảo:
  Hiểu đúng nguyên lý cảm biến        — 25%
  Sơ đồ đấu nối chính xác             — 25%
  Giải thích code rõ ràng, đúng logic — 25%
  Demo chạy đúng + đề xuất mở rộng    — 25%`,
      },
      {
        title: '6.2 Bảng Tổng hợp & Câu hỏi Ôn tập 4 Hệ thống',
        content: `📊 Bảng tổng hợp nhanh 4 hệ thống đã học:

┌────┬───────────────────────┬────────────────────┬─────────────────────┐
│Buổi│ Hệ thống               │ Cảm biến / Cơ cấu   │ Ngưỡng cảnh báo     │
├────┼───────────────────────┼────────────────────┼─────────────────────┤
│ 2  │ Quan trắc Nước & Ngập  │ HC-SR04, DS18B20    │ < 15 cm              │
│ 3  │ Tưới cây Tự động       │ Soil, Relay, Bơm    │ < 400 (ADC)          │
│ 4  │ Cảnh báo Khí độc       │ MQ-2, Còi, Quạt     │ > 300 PPM            │
│ 5  │ Quan trắc Khí hậu      │ DHT11, LCD1602A     │ (hiển thị liên tục) │
└────┴───────────────────────┴────────────────────┴─────────────────────┘

💬 Câu hỏi thảo luận tổng hợp:
• Vì sao cả 4 hệ thống đều đấu nguồn qua Breadboard thay vì cắm thẳng vào ESP32?
  (→ Breadboard đóng vai trò "bus" chia sẻ 1 đường 5V/3.3V/GND cho nhiều thiết bị, dễ quan sát và mở rộng)
• Ngưỡng cảnh báo (300 PPM, 400 ADC, 15cm...) trong bài học là minh hoạ hay theo chuẩn kỹ thuật thật?
  (→ Minh hoạ để dễ quan sát trong lớp; triển khai thực tế cần hiệu chuẩn cảm biến và tra QCVN)
• Nếu muốn 1 hệ thống vừa tưới cây VỪA cảnh báo khí độc, cần thay đổi gì về phần cứng và code?
• Hướng mở rộng nào khả thi nhất để đưa dữ liệu 4 hệ thống này lên Cloud (MQTT/HTTP) trong tương lai?`,
      },
    ],
    code: `// VÍ DỤ MỞ RỘNG: KẾT HỢP CẢNH BÁO TỪ 2 HỆ THỐNG (minh hoạ cho phần trình bày)
// Gợi ý: bật đèn cảnh báo chung khi BẤT KỲ hệ thống nào vượt ngưỡng nguy hiểm

#define GAS_PIN     11
#define ALERT_LED   16

void setup() {
  Serial.begin(115200);
  pinMode(ALERT_LED, OUTPUT);
}

void loop() {
  int gasPpm = analogRead(GAS_PIN);
  int waterLevel = 20; // giả định lấy từ HC-SR04, xem code Buổi 2

  bool gasDanger   = gasPpm > 300;
  bool floodDanger = waterLevel < 15;

  if (gasDanger || floodDanger) {
    digitalWrite(ALERT_LED, HIGH);
    Serial.println("CANH BAO TONG HOP: Kiem tra he thong!");
  } else {
    digitalWrite(ALERT_LED, LOW);
  }

  delay(600);
}`,
    components: ['(Không có mạch mới — dùng lại mạch của Buổi 2-5)'],
    wiring: [
      'Buổi 6 không giới thiệu đấu nối mới.',
      'Mỗi nhóm dùng lại mạch của B1, B2, B3 hoặc B4 trong tab Thực hành để demo.',
      'Có thể phối hợp linh kiện của nhiều bài nếu nhóm chọn đề tài mở rộng.',
    ],
    practiceHint: null,
  },
];

const CodeBlock = ({ code }) => {
  const [copied, setCopied] = useState(false);
  return (
    <div className="relative rounded-xl overflow-hidden border border-slate-700/60 mt-3">
      <div className="flex items-center justify-between bg-slate-800/90 px-4 py-2">
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <Code2 className="w-3.5 h-3.5" />
          <span>Arduino C++ — Mã mẫu thực hành</span>
        </div>
        <button onClick={() => { navigator.clipboard.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
          className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-md bg-slate-700 hover:bg-slate-600 text-slate-300 transition-colors">
          {copied ? <CheckCircle2 className="w-3.5 h-3.5 text-green-400" /> : <Code2 className="w-3.5 h-3.5" />}
          {copied ? 'Đã sao chép!' : 'Sao chép'}
        </button>
      </div>
      <pre className="bg-[#0D1117] text-slate-200 text-xs leading-relaxed p-4 overflow-x-auto font-mono max-h-72 overflow-y-auto">
        <code>{code}</code>
      </pre>
    </div>
  );
};

const TheorySection = ({ section }) => {
  const [open, setOpen] = useState(true);
  return (
    <div className="border border-slate-700/50 rounded-xl overflow-hidden mb-3">
      <button onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-4 py-3 bg-slate-800/60 hover:bg-slate-800/90 text-left transition-colors">
        <span className="text-sm font-semibold text-slate-200">{section.title}</span>
        {open ? <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" /> : <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />}
      </button>
      {open && (
        <div className="bg-slate-900/50">
          {section.image && (
            <div className="px-4 pt-4">
              <div className="rounded-xl overflow-hidden border border-slate-700/40 bg-slate-950">
                <img src={section.image} alt={section.imageCaption || section.title}
                  className="w-full object-contain max-h-64" />
              </div>
              {section.imageCaption && (
                <p className="text-center text-[10px] text-slate-500 mt-1.5 italic">{section.imageCaption}</p>
              )}
            </div>
          )}
          <div className="px-4 py-3 text-slate-300 text-xs leading-relaxed whitespace-pre-line font-mono">
            {section.content}
          </div>
        </div>
      )}
    </div>
  );
};

export default function TheoryTab({ isDarkMode }) {
  const [activeSession, setActiveSession] = useState(0);
  const session = SESSIONS[activeSession];

  return (
    <div className={`flex h-full overflow-hidden ${isDarkMode ? 'bg-[#0B0F19] text-slate-100' : 'bg-slate-50 text-slate-800'}`}>
      {/* Sidebar */}
      <div className={`w-60 shrink-0 flex flex-col border-r ${isDarkMode ? 'border-slate-700/50 bg-slate-900/60' : 'border-slate-200 bg-white'} overflow-y-auto`}>
        <div className="px-4 pt-4 pb-3 border-b border-slate-700/40">
          <div className="flex items-center gap-2 mb-1">
            <BookOpen className="w-4 h-4 text-blue-400" />
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">Lý thuyết</span>
          </div>
          <p className="text-[10px] text-slate-500 leading-snug">IoT trong Kỹ thuật Môi trường — 6 Buổi</p>
        </div>
        <div className="flex-1 p-2">
          {SESSIONS.map((s, idx) => (
            <button key={s.id} onClick={() => setActiveSession(idx)}
              className={`w-full text-left px-3 py-2.5 rounded-lg mb-1 transition-all flex items-start gap-2.5 ${
                activeSession === idx
                  ? 'bg-gradient-to-r ' + s.color + ' text-white shadow-lg'
                  : isDarkMode ? 'text-slate-400 hover:bg-slate-800 hover:text-slate-200' : 'text-slate-600 hover:bg-slate-100'
              }`}>
              <span className={`mt-0.5 shrink-0 ${activeSession === idx ? 'text-white' : 'text-slate-500'}`}>{s.icon}</span>
              <div>
                <div className="text-[10px] font-bold uppercase tracking-widest opacity-70 mb-0.5">Buổi {s.id}</div>
                <div className="text-xs font-medium leading-tight">{s.title.split(':')[1]?.trim()}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-y-auto p-5">
        <div className={`rounded-2xl p-5 mb-5 bg-gradient-to-r ${session.color} text-white shadow-lg`}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur shrink-0">{session.icon}</div>
            <div>
              <div className="text-xs font-bold uppercase tracking-widest opacity-80 mb-0.5">Buổi {session.id} / 6 — Lý thuyết & Thực hành</div>
              <h2 className="text-base font-bold leading-tight">{session.title.split(':')[1]?.trim()}</h2>
            </div>
          </div>
        </div>

        <div className={`rounded-xl border p-4 mb-4 ${isDarkMode ? 'border-slate-700/50 bg-slate-900/40' : 'border-slate-200 bg-white'}`}>
          <div className="flex items-center gap-2 mb-2.5">
            <Wrench className="w-4 h-4" style={{ color: session.accent }} />
            <span className="text-sm font-bold">Linh kiện cần chuẩn bị</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {session.components.map((c, i) => (
              <span key={i} className="px-2.5 py-1 rounded-lg text-xs font-medium"
                style={{ background: session.accent + '22', color: session.accent, border: `1px solid ${session.accent}44` }}>{c}</span>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
            <BookOpen className="w-3.5 h-3.5" /> Nội dung Lý thuyết
          </h3>
          {session.theory.map((s, i) => <TheorySection key={i} section={s} />)}
        </div>

        <div className={`rounded-xl border p-4 mb-4 ${isDarkMode ? 'border-slate-700/50 bg-slate-900/40' : 'border-slate-200 bg-white'}`}>
          <div className="flex items-center gap-2 mb-3">
            <Zap className="w-4 h-4 text-yellow-400" />
            <span className="text-sm font-bold">Sơ đồ đấu nối (Wiring Guide)</span>
          </div>
          <div className="space-y-1.5">
            {session.wiring.map((w, i) => (
              <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                <span className="text-yellow-400 shrink-0 mt-0.5">→</span>
                <code className="font-mono leading-relaxed">{w}</code>
              </div>
            ))}
          </div>
          <div className={`mt-3 px-3 py-2 rounded-lg text-xs flex items-start gap-2 ${isDarkMode ? 'bg-amber-900/30 text-amber-300 border border-amber-800/40' : 'bg-amber-50 text-amber-700 border border-amber-200'}`}>
            <AlertTriangle className="w-3.5 h-3.5 mt-0.5 shrink-0" />
            <span>Kiểm tra kỹ cực tính (+ / −) và điện áp (3.3V/5V) trước khi cấp điện. Đấu sai có thể hỏng cảm biến vĩnh viễn.</span>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-2">
            <Code2 className="w-3.5 h-3.5" /> Mã nguồn mẫu Arduino
          </h3>
          <CodeBlock code={session.code} />
          <div className={`mt-3 px-3 py-2.5 rounded-lg text-xs flex items-center gap-2 ${isDarkMode ? 'bg-emerald-900/30 text-emerald-300 border border-emerald-800/40' : 'bg-emerald-50 text-emerald-700 border border-emerald-200'}`}>
            <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
            {session.practiceHint ? (
              <span>Nhấn tab <strong>Thực hành trên mạch</strong> → chọn <strong>{session.practiceHint}</strong> để chạy mã này trực tiếp trên mạch ảo!</span>
            ) : (
              <span>Buổi này không có bài mạch mới — hãy dùng lại các bài <strong>B1-B4</strong> trong tab Thực hành để demo trình bày.</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
