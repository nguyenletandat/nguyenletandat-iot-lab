/**
 * Realistic Sample IoT Projects for Arduino & ESP32 Virtual Simulator
 * Environmental Engineering IoT 6-Session Curriculum Edition (LCD1602 Integrated for ALL Labs)
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
      { id: 'esp1', type: 'ESP32', x: 60, y: 60, config: {} },
      { id: 'dht1', type: 'DHT11', x: 420, y: 50, config: { value: 28, humidity: 65 } },
      { id: 'lcd1', type: 'LCD1602', x: 420, y: 240, config: { textLine1: 'Temp: 28 C', textLine2: 'Humi: 65 %' } }
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
    desc: 'Buổi 2: Đo mực nước (HC-SR04) & Nhiệt độ nguồn nước (DS18B20), hiển thị LCD1602 và phát cảnh báo ngập lụt.',
    code: `// BUỔI 2: QUAN TRẮC NGUỒN NƯỚC & CẢNH BÁO NGẬP LỤT
// Siêu âm HC-SR04 (Trig: D5, Echo: D18), DS18B20 (D4), LCD1602

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
      { id: 'esp1', type: 'ESP32', x: 60, y: 60, config: {} },
      { id: 'sonar1', type: 'HC_SR04', x: 420, y: 40, config: { distance: 12 } },
      { id: 'ds18', type: 'DS18B20', x: 420, y: 200, config: { temp: 26 } },
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
// Cảm biến Độ ẩm đất (D34), Module Relay Bơm nước (D26), LCD1602

#include <LiquidCrystal.h>

#define SOIL_PIN 34
#define RELAY_PIN 26

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
    desc: 'Buổi 4: Đo nồng độ Khí Gas/Khói bằng MQ-2. Bật Còi hú + Quạt thông gió qua Relay khi nồng độ nguy hiểm, tự tắt còi khi an toàn.',
    code: `// BUỔI 4: CẢNH BÁO RÒ RỈ KHÍ ĐỘC & KHÓI THẢI MÔI TRƯỜNG
// Cảm biến Gas MQ-2 (D35), Còi hú (D27), Relay Quạt (D14), LCD1602

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
    name: 'B5: Trạm HMI Môi trường (LCD + CB)',
    desc: 'Buổi 5: Xây dựng Giao diện Hiển thị HMI tại chỗ bằng Màn hình LCD1602 tích hợp cảm biến Khí độc MQ-2 & Nhiệt ẩm DHT11.',
    code: `// BUỔI 5: GIAO DIỆN HMI TẠI CHỖ CHO TRẠM QUAN TRẮC MÔI TRƯỜNG
// LCD1602 I2C (D21/D22), DHT11 (D15), MQ-2 (D34)

#include <LiquidCrystal.h>

#define DHT_PIN 15
#define GAS_PIN 34

LiquidCrystal lcd;

void setup() {
  Serial.begin(115200);
  pinMode(DHT_PIN, INPUT);

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

  delay(600);
}`,
    components: [
      { id: 'esp1', type: 'ESP32', x: 60, y: 60, config: {} },
      { id: 'lcd1', type: 'LCD1602', x: 420, y: 40, config: { textLine1: 'T:29C H:60%', textLine2: 'Gas PPM: 180' } },
      { id: 'dht1', type: 'DHT11', x: 420, y: 220, config: { value: 29, humidity: 60 } },
      { id: 'mq2_1', type: 'MQ2', x: 680, y: 220, config: { gasLevel: 180 } }
    ],
    wires: [
      { id: 'w1', from: { componentId: 'esp1', portId: 'VIN' }, to: { componentId: 'lcd1', portId: 'VCC' }, color: '#EF4444' },
      { id: 'w2', from: { componentId: 'esp1', portId: 'GND1' }, to: { componentId: 'lcd1', portId: 'GND' }, color: '#10B981' },
      { id: 'w3', from: { componentId: 'esp1', portId: 'D22' }, to: { componentId: 'lcd1', portId: 'SCL' }, color: '#3B82F6' },
      { id: 'w4', from: { componentId: 'esp1', portId: 'D21' }, to: { componentId: 'lcd1', portId: 'SDA' }, color: '#8B5CF6' },
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
    desc: 'Buổi 6: Đồ án Đa cảm biến tổng hợp: Nhiệt ẩm, Mực nước, Khí độc. Hiển thị LCD1602 & đẩy Cloud Telemetry.',
    code: `// BUỔI 6: ĐỒ ÁN TỔNG HỢP — TRẠM QUAN TRẮC MÔI TRƯỜNG ĐA THÔNG SỐ IOT
// Tích hợp Đa cảm biến & Tự động đẩy dữ liệu Telemetry lên IoT Cloud

#include <LiquidCrystal.h>

#define DHT_PIN 15
#define GAS_PIN 35
#define TRIG_PIN 5
#define ECHO_PIN 18

LiquidCrystal lcd;

void setup() {
  Serial.begin(115200);
  pinMode(TRIG_PIN, OUTPUT);
  pinMode(ECHO_PIN, INPUT);

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

  delay(600);
}`,
    components: [
      { id: 'esp1', type: 'ESP32', x: 60, y: 60, config: {} },
      { id: 'dht1', type: 'DHT11', x: 420, y: 40, config: { value: 28, humidity: 62 } },
      { id: 'mq2_1', type: 'MQ2', x: 680, y: 40, config: { gasLevel: 110 } },
      { id: 'sonar1', type: 'HC_SR04', x: 420, y: 230, config: { distance: 45 } },
      { id: 'lcd1', type: 'LCD1602', x: 680, y: 230, config: { textLine1: 'T:28C H:62% G:110', textLine2: 'Water: 45cm OK' } }
    ],
    wires: [
      { id: 'w1', from: { componentId: 'esp1', portId: 'VIN' }, to: { componentId: 'dht1', portId: 'VCC' }, color: '#EF4444' },
      { id: 'w2', from: { componentId: 'esp1', portId: 'GND1' }, to: { componentId: 'dht1', portId: 'GND' }, color: '#10B981' },
      { id: 'w3', from: { componentId: 'esp1', portId: 'D15' }, to: { componentId: 'dht1', portId: 'DATA' }, color: '#F59E0B' },
      { id: 'w4', from: { componentId: 'esp1', portId: 'VIN' }, to: { componentId: 'mq2_1', portId: 'VCC' }, color: '#EF4444' },
      { id: 'w5', from: { componentId: 'esp1', portId: 'GND2' }, to: { componentId: 'mq2_1', portId: 'GND' }, color: '#10B981' },
      { id: 'w6', from: { componentId: 'esp1', portId: 'D35' }, to: { componentId: 'mq2_1', portId: 'AO' }, color: '#F59E0B' },
      { id: 'w7', from: { componentId: 'esp1', portId: 'VIN' }, to: { componentId: 'sonar1', portId: 'VCC' }, color: '#EF4444' },
      { id: 'w8', from: { componentId: 'esp1', portId: 'GND1' }, to: { componentId: 'sonar1', portId: 'GND' }, color: '#10B981' },
      { id: 'w9', from: { componentId: 'esp1', portId: 'D5' }, to: { componentId: 'sonar1', portId: 'TRIG' }, color: '#3B82F6' },
      { id: 'w10', from: { componentId: 'esp1', portId: 'D18' }, to: { componentId: 'sonar1', portId: 'ECHO' }, color: '#8B5CF6' },
      { id: 'w11', from: { componentId: 'esp1', portId: 'VIN' }, to: { componentId: 'lcd1', portId: 'VCC' }, color: '#EF4444' },
      { id: 'w12', from: { componentId: 'esp1', portId: 'GND1' }, to: { componentId: 'lcd1', portId: 'GND' }, color: '#10B981' },
      { id: 'w13', from: { componentId: 'esp1', portId: 'D22' }, to: { componentId: 'lcd1', portId: 'SCL' }, color: '#3B82F6' },
      { id: 'w14', from: { componentId: 'esp1', portId: 'D21' }, to: { componentId: 'lcd1', portId: 'SDA' }, color: '#8B5CF6' }
    ]
  }
};
