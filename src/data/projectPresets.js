/**
 * Realistic Sample IoT Projects for Arduino & ESP32 Virtual Simulator
 * Card layout compatible coordinates with LCD1602 / OLED Display integrated across all projects!
 */

export const PROJECT_PRESETS = {
  env_lab1: {
    name: 'B1: Quan trắc Khí hậu (DHT11 + LCD)',
    desc: 'Buổi 1: Đọc Nhiệt độ & Độ ẩm không khí bằng DHT11, hiển thị chỉ số liên tục lên màn hình LCD1602 và Serial Monitor.',
    code: `// BUỔI 1: TỔNG QUAN IOT & QUAN TRẮC KHÍ HẬU CƠ BẢN
// Cảm biến DHT11 (Chân D15) & Màn hình LCD1602 I2C (Chân D21/D22)

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
  // Mô phỏng đọc dữ liệu DHT11
  float temp = 28.5; // °C
  float humi = 65.0; // %

  Serial.print("[KMT IoT] Nhiet do: ");
  Serial.print(temp);
  Serial.print(" C | Do am: ");
  Serial.print(humi);
  Serial.println(" %");

  lcd.setCursor(0, 0);
  lcd.print("Temp: ");
  lcd.print(temp, 1);
  lcd.print(" C    ");

  lcd.setCursor(0, 1);
  lcd.print("Humi: ");
  lcd.print(humi, 1);
  lcd.print(" %    ");

  delay(1000);
}`,
    components: [
      { id: 'esp1', type: 'ESP32', x: 60, y: 60, config: {} },
      { id: 'dht1', type: 'DHT11', x: 420, y: 50, config: { value: 28, humidity: 65 } },
      { id: 'lcd1', type: 'LCD1602', x: 420, y: 240, config: { textLine1: 'Temp: 28.5 C', textLine2: 'Humi: 65.0 %' } }
    ],
    wires: [
      { id: 'w1', from: { componentId: 'esp1', portId: 'VIN' }, to: { componentId: 'dht1', portId: 'VCC' }, color: '#EF4444' },
      { id: 'w2', from: { componentId: 'esp1', portId: 'GND1' }, to: { componentId: 'dht1', portId: 'GND' }, color: '#10B981' },
      { id: 'w3', from: { componentId: 'esp1', portId: 'D15' }, to: { componentId: 'dht1', portId: 'DATA' }, color: '#F59E0B' },
      { id: 'w4', from: { componentId: 'esp1', portId: 'VIN' }, to: { componentId: 'lcd1', portId: 'VCC' }, color: '#EF4444' },
      { id: 'w5', from: { componentId: 'esp1', portId: 'GND2' }, to: { componentId: 'lcd1', portId: 'GND' }, color: '#10B981' },
      { id: 'w6', from: { componentId: 'esp1', portId: 'D22' }, to: { componentId: 'lcd1', portId: 'SCL' }, color: '#3B82F6' },
      { id: 'w7', from: { componentId: 'esp1', portId: 'D21' }, to: { componentId: 'lcd1', portId: 'SDA' }, color: '#8B5CF6' }
    ]
  },

  env_lab2: {
    name: 'B2: Quan trắc Nước & Cảnh báo Ngập',
    desc: 'Buổi 2: Đo khoảng cách mực nước sông/bể chứa (HC-SR04) & Nhiệt độ nguồn nước (DS18B20), phát cảnh báo ngập lụt.',
    code: `// BUỔI 2: QUAN TRẮC NGUỒN NƯỚC & CẢNH BÁO NGẬP LỤT
// Siêu âm HC-SR04 (Trig: D5, Echo: D18), Nhiệt độ nước DS18B20 (D4), LCD1602

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
  digitalWrite(TRIG_PIN, LOW);
  delayMicroseconds(2);
  digitalWrite(TRIG_PIN, HIGH);
  delayMicroseconds(10);
  digitalWrite(TRIG_PIN, LOW);

  long duration = pulseIn(ECHO_PIN, HIGH);
  int distanceCm = duration * 0.034 / 2;
  float waterTemp = 26.5; // °C

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
    lcd.print(waterTemp, 1);
    lcd.print(" C ");
  }

  delay(1000);
}`,
    components: [
      { id: 'esp1', type: 'ESP32', x: 60, y: 60, config: {} },
      { id: 'sonar1', type: 'HC_SR04', x: 420, y: 40, config: { distance: 12 } },
      { id: 'ds18', type: 'DS18B20', x: 420, y: 200, config: { temp: 26.5 } },
      { id: 'lcd1', type: 'LCD1602', x: 420, y: 360, config: { textLine1: 'MucNuoc: 12 cm', textLine2: 'CANH BAO: NGAP!' } }
    ],
    wires: [
      { id: 'w1', from: { componentId: 'esp1', portId: 'VIN' }, to: { componentId: 'sonar1', portId: 'VCC' }, color: '#EF4444' },
      { id: 'w2', from: { componentId: 'esp1', portId: 'GND1' }, to: { componentId: 'sonar1', portId: 'GND' }, color: '#10B981' },
      { id: 'w3', from: { componentId: 'esp1', portId: 'D5' }, to: { componentId: 'sonar1', portId: 'TRIG' }, color: '#3B82F6' },
      { id: 'w4', from: { componentId: 'esp1', portId: 'D18' }, to: { componentId: 'sonar1', portId: 'ECHO' }, color: '#8B5CF6' },
      { id: 'w5', from: { componentId: 'esp1', portId: '3V3' }, to: { componentId: 'ds18', portId: 'VCC' }, color: '#EF4444' },
      { id: 'w6', from: { componentId: 'esp1', portId: 'GND2' }, to: { componentId: 'ds18', portId: 'GND' }, color: '#10B981' },
      { id: 'w7', from: { componentId: 'esp1', portId: 'D4' }, to: { componentId: 'ds18', portId: 'DQ' }, color: '#F59E0B' },
      { id: 'w8', from: { componentId: 'esp1', portId: 'VIN' }, to: { componentId: 'lcd1', portId: 'VCC' }, color: '#EF4444' },
      { id: 'w9', from: { componentId: 'esp1', portId: 'GND1' }, to: { componentId: 'lcd1', portId: 'GND' }, color: '#10B981' },
      { id: 'w10', from: { componentId: 'esp1', portId: 'D22' }, to: { componentId: 'lcd1', portId: 'SCL' }, color: '#3B82F6' },
      { id: 'w11', from: { componentId: 'esp1', portId: 'D21' }, to: { componentId: 'lcd1', portId: 'SDA' }, color: '#8B5CF6' }
    ]
  },

  env_lab3: {
    name: 'B3: Tưới cây Tự động (Soil + Bơm Relay)',
    desc: 'Buổi 3: Giám sát độ ẩm đất. Tự động bật Module Relay kích hoạt Máy bơm nước khi đất bị khô dưới ngưỡng cài đặt.',
    code: `// BUỔI 3: QUAN TRẮC ĐẤT & HỆ THỐNG TƯỚI CÂY TỰ ĐỘNG
// Cảm biến Độ ẩm đất (Chân Analog VP/D34), Module Relay Bơm nước (Chân D26), LCD1602

#include <LiquidCrystal.h>

#define SOIL_PIN 34
#define RELAY_PIN 26

LiquidCrystal lcd;

void setup() {
  Serial.begin(115200);
  pinMode(RELAY_PIN, OUTPUT);
  digitalWrite(RELAY_PIN, LOW); // Tắt bơm ban đầu

  lcd.begin(16, 2);
  lcd.setCursor(0, 0);
  lcd.print("HE THONG TUOI");
  lcd.setCursor(0, 1);
  lcd.print("TUDONG SAN SANG");
  delay(1500);
}

void loop() {
  int soilVal = analogRead(SOIL_PIN); // Giá trị từ 0 (Khô) đến 1023 (Ướt)
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

  delay(1000);
}`,
    components: [
      { id: 'esp1', type: 'ESP32', x: 60, y: 60, config: {} },
      { id: 'soil1', type: 'SOIL_MOISTURE', x: 420, y: 40, config: { moisture: 250 } },
      { id: 'relay1', type: 'RELAY', x: 420, y: 200, config: {} },
      { id: 'pump1', type: 'DC_MOTOR', x: 680, y: 200, config: {} },
      { id: 'lcd1', type: 'LCD1602', x: 420, y: 360, config: { textLine1: 'DoAmDat: 250', textLine2: 'BOM: DANG TUOI!' } }
    ],
    wires: [
      { id: 'w1', from: { componentId: 'esp1', portId: '3V3' }, to: { componentId: 'soil1', portId: 'VCC' }, color: '#EF4444' },
      { id: 'w2', from: { componentId: 'esp1', portId: 'GND1' }, to: { componentId: 'soil1', portId: 'GND' }, color: '#10B981' },
      { id: 'w3', from: { componentId: 'esp1', portId: 'D34' }, to: { componentId: 'soil1', portId: 'AO' }, color: '#F59E0B' },
      { id: 'w4', from: { componentId: 'esp1', portId: 'VIN' }, to: { componentId: 'relay1', portId: 'VCC' }, color: '#EF4444' },
      { id: 'w5', from: { componentId: 'esp1', portId: 'GND2' }, to: { componentId: 'relay1', portId: 'GND' }, color: '#10B981' },
      { id: 'w6', from: { componentId: 'esp1', portId: 'D26' }, to: { componentId: 'relay1', portId: 'IN' }, color: '#3B82F6' },
      { id: 'w7', from: { componentId: 'relay1', portId: 'OUT' }, to: { componentId: 'pump1', portId: 'VCC' }, color: '#EF4444' },
      { id: 'w8', from: { componentId: 'esp1', portId: 'GND1' }, to: { componentId: 'pump1', portId: 'GND' }, color: '#10B981' },
      { id: 'w9', from: { componentId: 'esp1', portId: 'VIN' }, to: { componentId: 'lcd1', portId: 'VCC' }, color: '#EF4444' },
      { id: 'w10', from: { componentId: 'esp1', portId: 'GND1' }, to: { componentId: 'lcd1', portId: 'GND' }, color: '#10B981' },
      { id: 'w11', from: { componentId: 'esp1', portId: 'D22' }, to: { componentId: 'lcd1', portId: 'SCL' }, color: '#3B82F6' },
      { id: 'w12', from: { componentId: 'esp1', portId: 'D21' }, to: { componentId: 'lcd1', portId: 'SDA' }, color: '#8B5CF6' }
    ]
  },

  env_lab4: {
    name: 'B4: Cảnh báo Khí độc (MQ-2 + Còi + Quạt)',
    desc: 'Buổi 4: Đo nồng độ Khí Gas/Khói độc hại bằng MQ-2. Kích hoạt Còi hú + Quạt hút thông gió qua Relay khi nồng độ nguy hiểm.',
    code: `// BUỔI 4: CẢNH BÁO RÒ RỈ KHÍ ĐỘC & KHÓI THẢI MÔI TRƯỜNG
// Cảm biến Gas MQ-2 (VN/D35), Còi hú (D27), Module Relay Quạt hút (D14), LCD1602

#include <LiquidCrystal.h>

#define GAS_PIN 35
#define BUZZER_PIN 27
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
  int gasPpm = analogRead(GAS_PIN); // Đọc nồng độ Gas PPM
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
    digitalWrite(BUZZER_PIN, LOW);
    digitalWrite(FAN_RELAY_PIN, LOW);

    lcd.setCursor(0, 1);
    lcd.print("Status: AN TOAN ");
  }

  delay(1000);
}`,
    components: [
      { id: 'esp1', type: 'ESP32', x: 60, y: 60, config: {} },
      { id: 'mq2_1', type: 'MQ2', x: 420, y: 40, config: { gasLevel: 650 } },
      { id: 'buzzer1', type: 'BUZZER', x: 420, y: 200, config: {} },
      { id: 'relay1', type: 'RELAY', x: 680, y: 200, config: {} },
      { id: 'lcd1', type: 'LCD1602', x: 420, y: 360, config: { textLine1: 'Gas PPM: 650', textLine2: 'DANGER! FAN: ON' } }
    ],
    wires: [
      { id: 'w1', from: { componentId: 'esp1', portId: 'VIN' }, to: { componentId: 'mq2_1', portId: 'VCC' }, color: '#EF4444' },
      { id: 'w2', from: { componentId: 'esp1', portId: 'GND1' }, to: { componentId: 'mq2_1', portId: 'GND' }, color: '#10B981' },
      { id: 'w3', from: { componentId: 'esp1', portId: 'D35' }, to: { componentId: 'mq2_1', portId: 'AO' }, color: '#F59E0B' },
      { id: 'w4', from: { componentId: 'esp1', portId: 'D27' }, to: { componentId: 'buzzer1', portId: 'VCC' }, color: '#EF4444' },
      { id: 'w5', from: { componentId: 'esp1', portId: 'GND2' }, to: { componentId: 'buzzer1', portId: 'GND' }, color: '#10B981' },
      { id: 'w6', from: { componentId: 'esp1', portId: 'VIN' }, to: { componentId: 'relay1', portId: 'VCC' }, color: '#EF4444' },
      { id: 'w7', from: { componentId: 'esp1', portId: 'GND1' }, to: { componentId: 'relay1', portId: 'GND' }, color: '#10B981' },
      { id: 'w8', from: { componentId: 'esp1', portId: 'D14' }, to: { componentId: 'relay1', portId: 'IN' }, color: '#3B82F6' },
      { id: 'w9', from: { componentId: 'esp1', portId: 'VIN' }, to: { componentId: 'lcd1', portId: 'VCC' }, color: '#EF4444' },
      { id: 'w10', from: { componentId: 'esp1', portId: 'GND1' }, to: { componentId: 'lcd1', portId: 'GND' }, color: '#10B981' },
      { id: 'w11', from: { componentId: 'esp1', portId: 'D22' }, to: { componentId: 'lcd1', portId: 'SCL' }, color: '#3B82F6' },
      { id: 'w12', from: { componentId: 'esp1', portId: 'D21' }, to: { componentId: 'lcd1', portId: 'SDA' }, color: '#8B5CF6' }
    ]
  },

  env_lab5: {
    name: 'B5: Trạm HMI Môi trường (OLED + CB)',
    desc: 'Buổi 5: Xây dựng Giao diện Hiển thị HMI tại chỗ bằng Màn hình OLED SSD1306 đồ họa tích hợp cảm biến Khí độc & Nhiệt ẩm.',
    code: `// BUỔI 5: GIAO DIỆN HMI TẠI CHỖ CHO TRẠM QUAN TRẮC MÔI TRƯỜNG
// OLED SSD1306 I2C (D21/D22), DHT11 (D15), MQ-2 (D34)

#include <Adafruit_SSD1306.h>

#define DHT_PIN 15
#define GAS_PIN 34

void setup() {
  Serial.begin(115200);
  Serial.println("[HMI STATION] Khoi tao man hinh OLED SSD1306...");
}

void loop() {
  float temp = 29.2;
  int gasPpm = 180;

  Serial.print("HMI Update -> Temp: ");
  Serial.print(temp);
  Serial.print(" C | Gas: ");
  Serial.print(gasPpm);
  Serial.println(" PPM");

  delay(1200);
}`,
    components: [
      { id: 'esp1', type: 'ESP32', x: 60, y: 60, config: {} },
      { id: 'oled1', type: 'OLED_SSD1306', x: 420, y: 40, config: { line1: 'ENV HMI STATION', line2: 'Temp: 29.2C  Gas: 180', line3: 'Status: OPTIMAL' } },
      { id: 'dht1', type: 'DHT11', x: 420, y: 220, config: { value: 29, humidity: 60 } },
      { id: 'mq2_1', type: 'MQ2', x: 680, y: 220, config: { gasLevel: 180 } }
    ],
    wires: [
      { id: 'w1', from: { componentId: 'esp1', portId: '3V3' }, to: { componentId: 'oled1', portId: 'VCC' }, color: '#EF4444' },
      { id: 'w2', from: { componentId: 'esp1', portId: 'GND1' }, to: { componentId: 'oled1', portId: 'GND' }, color: '#10B981' },
      { id: 'w3', from: { componentId: 'esp1', portId: 'D22' }, to: { componentId: 'oled1', portId: 'SCL' }, color: '#3B82F6' },
      { id: 'w4', from: { componentId: 'esp1', portId: 'D21' }, to: { componentId: 'oled1', portId: 'SDA' }, color: '#8B5CF6' },
      { id: 'w5', from: { componentId: 'esp1', portId: 'VIN' }, to: { componentId: 'dht1', portId: 'VCC' }, color: '#EF4444' },
      { id: 'w6', from: { componentId: 'esp1', portId: 'GND2' }, to: { componentId: 'dht1', portId: 'GND' }, color: '#10B981' },
      { id: 'w7', from: { componentId: 'esp1', portId: 'D15' }, to: { componentId: 'dht1', portId: 'DATA' }, color: '#F59E0B' },
      { id: 'w8', from: { componentId: 'esp1', portId: 'VIN' }, to: { componentId: 'mq2_1', portId: 'VCC' }, color: '#EF4444' },
      { id: 'w9', from: { componentId: 'esp1', portId: 'GND1' }, to: { componentId: 'mq2_1', portId: 'GND' }, color: '#10B981' },
      { id: 'w10', from: { componentId: 'esp1', portId: 'D34' }, to: { componentId: 'mq2_1', portId: 'AO' }, color: '#F59E0B' }
    ]
  },

  env_lab6: {
    name: 'B6: Trạm Môi trường Đa thông số IoT',
    desc: 'Buổi 6: Đồ án Đa cảm biến tổng hợp: Nhiệt ẩm, Mực nước, Khí độc, Độ ẩm đất. Tự động xử lý sự cố & đẩy Cloud Telemetry.',
    code: `// BUỔI 6: ĐỒ ÁN TỔNG HỢP — TRẠM QUAN TRẮC MÔI TRƯỜNG ĐA THÔNG SỐ IOT
// Tích hợp Đa cảm biến & Tự động đẩy dữ liệu Telemetry lên IoT Cloud

#include <LiquidCrystal.h>

LiquidCrystal lcd;

void setup() {
  Serial.begin(115200);
  lcd.begin(16, 2);
  lcd.setCursor(0, 0);
  lcd.print("IOT ENV STATION");
  lcd.setCursor(0, 1);
  lcd.print("SYSTEM ONLINE");
  delay(1500);
}

void loop() {
  float temp = 28.4;
  int gasPpm = 110;
  int waterLevel = 45; // cm

  // Gửi chuỗi telemetry JSON qua Cloud MQTT/HTTP
  Serial.print("{\\"station\\":\\"KMT_LAB_01\\", \\"temp\\":");
  Serial.print(temp);
  Serial.print(", \\"gas\\":");
  Serial.print(gasPpm);
  Serial.print(", \\"water\\":");
  Serial.print(waterLevel);
  Serial.println("}");

  lcd.setCursor(0, 0);
  lcd.print("T:");
  lcd.print(temp, 1);
  lcd.print("C Gas:");
  lcd.print(gasPpm);

  lcd.setCursor(0, 1);
  lcd.print("Water: ");
  lcd.print(waterLevel);
  lcd.print("cm OK ");

  delay(1500);
}`,
    components: [
      { id: 'esp1', type: 'ESP32', x: 60, y: 60, config: {} },
      { id: 'dht1', type: 'DHT11', x: 420, y: 40, config: { value: 28.4, humidity: 62 } },
      { id: 'mq2_1', type: 'MQ2', x: 680, y: 40, config: { gasLevel: 110 } },
      { id: 'sonar1', type: 'HC_SR04', x: 420, y: 220, config: { distance: 45 } },
      { id: 'lcd1', type: 'LCD1602', x: 680, y: 220, config: { textLine1: 'T:28.4C Gas:110', textLine2: 'Water: 45cm OK' } }
    ],
    wires: [
      { id: 'w1', from: { componentId: 'esp1', portId: 'VIN' }, to: { componentId: 'dht1', portId: 'VCC' }, color: '#EF4444' },
      { id: 'w2', from: { componentId: 'esp1', portId: 'GND1' }, to: { componentId: 'dht1', portId: 'GND' }, color: '#10B981' },
      { id: 'w3', from: { componentId: 'esp1', portId: 'D15' }, to: { componentId: 'dht1', portId: 'DATA' }, color: '#F59E0B' },
      { id: 'w4', from: { componentId: 'esp1', portId: 'VIN' }, to: { componentId: 'mq2_1', portId: 'VCC' }, color: '#EF4444' },
      { id: 'w5', from: { componentId: 'esp1', portId: 'GND2' }, to: { componentId: 'mq2_1', portId: 'GND' }, color: '#10B981' },
      { id: 'w6', from: { componentId: 'esp1', portId: 'D35' }, to: { componentId: 'mq2_1', portId: 'AO' }, color: '#F59E0B' },
      { id: 'w7', from: { componentId: 'esp1', portId: 'VIN' }, to: { componentId: 'lcd1', portId: 'VCC' }, color: '#EF4444' },
      { id: 'w8', from: { componentId: 'esp1', portId: 'GND1' }, to: { componentId: 'lcd1', portId: 'GND' }, color: '#10B981' },
      { id: 'w9', from: { componentId: 'esp1', portId: 'D22' }, to: { componentId: 'lcd1', portId: 'SCL' }, color: '#3B82F6' },
      { id: 'w10', from: { componentId: 'esp1', portId: 'D21' }, to: { componentId: 'lcd1', portId: 'SDA' }, color: '#8B5CF6' }
    ]
  },

  blink: {
    name: '1. Chớp tắt LED & Màn hình LCD1602',
    desc: 'Bật tắt đèn LED tích hợp và hiển thị trạng thái bật/tắt liên tục lên màn hình LCD 16x2.',
    code: `// Chớp tắt LED & Hiển thị Trạng thái lên Màn hình LCD1602 (I2C)
#include <LiquidCrystal.h>

#define LED_PIN 2

LiquidCrystal lcd;

void setup() {
  pinMode(LED_PIN, OUTPUT);
  Serial.begin(115200);
  
  lcd.begin(16, 2);
  lcd.setCursor(0, 0);
  lcd.print("IoT Labs Simulator");
  lcd.setCursor(0, 1);
  lcd.print("He thong San sang!");
  delay(1500);
}

void loop() {
  digitalWrite(LED_PIN, HIGH);
  Serial.println("LED: HIGH (ON)");
  
  lcd.setCursor(0, 0);
  lcd.print("LED Status: ON  ");
  lcd.setCursor(0, 1);
  lcd.print("State: ACTIVE   ");
  delay(1000);

  digitalWrite(LED_PIN, LOW);
  Serial.println("LED: LOW (OFF)");
  
  lcd.setCursor(0, 0);
  lcd.print("LED Status: OFF ");
  lcd.setCursor(0, 1);
  lcd.print("State: STANDBY  ");
  delay(1000);
}`,
    components: [
      { id: 'esp1', type: 'ESP32', x: 60, y: 60, config: {} },
      { id: 'led1', type: 'LED', x: 420, y: 50, config: { color: '#EF4444' } },
      { id: 'lcd1', type: 'LCD1602', x: 420, y: 220, config: { textLine1: 'LED Status: ON', textLine2: 'State: ACTIVE' } }
    ],
    wires: [
      { id: 'w1', from: { componentId: 'esp1', portId: 'D2' }, to: { componentId: 'led1', portId: 'A' }, color: '#3B82F6' },
      { id: 'w2', from: { componentId: 'esp1', portId: 'GND1' }, to: { componentId: 'led1', portId: 'K' }, color: '#10B981' },
      { id: 'w3', from: { componentId: 'esp1', portId: 'VIN' }, to: { componentId: 'lcd1', portId: 'VCC' }, color: '#EF4444' },
      { id: 'w4', from: { componentId: 'esp1', portId: 'GND2' }, to: { componentId: 'lcd1', portId: 'GND' }, color: '#10B981' },
      { id: 'w5', from: { componentId: 'esp1', portId: 'D22' }, to: { componentId: 'lcd1', portId: 'SCL' }, color: '#3B82F6' },
      { id: 'w6', from: { componentId: 'esp1', portId: 'D21' }, to: { componentId: 'lcd1', portId: 'SDA' }, color: '#8B5CF6' }
    ]
  },

  ultrasonic: {
    name: '2. Đo khoảng cách Siêu âm & Màn hình LCD1602',
    desc: 'Đo khoảng cách vật cản bằng HC-SR04 và hiển thị chỉ số cm thời gian thực lên màn hình LCD1602.',
    code: `// Cảm biến Siêu âm HC-SR04 & Màn hình LCD1602 (I2C)
#include <LiquidCrystal.h>

#define TRIG_PIN 5
#define ECHO_PIN 18
#define LED_PIN 2

LiquidCrystal lcd;

void setup() {
  pinMode(TRIG_PIN, OUTPUT);
  pinMode(ECHO_PIN, INPUT);
  pinMode(LED_PIN, OUTPUT);
  Serial.begin(115200);

  lcd.begin(16, 2);
  lcd.setCursor(0, 0);
  lcd.print("HC-SR04 Radar");
  lcd.setCursor(0, 1);
  lcd.print("Khoi tao LCD...");
  delay(1000);
}

void loop() {
  digitalWrite(TRIG_PIN, LOW);
  delayMicroseconds(2);
  digitalWrite(TRIG_PIN, HIGH);
  delayMicroseconds(10);
  digitalWrite(TRIG_PIN, LOW);

  long duration = pulseIn(ECHO_PIN, HIGH);
  int distanceCm = duration * 0.034 / 2;

  Serial.print("Khoang cach: ");
  Serial.print(distanceCm);
  Serial.println(" cm");

  lcd.setCursor(0, 0);
  lcd.print("Dist: ");
  lcd.print(distanceCm);
  lcd.print(" cm    ");

  if (distanceCm < 20 && distanceCm > 0) {
    digitalWrite(LED_PIN, HIGH);
    lcd.setCursor(0, 1);
    lcd.print("Status: CANH BAO");
  } else {
    digitalWrite(LED_PIN, LOW);
    lcd.setCursor(0, 1);
    lcd.print("Status: AN TOAN ");
  }

  delay(400);
}`,
    components: [
      { id: 'esp1', type: 'ESP32', x: 60, y: 60, config: {} },
      { id: 'sonar1', type: 'HC_SR04', x: 420, y: 40, config: { distance: 15 } },
      { id: 'led1', type: 'LED', x: 420, y: 190, config: { color: '#EF4444' } },
      { id: 'lcd1', type: 'LCD1602', x: 420, y: 320, config: { textLine1: 'Dist: 15 cm', textLine2: 'Status: CANH BAO' } }
    ],
    wires: [
      { id: 'w1', from: { componentId: 'esp1', portId: 'VIN' }, to: { componentId: 'sonar1', portId: 'VCC' }, color: '#EF4444' },
      { id: 'w2', from: { componentId: 'esp1', portId: 'GND2' }, to: { componentId: 'sonar1', portId: 'GND' }, color: '#10B981' },
      { id: 'w3', from: { componentId: 'esp1', portId: 'D5' }, to: { componentId: 'sonar1', portId: 'TRIG' }, color: '#F59E0B' },
      { id: 'w4', from: { componentId: 'esp1', portId: 'D18' }, to: { componentId: 'sonar1', portId: 'ECHO' }, color: '#3B82F6' },
      { id: 'w5', from: { componentId: 'esp1', portId: 'D2' }, to: { componentId: 'led1', portId: 'A' }, color: '#8B5CF6' },
      { id: 'w6', from: { componentId: 'esp1', portId: 'GND1' }, to: { componentId: 'led1', portId: 'K' }, color: '#10B981' },
      { id: 'w7', from: { componentId: 'esp1', portId: 'VIN' }, to: { componentId: 'lcd1', portId: 'VCC' }, color: '#EF4444' },
      { id: 'w8', from: { componentId: 'esp1', portId: 'GND1' }, to: { componentId: 'lcd1', portId: 'GND' }, color: '#10B981' },
      { id: 'w9', from: { componentId: 'esp1', portId: 'D22' }, to: { componentId: 'lcd1', portId: 'SCL' }, color: '#3B82F6' },
      { id: 'w10', from: { componentId: 'esp1', portId: 'D21' }, to: { componentId: 'lcd1', portId: 'SDA' }, color: '#8B5CF6' }
    ]
  },

  pir_alarm: {
    name: '3. Báo động Chuyển động PIR & Màn hình LCD1602',
    desc: 'Phát hiện chuyển động người bằng PIR và cảnh báo trực tiếp lên màn hình LCD1602.',
    code: `// Báo động Chuyển động PIR & Màn hình LCD1602 (I2C)
#include <LiquidCrystal.h>

#define PIR_PIN 19
#define BUZZER_PIN 12
#define LED_PIN 2

LiquidCrystal lcd;

void setup() {
  pinMode(PIR_PIN, INPUT);
  pinMode(BUZZER_PIN, OUTPUT);
  pinMode(LED_PIN, OUTPUT);
  Serial.begin(115200);

  lcd.begin(16, 2);
  lcd.setCursor(0, 0);
  lcd.print("He Thong An Ninh");
  lcd.setCursor(0, 1);
  lcd.print("Dang giam sat...");
  delay(1000);
}

void loop() {
  int motionState = digitalRead(PIR_PIN);

  if (motionState == HIGH) {
    Serial.println("CANH BAO: Phat hien dot nhap! Coi keu.");
    digitalWrite(LED_PIN, HIGH);
    
    lcd.setCursor(0, 0);
    lcd.print("PIR: PHAT HIEN! ");
    lcd.setCursor(0, 1);
    lcd.print("ALERT: BAO DONG!");

    tone(BUZZER_PIN, 1200, 300);
    delay(300);
  } else {
    digitalWrite(LED_PIN, LOW);
    noTone(BUZZER_PIN);
    
    lcd.setCursor(0, 0);
    lcd.print("PIR: Khong co   ");
    lcd.setCursor(0, 1);
    lcd.print("Status: AN TOAN ");
    delay(500);
  }
}`,
    components: [
      { id: 'esp1', type: 'ESP32', x: 60, y: 60, config: {} },
      { id: 'pir1', type: 'PIR', x: 420, y: 40, config: { motion: true } },
      { id: 'buzz1', type: 'BUZZER', x: 420, y: 190, config: {} },
      { id: 'lcd1', type: 'LCD1602', x: 420, y: 320, config: { textLine1: 'PIR: PHAT HIEN!', textLine2: 'ALERT: BAO DONG!' } }
    ],
    wires: [
      { id: 'w1', from: { componentId: 'esp1', portId: '3V3' }, to: { componentId: 'pir1', portId: 'VCC' }, color: '#EF4444' },
      { id: 'w2', from: { componentId: 'esp1', portId: 'GND1' }, to: { componentId: 'pir1', portId: 'GND' }, color: '#10B981' },
      { id: 'w3', from: { componentId: 'esp1', portId: 'D19' }, to: { componentId: 'pir1', portId: 'OUT' }, color: '#F59E0B' },
      { id: 'w4', from: { componentId: 'esp1', portId: 'D12' }, to: { componentId: 'buzz1', portId: 'POS' }, color: '#8B5CF6' },
      { id: 'w5', from: { componentId: 'esp1', portId: 'GND2' }, to: { componentId: 'buzz1', portId: 'NEG' }, color: '#10B981' },
      { id: 'w6', from: { componentId: 'esp1', portId: 'VIN' }, to: { componentId: 'lcd1', portId: 'VCC' }, color: '#EF4444' },
      { id: 'w7', from: { componentId: 'esp1', portId: 'GND1' }, to: { componentId: 'lcd1', portId: 'GND' }, color: '#10B981' },
      { id: 'w8', from: { componentId: 'esp1', portId: 'D22' }, to: { componentId: 'lcd1', portId: 'SCL' }, color: '#3B82F6' },
      { id: 'w9', from: { componentId: 'esp1', portId: 'D21' }, to: { componentId: 'lcd1', portId: 'SDA' }, color: '#8B5CF6' }
    ]
  },

  smart_light: {
    name: '4. Đèn ngủ LDR & Màn hình LCD1602',
    desc: 'Đo cường độ ánh sáng bằng LDR và hiển thị trạng thái Rơ-le lên màn hình LCD1602.',
    code: `// Đèn ngủ tự động LDR & Rơ-le với Màn hình LCD1602 (I2C)
#include <LiquidCrystal.h>

#define LDR_PIN 36 // A0
#define RELAY_PIN 27

LiquidCrystal lcd;

void setup() {
  pinMode(LDR_PIN, INPUT);
  pinMode(RELAY_PIN, OUTPUT);
  Serial.begin(115200);

  lcd.begin(16, 2);
  lcd.setCursor(0, 0);
  lcd.print("Smart Light LDR");
  lcd.setCursor(0, 1);
  lcd.print("Khoi tao...");
  delay(1000);
}

void loop() {
  int lightVal = analogRead(LDR_PIN);
  Serial.print("Cuong do anh sang: ");
  Serial.println(lightVal);

  lcd.setCursor(0, 0);
  lcd.print("Light: ");
  lcd.print(lightVal);
  lcd.print(" Lux    ");

  if (lightVal < 400) {
    digitalWrite(RELAY_PIN, HIGH);
    lcd.setCursor(0, 1);
    lcd.print("Relay: ON (TOI) ");
  } else {
    digitalWrite(RELAY_PIN, LOW);
    lcd.setCursor(0, 1);
    lcd.print("Relay: OFF(SANG)");
  }
  delay(500);
}`,
    components: [
      { id: 'esp1', type: 'ESP32', x: 60, y: 60, config: {} },
      { id: 'ldr1', type: 'LDR', x: 420, y: 40, config: { value: 250 } },
      { id: 'relay1', type: 'RELAY', x: 420, y: 190, config: { state: false } },
      { id: 'lcd1', type: 'LCD1602', x: 420, y: 320, config: { textLine1: 'Light: 250 Lux', textLine2: 'Relay: ON (TOI)' } }
    ],
    wires: [
      { id: 'w1', from: { componentId: 'esp1', portId: 'VIN' }, to: { componentId: 'ldr1', portId: 'VCC' }, color: '#EF4444' },
      { id: 'w2', from: { componentId: 'esp1', portId: 'GND2' }, to: { componentId: 'ldr1', portId: 'GND' }, color: '#10B981' },
      { id: 'w3', from: { componentId: 'esp1', portId: 'A0' }, to: { componentId: 'ldr1', portId: 'OUT' }, color: '#F59E0B' },
      { id: 'w4', from: { componentId: 'esp1', portId: 'D27' }, to: { componentId: 'relay1', portId: 'IN' }, color: '#3B82F6' },
      { id: 'w5', from: { componentId: 'esp1', portId: 'GND1' }, to: { componentId: 'relay1', portId: 'GND' }, color: '#10B981' },
      { id: 'w6', from: { componentId: 'esp1', portId: 'VIN' }, to: { componentId: 'relay1', portId: 'VCC' }, color: '#EF4444' },
      { id: 'w7', from: { componentId: 'esp1', portId: 'VIN' }, to: { componentId: 'lcd1', portId: 'VCC' }, color: '#EF4444' },
      { id: 'w8', from: { componentId: 'esp1', portId: 'GND1' }, to: { componentId: 'lcd1', portId: 'GND' }, color: '#10B981' },
      { id: 'w9', from: { componentId: 'esp1', portId: 'D22' }, to: { componentId: 'lcd1', portId: 'SCL' }, color: '#3B82F6' },
      { id: 'w10', from: { componentId: 'esp1', portId: 'D21' }, to: { componentId: 'lcd1', portId: 'SDA' }, color: '#8B5CF6' }
    ]
  },

  smart_plant: {
    name: '5. Tưới cây Độ ẩm đất & Màn hình LCD1602',
    desc: 'Đo độ ẩm đất thời gian thực và tự động kích hoạt Động cơ Bơm tưới hiển thị lên LCD1602.',
    code: `// Hệ thống Tưới cây Tự động & Màn hình LCD1602 (I2C)
#include <LiquidCrystal.h>

#define SOIL_PIN 36 // A0
#define PUMP_PIN 26

LiquidCrystal lcd;

void setup() {
  pinMode(SOIL_PIN, INPUT);
  pinMode(PUMP_PIN, OUTPUT);
  Serial.begin(115200);

  lcd.begin(16, 2);
  lcd.setCursor(0, 0);
  lcd.print("Smart Irrigation");
  lcd.setCursor(0, 1);
  lcd.print("Moisture Monitor");
  delay(1000);
}

void loop() {
  int moisture = analogRead(SOIL_PIN);
  Serial.print("Do am dat: ");
  Serial.println(moisture);

  lcd.setCursor(0, 0);
  lcd.print("Moisture: ");
  lcd.print(moisture);
  lcd.print("   ");

  if (moisture < 400) {
    digitalWrite(PUMP_PIN, HIGH);
    lcd.setCursor(0, 1);
    lcd.print("Pump: WATERING!");
  } else {
    digitalWrite(PUMP_PIN, LOW);
    lcd.setCursor(0, 1);
    lcd.print("Pump: OFF (OK) ");
  }
  delay(500);
}`,
    components: [
      { id: 'esp1', type: 'ESP32', x: 60, y: 60, config: {} },
      { id: 'soil1', type: 'SOIL_MOISTURE', x: 420, y: 40, config: { moisture: 300 } },
      { id: 'pump1', type: 'DC_MOTOR', x: 420, y: 190, config: { speed: 0 } },
      { id: 'lcd1', type: 'LCD1602', x: 420, y: 320, config: { textLine1: 'Moisture: 300', textLine2: 'Pump: WATERING!' } }
    ],
    wires: [
      { id: 'w1', from: { componentId: 'esp1', portId: 'VIN' }, to: { componentId: 'soil1', portId: 'VCC' }, color: '#EF4444' },
      { id: 'w2', from: { componentId: 'esp1', portId: 'GND2' }, to: { componentId: 'soil1', portId: 'GND' }, color: '#10B981' },
      { id: 'w3', from: { componentId: 'esp1', portId: 'A0' }, to: { componentId: 'soil1', portId: 'AO' }, color: '#F59E0B' },
      { id: 'w4', from: { componentId: 'esp1', portId: 'D26' }, to: { componentId: 'pump1', portId: 'POS' }, color: '#3B82F6' },
      { id: 'w5', from: { componentId: 'esp1', portId: 'GND1' }, to: { componentId: 'pump1', portId: 'NEG' }, color: '#10B981' },
      { id: 'w6', from: { componentId: 'esp1', portId: 'VIN' }, to: { componentId: 'lcd1', portId: 'VCC' }, color: '#EF4444' },
      { id: 'w7', from: { componentId: 'esp1', portId: 'GND1' }, to: { componentId: 'lcd1', portId: 'GND' }, color: '#10B981' },
      { id: 'w8', from: { componentId: 'esp1', portId: 'D22' }, to: { componentId: 'lcd1', portId: 'SCL' }, color: '#3B82F6' },
      { id: 'w9', from: { componentId: 'esp1', portId: 'D21' }, to: { componentId: 'lcd1', portId: 'SDA' }, color: '#8B5CF6' }
    ]
  },

  gas_fire_alarm: {
    name: '6. Cảnh báo Gas & Chống cháy & Màn hình LCD1602',
    desc: 'Cảm biến Gas MQ-2 & Cảm biến Lửa Flame báo động trực tiếp lên màn hình LCD1602.',
    code: `// Cảnh báo Rò rỉ Gas & Báo cháy với Màn hình LCD1602 (I2C)
#include <LiquidCrystal.h>

#define GAS_PIN 36 // A0
#define FLAME_PIN 4
#define BUZZER_PIN 12

LiquidCrystal lcd;

void setup() {
  pinMode(GAS_PIN, INPUT);
  pinMode(FLAME_PIN, INPUT);
  pinMode(BUZZER_PIN, OUTPUT);
  Serial.begin(115200);

  lcd.begin(16, 2);
  lcd.setCursor(0, 0);
  lcd.print("Gas & Fire Alarm");
  lcd.setCursor(0, 1);
  lcd.print("System Ready...");
  delay(1000);
}

void loop() {
  int gasVal = analogRead(GAS_PIN);
  int isFlame = digitalRead(FLAME_PIN);

  Serial.print("Nong do Gas: ");
  Serial.print(gasVal);
  Serial.print(" | Ngon lua: ");
  Serial.println(isFlame ? "YES" : "NO");

  lcd.setCursor(0, 0);
  lcd.print("Gas: ");
  lcd.print(gasVal);
  lcd.print(" ppm   ");

  if (gasVal > 400 || isFlame == HIGH) {
    lcd.setCursor(0, 1);
    lcd.print("ALARM: DANGER! ");
    tone(BUZZER_PIN, 2000, 200);
    delay(200);
  } else {
    noTone(BUZZER_PIN);
    lcd.setCursor(0, 1);
    lcd.print("Status: SAFE    ");
    delay(500);
  }
}`,
    components: [
      { id: 'esp1', type: 'ESP32', x: 60, y: 60, config: {} },
      { id: 'mq2_1', type: 'MQ2', x: 420, y: 40, config: { gasLevel: 550 } },
      { id: 'flame1', type: 'FLAME', x: 420, y: 190, config: { detected: true } },
      { id: 'buzz1', type: 'BUZZER', x: 420, y: 330, config: {} },
      { id: 'lcd1', type: 'LCD1602', x: 420, y: 460, config: { textLine1: 'Gas: 550 ppm', textLine2: 'ALARM: DANGER!' } }
    ],
    wires: [
      { id: 'w1', from: { componentId: 'esp1', portId: 'VIN' }, to: { componentId: 'mq2_1', portId: 'VCC' }, color: '#EF4444' },
      { id: 'w2', from: { componentId: 'esp1', portId: 'GND2' }, to: { componentId: 'mq2_1', portId: 'GND' }, color: '#10B981' },
      { id: 'w3', from: { componentId: 'esp1', portId: 'A0' }, to: { componentId: 'mq2_1', portId: 'AO' }, color: '#F59E0B' },
      { id: 'w4', from: { componentId: 'esp1', portId: '3V3' }, to: { componentId: 'flame1', portId: 'VCC' }, color: '#EF4444' },
      { id: 'w5', from: { componentId: 'esp1', portId: 'GND1' }, to: { componentId: 'flame1', portId: 'GND' }, color: '#10B981' },
      { id: 'w6', from: { componentId: 'esp1', portId: 'D4' }, to: { componentId: 'flame1', portId: 'DO' }, color: '#8B5CF6' },
      { id: 'w7', from: { componentId: 'esp1', portId: 'D12' }, to: { componentId: 'buzz1', portId: 'POS' }, color: '#DC2626' },
      { id: 'w8', from: { componentId: 'esp1', portId: 'GND2' }, to: { componentId: 'buzz1', portId: 'NEG' }, color: '#10B981' },
      { id: 'w9', from: { componentId: 'esp1', portId: 'VIN' }, to: { componentId: 'lcd1', portId: 'VCC' }, color: '#EF4444' },
      { id: 'w10', from: { componentId: 'esp1', portId: 'GND1' }, to: { componentId: 'lcd1', portId: 'GND' }, color: '#10B981' },
      { id: 'w11', from: { componentId: 'esp1', portId: 'D22' }, to: { componentId: 'lcd1', portId: 'SCL' }, color: '#3B82F6' },
      { id: 'w12', from: { componentId: 'esp1', portId: 'D21' }, to: { componentId: 'lcd1', portId: 'SDA' }, color: '#8B5CF6' }
    ]
  },

  weather_station: {
    name: '7. Trạm Thời tiết DHT11 & Màn hình LCD1602 + OLED',
    desc: 'Đọc nhiệt độ & độ ẩm từ DHT11 và hiển thị đồng thời lên màn hình LCD1602 và OLED SSD1306.',
    code: `// Trạm Thời tiết Mini DHT11 & LCD1602 & OLED SSD1306 (I2C)
#include <LiquidCrystal.h>

#define DHT_PIN 15

LiquidCrystal lcd;

void setup() {
  pinMode(DHT_PIN, INPUT);
  Serial.begin(115200);

  lcd.begin(16, 2);
  lcd.setCursor(0, 0);
  lcd.print("Weather Station");
  lcd.setCursor(0, 1);
  lcd.print("ESP32 Sensor...");
  delay(1000);
}

void loop() {
  int temp = analogRead(DHT_PIN);
  int humidity = 65;

  Serial.print("Nhiet do: ");
  Serial.print(temp);
  Serial.print(" C | Do am: ");
  Serial.print(humidity);
  Serial.println(" %");

  lcd.setCursor(0, 0);
  lcd.print("Temp: ");
  lcd.print(temp);
  lcd.print(" C     ");

  lcd.setCursor(0, 1);
  lcd.print("Humid: ");
  lcd.print(humidity);
  lcd.print(" %    ");

  delay(600);
}`,
    components: [
      { id: 'esp1', type: 'ESP32', x: 60, y: 60, config: {} },
      { id: 'dht1', type: 'DHT11', x: 420, y: 40, config: { value: 31, humidity: 65 } },
      { id: 'lcd1', type: 'LCD1602', x: 420, y: 190, config: { textLine1: 'Temp: 31 C', textLine2: 'Humid: 65 %' } },
      { id: 'oled1', type: 'OLED_SSD1306', x: 420, y: 320, config: { line1: 'ESP32 Weather', line2: 'Temp: 31C Hum:65%' } }
    ],
    wires: [
      { id: 'w1', from: { componentId: 'esp1', portId: '3V3' }, to: { componentId: 'dht1', portId: 'VCC' }, color: '#EF4444' },
      { id: 'w2', from: { componentId: 'esp1', portId: 'GND1' }, to: { componentId: 'dht1', portId: 'GND' }, color: '#10B981' },
      { id: 'w3', from: { componentId: 'esp1', portId: 'D15' }, to: { componentId: 'dht1', portId: 'DATA' }, color: '#F59E0B' },
      { id: 'w4', from: { componentId: 'esp1', portId: 'VIN' }, to: { componentId: 'lcd1', portId: 'VCC' }, color: '#EF4444' },
      { id: 'w5', from: { componentId: 'esp1', portId: 'GND1' }, to: { componentId: 'lcd1', portId: 'GND' }, color: '#10B981' },
      { id: 'w6', from: { componentId: 'esp1', portId: 'D22' }, to: { componentId: 'lcd1', portId: 'SCL' }, color: '#3B82F6' },
      { id: 'w7', from: { componentId: 'esp1', portId: 'D21' }, to: { componentId: 'lcd1', portId: 'SDA' }, color: '#8B5CF6' },
      { id: 'w8', from: { componentId: 'esp1', portId: '3V3' }, to: { componentId: 'oled1', portId: 'VCC' }, color: '#EF4444' },
      { id: 'w9', from: { componentId: 'esp1', portId: 'GND2' }, to: { componentId: 'oled1', portId: 'GND' }, color: '#10B981' },
      { id: 'w10', from: { componentId: 'esp1', portId: 'D22' }, to: { componentId: 'oled1', portId: 'SCL' }, color: '#3B82F6' },
      { id: 'w11', from: { componentId: 'esp1', portId: 'D21' }, to: { componentId: 'oled1', portId: 'SDA' }, color: '#8B5CF6' }
    ]
  },

  rgb_rainbow: {
    name: '8. Điều khiển Biến trở RGB & Màn hình LCD1602',
    desc: 'Xoay biến trở 10k để chuyển đổi màu sắc LED RGB và hiển thị giá trị lên màn hình LCD1602.',
    code: `// Điều khiển Biến trở RGB & Màn hình LCD1602 (I2C)
#include <LiquidCrystal.h>

#define POT_PIN 36 // A0
#define RED_PIN 13
#define GREEN_PIN 12
#define BLUE_PIN 14

LiquidCrystal lcd;

void setup() {
  pinMode(POT_PIN, INPUT);
  pinMode(RED_PIN, OUTPUT);
  pinMode(GREEN_PIN, OUTPUT);
  pinMode(BLUE_PIN, OUTPUT);
  Serial.begin(115200);

  lcd.begin(16, 2);
  lcd.setCursor(0, 0);
  lcd.print("RGB Color Control");
  lcd.setCursor(0, 1);
  lcd.print("Potentiometer");
  delay(1000);
}

void loop() {
  int potVal = analogRead(POT_PIN);
  Serial.print("Gia tri Bien tro: ");
  Serial.println(potVal);

  lcd.setCursor(0, 0);
  lcd.print("Potentiometer: ");
  lcd.print(potVal);
  lcd.print("   ");

  if (potVal < 340) {
    digitalWrite(RED_PIN, HIGH);
    digitalWrite(GREEN_PIN, LOW);
    digitalWrite(BLUE_PIN, LOW);
    lcd.setCursor(0, 1);
    lcd.print("Color: RED      ");
  } else if (potVal < 680) {
    digitalWrite(RED_PIN, LOW);
    digitalWrite(GREEN_PIN, HIGH);
    digitalWrite(BLUE_PIN, LOW);
    lcd.setCursor(0, 1);
    lcd.print("Color: GREEN    ");
  } else {
    digitalWrite(RED_PIN, LOW);
    digitalWrite(GREEN_PIN, LOW);
    digitalWrite(BLUE_PIN, HIGH);
    lcd.setCursor(0, 1);
    lcd.print("Color: BLUE     ");
  }

  delay(300);
}`,
    components: [
      { id: 'esp1', type: 'ESP32', x: 60, y: 60, config: {} },
      { id: 'pot1', type: 'POTENTIOMETER', x: 420, y: 40, config: { position: 800 } },
      { id: 'rgb1', type: 'RGB_LED', x: 420, y: 190, config: {} },
      { id: 'lcd1', type: 'LCD1602', x: 420, y: 320, config: { textLine1: 'Potentiometer:800', textLine2: 'Color: BLUE' } }
    ],
    wires: [
      { id: 'w1', from: { componentId: 'esp1', portId: 'VIN' }, to: { componentId: 'pot1', portId: 'VCC' }, color: '#EF4444' },
      { id: 'w2', from: { componentId: 'esp1', portId: 'GND2' }, to: { componentId: 'pot1', portId: 'GND' }, color: '#10B981' },
      { id: 'w3', from: { componentId: 'esp1', portId: 'A0' }, to: { componentId: 'pot1', portId: 'OUT' }, color: '#F59E0B' },
      { id: 'w4', from: { componentId: 'esp1', portId: 'D13' }, to: { componentId: 'rgb1', portId: 'R' }, color: '#DC2626' },
      { id: 'w5', from: { componentId: 'esp1', portId: 'D12' }, to: { componentId: 'rgb1', portId: 'G' }, color: '#16A34A' },
      { id: 'w6', from: { componentId: 'esp1', portId: 'D14' }, to: { componentId: 'rgb1', portId: 'B' }, color: '#2563EB' },
      { id: 'w7', from: { componentId: 'esp1', portId: 'GND1' }, to: { componentId: 'rgb1', portId: 'GND' }, color: '#10B981' },
      { id: 'w8', from: { componentId: 'esp1', portId: 'VIN' }, to: { componentId: 'lcd1', portId: 'VCC' }, color: '#EF4444' },
      { id: 'w9', from: { componentId: 'esp1', portId: 'GND1' }, to: { componentId: 'lcd1', portId: 'GND' }, color: '#10B981' },
      { id: 'w10', from: { componentId: 'esp1', portId: 'D22' }, to: { componentId: 'lcd1', portId: 'SCL' }, color: '#3B82F6' },
      { id: 'w11', from: { componentId: 'esp1', portId: 'D21' }, to: { componentId: 'lcd1', portId: 'SDA' }, color: '#8B5CF6' }
    ]
  }
};
