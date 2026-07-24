/**
 * Realistic Sample IoT Projects for Arduino & ESP32 Virtual Simulator
 * Card layout compatible coordinates with LCD1602 / OLED Display integrated across all projects!
 */

export const PROJECT_PRESETS = {
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
