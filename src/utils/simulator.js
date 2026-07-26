/**
 * Arduino/ESP32 Extended Interpreter & Transpiler for Javascript Sandbox
 */

export function transpileArduino(code) {
  let js = code;

  // Comment out includes
  js = js.replace(/#include\s+<[^>]+>/g, '// $&');
  js = js.replace(/#include\s+"[^"]+"/g, '// $&');

  // Transpile definitions like #define LED_PIN 13
  js = js.replace(/#define\s+(\w+)\s+([^\n]+)/g, 'const $1 = $2;');

  // Translate basic C++ variable declarations
  js = js.replace(/\b(int|long|unsigned int|unsigned long|short|byte)\s+(\w+)/g, 'let $2');
  js = js.replace(/\b(float|double)\s+(\w+)/g, 'let $2');
  js = js.replace(/\bString\s+(\w+)/g, 'let $1');
  js = js.replace(/\bbool(ean)?\s+(\w+)/g, 'let $2');
  js = js.replace(/\bchar\s+(\w+)/g, 'let $1');

  // Replace Serial operations
  js = js.replace(/Serial\.begin\([^)]*\);?/g, '// Serial.begin');
  js = js.replace(/Serial\.println\(([^)]*)\);?/g, 'sys.serialPrintln($1);');
  js = js.replace(/Serial\.print\(([^)]*)\);?/g, 'sys.serialPrint($1);');

  // Replace standard Pin I/O
  js = js.replace(/pinMode\(([^,]+),\s*([^)]+)\);?/g, 'sys.pinMode($1, "$2");');
  js = js.replace(/digitalWrite\(([^,]+),\s*([^)]+)\);?/g, 'sys.digitalWrite($1, $2);');
  js = js.replace(/digitalRead\(([^)]+)\);?/g, 'sys.digitalRead($1)');
  js = js.replace(/analogWrite\(([^,]+),\s*([^)]+)\);?/g, 'sys.analogWrite($1, $2);');
  js = js.replace(/analogRead\(([^)]+)\);?/g, 'sys.analogRead($1)');
  js = js.replace(/dhtReadHumidity\(([^)]+)\);?/g, 'sys.readHumidity($1)');
  js = js.replace(/pulseIn\(([^,]+),\s*([^)]+)\);?/g, 'sys.pulseIn($1, $2)');

  // Math & utility functions
  js = js.replace(/map\(([^,]+),\s*([^,]+),\s*([^,]+),\s*([^,]+),\s*([^)]+)\)/g, 'sys.map($1, $2, $3, $4, $5)');
  js = js.replace(/constrain\(([^,]+),\s*([^,]+),\s*([^)]+)\)/g, 'sys.constrain($1, $2, $3)');

  // Replace Servo commands
  js = js.replace(/Servo\s+(\w+);?/g, 'const $1 = new sys.Servo("$1");');

  // Replace buzzer tones (2-arg tone(pin,freq) hoặc 3-arg tone(pin,freq,duration) — gộp thành 1 regex
  // vì chạy 2 regex riêng biệt tuần tự sẽ khiến regex 2-arg khớp lại đúng phần "tone(...)" mà regex
  // 3-arg vừa sinh ra, tạo thành "sys.sys.tone(...)" và gây lỗi "Cannot read properties of undefined (reading 'tone')")
  js = js.replace(/\btone\(([^,]+),\s*([^,)]+)(?:,\s*([^)]+))?\)\s*;?/g, (_m, pin, freq, duration) =>
    duration !== undefined ? `sys.tone(${pin}, ${freq}, ${duration});` : `sys.tone(${pin}, ${freq});`
  );
  js = js.replace(/noTone\(([^)]+)\);?/g, 'sys.noTone($1);');

  // Replace delay(ms) with await sys.delay(ms)
  js = js.replace(/\bdelay\(([^)]+)\);?/g, 'await sys.delay($1);');
  js = js.replace(/\bdelayMicroseconds\(([^)]+)\);?/g, 'await sys.delayMicroseconds($1);');

  // Replace LiquidCrystal / LiquidCrystal_I2C (support declarations with or without constructor args)
  js = js.replace(/LiquidCrystal(_I2C)?\s+(\w+)\s*(\([^)]*\))?\s*;?/g, 'const $2 = new sys.LiquidCrystal("$2");');
  js = js.replace(/(\w+)\.init\(\);?/g, 'if ($1 && $1.init) $1.init();');
  js = js.replace(/(\w+)\.backlight\(\);?/g, 'if ($1 && $1.backlight) $1.backlight();');
  js = js.replace(/(\w+)\.begin\(([^,]+),\s*([^)]+)\);?/g, 'if ($1 && $1.begin) $1.begin($2, $3);');
  js = js.replace(/(\w+)\.print\(([^)]*)\);?/g, 'if ($1 && $1.print) $1.print($2);');
  js = js.replace(/(\w+)\.setCursor\(([^,]+),\s*([^)]+)\);?/g, 'if ($1 && $1.setCursor) $1.setCursor($2, $3);');
  js = js.replace(/(\w+)\.clear\(\);?/g, 'if ($1 && $1.clear) $1.clear();');

  // Replace Adafruit_SSD1306 OLED
  js = js.replace(/Adafruit_SSD1306\s+(\w+)\s*(\([^)]*\))?\s*;?/g, 'const $1 = new sys.SSD1306("$1");');
  js = js.replace(/(\w+)\.display\(\);?/g, 'if ($1 && $1.display) $1.display();');
  js = js.replace(/(\w+)\.setTextSize\(([^)]+)\);?/g, 'if ($1 && $1.setTextSize) $1.setTextSize($2);');
  js = js.replace(/(\w+)\.setTextColor\(([^)]+)\);?/g, 'if ($1 && $1.setTextColor) $1.setTextColor($2);');

  // Replace DHT & DallasTemperature libraries
  js = js.replace(/DHT\s+(\w+)\s*\(([^,]+),\s*([^)]+)\);?/g, 'const $1 = new sys.DHT($2);');
  js = js.replace(/OneWire\s+(\w+)\s*\([^)]*\);?/g, '// OneWire $1');
  js = js.replace(/DallasTemperature\s+(\w+)\s*\([^)]*\);?/g, 'const $1 = new sys.DallasTemperature();');

  // Translate setup() and loop() to async functions
  js = js.replace(/void\s+setup\(\s*\)/g, 'async function setup()');
  js = js.replace(/void\s+loop\(\s*\)/g, 'async function loop()');

  // Pin & Type constants
  const header = `
    const HIGH = 1;
    const LOW = 0;
    const INPUT = "INPUT";
    const OUTPUT = "OUTPUT";
    const INPUT_PULLUP = "INPUT_PULLUP";
    const WHITE = 1;
    const BLACK = 0;
  `;

  return header + js;
}

export class SimulationRunner {
  constructor(sysInterface) {
    this.sys = sysInterface;
    this.isRunning = false;
  }

  async run(code, onError, onLog) {
    this.stop();
    this.isRunning = true;

    try {
      const transpiledCode = transpileArduino(code);
      onLog("🔄 Khởi tạo trình mô phỏng...");

      const executionFunc = new Function('sys', `
        ${transpiledCode}
        return { setup, loop };
      `);

      const { setup, loop } = executionFunc(this.sys);

      if (setup) {
        onLog("🚀 Đang chạy setup()...");
        await setup();
      }

      if (loop) {
        onLog("🔁 Bắt đầu vòng lặp loop()...");
        const runLoop = async () => {
          while (this.isRunning) {
            try {
              await loop();
              await this.sys.delay(10);
            } catch (err) {
              if (this.isRunning) {
                onError(err.message || err);
                this.stop();
              }
              break;
            }
          }
        };
        runLoop();
      }
    } catch (err) {
      onError(err.message || err);
      this.stop();
    }
  }

  stop() {
    this.isRunning = false;
    this.sys.resetAudio();
  }
}
