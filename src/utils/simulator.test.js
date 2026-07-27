import { describe, it, expect, vi } from 'vitest';
import { transpileArduino } from './simulator';

// Chạy code Arduino mẫu qua transpiler rồi thực thi thật với 1 `sys` giả lập,
// để kiểm tra HÀNH VI runtime thay vì chỉ so khớp chuỗi — vì transpiler dùng
// regex nối tiếp nhau, lỗi thường chỉ lộ ra khi thực thi (như vụ tone() trước đây).
function run(code, sys) {
  const js = transpileArduino(code);
  // typeof tránh ReferenceError khi code mẫu chỉ khai báo setup() hoặc chỉ loop()
  const fn = new Function('sys', `
    ${js}
    return {
      setup: typeof setup !== 'undefined' ? setup : undefined,
      loop: typeof loop !== 'undefined' ? loop : undefined,
    };
  `);
  return fn(sys);
}

function mockSys(overrides = {}) {
  return {
    pinMode: vi.fn(),
    digitalWrite: vi.fn(),
    digitalRead: vi.fn(() => 0),
    analogRead: vi.fn(() => 0),
    analogWrite: vi.fn(),
    delay: vi.fn(() => Promise.resolve()),
    delayMicroseconds: vi.fn(() => Promise.resolve()),
    map: (x, a, b, c, d) => ((x - a) * (d - c)) / (b - a) + c,
    constrain: (x, a, b) => Math.max(a, Math.min(b, x)),
    tone: vi.fn(),
    noTone: vi.fn(),
    serialPrint: vi.fn(),
    serialPrintln: vi.fn(),
    LiquidCrystal: class {
      begin = vi.fn();
      print = vi.fn();
      setCursor = vi.fn();
      clear = vi.fn();
    },
    ...overrides,
  };
}

describe('transpileArduino', () => {
  it('chuyển pinMode/digitalWrite/digitalRead thành lời gọi sys.*', async () => {
    const sys = mockSys();
    const { setup } = run(`
      void setup() {
        pinMode(2, OUTPUT);
        digitalWrite(2, HIGH);
        int v = digitalRead(3);
      }
    `, sys);
    await setup();
    expect(sys.pinMode).toHaveBeenCalledWith(2, 'OUTPUT');
    expect(sys.digitalWrite).toHaveBeenCalledWith(2, 1);
    expect(sys.digitalRead).toHaveBeenCalledWith(3);
  });

  it('chuyển Serial.print/println thành sys.serialPrint/serialPrintln', async () => {
    const sys = mockSys();
    const { setup } = run(`
      void setup() {
        Serial.begin(115200);
        Serial.print("Gia tri: ");
        Serial.println(42);
      }
    `, sys);
    await setup();
    expect(sys.serialPrint).toHaveBeenCalledWith('Gia tri: ');
    expect(sys.serialPrintln).toHaveBeenCalledWith(42);
  });

  // Regression test cho lỗi "sys.sys.tone(...)" đã tìm và sửa: 2 regex xử lý
  // tone() 2-tham-số và 3-tham-số chạy tuần tự từng khiến regex sau khớp lại
  // đúng phần vừa được regex trước sinh ra.
  it('tone() 3 tham số gọi đúng sys.tone, không bị gộp thành sys.sys.tone', async () => {
    const sys = mockSys();
    const { loop } = run(`
      void loop() {
        tone(12, 2000, 200);
      }
    `, sys);
    await expect(loop()).resolves.not.toThrow();
    expect(sys.tone).toHaveBeenCalledWith(12, 2000, 200);
  });

  it('tone() 2 tham số vẫn hoạt động đúng (không có duration)', async () => {
    const sys = mockSys();
    const { loop } = run(`
      void setup() {}
      void loop() {
        tone(12, 1000);
      }
    `, sys);
    await expect(loop()).resolves.not.toThrow();
    expect(sys.tone).toHaveBeenCalledWith(12, 1000);
  });

  it('noTone() gọi đúng sys.noTone', async () => {
    const sys = mockSys();
    const { loop } = run(`void setup() {} void loop() { noTone(12); }`, sys);
    await loop();
    expect(sys.noTone).toHaveBeenCalledWith(12);
  });

  it('map()/constrain() tính đúng giá trị qua sys.map/sys.constrain', async () => {
    const sys = mockSys();
    const { setup } = run(`
      void setup() {
        int a = map(512, 0, 1023, 0, 255);
        int b = constrain(300, 0, 255);
        Serial.println(a);
        Serial.println(b);
      }
      void loop() {}
    `, sys);
    await setup();
    expect(sys.serialPrintln).toHaveBeenNthCalledWith(1, expect.any(Number));
    expect(sys.serialPrintln).toHaveBeenNthCalledWith(2, 255);
  });

  it('delay()/delayMicroseconds() được await và gọi sys tương ứng', async () => {
    const sys = mockSys();
    const { loop } = run(`
      void setup() {}
      void loop() {
        delay(100);
        delayMicroseconds(50);
      }
    `, sys);
    await loop();
    expect(sys.delay).toHaveBeenCalledWith(100);
    expect(sys.delayMicroseconds).toHaveBeenCalledWith(50);
  });

  it('#define hằng số được thay đúng giá trị khi dùng', async () => {
    const sys = mockSys();
    const { setup } = run(`
      #define LED_PIN 5
      void setup() {
        pinMode(LED_PIN, OUTPUT);
      }
      void loop() {}
    `, sys);
    await setup();
    expect(sys.pinMode).toHaveBeenCalledWith(5, 'OUTPUT');
  });

  it('LiquidCrystal: khai báo + begin/setCursor/print/clear hoạt động không lỗi', async () => {
    const sys = mockSys();
    const { setup } = run(`
      LiquidCrystal lcd;
      void setup() {
        lcd.begin(16, 2);
        lcd.setCursor(0, 0);
        lcd.print("Hello");
        lcd.clear();
      }
      void loop() {}
    `, sys);
    await expect(setup()).resolves.not.toThrow();
  });
});
