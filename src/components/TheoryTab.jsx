import React, { useState } from 'react';
import { BookOpen, Cpu, Zap, Droplets, Wind, Radio, BarChart3, ChevronDown, ChevronRight, Code2, Wrench, AlertTriangle, CheckCircle2 } from 'lucide-react';

// Import ảnh trực tiếp qua Vite — tự động xử lý base path đúng cho GitHub Pages
import imgESP32 from '../assets/theory-images/esp32_pinout.png';
import imgDHT11LCD from '../assets/theory-images/dht11_lcd1602_wiring.png';
import imgIoTArch from '../assets/theory-images/iot_architecture.png';
import imgHCSR04 from '../assets/theory-images/hcsr04_water_level.png';
import imgSoilPump from '../assets/theory-images/soil_relay_pump.png';
import imgMQ2Gas from '../assets/theory-images/mq2_gas_alarm.png';
import imgLCD1602 from '../assets/theory-images/lcd1602_grid.png';
import imgMQTT from '../assets/theory-images/mqtt_cloud.png';

const SESSIONS = [
  {
    id: 1,
    icon: <Cpu className="w-5 h-5" />,
    title: 'Buổi 1: Tổng quan IoT & Quan trắc Khí hậu',
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
• Hệ thống tưới tiêu thông minh nông nghiệp CNC`,
      },
      {
        title: '1.2 Vi điều khiển ESP32 — Trái tim của Trạm IoT',
        image: imgESP32,
        imageCaption: 'Sơ đồ chân ESP32 DevKit V1 — các chân quan trọng cho IoT Môi trường',
        content: `ESP32 là vi điều khiển 32-bit lưỡng nhân (Dual-Core) của Espressif Systems, tích hợp sẵn WiFi & Bluetooth — lý tưởng cho các dự án IoT môi trường.

📋 Thông số kỹ thuật quan trọng:
• CPU: Xtensa LX6 Dual-Core 240 MHz
• RAM: 520 KB SRAM | Flash: 4 MB
• GPIO: 38 chân (Digital + Analog)
• ADC: 12-bit (0–4095), 18 kênh
• Kết nối: WiFi 802.11 b/g/n, Bluetooth 4.2/5.0
• Nguồn điện: 3.3V logic, cấp nguồn qua USB 5V

🔌 Sơ đồ chân quan trọng nhất:
┌─────────────────────────────────────────┐
│ VIN   → 5V output khi cắm USB           │
│ 3V3   → 3.3V regulated output           │
│ GND   → Mass/Ground                     │
│ D21   → SDA (I²C Bus — LCD, BMP280)     │
│ D22   → SCL (I²C Bus — LCD, BMP280)     │
│ D15   → DHT11 Data (1-Wire)             │
│ D4    → DS18B20 Data (1-Wire)           │
│ D34–39 → CHỈ ĐỌC ADC (không ghi được)  │
└─────────────────────────────────────────┘

⚠️ Lưu ý quan trọng:
Chân D34, D35, D36, D39 của ESP32 là INPUT ONLY — không dùng làm OUTPUT.
Chỉ dùng các chân này để đọc tín hiệu Analog từ cảm biến (MQ-2, Soil Moisture...).`,
      },
      {
        title: '1.3 Cảm biến DHT11 & Màn hình LCD1602 — Sơ đồ đấu nối',
        image: imgDHT11LCD,
        imageCaption: 'Sơ đồ đấu nối hoàn chỉnh: ESP32 + DHT11 + LCD1602 I²C cho Bài thực hành 1',
        content: `DHT11 là cảm biến tích hợp đo đồng thời Nhiệt độ và Độ ẩm không khí, giao tiếp qua giao thức 1-Wire đơn giản.

📊 Thông số kỹ thuật DHT11:
• Dải đo Nhiệt độ: 0°C – 50°C, độ chính xác ±2°C
• Dải đo Độ ẩm: 20% – 95% RH, độ chính xác ±5%
• Điện áp: 3.3V – 5V | Tần số lấy mẫu tối đa: 1 lần/giây
• Chân: VCC (nguồn), DATA (tín hiệu 1-wire), GND (mass)

🔌 Đấu nối DHT11 với ESP32:
  DHT11.VCC  → ESP32.VIN (5V, dây đỏ)
  DHT11.DATA → ESP32.D15 (+ điện trở kéo 10kΩ lên VCC)
  DHT11.GND  → ESP32.GND (dây đen/xanh)

📐 Thông số kỹ thuật LCD1602 I²C:
• Hiển thị 32 ký tự ASCII (2 dòng × 16 ký tự)
• Giao tiếp I²C, địa chỉ 0x27 hoặc 0x3F
• Điện áp: 5V

🔌 Đấu nối LCD1602 với ESP32:
  LCD.VCC → ESP32.VIN | LCD.GND → ESP32.GND
  LCD.SDA → ESP32.D21 (dây tím)
  LCD.SCL → ESP32.D22 (dây xanh dương)`,
      },
      {
        title: '1.4 Lập trình LCD1602 — Các lệnh cơ bản',
        content: `⌨️ Các lệnh quan trọng nhất khi lập trình LCD:

  lcd.begin(16, 2);        // Khởi tạo LCD 16 cột, 2 hàng
  lcd.setCursor(0, 0);     // Di chuyển đến cột 0, hàng 0
  lcd.print("Hello!");     // In chuỗi ký tự
  lcd.clear();             // Xóa toàn bộ màn hình
  lcd.setCursor(0, 1);     // Di chuyển xuống hàng 2

🎯 Kỹ thuật tránh nhấp nháy (quan trọng!):
  ❌ Sai: lcd.clear() mỗi vòng loop → gây nhấp nháy
  ✓ Đúng: Ghi đè với khoảng trắng cuối chuỗi
  Ví dụ: lcd.print("Temp: "); lcd.print(temp); lcd.print(" C   ");
  (khoảng trắng thừa cuối xóa ký tự cũ còn dư)

📌 So sánh DHT11 vs DHT22:
• DHT11: Rẻ hơn, độ chính xác thấp hơn, đo 0–50°C → Phù hợp học tập
• DHT22: Đắt hơn, chính xác hơn (±0.5°C), đo -40°C – 80°C → Triển khai thực tế`,
      },
    ],
    code: `#include <LiquidCrystal.h>
#define DHT_PIN 15

LiquidCrystal lcd;

void setup() {
  Serial.begin(115200);
  lcd.begin(16, 2);
  lcd.print("IOT KMT Lab 1");
  delay(1500);
}

void loop() {
  int temp = analogRead(DHT_PIN);       // Nhiệt độ live (°C)
  int humi = dhtReadHumidity(DHT_PIN);  // Độ ẩm live (%)

  Serial.print("Nhiet do: "); Serial.print(temp); Serial.print(" C | ");
  Serial.print("Do am: ");   Serial.print(humi); Serial.println(" %");

  lcd.setCursor(0, 0);
  lcd.print("Temp: "); lcd.print(temp); lcd.print(" C   ");
  lcd.setCursor(0, 1);
  lcd.print("Humi: "); lcd.print(humi); lcd.print(" %   ");

  delay(600);
}`,
    components: ['ESP32 DevKit V1', 'DHT11 Sensor', 'LCD1602 I²C (PCF8574)', 'Điện trở 10kΩ'],
    wiring: [
      'DHT11.VCC  → ESP32.VIN (5V — dây đỏ)',
      'DHT11.GND  → ESP32.GND (dây đen)',
      'DHT11.DATA → ESP32.D15 (dây vàng + điện trở 10kΩ kéo lên VCC)',
      'LCD.VCC    → ESP32.VIN (dây đỏ)',
      'LCD.GND    → ESP32.GND (dây đen)',
      'LCD.SDA    → ESP32.D21 (dây tím)',
      'LCD.SCL    → ESP32.D22 (dây xanh dương)',
    ],
  },

  {
    id: 2,
    icon: <Droplets className="w-5 h-5" />,
    title: 'Buổi 2: Quan trắc Nguồn nước & Cảnh báo Ngập',
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

🔌 Đấu nối:
  HC-SR04.VCC  → ESP32.VIN | GND → ESP32.GND
  HC-SR04.TRIG → ESP32.D5 (dây xanh lá)
  HC-SR04.ECHO → ESP32.D18 (dây tím)`,
      },
      {
        title: '2.3 Cảm biến DS18B20 — Nhiệt độ nước chống thấm',
        content: `DS18B20 là cảm biến nhiệt độ kỹ thuật số 1-Wire, có phiên bản chống thấm nước (dạng đầu dò inox), lý tưởng đo nhiệt độ sông hồ, ao nuôi thủy sản.

📋 Thông số kỹ thuật:
• Dải đo: -55°C đến +125°C, độ chính xác ±0.5°C
• Giao thức: Dallas 1-Wire (hỗ trợ nhiều cảm biến trên 1 bus)
• Điện áp: 3.0V – 5.5V
• BẮT BUỘC: Điện trở kéo 4.7kΩ giữa DATA và VCC

🔌 Đấu nối với ESP32:
  DS18B20.VCC  → ESP32.3V3 (dây đỏ)
  DS18B20.DATA → ESP32.D4 (dây vàng + điện trở kéo 4.7kΩ lên 3V3)
  DS18B20.GND  → ESP32.GND (dây đen)

⚠️ Không có điện trở 4.7kΩ → DS18B20 không hoạt động!`,
      },
    ],
    code: `#include <LiquidCrystal.h>
#define TRIG_PIN  5
#define ECHO_PIN 18
#define TEMP_PIN  4

LiquidCrystal lcd;

void setup() {
  Serial.begin(115200);
  pinMode(TRIG_PIN, OUTPUT);
  pinMode(ECHO_PIN, INPUT);
  lcd.begin(16, 2);
  lcd.print("QUAN TRAC NUOC");
  delay(1500);
}

void loop() {
  digitalWrite(TRIG_PIN, LOW);   delayMicroseconds(2);
  digitalWrite(TRIG_PIN, HIGH);  delayMicroseconds(10);
  digitalWrite(TRIG_PIN, LOW);
  long dur = pulseIn(ECHO_PIN, HIGH);
  int distCm = dur * 0.034 / 2;
  int waterTemp = analogRead(TEMP_PIN);

  Serial.print("Muc nuoc: "); Serial.print(distCm); Serial.print(" cm | ");
  Serial.print("Nhiet do: "); Serial.print(waterTemp); Serial.println(" C");

  lcd.setCursor(0, 0);
  lcd.print("MucNuoc:"); lcd.print(distCm); lcd.print("cm  ");
  lcd.setCursor(0, 1);
  if (distCm < 15) { lcd.print("!!! NGAP LUT !!!"); }
  else { lcd.print("NhietDo:"); lcd.print(waterTemp); lcd.print("C  "); }
  delay(600);
}`,
    components: ['ESP32 DevKit', 'HC-SR04 Ultrasonic Sensor', 'DS18B20 (chống nước)', 'LCD1602 I²C', 'Điện trở 4.7kΩ'],
    wiring: [
      'HC-SR04.VCC  → ESP32.VIN | HC-SR04.GND → ESP32.GND',
      'HC-SR04.TRIG → ESP32.D5 (dây xanh lá)',
      'HC-SR04.ECHO → ESP32.D18 (dây tím)',
      'DS18B20.VCC  → ESP32.3V3 | DS18B20.GND → ESP32.GND',
      'DS18B20.DATA → ESP32.D4 (dây vàng + điện trở kéo 4.7kΩ)',
      'LCD.SDA → ESP32.D21 | LCD.SCL → ESP32.D22',
    ],
  },

  {
    id: 3,
    icon: <Droplets className="w-5 h-5" />,
    title: 'Buổi 3: Giám sát Đất & Tưới cây Tự động',
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

🔌 Đấu nối Cảm biến Đất:
  Soil.VCC → ESP32.3V3 | Soil.GND → ESP32.GND
  Soil.AO  → ESP32.D34 (ADC Analog Input — chỉ đọc)

🔌 Đấu nối Relay + Bơm:
  Relay.VCC → ESP32.VIN | Relay.GND → ESP32.GND
  Relay.IN  → ESP32.D26 (tín hiệu điều khiển)
  Relay.NO  → Cực (+) nguồn Bơm (thường mở)
  Bơm.(-) → GND chung`,
      },
      {
        title: '3.3 Module Relay — Điều khiển thiết bị công suất lớn',
        content: `Module Relay là cầu nối cho phép ESP32 (3.3V) điều khiển an toàn các thiết bị công suất lớn như máy bơm 220V AC hoặc bơm 12V DC.

📍 Sơ đồ cực tải Relay:
  COM (Common)        → Kết nối nguồn dương của bơm
  NO  (Normally Open) → Mở khi chưa kích, đóng khi kích
  NC  (Normally Closed) → Đóng khi chưa kích, mở khi kích

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
    code: `#include <LiquidCrystal.h>
#define SOIL_PIN   34
#define RELAY_PIN  26

LiquidCrystal lcd;

void setup() {
  Serial.begin(115200);
  pinMode(RELAY_PIN, OUTPUT);
  digitalWrite(RELAY_PIN, LOW);
  lcd.begin(16, 2);
  lcd.print("HE THONG TUOI");
  delay(1500);
}

void loop() {
  int soilVal = analogRead(SOIL_PIN);

  Serial.print("Do am dat: "); Serial.println(soilVal);
  lcd.setCursor(0, 0);
  lcd.print("DoAmDat: "); lcd.print(soilVal); lcd.print("   ");

  if (soilVal < 400) {
    digitalWrite(RELAY_PIN, HIGH);
    lcd.setCursor(0, 1);
    lcd.print("BOM: DANG TUOI! ");
  } else {
    digitalWrite(RELAY_PIN, LOW);
    lcd.setCursor(0, 1);
    lcd.print("BOM: TAT (DU AM)");
  }
  delay(600);
}`,
    components: ['ESP32', 'Soil Moisture Sensor', 'Module Relay 5V/10A', 'DC Motor/Bơm nước', 'LCD1602 I²C'],
    wiring: [
      'Soil.VCC → ESP32.3V3 | Soil.GND → ESP32.GND',
      'Soil.AO  → ESP32.D34 (Analog Input chỉ đọc)',
      'Relay.VCC → ESP32.VIN | Relay.GND → ESP32.GND',
      'Relay.IN  → ESP32.D26 | Relay.NO → Cực (+) Bơm',
      'LCD.SDA → ESP32.D21 | LCD.SCL → ESP32.D22',
    ],
  },

  {
    id: 4,
    icon: <Wind className="w-5 h-5" />,
    title: 'Buổi 4: Cảnh báo Khí độc & Kiểm soát Không khí',
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
  AO 200–400 → Khí nhẹ, theo dõi (WATCH ⚠️)
  AO > 400   → Nguy hiểm, cảnh báo (DANGER 🚨)

🔊 Buzzer Passive — Phát âm thanh cảnh báo:
  tone(BUZZER_PIN, 1000);   // Kêu tần số 1000 Hz
  noTone(BUZZER_PIN);       // Tắt âm thanh hoàn toàn

🌀 Relay Quạt thông gió:
  Khi khí độc > ngưỡng → BẬT quạt hút khí ra ngoài
  Khi không khí sạch  → TẮT quạt tiết kiệm điện

🔌 Đấu nối:
  MQ-2.AO  → ESP32.D35 | MQ-2.VCC → ESP32.VIN
  Buzzer.+ → ESP32.D27 | Buzzer.− → ESP32.GND
  Relay.IN → ESP32.D14 (điều khiển quạt)
  Relay.OUT → Fan.VCC (quạt bật/tắt qua relay)`,
      },
    ],
    code: `#include <LiquidCrystal.h>
#define GAS_PIN    35
#define BUZZER_PIN 27
#define FAN_PIN    14

LiquidCrystal lcd;

void setup() {
  Serial.begin(115200);
  pinMode(BUZZER_PIN, OUTPUT);
  pinMode(FAN_PIN, OUTPUT);
  lcd.begin(16, 2);
  lcd.print("GIAM SAT KHI DOC");
  delay(1500);
}

void loop() {
  int gasPpm = analogRead(GAS_PIN);
  Serial.print("Gas MQ-2: "); Serial.print(gasPpm); Serial.println(" PPM");
  lcd.setCursor(0, 0);
  lcd.print("Gas: "); lcd.print(gasPpm); lcd.print(" PPM   ");
  if (gasPpm > 300) {
    digitalWrite(BUZZER_PIN, HIGH);
    digitalWrite(FAN_PIN, HIGH);
    lcd.setCursor(0, 1);
    lcd.print("DANGER! FAN: ON ");
  } else {
    noTone(BUZZER_PIN);
    digitalWrite(BUZZER_PIN, LOW);
    digitalWrite(FAN_PIN, LOW);
    lcd.setCursor(0, 1);
    lcd.print("Status: AN TOAN ");
  }
  delay(600);
}`,
    components: ['ESP32', 'MQ-2 Gas Sensor', 'Buzzer Passive 5V', 'Module Relay 5V', 'Quạt mini DC', 'LCD1602 I²C'],
    wiring: [
      'MQ-2.VCC → ESP32.VIN | MQ-2.GND → ESP32.GND',
      'MQ-2.AO  → ESP32.D35 (Analog, chỉ đọc)',
      'Buzzer.+ → ESP32.D27 | Buzzer.− → ESP32.GND',
      'Relay.IN  → ESP32.D14 | Relay.VCC → ESP32.VIN',
      'Relay.OUT → Fan.VCC (quạt thông gió)',
      'LCD.SDA → ESP32.D21 | LCD.SCL → ESP32.D22',
    ],
  },

  {
    id: 5,
    icon: <BarChart3 className="w-5 h-5" />,
    title: 'Buổi 5: Trạm HMI Môi trường Đa cảm biến',
    color: 'from-violet-500 to-purple-600',
    accent: '#7C3AED',
    theory: [
      {
        title: '5.1 HMI (Human-Machine Interface) trong Quan trắc Môi trường',
        content: `HMI là giao diện giúp người vận hành theo dõi và tương tác với hệ thống quan trắc mà không cần kết nối Internet.

🖥️ Các loại HMI trong hệ thống IoT:
• HMI tại chỗ: LCD/OLED, đèn LED, còi, bảng số
• HMI từ xa: Web dashboard, app mobile, SMS alert
• HMI tập trung: SCADA tại trung tâm điều hành

💡 Tại sao cần HMI tại chỗ?
  ✓ Hoạt động khi mất Internet/điện thoại
  ✓ Kỹ thuật viên đọc số liệu trực tiếp tại trạm
  ✓ Phản ứng nhanh không cần đợi server
  ✓ Chi phí thấp, đơn giản, đáng tin cậy

📋 Phân bổ GPIO cho Bài 5 (không xung đột):
  ┌──────┬───────────────────────────────┐
  │ Chân │ Thiết bị / Chức năng          │
  ├──────┼───────────────────────────────┤
  │ D15  │ DHT11 DATA (1-Wire)           │
  │ D34  │ MQ-2 Analog Out (chỉ đọc)    │
  │ D21  │ LCD SDA (I²C Bus)             │
  │ D22  │ LCD SCL (I²C Bus)             │
  └──────┴───────────────────────────────┘`,
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
  Hàng 0: "T:28C H:65%     " ← 16 ký tự
  Hàng 1: "Gas: 180 PPM   " ← 16 ký tự

📍 Tọa độ setCursor(col, row):
  setCursor(0, 0) → Đầu dòng 1 (góc trên trái)
  setCursor(8, 0) → Giữa dòng 1
  setCursor(0, 1) → Đầu dòng 2
  setCursor(8, 1) → Giữa dòng 2

⚠️ Các lỗi phổ biến cần tránh:
  ❌ Dùng D34–D39 làm OUTPUT → Lỗi phần cứng
  ❌ Quên delay(1000ms) giữa hai lần đọc DHT11
  ❌ Thiếu khoảng trắng cuối lcd.print()`,
      },
    ],
    code: `#include <LiquidCrystal.h>
#define DHT_PIN 15
#define GAS_PIN 34

LiquidCrystal lcd;

void setup() {
  Serial.begin(115200);
  lcd.begin(16, 2);
  lcd.print("TRAM HMI KMT");
  delay(1500);
}

void loop() {
  int temp   = analogRead(DHT_PIN);
  int humi   = dhtReadHumidity(DHT_PIN);
  int gasPpm = analogRead(GAS_PIN);

  Serial.print("T:"); Serial.print(temp); Serial.print("C | ");
  Serial.print("H:"); Serial.print(humi); Serial.print("% | ");
  Serial.print("Gas:"); Serial.print(gasPpm); Serial.println("ppm");

  lcd.setCursor(0, 0);
  lcd.print("T:"); lcd.print(temp); lcd.print("C H:");
  lcd.print(humi); lcd.print("%   ");
  lcd.setCursor(0, 1);
  lcd.print("Gas PPM: "); lcd.print(gasPpm); lcd.print("  ");

  delay(600);
}`,
    components: ['ESP32', 'DHT11 (nhiệt ẩm không khí)', 'MQ-2 (khí gas)', 'LCD1602 I²C (HMI)'],
    wiring: [
      'DHT11.DATA → D15 | DHT11.VCC → VIN',
      'MQ-2.AO   → D34 | MQ-2.VCC → VIN',
      'LCD.SDA → D21 | LCD.SCL → D22',
      'Tất cả GND nối chung → ESP32.GND',
    ],
  },

  {
    id: 6,
    icon: <Radio className="w-5 h-5" />,
    title: 'Buổi 6: Trạm IoT Đa thông số & Cloud',
    color: 'from-rose-500 to-pink-600',
    accent: '#E11D48',
    theory: [
      {
        title: '6.1 Kiến trúc Trạm Quan trắc Môi trường IoT đầy đủ',
        image: imgIoTArch,
        imageCaption: 'Kiến trúc đầy đủ Trạm IoT Môi trường 4 lớp — từ Cảm biến đến Cloud Dashboard',
        content: `Trạm quan trắc môi trường IoT đầy đủ tích hợp nhiều cảm biến, kết nối Cloud và phân tích dữ liệu thời gian thực.

🏗️ Cấu trúc phần cứng Trạm IoT đa thông số:
  ESP32 (CPU trung tâm)
  ├── DHT11  (D15) → Nhiệt độ & Độ ẩm không khí
  ├── MQ-2   (D35) → Nồng độ khí gas/khói
  ├── HC-SR04 (D5/D18) → Mực nước bề mặt
  └── LCD1602 I²C (D21/D22) → Hiển thị tại chỗ

📡 Kết nối Cloud từ ESP32:
  WiFi → Router → Internet → MQTT Broker
  Giao thức: MQTT (nhẹ, tiết kiệm pin, real-time)
  Nền tảng phổ biến: ThingSpeak, Blynk, Grafana`,
      },
      {
        title: '6.2 Giao thức MQTT — Xương sống của IoT Cloud',
        image: imgMQTT,
        imageCaption: 'Mô hình MQTT Publish/Subscribe: ESP32 gửi dữ liệu, Dashboard nhận theo thời gian thực',
        content: `MQTT (Message Queuing Telemetry Transport) là giao thức truyền thông nhẹ, được thiết kế đặc biệt cho IoT.

🌐 Mô hình Publish/Subscribe:
  ESP32 (Publisher) → MQTT Broker → Dashboard (Subscriber)

📂 Cấu trúc Topic MQTT cho Trạm KMT:
  kmt/station01/temperature  → "28.5"
  kmt/station01/humidity     → "65.2"
  kmt/station01/gas_ppm      → "180"
  kmt/station01/water_level  → "45"

📄 Định dạng JSON payload chuẩn:
{
  "station_id": "KMT_LAB_01",
  "sensors": {
    "temp": 28.5, "humi": 65.2,
    "gas":  180,  "water": 45
  },
  "alerts": { "gas_danger": false, "flood": true }
}

📊 Tổng kết 6 Buổi học:
  ✓ B1: ESP32 + DHT11 → LCD1602 (Nhiệt ẩm)
  ✓ B2: HC-SR04 + DS18B20 → Cảnh báo ngập
  ✓ B3: Soil Moisture + Relay → Tưới tự động
  ✓ B4: MQ-2 + Buzzer + Quạt → Cảnh báo khí độc
  ✓ B5: Đa cảm biến → HMI LCD1602 tại chỗ
  ✓ B6: Trạm đa thông số → Telemetry JSON + MQTT`,
      },
    ],
    code: `#include <LiquidCrystal.h>
#define DHT_PIN   15
#define GAS_PIN   35
#define TRIG_PIN   5
#define ECHO_PIN  18

LiquidCrystal lcd;

void setup() {
  Serial.begin(115200);
  pinMode(TRIG_PIN, OUTPUT);
  pinMode(ECHO_PIN, INPUT);
  lcd.begin(16, 2);
  lcd.print("IOT ENV STATION");
  delay(1500);
}

void loop() {
  int temp   = analogRead(DHT_PIN);
  int humi   = dhtReadHumidity(DHT_PIN);
  int gasPpm = analogRead(GAS_PIN);
  digitalWrite(TRIG_PIN, LOW);  delayMicroseconds(2);
  digitalWrite(TRIG_PIN, HIGH); delayMicroseconds(10);
  digitalWrite(TRIG_PIN, LOW);
  long dur = pulseIn(ECHO_PIN, HIGH);
  int waterLevel = dur * 0.034 / 2;

  // Telemetry JSON qua Serial
  Serial.print("{\\"temp\\":"); Serial.print(temp);
  Serial.print(",\\"humi\\":"); Serial.print(humi);
  Serial.print(",\\"gas\\":"); Serial.print(gasPpm);
  Serial.print(",\\"water\\":"); Serial.print(waterLevel);
  Serial.println("}");

  lcd.setCursor(0, 0);
  lcd.print("T:"); lcd.print(temp); lcd.print("C H:");
  lcd.print(humi); lcd.print("% G:"); lcd.print(gasPpm);
  lcd.setCursor(0, 1);
  lcd.print("Water:"); lcd.print(waterLevel); lcd.print("cm    ");
  delay(600);
}`,
    components: ['ESP32 WiFi', 'DHT11', 'MQ-2', 'HC-SR04', 'LCD1602 I²C'],
    wiring: [
      'DHT11.DATA → D15 | MQ-2.AO → D35',
      'HC-SR04.TRIG → D5 | HC-SR04.ECHO → D18',
      'LCD.SDA → D21 | LCD.SCL → D22',
      'Tất cả VCC → ESP32.VIN | Tất cả GND → ESP32.GND',
    ],
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
            <span>Nhấn tab <strong>Thực hành trên mạch</strong> → chọn <strong>Buổi {session.id}</strong> để chạy mã này trực tiếp trên mạch ảo!</span>
          </div>
        </div>
      </div>
    </div>
  );
}
