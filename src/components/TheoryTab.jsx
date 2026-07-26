import React, { useState } from 'react';
import { BookOpen, Cpu, Zap, Droplets, Wind, Radio, BarChart3, ChevronDown, ChevronRight, Code2, Wrench, AlertTriangle, CheckCircle2, Image as ImageIcon } from 'lucide-react';

// Base path for theory images (served from /public)
const IMG = '/theory-images';

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
        image: `${IMG}/iot_architecture.png`,
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
        image: `${IMG}/esp32_pinout.png`,
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
        title: '1.3 Cảm biến DHT11 — Đo Nhiệt độ & Độ ẩm không khí',
        image: `${IMG}/dht11_lcd1602_wiring.png`,
        imageCaption: 'Sơ đồ đấu nối ESP32 + DHT11 + LCD1602 I²C cho Bài thực hành 1',
        content: `DHT11 là cảm biến tích hợp đo đồng thời Nhiệt độ và Độ ẩm không khí, giao tiếp qua giao thức 1-Wire đơn giản.

📊 Thông số kỹ thuật:
• Dải đo Nhiệt độ: 0°C – 50°C, độ chính xác ±2°C
• Dải đo Độ ẩm: 20% – 95% RH, độ chính xác ±5%
• Điện áp: 3.3V – 5V (thường dùng 5V cho ổn định)
• Tần số lấy mẫu tối đa: 1 lần/giây (delay 1000ms tối thiểu)
• Chân: VCC (nguồn), DATA (tín hiệu 1-wire), GND (mass)

🔌 Cấu tạo bên trong DHT11:
• Cảm biến nhiệt điện trở NTC đo nhiệt độ
• Cảm biến điện dung polymer đo độ ẩm
• Vi xử lý tích hợp số hóa và truyền dữ liệu

💡 Cách đấu nối đúng:
  DHT11.VCC  → ESP32.VIN (5V, dây đỏ)
  DHT11.DATA → ESP32.D15 (+ điện trở kéo 10kΩ lên VCC)
  DHT11.GND  → ESP32.GND (dây đen/xanh)

📌 So sánh DHT11 vs DHT22 (nên biết):
• DHT11: Rẻ hơn, độ chính xác thấp hơn, đo 0–50°C
• DHT22: Đắt hơn, chính xác hơn (±0.5°C), đo -40°C – 80°C`,
      },
      {
        title: '1.4 Màn hình LCD1602 I²C — Hiển thị dữ liệu tại chỗ',
        content: `LCD1602 I²C là màn hình LCD 16 cột × 2 hàng, module giao tiếp I²C (PCF8574) giúp tiết kiệm chân GPIO — chỉ cần 2 dây SDA và SCL.

📐 Đặc điểm kỹ thuật:
• Hiển thị 32 ký tự ASCII (2 dòng × 16 ký tự)
• Giao tiếp I²C (Inter-Integrated Circuit), tốc độ 100–400 kHz
• Địa chỉ I²C: 0x27 (phổ biến) hoặc 0x3F
• Điện áp: 5V (VCC), 3.3V logic tương thích
• Đèn nền LED xanh, điều chỉnh được qua biến trở

⌨️ Lập trình LCD - Các lệnh quan trọng:
  lcd.begin(16, 2);        // Khởi tạo 16 cột, 2 hàng
  lcd.setCursor(0, 0);     // Di chuyển đến cột 0, hàng 0
  lcd.print("Hello!");     // In chuỗi ký tự
  lcd.clear();             // Xóa toàn bộ màn hình
  lcd.setCursor(0, 1);     // Di chuyển xuống hàng 2

🎯 Kỹ thuật tránh nhấp nháy (quan trọng!):
  ❌ Sai: lcd.clear() → gây nhấp nháy mỗi vòng loop
  ✓ Đúng: Ghi đè với khoảng trắng cuối chuỗi
  Ví dụ: lcd.print("Temp: " + temp + " C   ");
  (khoảng trắng thừa cuối xóa ký tự cũ còn dư)`,
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

  // Gửi dữ liệu lên Serial Monitor
  Serial.print("Nhiet do: "); Serial.print(temp); Serial.print(" C | ");
  Serial.print("Do am: ");   Serial.print(humi); Serial.println(" %");

  // Hiển thị lên LCD1602
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
• Điều phối hệ thống bơm thoát nước tự động
• Cảnh báo phân chia theo vùng địa lý`,
      },
      {
        title: '2.2 Cảm biến Siêu âm HC-SR04 — Nguyên lý & Ứng dụng đo Mực nước',
        image: `${IMG}/hcsr04_water_level.png`,
        imageCaption: 'Nguyên lý hoạt động HC-SR04 đo mực nước theo phương pháp phản xạ sóng âm',
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
    0.034 = tốc độ âm thanh ÷ 1000 (0.034 cm/µs)
    ÷ 2 = chia đôi vì sóng đi và về

📊 Thông số kỹ thuật:
• Khoảng đo: 2 cm – 400 cm, độ chính xác ±3 mm
• Góc phát sóng: ~15° (cần hướng thẳng xuống mặt nước)
• Điện áp: 5V, dòng tiêu thụ 15mA
• Chân: VCC, TRIG, ECHO, GND

🏗️ Lắp đặt trong trạm quan trắc:
  • Gắn cảm biến TRÊN bề mặt nước, hướng xuống
  • Khoảng cách đo = khoảng hở từ cảm biến đến mặt nước
  • Mực nước thực = chiều cao lắp cảm biến − distance_cm`,
      },
      {
        title: '2.3 Cảm biến DS18B20 — Nhiệt độ nước chống thấm',
        content: `DS18B20 là cảm biến nhiệt độ kỹ thuật số 1-Wire, có phiên bản chống thấm nước (dạng đầu dò inox), lý tưởng đo nhiệt độ sông hồ, ao nuôi thủy sản.

📋 Thông số kỹ thuật:
• Dải đo: -55°C đến +125°C
• Độ chính xác: ±0.5°C (tại -10°C đến +85°C)
• Độ phân giải: 9–12 bit (cấu hình được)
• Giao thức: Dallas 1-Wire (hỗ trợ nhiều cảm biến trên 1 bus)
• Điện áp: 3.0V – 5.5V
• Thời gian chuyển đổi: 93.75ms (9-bit) đến 750ms (12-bit)

🌡️ Ứng dụng trong Quan trắc môi trường nước:
• Đo nhiệt độ nước mặt sông/hồ/ao nuôi
• Theo dõi nhiệt độ nước thải nhà máy
• Giám sát nhiệt độ đất (phiên bản đầu dò)
• Đo nhiệt độ trong hệ thống ống nước

🔌 Đấu nối với ESP32:
  DS18B20.VCC  → ESP32.3V3 (dây đỏ)
  DS18B20.DATA → ESP32.D4 (dây vàng + điện trở kéo 4.7kΩ lên 3V3)
  DS18B20.GND  → ESP32.GND (dây đen)

⚠️ BẮT BUỘC phải có điện trở kéo 4.7kΩ — không có điện trở thì DS18B20 không hoạt động!`,
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
  // Kích hoạt HC-SR04 đo khoảng cách
  digitalWrite(TRIG_PIN, LOW);   delayMicroseconds(2);
  digitalWrite(TRIG_PIN, HIGH);  delayMicroseconds(10);
  digitalWrite(TRIG_PIN, LOW);

  long duration = pulseIn(ECHO_PIN, HIGH);
  int distCm = duration * 0.034 / 2;
  int waterTemp = analogRead(TEMP_PIN);  // DS18B20

  Serial.print("Muc nuoc: "); Serial.print(distCm); Serial.print(" cm | ");
  Serial.print("Nhiet do nuoc: "); Serial.print(waterTemp); Serial.println(" C");

  lcd.setCursor(0, 0);
  lcd.print("MucNuoc:"); lcd.print(distCm); lcd.print("cm  ");
  lcd.setCursor(0, 1);
  if (distCm < 15) {
    lcd.print("!!! NGAP LUT !!!");
  } else {
    lcd.print("NhietDo:"); lcd.print(waterTemp); lcd.print("C  ");
  }
  delay(600);
}`,
    components: ['ESP32 DevKit', 'HC-SR04 Ultrasonic Sensor', 'DS18B20 (chống nước)', 'LCD1602 I²C', 'Điện trở 4.7kΩ'],
    wiring: [
      'HC-SR04.VCC  → ESP32.VIN | HC-SR04.GND → ESP32.GND',
      'HC-SR04.TRIG → ESP32.D5 (dây xanh lá)',
      'HC-SR04.ECHO → ESP32.D18 (dây tím)',
      'DS18B20.VCC  → ESP32.3V3 (dây đỏ)',
      'DS18B20.DATA → ESP32.D4 (dây vàng + điện trở kéo 4.7kΩ)',
      'DS18B20.GND  → ESP32.GND (dây đen)',
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
        title: '3.1 Nông nghiệp IoT & Tầm quan trọng của Quản lý nước tưới',
        content: `Nông nghiệp chiếm ~70% tổng lượng nước ngọt toàn cầu. Hệ thống tưới thông minh IoT có thể tiết kiệm 30–50% lượng nước mà không ảnh hưởng đến năng suất cây trồng.

🌱 Tác động môi trường của tưới tiêu không kiểm soát:
• Tưới quá mức → Rửa trôi đất và phân bón → Ô nhiễm nước ngầm
• Tưới không đủ → Cây héo, đất xói mòn, năng suất giảm
• Bốc hơi không kiểm soát → Lãng phí tài nguyên nước
• Phân bón bị cuốn trôi → Phú dưỡng hóa ao hồ (Algae bloom)

🤖 Hệ thống tưới IoT tự động:
• Đọc độ ẩm đất thực tế từng khu vực
• Chỉ tưới khi đất khô dưới ngưỡng cài đặt
• Kết hợp dữ liệu thời tiết từ API để dự báo
• Ghi nhật ký tưới, phân tích xu hướng theo mùa vụ`,
      },
      {
        title: '3.2 Cảm biến Độ ẩm đất (Soil Moisture) — Nguyên lý & Hiệu chỉnh',
        image: `${IMG}/soil_relay_pump.png`,
        imageCaption: 'Sơ đồ hệ thống tưới tự động: Soil Moisture Sensor → ESP32 → Relay → Bơm nước',
        content: `Cảm biến độ ẩm đất đo điện trở hoặc điện dung giữa 2 điện cực cắm vào đất. Đất ẩm dẫn điện tốt hơn đất khô.

⚙️ Hai loại cảm biến phổ biến:

1. Loại Điện trở (Resistive):
   • Rẻ tiền (~10.000–20.000 VND)
   • Bị ăn mòn điện cực sau vài tuần trong đất ẩm
   • Phù hợp thực hành, demo trong phòng lab
   • Đầu ra: AO (Analog), DO (Digital ngưỡng)

2. Loại Điện dung (Capacitive):
   • Đắt hơn (~80.000–150.000 VND)
   • Bền hơn nhiều, phù hợp triển khai thực tế ngoài đồng
   • Không bị ăn mòn, hoạt động ổn định dài hạn

📊 Thang giá trị ADC của Sensor Điện trở:
  0    – 300  → ĐẤT RẤT ẨM (đang ngập nước)
  300  – 600  → ĐỘ ẨM BÌNH THƯỜNG (lý tưởng cho cây)
  600  – 900  → ĐẤT KHÔ (cần tưới sớm)
  900  – 4095 → ĐẤT RẤT KHÔ (cây thiếu nước nghiêm trọng)

⚠️ Lưu ý: Giá trị ADC đảo ngược với độ ẩm thực!
  ADC thấp = Đất ẩm | ADC cao = Đất khô`,
      },
      {
        title: '3.3 Module Relay — Điều khiển thiết bị công suất lớn',
        content: `Module Relay là cầu nối cho phép ESP32 (3.3V/5V) điều khiển an toàn các thiết bị công suất lớn như máy bơm 220V AC hoặc bơm 12V DC.

🔌 Cấu tạo Relay 5V 1 kênh:
• Cuộn dây (Coil) 5V: Tạo từ trường khi có dòng điện
• Tiếp điểm cơ học: Đóng/ngắt theo từ trường
• Điện áp tải AC tối đa: 250V / 10A
• Điện áp tải DC tối đa: 30V / 10A

📍 Sơ đồ cực tải Relay:
  COM (Common)  → Kết nối với nguồn dương của bơm
  NO (Normally Open)  → KHÔNG kết nối khi chưa kích
  NC (Normally Closed) → CÓ kết nối khi chưa kích

📝 Logic điều khiển Relay:
  Relay thường dùng logic ACTIVE LOW:
  digitalWrite(RELAY_PIN, HIGH) → TẮT bơm (cuộn không kích)
  digitalWrite(RELAY_PIN, LOW)  → BẬT bơm (cuộn kích từ)

  Nhưng code bài thực hành dùng Active HIGH để dễ hiểu:
  HIGH = BẬT bơm | LOW = TẮT bơm

🚨 Quy tắc an toàn điện:
  • KHÔNG chạm tay vào cực 220V khi đang vận hành
  • Luôn ngắt nguồn 220V trước khi đấu nối
  • Dùng dây điện đủ tiết diện cho tải bơm`,
      },
    ],
    code: `#include <LiquidCrystal.h>
#define SOIL_PIN   34
#define RELAY_PIN  26
#define THRESHOLD  400  // Ngưỡng kích bơm (ADC)

LiquidCrystal lcd;

void setup() {
  Serial.begin(115200);
  pinMode(RELAY_PIN, OUTPUT);
  digitalWrite(RELAY_PIN, LOW);  // Tắt bơm khi khởi động
  lcd.begin(16, 2);
  lcd.print("HE THONG TUOI");
  delay(1500);
}

void loop() {
  int soilVal = analogRead(SOIL_PIN);  // 0–4095

  Serial.print("Do am dat: "); Serial.println(soilVal);

  lcd.setCursor(0, 0);
  lcd.print("DoAmDat: "); lcd.print(soilVal); lcd.print("   ");

  if (soilVal < THRESHOLD) {
    digitalWrite(RELAY_PIN, HIGH);  // Bật bơm
    Serial.println("-> DAT KHO! BAT MAY BOM...");
    lcd.setCursor(0, 1);
    lcd.print("BOM: DANG TUOI! ");
  } else {
    digitalWrite(RELAY_PIN, LOW);   // Tắt bơm
    lcd.setCursor(0, 1);
    lcd.print("BOM: TAT (DU AM)");
  }
  delay(600);
}`,
    components: ['ESP32', 'Soil Moisture Sensor (Điện trở)', 'Module Relay 5V/10A', 'DC Motor/Bơm nước 5V', 'LCD1602 I²C'],
    wiring: [
      'Soil.VCC → ESP32.3V3 | Soil.GND → ESP32.GND',
      'Soil.AO  → ESP32.D34 (ADC Analog Input — chỉ đọc)',
      'Relay.VCC → ESP32.VIN | Relay.GND → ESP32.GND',
      'Relay.IN  → ESP32.D26 (tín hiệu điều khiển)',
      'Relay.NO  → Cực (+) nguồn Bơm',
      'Bơm.(-) → GND | Nguồn(+) → Relay.COM',
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
        title: '4.1 Tiêu chuẩn chất lượng không khí & Ngưỡng an toàn',
        content: `Ô nhiễm không khí trong nhà và ngoài trời là vấn đề môi trường nghiêm trọng. Hiểu rõ ngưỡng an toàn là cơ sở thiết kế hệ thống cảnh báo đúng đắn.

🌫️ Các khí độc phổ biến cần giám sát (theo QCVN):

┌──────────┬──────────────┬────────────────────────────────┐
│ Khí      │ Ngưỡng an toàn│ Tác hại khi vượt ngưỡng       │
├──────────┼──────────────┼────────────────────────────────┤
│ CO       │ < 9 ppm/8h   │ Ngộ độc máu, tử vong >1600 ppm│
│ CH4/LPG  │ < 1000 ppm   │ Cháy nổ khi 5–15% thể tích    │
│ NH3      │ < 25 ppm     │ Kích ứng mắt, phổi            │
│ H2S      │ < 1 ppm      │ Độc cực cao, mùi trứng thối   │
│ NO2      │ < 100 µg/m³  │ Gây viêm phổi, hen suyễn      │
└──────────┴──────────────┴────────────────────────────────┘

📋 Tiêu chuẩn Việt Nam liên quan:
• QCVN 05:2023/BTNMT: Chất lượng không khí xung quanh
• QCVN 19:2009/BTNMT: Khí thải công nghiệp (bụi, SO2, NO2)
• QCVN 06:2009/BTNMT: Chất độc hại trong không khí xung quanh`,
      },
      {
        title: '4.2 Cảm biến MQ-2 — Phát hiện đa loại khí độc & Gas',
        image: `${IMG}/mq2_gas_alarm.png`,
        imageCaption: 'Sơ đồ hệ thống cảnh báo MQ-2 với thang đo PPM và logic điều khiển còi + quạt',
        content: `MQ-2 là cảm biến bán dẫn (Metal Oxide Semiconductor) phát hiện được nhiều loại khí: LPG, Propane, Methane, Alcohol, Hydrogen, Smoke, CO.

🔬 Nguyên lý hoạt động (Chemo-resistive):
• Phần tử nhạy: Lớp SnO₂ (Thiếc dioxide) nung nóng 200–400°C
• Khi có khí, SnO₂ giảm điện trở → điện áp AO tăng
• Không có khí: SnO₂ điện trở cao → AO thấp

⚙️ Thông số kỹ thuật:
• Điện áp: 5V (cần cấp nguồn ổn định)
• Thời gian làm nóng (Preheat): 20–30 giây
• Cần hiệu chỉnh 24–48h đầu tiên khi dùng mới
• Đầu ra AO: 0–4095 ADC (tỉ lệ thuận nồng độ)
• Đầu ra DO: HIGH/LOW theo ngưỡng biến trở

📊 Thang đo thực nghiệm (cần hiệu chỉnh theo điều kiện thực):
  AO < 200   → Không khí sạch (SAFE)
  AO 200–400 → Khí nhẹ, ngưỡng theo dõi (WARNING)
  AO > 400   → Nguy hiểm, kích cảnh báo (DANGER)

🌡️ Yếu tố ảnh hưởng độ chính xác:
• Nhiệt độ và độ ẩm môi trường
• Nồng độ oxy trong không khí
• Thời gian nung nóng (preheat time)

⚠️ MQ-2 KHÔNG phân biệt được loại khí cụ thể, chỉ phát hiện sự có mặt của khí. Cần kết hợp nhiều loại cảm biến MQ khác nhau cho hệ thống chuyên nghiệp.`,
      },
      {
        title: '4.3 Buzzer Passive & Relay Quạt thông gió — Hệ thống cảnh báo kép',
        content: `Hệ thống phản ứng tự động kết hợp cảnh báo âm thanh + hành động vật lý (bật quạt hút khí độc ra ngoài).

🔊 Buzzer Passive vs Active:
• Buzzer Active (tích hợp dao động): Chỉ cần cấp điện là kêu, âm thanh cố định
• Buzzer Passive (không dao động): Cần tín hiệu PWM từ ESP32, điều chỉnh tần số âm thanh

Sử dụng Buzzer Passive:
  tone(pin, 1000);         // Kêu tần số 1000 Hz
  tone(pin, 440);          // Kêu tần số 440 Hz (nốt La)
  noTone(pin);             // Tắt âm thanh

Tạo âm thanh cảnh báo nhịp điệu:
  tone(BUZZER, 1000); delay(200);
  noTone(BUZZER);     delay(100);
  tone(BUZZER, 1500); delay(200);
  noTone(BUZZER);     delay(100);

🌀 Quạt thông gió qua Relay:
  Khi khí độc > ngưỡng: BẬT quạt hút khí ra ngoài
  Khi không khí sạch: TẮT quạt để tiết kiệm điện

💡 Mẹo thực tế:
  Đặt quạt gần mặt đất (khí gas nặng hơn không khí, tích tụ phía dưới)
  Cài thêm thời gian trễ: quạt chạy thêm 30 giây sau khi khí đã giảm xuống ngưỡng an toàn`,
      },
    ],
    code: `#include <LiquidCrystal.h>
#define GAS_PIN    35
#define BUZZER_PIN 27
#define FAN_PIN    14
#define THRESHOLD  300

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

  if (gasPpm > THRESHOLD) {
    digitalWrite(BUZZER_PIN, HIGH);   // Bật còi hú
    digitalWrite(FAN_PIN, HIGH);      // Bật quạt hút
    Serial.println("!!! CANH BAO KHI DOC !!!");
    lcd.setCursor(0, 1);
    lcd.print("DANGER! FAN: ON ");
  } else {
    noTone(BUZZER_PIN);
    digitalWrite(BUZZER_PIN, LOW);    // Tắt còi
    digitalWrite(FAN_PIN, LOW);       // Tắt quạt
    lcd.setCursor(0, 1);
    lcd.print("Status: AN TOAN ");
  }
  delay(600);
}`,
    components: ['ESP32', 'MQ-2 Gas Sensor', 'Buzzer Passive 5V', 'Module Relay 5V', 'Quạt mini DC', 'LCD1602 I²C'],
    wiring: [
      'MQ-2.VCC → ESP32.VIN (5V) | MQ-2.GND → ESP32.GND',
      'MQ-2.AO  → ESP32.D35 (Analog, chỉ đọc)',
      'Buzzer.+ → ESP32.D27 | Buzzer.− → ESP32.GND',
      'Relay.VCC → ESP32.VIN | Relay.GND → ESP32.GND',
      'Relay.IN  → ESP32.D14 (điều khiển quạt)',
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
        content: `HMI là giao diện giúp người vận hành theo dõi và tương tác với hệ thống quan trắc mà không cần kết nối Internet — điều này rất quan trọng tại vùng sâu, vùng xa.

🖥️ Các loại HMI trong hệ thống IoT môi trường:
• HMI tại chỗ: LCD/OLED, đèn LED cảnh báo, còi, bảng số
• HMI từ xa: Web dashboard, app mobile, SMS alert
• HMI tập trung: SCADA system tại trung tâm điều hành

💡 Tại sao cần HMI tại chỗ (Local HMI)?
  ✓ Hoạt động khi mất Internet/điện thoại
  ✓ Kỹ thuật viên đọc số liệu trực tiếp tại trạm
  ✓ Phản ứng nhanh không cần đợi server
  ✓ Chi phí thấp, đơn giản, đáng tin cậy
  ✓ Phù hợp vùng nông thôn, rừng núi, hải đảo

🔄 Vòng lặp HMI chuẩn:
  Thu thập → Xử lý → Hiển thị → Cảnh báo → Ghi log`,
      },
      {
        title: '5.2 Thiết kế giao diện LCD 16x2 tối ưu',
        image: `${IMG}/lcd1602_grid.png`,
        imageCaption: 'Sơ đồ lưới ký tự LCD 16x2 — cách bố trí thông tin tối ưu với setCursor() và print()',
        content: `Với chỉ 32 ký tự (16×2), cần thiết kế bố cục hiển thị thật thông minh để truyền đạt tối đa thông tin.

📐 Nguyên tắc thiết kế LCD hiệu quả:
• Dòng 0: Thông số chính (Nhiệt độ, Độ ẩm, giá trị cần theo dõi liên tục)
• Dòng 1: Thông số phụ hoặc trạng thái hệ thống (Cảnh báo, trạng thái bơm/quạt)
• Dùng chữ viết tắt để tiết kiệm: T=Temp, H=Humi, G=Gas
• Luôn thêm khoảng trắng cuối để xóa ký tự dư từ lần in trước

🗂️ Bố cục tối ưu cho trạm môi trường:
  Hàng 0: "T:28C H:65%     " ← 16 ký tự
  Hàng 1: "Gas: 180 PPM   " ← 16 ký tự

🔧 Kỹ thuật ghi đè không nhấp nháy:
  ❌ Sai: lcd.clear() → Gây nhấp nháy rõ ràng
  ✓ Đúng: lcd.setCursor(0,0); lcd.print("T:28 H:65     ");
  
  Giải thích: Thêm khoảng trắng cuối chuỗi (min 2-3 ký tự) sẽ
  ghi đè lên các ký tự số dài hơn từ lần trước (99→ 8 cần
  xóa ký tự "9" thừa → thêm " " sau số).

📍 Tọa độ setCursor(col, row):
  setCursor(0, 0) → Đầu dòng 1 (góc trên trái)
  setCursor(8, 0) → Giữa dòng 1
  setCursor(0, 1) → Đầu dòng 2
  setCursor(8, 1) → Giữa dòng 2`,
      },
      {
        title: '5.3 Phân bổ GPIO & Tích hợp đa cảm biến không xung đột',
        content: `Khi lắp nhiều cảm biến, quản lý chân GPIO hợp lý là yếu tố quyết định hệ thống hoạt động ổn định.

📋 Phân bổ GPIO cho Bài 5 (HMI Đa cảm biến):
  ┌──────┬────────────────────────────────────┐
  │ Chân │ Thiết bị / Chức năng               │
  ├──────┼────────────────────────────────────┤
  │ D15  │ DHT11 DATA (1-Wire, kéo lên 10kΩ) │
  │ D34  │ MQ-2 Analog Out (chỉ đọc ADC)     │
  │ D21  │ LCD SDA (I²C Bus)                  │
  │ D22  │ LCD SCL (I²C Bus)                  │
  │ VIN  │ 5V → DHT11, MQ-2, LCD VCC         │
  │ GND  │ Tất cả GND chung                   │
  └──────┴────────────────────────────────────┘

⚠️ Các lỗi phổ biến cần tránh:
  ❌ Dùng D34–D39 làm OUTPUT → Lỗi phần cứng (chỉ INPUT)
  ❌ Quên delay(1000ms) giữa hai lần đọc DHT11 → Giá trị sai
  ❌ Không kiểm tra isnan() cho DHT → Hiện "nan" trên LCD
  ❌ Thiếu khoảng trắng cuối lcd.print() → Số dư trên LCD

🔁 Cấu trúc vòng loop() chuẩn đa cảm biến:
  1. Đọc tất cả cảm biến đầu vòng
  2. Xử lý logic cảnh báo
  3. In ra Serial Monitor
  4. Cập nhật LCD
  5. delay(600) → lặp lại`,
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
  // Đọc đồng thời 3 thông số môi trường
  int temp   = analogRead(DHT_PIN);
  int humi   = dhtReadHumidity(DHT_PIN);
  int gasPpm = analogRead(GAS_PIN);

  // Serial Monitor — dữ liệu phân tích
  Serial.print("T:"); Serial.print(temp); Serial.print("C | ");
  Serial.print("H:"); Serial.print(humi); Serial.print("% | ");
  Serial.print("Gas:"); Serial.print(gasPpm); Serial.println("ppm");

  // LCD1602 — HMI tại chỗ
  lcd.setCursor(0, 0);
  lcd.print("T:"); lcd.print(temp); lcd.print("C H:");
  lcd.print(humi); lcd.print("%   ");
  lcd.setCursor(0, 1);
  lcd.print("Gas PPM: "); lcd.print(gasPpm); lcd.print("  ");

  delay(600);
}`,
    components: ['ESP32', 'DHT11 (nhiệt ẩm không khí)', 'MQ-2 (khí gas)', 'LCD1602 I²C (HMI)'],
    wiring: [
      'DHT11.DATA → D15 (dây vàng) | DHT11.VCC → VIN',
      'MQ-2.AO   → D34 (dây cam) | MQ-2.VCC → VIN',
      'LCD.SDA → D21 (dây tím) | LCD.SCL → D22 (dây xanh)',
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
        image: `${IMG}/iot_architecture.png`,
        imageCaption: 'Kiến trúc đầy đủ của Trạm IoT Môi trường — từ cảm biến đến Cloud Dashboard',
        content: `Trạm quan trắc môi trường IoT đầy đủ tích hợp nhiều cảm biến, kết nối Cloud và phân tích dữ liệu thời gian thực.

🏗️ Cấu trúc phần cứng Trạm IoT đa thông số:
  ESP32 (CPU trung tâm)
  ├── DHT11 (D15) → Nhiệt độ & Độ ẩm không khí
  ├── MQ-2 (D35)  → Nồng độ khí gas/khói
  ├── HC-SR04 (D5/D18) → Mực nước bề mặt
  └── LCD1602 I²C (D21/D22) → Hiển thị tại chỗ

🔋 Cấp nguồn cho trạm thực địa:
  • Nguồn AC 220V → Adapter 5V/3A
  • Pin năng lượng mặt trời 12V + Converter 5V
  • Pin Lithium 18650 + Module sạc TP4056
  • Thời lượng pin: 3–7 ngày (tùy tần số đo)

📡 Kết nối Cloud từ ESP32:
  WiFi → Router → Internet → MQTT Broker
  Giao thức: MQTT (nhẹ, tiết kiệm pin, real-time)
  Nền tảng phổ biến: ThingSpeak, Blynk, Grafana + InfluxDB`,
      },
      {
        title: '6.2 Giao thức MQTT — Xương sống của IoT Cloud',
        image: `${IMG}/mqtt_cloud.png`,
        imageCaption: 'Mô hình Publish/Subscribe của MQTT — ESP32 gửi, Dashboard nhận theo thời gian thực',
        content: `MQTT (Message Queuing Telemetry Transport) là giao thức truyền thông nhẹ, được thiết kế cho IoT với băng thông thấp và kết nối không ổn định.

🌐 Mô hình Publish/Subscribe:
  ┌────────────┐    PUBLISH     ┌───────────────┐    SUBSCRIBE    ┌─────────────┐
  │  ESP32     │ ─────────────▶ │  MQTT Broker  │ ──────────────▶ │  Dashboard  │
  │ (Publisher)│                │ (Mosquitto)   │                 │  (Subscriber│
  └────────────┘                └───────────────┘                 └─────────────┘

📂 Cấu trúc Topic MQTT cho Trạm KMT:
  kmt/station01/temperature  → "28.5"
  kmt/station01/humidity     → "65.2"
  kmt/station01/gas_ppm      → "180"
  kmt/station01/water_level  → "45"
  kmt/station01/alerts       → "flood_warning"

⚙️ Thông số MQTT quan trọng:
• QoS 0: Gửi một lần, không đảm bảo nhận (data thường)
• QoS 1: Gửi ít nhất 1 lần, đảm bảo nhận (cảnh báo)
• Retain: Broker lưu tin nhắn cuối, client mới vẫn nhận được
• Keep Alive: 60 giây (ESP32 gửi PINGREQ để duy trì kết nối)

🔄 Tần suất gửi dữ liệu khuyến nghị:
  Cảnh báo khẩn (khí độc, lũ): < 1 giây (real-time)
  Giám sát thường xuyên: 10–60 giây
  Lưu lịch sử dài hạn: 5–15 phút`,
      },
      {
        title: '6.3 Định dạng JSON & Phân tích dữ liệu thời gian thực',
        content: `JSON (JavaScript Object Notation) là định dạng dữ liệu chuẩn trong IoT — dễ đọc, dễ phân tích, được hỗ trợ mọi ngôn ngữ lập trình.

📄 Cấu trúc JSON payload chuẩn cho Trạm IoT KMT:
{
  "station_id": "KMT_LAB_01",
  "timestamp":  "2025-07-26T10:30:00+07:00",
  "location":   { "lat": 10.762, "lon": 106.660, "alt": 5 },
  "sensors": {
    "temp_air":       28.5,
    "humidity":       65.2,
    "gas_ppm":        180,
    "water_level_cm": 45,
    "water_temp_c":   26.3
  },
  "alerts": {
    "gas_danger":  false,
    "flood_risk":  true,
    "low_battery": false
  }
}

💻 Mã gửi JSON qua Serial trong Simulator:
  Serial.print("{\\"temp\\":"); Serial.print(temp);
  Serial.print(",\\"humi\\":"); Serial.print(humi);
  Serial.print(",\\"gas\\":"); Serial.print(gasPpm);
  Serial.println("}");

📊 Tổng kết 6 Buổi — Kỹ năng đã đạt được:
  ✓ B1: ESP32 + DHT11 → LCD1602 (Nhiệt ẩm)
  ✓ B2: HC-SR04 + DS18B20 → Cảnh báo ngập lụt
  ✓ B3: Soil Moisture + Relay → Tưới tự động
  ✓ B4: MQ-2 + Buzzer + Quạt → Cảnh báo khí độc
  ✓ B5: Đa cảm biến → HMI LCD1602 tại chỗ
  ✓ B6: Trạm đa thông số → Telemetry JSON + Cloud MQTT`,
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
  // Đọc tất cả cảm biến
  int temp   = analogRead(DHT_PIN);
  int humi   = dhtReadHumidity(DHT_PIN);
  int gasPpm = analogRead(GAS_PIN);

  digitalWrite(TRIG_PIN, LOW);  delayMicroseconds(2);
  digitalWrite(TRIG_PIN, HIGH); delayMicroseconds(10);
  digitalWrite(TRIG_PIN, LOW);
  long dur = pulseIn(ECHO_PIN, HIGH);
  int waterLevel = dur * 0.034 / 2;

  // Telemetry JSON
  Serial.print("{\\"temp\\":"); Serial.print(temp);
  Serial.print(",\\"humi\\":"); Serial.print(humi);
  Serial.print(",\\"gas\\":"); Serial.print(gasPpm);
  Serial.print(",\\"water\\":"); Serial.print(waterLevel);
  Serial.println("}");

  // LCD HMI
  lcd.setCursor(0, 0);
  lcd.print("T:"); lcd.print(temp); lcd.print("C H:");
  lcd.print(humi); lcd.print("% G:"); lcd.print(gasPpm);
  lcd.setCursor(0, 1);
  lcd.print("Water:"); lcd.print(waterLevel); lcd.print("cm    ");

  delay(600);
}`,
    components: ['ESP32 WiFi', 'DHT11', 'MQ-2', 'HC-SR04', 'LCD1602 I²C', 'Module WiFi (tích hợp ESP32)'],
    wiring: [
      'DHT11.DATA → D15 | DHT11.VCC → VIN',
      'MQ-2.AO   → D35 | MQ-2.VCC → VIN',
      'HC-SR04.TRIG → D5 | HC-SR04.ECHO → D18 | HC-SR04.VCC → VIN',
      'LCD.SDA → D21 | LCD.SCL → D22 | LCD.VCC → VIN',
      'Tất cả GND → ESP32.GND (nối chung 1 điểm)',
    ],
  },
];

const CodeBlock = ({ code }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="relative rounded-xl overflow-hidden border border-slate-700/60 mt-3">
      <div className="flex items-center justify-between bg-slate-800/90 px-4 py-2">
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <Code2 className="w-3.5 h-3.5" />
          <span>Arduino C++ — Mã mẫu thực hành</span>
        </div>
        <button onClick={handleCopy} className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-md bg-slate-700 hover:bg-slate-600 text-slate-300 transition-colors">
          {copied ? <CheckCircle2 className="w-3.5 h-3.5 text-green-400" /> : <Code2 className="w-3.5 h-3.5" />}
          {copied ? 'Đã sao chép!' : 'Sao chép'}
        </button>
      </div>
      <pre className="bg-[#0D1117] text-slate-200 text-xs leading-relaxed p-4 overflow-x-auto font-mono max-h-80 overflow-y-auto">
        <code>{code}</code>
      </pre>
    </div>
  );
};

const TheorySection = ({ section, accent }) => {
  const [open, setOpen] = useState(true);
  return (
    <div className="border border-slate-700/50 rounded-xl overflow-hidden mb-3">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-4 py-3 bg-slate-800/60 hover:bg-slate-800/90 text-left transition-colors"
      >
        <span className="text-sm font-semibold text-slate-200">{section.title}</span>
        {open ? <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" /> : <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />}
      </button>
      {open && (
        <div className="bg-slate-900/50">
          {section.image && (
            <div className="px-4 pt-4">
              <div className="rounded-xl overflow-hidden border border-slate-700/40">
                <img
                  src={section.image}
                  alt={section.imageCaption || section.title}
                  className="w-full object-contain max-h-72 bg-slate-950"
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
              </div>
              {section.imageCaption && (
                <p className="text-center text-[10px] text-slate-500 mt-1.5 italic px-2">{section.imageCaption}</p>
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
          <p className="text-[10px] text-slate-500 leading-snug">IoT trong Kỹ thuật Môi trường — 6 Buổi thực hành</p>
        </div>
        <div className="flex-1 p-2">
          {SESSIONS.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => setActiveSession(idx)}
              className={`w-full text-left px-3 py-2.5 rounded-lg mb-1 transition-all flex items-start gap-2.5 ${
                activeSession === idx
                  ? 'bg-gradient-to-r ' + s.color + ' text-white shadow-lg'
                  : isDarkMode ? 'text-slate-400 hover:bg-slate-800 hover:text-slate-200' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
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
        {/* Header banner */}
        <div className={`rounded-2xl p-5 mb-5 bg-gradient-to-r ${session.color} text-white shadow-lg`}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur shrink-0">
              {session.icon}
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-widest opacity-80 mb-0.5">Buổi {session.id} / 6 — Lý thuyết & Thực hành</div>
              <h2 className="text-base font-bold leading-tight">{session.title.split(':')[1]?.trim()}</h2>
            </div>
          </div>
        </div>

        {/* Components needed */}
        <div className={`rounded-xl border p-4 mb-4 ${isDarkMode ? 'border-slate-700/50 bg-slate-900/40' : 'border-slate-200 bg-white'}`}>
          <div className="flex items-center gap-2 mb-2.5">
            <Wrench className="w-4 h-4" style={{ color: session.accent }} />
            <span className="text-sm font-bold">Linh kiện cần chuẩn bị</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {session.components.map((c, i) => (
              <span key={i} className="px-2.5 py-1 rounded-lg text-xs font-medium"
                style={{ background: session.accent + '22', color: session.accent, border: `1px solid ${session.accent}44` }}>
                {c}
              </span>
            ))}
          </div>
        </div>

        {/* Theory sections */}
        <div className="mb-4">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
            <BookOpen className="w-3.5 h-3.5" /> Nội dung Lý thuyết
          </h3>
          {session.theory.map((s, i) => (
            <TheorySection key={i} section={s} accent={session.accent} />
          ))}
        </div>

        {/* Wiring guide */}
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

        {/* Code sample */}
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
