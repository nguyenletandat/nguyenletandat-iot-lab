import React, { useState } from 'react';
import { BookOpen, Cpu, Zap, Droplets, Wind, Radio, BarChart3, ChevronDown, ChevronRight, Code2, Wrench, AlertTriangle, CheckCircle2 } from 'lucide-react';

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
        content: `Internet of Things (IoT) trong Kỹ thuật Môi trường là việc sử dụng mạng lưới các thiết bị cảm biến thông minh để đo lường, thu thập và truyền dữ liệu môi trường theo thời gian thực. Thay vì đo thủ công định kỳ, hệ thống IoT cho phép giám sát liên tục 24/7, cảnh báo tự động và phân tích xu hướng dài hạn.

Ứng dụng thực tế:
• Trạm quan trắc không khí tự động (AQI)
• Hệ thống giám sát lũ lụt & mực nước
• Quan trắc đất và tưới tiêu thông minh trong nông nghiệp
• Phát hiện rò rỉ khí độc trong khu công nghiệp
• Giám sát chất lượng nước mặt và nước thải`,
      },
      {
        title: '1.2 Vi điều khiển ESP32 — Trái tim của Trạm IoT',
        content: `ESP32 là vi điều khiển 32-bit lưỡng nhân (Dual-Core) của Espressif Systems, tích hợp sẵn WiFi & Bluetooth, rất phổ biến trong các dự án IoT môi trường.

Thông số kỹ thuật chính:
• CPU: Xtensa LX6 Dual-Core 240 MHz
• RAM: 520 KB SRAM
• Flash: 4 MB (tùy model)
• GPIO: 38 chân (Digital + Analog)
• ADC: 12-bit (0–4095), 18 kênh
• Kết nối: WiFi 802.11 b/g/n, Bluetooth 4.2/5.0
• Nguồn: 3.3V logic, cấp qua USB 5V

Sơ đồ chân quan trọng:
• D21 (SDA) / D22 (SCL): Bus I²C cho LCD, BMP280
• D4, D15: Cảm biến 1-Wire (DS18B20) & DHT11
• D34–D39: Chân ADC chỉ đọc (cảm biến Analog)
• VIN: 5V output khi cấp qua USB
• 3V3: 3.3V output (cảm biến 3.3V)`,
      },
      {
        title: '1.3 Cảm biến DHT11 — Nhiệt ẩm không khí',
        content: `DHT11 là cảm biến tích hợp đo đồng thời Nhiệt độ và Độ ẩm không khí, giao tiếp qua giao thức 1-Wire đơn giản.

Thông số kỹ thuật:
• Dải đo Nhiệt độ: 0°C – 50°C, độ chính xác ±2°C
• Dải đo Độ ẩm: 20% – 95% RH, độ chính xác ±5%
• Điện áp: 3.3V – 5V
• Tần số lấy mẫu tối đa: 1 lần/giây
• Chân kết nối: VCC, DATA, GND

Sơ đồ đấu nối với ESP32:
  DHT11.VCC  → ESP32.VIN (5V)
  DHT11.DATA → ESP32.D15 (với điện trở kéo 10kΩ)
  DHT11.GND  → ESP32.GND`,
      },
      {
        title: '1.4 Màn hình LCD1602 I²C — Hiển thị tại chỗ',
        content: `LCD1602 I²C là màn hình LCD 16 cột × 2 hàng sử dụng module giao tiếp I²C (PCF8574), giúp tiết kiệm chân GPIO.

Đặc điểm:
• Hiển thị 32 ký tự ASCII (2 dòng × 16 ký tự)
• Giao tiếp I²C, chỉ cần 2 dây SDA và SCL
• Địa chỉ I²C mặc định: 0x27 hoặc 0x3F
• Điện áp: 5V
• Có đèn nền điều chỉnh được

Sơ đồ đấu nối:
  LCD.VCC → ESP32.VIN (5V)
  LCD.GND → ESP32.GND
  LCD.SDA → ESP32.D21
  LCD.SCL → ESP32.D22

Lệnh lập trình cơ bản:
  lcd.begin(16, 2);       // Khởi tạo
  lcd.setCursor(col, row); // Di chuyển con trỏ
  lcd.print("Hello!");    // In chuỗi
  lcd.clear();            // Xóa màn hình`,
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
  int temp = analogRead(DHT_PIN);       // Nhiệt độ (°C)
  int humi = dhtReadHumidity(DHT_PIN);  // Độ ẩm (%)

  // Hiển thị lên Serial Monitor
  Serial.print("Nhiet do: "); Serial.print(temp); Serial.print(" C | ");
  Serial.print("Do am: ");   Serial.print(humi); Serial.println(" %");

  // Hiển thị lên LCD1602
  lcd.setCursor(0, 0);
  lcd.print("Temp: "); lcd.print(temp); lcd.print(" C   ");
  lcd.setCursor(0, 1);
  lcd.print("Humi: "); lcd.print(humi); lcd.print(" %   ");

  delay(600);
}`,
    components: ['ESP32', 'DHT11', 'LCD1602 I²C'],
    wiring: [
      'DHT11.VCC → ESP32.VIN (5V đỏ)',
      'DHT11.GND → ESP32.GND (đen)',
      'DHT11.DATA → ESP32.D15 (vàng)',
      'LCD.VCC → ESP32.VIN (đỏ)',
      'LCD.GND → ESP32.GND (đen)',
      'LCD.SDA → ESP32.D21 (tím)',
      'LCD.SCL → ESP32.D22 (xanh dương)',
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
        title: '2.1 Tầm quan trọng của quan trắc mực nước',
        content: `Ngập lụt là một trong những thảm họa môi trường phổ biến nhất tại Việt Nam, đặc biệt tại vùng ĐBSCL và các đô thị lớn. Hệ thống cảnh báo ngập sớm tích hợp IoT có thể giảm thiệt hại đáng kể bằng cách:
• Phát hiện mực nước tăng trước 15–30 phút
• Tự động phát cảnh báo qua SMS/loa phát thanh
• Ghi lại dữ liệu lịch sử để phân tích mô hình lũ
• Điều phối hệ thống bơm thoát nước tự động`,
      },
      {
        title: '2.2 Cảm biến siêu âm HC-SR04 — Đo khoảng cách & Mực nước',
        content: `HC-SR04 sử dụng sóng siêu âm (40 kHz) để đo khoảng cách bằng cách tính thời gian sóng âm phản xạ trở về.

Thông số:
• Khoảng đo: 2 cm – 400 cm, độ chính xác ±3 mm
• Góc phát: ~15°
• Điện áp: 5V
• Chân: VCC, TRIG, ECHO, GND

Nguyên lý hoạt động:
  1. ESP32 phát xung 10µs vào chân TRIG
  2. HC-SR04 phát 8 xung siêu âm 40kHz
  3. Sóng âm phản xạ từ bề mặt nước trở về
  4. ECHO ở mức HIGH trong thời gian sóng âm di chuyển
  5. Khoảng cách = (thời gian × tốc độ âm) / 2
  6. Công thức: distance_cm = duration * 0.034 / 2

Lắp đặt trong trạm quan trắc:
  Gắn cảm biến hướng xuống phía trên mặt nước
  → Đo khoảng cách từ cảm biến xuống mặt nước
  → Mực nước = chiều cao lắp đặt − khoảng cách đo được`,
      },
      {
        title: '2.3 Cảm biến Nhiệt độ DS18B20 — Đo nhiệt độ nước',
        content: `DS18B20 là cảm biến nhiệt độ kỹ thuật số giao tiếp 1-Wire, chống thấm nước, lý tưởng để đo nhiệt độ nguồn nước, ao hồ, sông ngòi.

Thông số:
• Dải đo: -55°C đến +125°C, độ chính xác ±0.5°C
• Độ phân giải: 9–12 bit (có thể cấu hình)
• Giao thức: 1-Wire (1 dây data, hỗ trợ nhiều cảm biến trên 1 bus)
• Điện áp: 3.0V – 5.5V
• Có model chống thấm nước dạng đầu dò inox

Đấu nối:
  DS18B20.VCC  → ESP32.3V3
  DS18B20.DATA → ESP32.D4 (+ điện trở kéo 4.7kΩ)
  DS18B20.GND  → ESP32.GND`,
      },
    ],
    code: `#include <LiquidCrystal.h>
#define TRIG_PIN 5
#define ECHO_PIN 18
#define TEMP_PIN 4

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
  // Đo mực nước bằng siêu âm
  digitalWrite(TRIG_PIN, LOW);
  delayMicroseconds(2);
  digitalWrite(TRIG_PIN, HIGH);
  delayMicroseconds(10);
  digitalWrite(TRIG_PIN, LOW);

  long duration = pulseIn(ECHO_PIN, HIGH);
  int distanceCm = duration * 0.034 / 2;
  int waterTemp = analogRead(TEMP_PIN);  // Nhiệt độ nước từ DS18B20

  Serial.print("Muc nuoc: "); Serial.print(distanceCm); Serial.print(" cm | ");
  Serial.print("Nhiet do nuoc: "); Serial.print(waterTemp); Serial.println(" C");

  lcd.setCursor(0, 0);
  lcd.print("MucNuoc: "); lcd.print(distanceCm); lcd.print(" cm  ");
  lcd.setCursor(0, 1);
  if (distanceCm < 15) {
    lcd.print("!!! NGAP LUT !!!");
  } else {
    lcd.print("NhietDo: "); lcd.print(waterTemp); lcd.print(" C ");
  }
  delay(600);
}`,
    components: ['ESP32', 'HC-SR04', 'DS18B20', 'LCD1602 I²C'],
    wiring: [
      'HC-SR04.VCC  → ESP32.VIN (đỏ)',
      'HC-SR04.GND  → ESP32.GND (đen)',
      'HC-SR04.TRIG → ESP32.D5 (xanh)',
      'HC-SR04.ECHO → ESP32.D18 (tím)',
      'DS18B20.VCC  → ESP32.3V3 (đỏ)',
      'DS18B20.DATA → ESP32.D4 (vàng)',
      'DS18B20.GND  → ESP32.GND (đen)',
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
        content: `Nông nghiệp chiếm ~70% lượng nước ngọt toàn cầu. Hệ thống tưới thông minh IoT có thể tiết kiệm 30–50% lượng nước bằng cách chỉ tưới khi đất thực sự khô, thay vì tưới theo lịch cố định.

Ứng dụng trong Kỹ thuật Môi trường:
• Giảm rửa trôi đất và phân bón
• Ngăn ngừa xói mòn đất do tưới quá mức
• Tối ưu hóa nguồn nước ngầm
• Tích hợp dữ liệu khí tượng để dự đoán nhu cầu tưới`,
      },
      {
        title: '3.2 Cảm biến Độ ẩm đất (Soil Moisture Sensor)',
        content: `Cảm biến độ ẩm đất hoạt động dựa trên nguyên lý đo điện trở hoặc điện dung giữa 2 điện cực cắm vào đất. Đất ẩm có điện trở thấp hơn đất khô.

Thông số:
• Đầu ra: Analog (0–4095 ADC) hoặc Digital (ngưỡng)
• Điện áp: 3.3V – 5V
• Chân: VCC, GND, AO (Analog), DO (Digital)
• Giá trị ADC: ~0–300 = RẤT ẨM, ~300–600 = BÌNH THƯỜNG, ~600+ = KHÔ

Lưu ý thực tế:
  Cảm biến điện trở bị ăn mòn theo thời gian do phân cực DC.
  Cảm biến điện dung (Capacitive) bền hơn, phù hợp ngoài đồng.`,
      },
      {
        title: '3.3 Module Relay — Điều khiển Máy bơm 220V/12V',
        content: `Module Relay là công tắc điện từ cho phép vi điều khiển 3.3V/5V điều khiển các thiết bị công suất lớn (máy bơm 220V AC hoặc bơm 12V DC).

Thông số Relay 5V 1 kênh:
• Điện áp điều khiển: 5V (cuộn dây relay)
• Tải AC tối đa: 250V/10A
• Tải DC tối đa: 30V/10A
• Chân điều khiển: IN (mức LOW = BẬT với relay thường hở)
• Chân tải: COM (chung), NC (thường đóng), NO (thường mở)

Logic điều khiển:
  digitalWrite(RELAY_PIN, HIGH) → BẬT bơm
  digitalWrite(RELAY_PIN, LOW)  → TẮT bơm`,
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
  int soilVal = analogRead(SOIL_PIN);  // 0–4095 ADC

  Serial.print("Do am dat: "); Serial.println(soilVal);

  lcd.setCursor(0, 0);
  lcd.print("DoAmDat: "); lcd.print(soilVal); lcd.print("   ");

  if (soilVal < 400) {
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
    components: ['ESP32', 'Soil Moisture Sensor', 'Module Relay 5V', 'DC Motor (Bơm)', 'LCD1602'],
    wiring: [
      'Soil.VCC → ESP32.3V3 | Soil.GND → ESP32.GND',
      'Soil.AO  → ESP32.D34 (chân Analog Input)',
      'Relay.VCC → ESP32.VIN | Relay.GND → ESP32.GND',
      'Relay.IN  → ESP32.D26 (tín hiệu điều khiển)',
      'Relay.NO  → Nguồn bơm (+) | Bơm.GND → GND',
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
        title: '4.1 Ô nhiễm không khí & Sức khỏe môi trường',
        content: `Ô nhiễm không khí trong nhà và ngoài trời là vấn đề môi trường nghiêm trọng tại Việt Nam. Các khí độc phổ biến cần giám sát:
• CO (Khí CO): >200 ppm gây ngộ độc, >1600 ppm gây tử vong
• CH4 (Khí Methane/Biogas): Giới hạn cháy nổ 5–15% thể tích
• LPG (Khí gas hóa lỏng): >1000 ppm nguy hiểm
• Khói bụi (PM2.5/PM10): Gây bệnh hô hấp, tim mạch

Tiêu chuẩn QCVN tham khảo:
• QCVN 05:2013/BTNMT: Chất lượng không khí xung quanh
• QCVN 19:2009/BTNMT: Khí thải công nghiệp`,
      },
      {
        title: '4.2 Cảm biến Khí Gas MQ-2 — Phát hiện đa loại khí',
        content: `MQ-2 là cảm biến điện hóa phát hiện được nhiều loại khí: LPG, Propane, Methane, Alcohol, Hydrogen, Smoke.

Thông số:
• Điện áp: 5V (cần làm nóng 24–48h trước khi dùng)
• Đầu ra Analog (AO): 0–4095 ADC (tỉ lệ thuận nồng độ khí)
• Đầu ra Digital (DO): Ngưỡng cài sẵn bằng biến trở
• Thời gian hồi đáp: <10 giây
• Dải đo: 300–10,000 ppm (tùy loại khí)

Hiệu chỉnh (Calibration):
  Trong không khí sạch: AO ≈ 100–200
  Khí gas nhẹ: AO ≈ 300–600
  Nguy hiểm: AO > 600

Chú ý: MQ-2 chỉ phát hiện SỰ HIỆN DIỆN của khí, không phân biệt loại khí cụ thể. Cần hiệu chỉnh thực tế.`,
      },
      {
        title: '4.3 Còi hú (Buzzer) & Relay Quạt thông gió',
        content: `Hệ thống cảnh báo kép kết hợp tín hiệu âm thanh (còi) và hành động tự động (quạt thông gió) giúp đảm bảo an toàn.

Buzzer Passive:
  Kết nối trực tiếp vào GPIO
  tone(pin, frequency)  → Phát âm tần số Hz
  noTone(pin)           → Tắt âm thanh

Relay Quạt 5V:
  Kết nối quạt DC hoặc quạt AC qua relay
  HIGH → Bật quạt | LOW → Tắt quạt

Logic cảnh báo:
  if (gasPpm > THRESHOLD) {
    tone(BUZZER, 1000);         // Còi 1kHz
    digitalWrite(FAN, HIGH);    // Bật quạt hút
  } else {
    noTone(BUZZER);             // Tắt còi
    digitalWrite(FAN, LOW);     // Tắt quạt
  }`,
      },
    ],
    code: `#include <LiquidCrystal.h>
#define GAS_PIN      35
#define BUZZER_PIN   27
#define FAN_PIN      14
#define THRESHOLD    300

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
    digitalWrite(BUZZER_PIN, HIGH);
    digitalWrite(FAN_PIN, HIGH);
    lcd.setCursor(0, 1);
    lcd.print("DANGER! FAN: ON ");
    Serial.println("!!! CANH BAO KHI DOC !!!");
  } else {
    noTone(BUZZER_PIN);
    digitalWrite(BUZZER_PIN, LOW);
    digitalWrite(FAN_PIN, LOW);
    lcd.setCursor(0, 1);
    lcd.print("Status: AN TOAN ");
  }
  delay(600);
}`,
    components: ['ESP32', 'MQ-2 Gas Sensor', 'Buzzer Passive', 'Module Relay', 'LCD1602'],
    wiring: [
      'MQ-2.VCC → ESP32.VIN | MQ-2.GND → ESP32.GND',
      'MQ-2.AO  → ESP32.D35 (Analog)',
      'Buzzer.+ → ESP32.D27 | Buzzer.− → ESP32.GND',
      'Relay.IN  → ESP32.D14 (điều khiển quạt)',
      'LCD.SDA → ESP32.D21 | LCD.SCL → ESP32.D22',
    ],
  },
  {
    id: 5,
    icon: <BarChart3 className="w-5 h-5" />,
    title: 'Buổi 5: Trạm HMI Đa cảm biến tích hợp',
    color: 'from-violet-500 to-purple-600',
    accent: '#7C3AED',
    theory: [
      {
        title: '5.1 HMI (Human-Machine Interface) trong Trạm Quan trắc',
        content: `HMI là giao diện giúp người vận hành theo dõi và tương tác với hệ thống quan trắc. Trong IoT môi trường, HMI tại chỗ thường là:
• Màn hình LCD/OLED hiển thị giá trị tức thời
• Nút bấm để chuyển màn hình, đặt ngưỡng cảnh báo
• Đèn LED màu hiển thị trạng thái nhanh

Tại sao cần HMI tại chỗ?
  → Không phụ thuộc vào kết nối Internet/Cloud
  → Kỹ thuật viên vận hành dễ dàng đọc giá trị trực tiếp
  → Phù hợp môi trường có sóng yếu (vùng nông thôn, rừng núi)`,
      },
      {
        title: '5.2 Thiết kế giao diện LCD 16x2 hiệu quả',
        content: `Với chỉ 32 ký tự (16×2), cần thiết kế hiển thị thông minh:

Nguyên tắc thiết kế:
• Dòng 1: Thông số chính (Nhiệt độ, Độ ẩm)
• Dòng 2: Thông số phụ (Khí gas, trạng thái)
• Dùng ký tự viết tắt để tiết kiệm không gian: T=Temp, H=Humi
• Luôn xóa ký tự cũ bằng khoảng trắng cuối chuỗi

Ví dụ bố cục tối ưu:
  [Dòng 0]: "T:29C H:65%    " (16 ký tự)
  [Dòng 1]: "Gas: 180 PPM   " (16 ký tự)

Kỹ thuật tránh nhấp nháy LCD:
  Thay vì lcd.clear() trước mỗi lần cập nhật,
  dùng setCursor() + print với đủ khoảng trắng
  để ghi đè lên vị trí cũ mà không xóa toàn màn hình.`,
      },
      {
        title: '5.3 Tổng hợp đa cảm biến — Xử lý & Hiển thị song song',
        content: `Khi tích hợp nhiều cảm biến, cần chú ý:

Vòng lặp đọc dữ liệu:
  1. Đọc tất cả cảm biến đầu vòng loop()
  2. Xử lý logic cảnh báo
  3. Hiển thị lên LCD và Serial
  4. delay() cuối vòng

Phân bổ chân GPIO hợp lý (không xung đột):
  D15:  DHT11 (1-Wire)
  D34:  MQ-2 Analog (chỉ đọc)
  D21:  LCD SDA (I²C)
  D22:  LCD SCL (I²C)

Tránh các lỗi thường gặp:
  ✘ Dùng D34-D39 làm OUTPUT → lỗi (chỉ INPUT)
  ✘ Quên delay giữa các lần đọc DHT11 → giá trị sai
  ✓ Luôn kiểm tra isnan() với cảm biến DHT trong code thực tế`,
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
  int temp    = analogRead(DHT_PIN);
  int humi    = dhtReadHumidity(DHT_PIN);
  int gasPpm  = analogRead(GAS_PIN);

  // Gửi dữ liệu lên Serial Monitor
  Serial.print("Temp: "); Serial.print(temp); Serial.print(" C | ");
  Serial.print("Humi: "); Serial.print(humi); Serial.print(" % | ");
  Serial.print("Gas: ");  Serial.print(gasPpm); Serial.println(" PPM");

  // Hiển thị LCD 16x2
  lcd.setCursor(0, 0);
  lcd.print("T:"); lcd.print(temp); lcd.print("C H:"); lcd.print(humi); lcd.print("%   ");
  lcd.setCursor(0, 1);
  lcd.print("Gas PPM: "); lcd.print(gasPpm); lcd.print("   ");

  delay(600);
}`,
    components: ['ESP32', 'DHT11', 'MQ-2', 'LCD1602 I²C'],
    wiring: [
      'DHT11.DATA → ESP32.D15 | DHT11.VCC → 5V',
      'MQ-2.AO   → ESP32.D34 | MQ-2.VCC → 5V',
      'LCD.SDA → ESP32.D21 | LCD.SCL → ESP32.D22',
    ],
  },
  {
    id: 6,
    icon: <Radio className="w-5 h-5" />,
    title: 'Buổi 6: Trạm IoT Đa thông số & Kết nối Cloud',
    color: 'from-rose-500 to-pink-600',
    accent: '#E11D48',
    theory: [
      {
        title: '6.1 Kiến trúc Trạm IoT Môi trường đầy đủ',
        content: `Một trạm quan trắc môi trường IoT hoàn chỉnh bao gồm 4 lớp:

1. Lớp Cảm biến (Perception Layer):
   • DHT11/22: Nhiệt độ & Độ ẩm không khí
   • MQ-2/MQ-135: Khí gas & Chất lượng không khí
   • HC-SR04: Mực nước
   • DS18B20: Nhiệt độ nước/đất

2. Lớp Mạng (Network Layer):
   • ESP32 WiFi → Router → Internet
   • Giao thức: MQTT (nhẹ, tiết kiệm điện) hoặc HTTP REST

3. Lớp Nền tảng (Platform Layer):
   • ThingSpeak, Blynk, Grafana, Firebase
   • Lưu trữ & Hiển thị dữ liệu lịch sử

4. Lớp Ứng dụng (Application Layer):
   • Dashboard web/mobile
   • Cảnh báo qua Email/SMS/Telegram`,
      },
      {
        title: '6.2 Giao thức MQTT — Xương sống của IoT',
        content: `MQTT (Message Queuing Telemetry Transport) là giao thức nhắn tin nhẹ, lý tưởng cho IoT:

Mô hình Publish/Subscribe:
  • Broker (Server): MQTT Broker (Mosquitto, HiveMQ)
  • Publisher: ESP32 gửi dữ liệu lên topic
  • Subscriber: Dashboard/ứng dụng nhận dữ liệu

Ví dụ topic MQTT quan trắc môi trường:
  kmt/station01/temperature → 28.5
  kmt/station01/humidity    → 65.2
  kmt/station01/gas         → 180
  kmt/station01/water_level → 45

Tần suất gửi dữ liệu khuyến nghị:
  • Cảnh báo khẩn (khí độc): Real-time (<1s)
  • Giám sát thường xuyên: 10–60 giây
  • Lưu lịch sử: 5–15 phút`,
      },
      {
        title: '6.3 Định dạng dữ liệu JSON cho IoT',
        content: `JSON (JavaScript Object Notation) là định dạng dữ liệu phổ biến nhất trong IoT vì dễ đọc và phân tích.

Cấu trúc JSON payload chuẩn:
{
  "station": "KMT_LAB_01",
  "timestamp": "2025-01-15T10:30:00",
  "location": { "lat": 10.762, "lon": 106.660 },
  "data": {
    "temp_air": 28.5,
    "humidity": 65.2,
    "gas_ppm": 180,
    "water_level_cm": 45
  },
  "alerts": { "gas_danger": false, "flood_risk": false }
}

Gửi JSON qua Serial trong Simulator:
  Serial.print("{\\"temp\\":"); Serial.print(temp);
  Serial.print(",\\"humi\\":"); Serial.print(humi);
  Serial.println("}");`,
      },
      {
        title: '6.4 Tổng kết 6 Buổi & Hướng phát triển',
        content: `Qua 6 buổi thực hành, sinh viên đã nắm vững:

✓ Buổi 1: Lập trình ESP32, đọc DHT11, hiển thị LCD
✓ Buổi 2: Đo mực nước HC-SR04, nhiệt độ DS18B20, cảnh báo ngập
✓ Buổi 3: Đọc độ ẩm đất, điều khiển relay & bơm tự động
✓ Buổi 4: Phát hiện khí độc MQ-2, còi báo, quạt thông gió
✓ Buổi 5: Tích hợp HMI đa cảm biến, thiết kế giao diện LCD
✓ Buổi 6: Trạm đa thông số tổng hợp, kết nối Cloud & MQTT

Hướng phát triển tiếp theo:
• Kết nối ESP32 WiFi lên ThingSpeak/Blynk
• Thêm module GPS (NEO-6M) cho trạm di động
• Sử dụng năng lượng pin mặt trời (Solar Panel)
• Xây dựng mạng lưới trạm LoRa WAN
• Tích hợp AI phân tích xu hướng ô nhiễm`,
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
  int temp    = analogRead(DHT_PIN);
  int humi    = dhtReadHumidity(DHT_PIN);
  int gasPpm  = analogRead(GAS_PIN);

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

  // Hiển thị LCD
  lcd.setCursor(0, 0);
  lcd.print("T:"); lcd.print(temp); lcd.print("C H:");
  lcd.print(humi); lcd.print("% G:"); lcd.print(gasPpm);
  lcd.setCursor(0, 1);
  lcd.print("Water:"); lcd.print(waterLevel); lcd.print("cm OK  ");

  delay(600);
}`,
    components: ['ESP32', 'DHT11', 'MQ-2', 'HC-SR04', 'LCD1602'],
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
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-md bg-slate-700 hover:bg-slate-600 text-slate-300 transition-colors"
        >
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

const TheorySection = ({ section }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-slate-700/50 rounded-xl overflow-hidden mb-2">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-4 py-3 bg-slate-800/60 hover:bg-slate-800/90 text-left transition-colors"
      >
        <span className="text-sm font-semibold text-slate-200">{section.title}</span>
        {open ? <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" /> : <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />}
      </button>
      {open && (
        <div className="px-4 py-3 bg-slate-900/50 text-slate-300 text-xs leading-relaxed whitespace-pre-line">
          {section.content}
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
      {/* Sidebar — Session list */}
      <div className={`w-64 shrink-0 flex flex-col border-r ${isDarkMode ? 'border-slate-700/50 bg-slate-900/60' : 'border-slate-200 bg-white'} overflow-y-auto`}>
        <div className="px-4 pt-4 pb-3 border-b border-slate-700/40">
          <div className="flex items-center gap-2 mb-1">
            <BookOpen className="w-4 h-4 text-blue-400" />
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">Lý thuyết</span>
          </div>
          <p className="text-[10px] text-slate-500">IoT trong Kỹ thuật Môi trường</p>
        </div>
        <div className="flex-1 p-2">
          {SESSIONS.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => setActiveSession(idx)}
              className={`w-full text-left px-3 py-2.5 rounded-lg mb-1 transition-all flex items-start gap-2.5 ${
                activeSession === idx
                  ? 'bg-gradient-to-r ' + s.color + ' text-white shadow-lg'
                  : isDarkMode
                    ? 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                    : 'text-slate-600 hover:bg-slate-100'
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
        {/* Header */}
        <div className={`rounded-2xl p-5 mb-5 bg-gradient-to-r ${session.color} text-white shadow-lg`}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur">
              {session.icon}
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-widest opacity-80 mb-0.5">Buổi {session.id} / 6</div>
              <h2 className="text-lg font-bold">{session.title.split(':')[1]?.trim()}</h2>
            </div>
          </div>
        </div>

        {/* Components needed */}
        <div className={`rounded-xl border p-4 mb-4 ${isDarkMode ? 'border-slate-700/50 bg-slate-900/40' : 'border-slate-200 bg-white'}`}>
          <div className="flex items-center gap-2 mb-2">
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
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
            <BookOpen className="w-4 h-4" /> Lý thuyết
          </h3>
          {session.theory.map((s, i) => (
            <TheorySection key={i} section={s} />
          ))}
        </div>

        {/* Wiring guide */}
        <div className={`rounded-xl border p-4 mb-4 ${isDarkMode ? 'border-slate-700/50 bg-slate-900/40' : 'border-slate-200 bg-white'}`}>
          <div className="flex items-center gap-2 mb-3">
            <Zap className="w-4 h-4 text-yellow-400" />
            <span className="text-sm font-bold">Sơ đồ đấu nối (Wiring)</span>
          </div>
          <div className="space-y-1.5">
            {session.wiring.map((w, i) => (
              <div key={i} className="flex items-center gap-2 text-xs text-slate-300">
                <span className="text-yellow-400 shrink-0">→</span>
                <code className="font-mono">{w}</code>
              </div>
            ))}
          </div>
          <div className={`mt-3 px-3 py-2 rounded-lg text-xs flex items-start gap-2 ${isDarkMode ? 'bg-amber-900/30 text-amber-300' : 'bg-amber-50 text-amber-700'}`}>
            <AlertTriangle className="w-3.5 h-3.5 mt-0.5 shrink-0" />
            <span>Kiểm tra kỹ cực tính (+ / −) và điện áp (3.3V/5V) trước khi cấp điện. Đấu nhầm có thể hỏng cảm biến.</span>
          </div>
        </div>

        {/* Code sample */}
        <div className="mb-4">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-2">
            <Code2 className="w-4 h-4" /> Mã nguồn mẫu
          </h3>
          <CodeBlock code={session.code} />
          <p className="text-[10px] text-slate-500 mt-2">
            💡 Nhấn tab <strong className="text-blue-400">Thực hành trên mạch</strong> để chạy mã này trực tiếp trên mạch ảo!
          </p>
        </div>
      </div>
    </div>
  );
}
