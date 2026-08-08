import React from 'react';
import { COMPONENT_TYPES } from '../data/componentTypes';

/**
 * IoT Labs Maker Card-Style Component Renderer
 * Matches maker.iotlabs.vn diagram card aesthetics with dynamic simulation output effects for ALL Actuators & Displays.
 */

// Dùng BASE_URL của Vite thay vì path tuyệt đối "/assets/..." để ảnh không vỡ
// khi app được deploy dưới 1 subpath (vd: GitHub Pages project site)
const ASSET_BASE = `${import.meta.env.BASE_URL}assets/components/`;

// Các linh kiện IC (DIP) dùng chung 1 kiểu vẽ "chip đen 2 hàng chân" — không mô
// phỏng logic thật bên trong (xem ghi chú genericDipPorts trong componentTypes.js)
const CHIP_BODY_TYPES = new Set([
  'IC_555', 'IC_556', 'IC_741', 'IC_LM339', 'IC_LM393', 'IC_4N35',
  'IC_74HC00', 'IC_74HC02', 'IC_74HC08', 'IC_74HC32', 'IC_74HC86', 'IC_74HC04', 'IC_74HC14', 'IC_74HC132',
  'IC_74HC10', 'IC_74HC11', 'IC_74HC27', 'IC_74HC20', 'IC_74HC21', 'IC_74HC73', 'IC_74HC74', 'IC_74HC93',
  'IC_74HC75', 'IC_74HC283', 'IC_74HC595', 'IC_74HC4017', 'IC_CD4511', 'IC_PCF8574',
  'MOTOR_DRIVER_L293D', 'REGULATOR_5V', 'REGULATOR_3V3', 'ATTINY85',
]);

const REAL_IMAGES = {
  ESP32: `${ASSET_BASE}esp32.png`,
  ESP32_V4: `${ASSET_BASE}esp32.png`,
  ARDUINO_UNO: `${ASSET_BASE}arduino_uno.png`,
  DHT11: `${ASSET_BASE}dht11.png`,
  HC_SR04: `${ASSET_BASE}hc_sr04.png`,
  OLED_SSD1306: `${ASSET_BASE}oled.png`,
  SERVO: `${ASSET_BASE}servo.png`,
  DS18B20: `${ASSET_BASE}ds18b20.png`,
  BMP280: `${ASSET_BASE}bmp280.png`,
  DS3231: `${ASSET_BASE}ds3231.png`,
  ACS712: `${ASSET_BASE}acs712.png`,
  SOIL_MOISTURE: `${ASSET_BASE}soil_moisture.png`,
  LDR: `${ASSET_BASE}ldr.png`,
};

export default function CanvasComponentRender({ comp, allComps, isSelected, isSimulating, isLit, pinState }) {
  const proto = COMPONENT_TYPES[comp.type] || {
    name: comp.type,
    subtitle: 'Module',
    width: 240,
    height: 120,
    ports: []
  };

  const cardWidth = proto.width;
  const cardHeight = proto.height;

  // Trạng thái BẬT thật theo chân board (xem src/utils/activeCircuit.js) — chỉ có
  // giá trị khi đang mô phỏng code; dùng cho LED/LIGHT_BULB/BUZZER/RELAY/DC_MOTOR
  // thay vì sáng/kêu/quay suốt lúc mô phỏng đang chạy bất kể trạng thái chân.
  const pinActive = isSimulating && !!pinState;

  const leftPorts = proto.ports.filter(p => p.side === 'left');
  const rightPorts = proto.ports.filter(p => p.side === 'right');
  const topPorts = proto.ports.filter(p => p.side === 'top');
  const bottomPorts = proto.ports.filter(p => p.side === 'bottom');

  return (
    <g className="drop-shadow-md transition-transform">

      {/* ══ 1. WHITE CARD CONTAINER ══ */}
      <rect
        width={cardWidth}
        height={cardHeight}
        rx="10"
        fill="#FFFFFF"
        stroke={isSelected ? '#10B981' : isSimulating ? '#3B82F6' : '#E2E8F0'}
        strokeWidth={isSelected ? '2.5' : isSimulating ? '1.8' : '1.2'}
      />

      {/* Selected Card Glow Halo */}
      {isSelected && (
        <rect
          x="-3" y="-3"
          width={cardWidth + 6}
          height={cardHeight + 6}
          rx="13"
          fill="none"
          stroke="#10B981"
          strokeWidth="1.5"
          strokeDasharray="4,4"
          opacity="0.6"
        />
      )}

      {/* ══ 2. CENTER HARDWARE IMAGE / DETAILED GRAPHIC ══ */}
      <g transform={`translate(${cardWidth / 2 - 40}, 14)`}>
        {REAL_IMAGES[comp.type] ? (
          <g>
            <image
              href={REAL_IMAGES[comp.type]}
              x="-5"
              y="0"
              width="90"
              height="65"
              preserveAspectRatio="xMidYMid meet"
            />
            {/* Simulation Overlay on Real Image devices */}
            {isSimulating && comp.type === 'SERVO' && (
              <g transform="translate(40, 20)">
                <line
                  x1="0" y1="0" x2="0" y2="-22"
                  stroke="#EF4444" strokeWidth="4" strokeLinecap="round"
                  transform={`rotate(${comp.config.angle || 0})`}
                  className="transition-transform duration-300"
                />
                <circle cx="0" cy="0" r="5" fill="#1E293B" />
                <text x="0" y="32" fill="#10B981" fontSize="8" fontWeight="bold" textAnchor="middle">{comp.config.angle || 0}°</text>
              </g>
            )}
          </g>
        ) : comp.type === 'ARDUINO_NANO' ? (
          <g>
            <rect width="80" height="55" rx="4" fill="#0284C7" stroke="#0369A1" strokeWidth="1" />
            <rect x="30" y="2" width="20" height="12" rx="2" fill="#94A3B8" />
            <rect x="25" y="20" width="30" height="20" fill="#1E293B" rx="2" />
            <text x="40" y="33" fill="#FFF" fontSize="7" fontWeight="bold" textAnchor="middle">NANO V3</text>
          </g>
        ) : comp.type === 'ARDUINO_MEGA' ? (
          <g>
            <rect width="80" height="55" rx="4" fill="#0284C7" stroke="#0369A1" strokeWidth="1" />
            <rect x="5" y="5" width="18" height="15" rx="2" fill="#64748B" />
            <rect x="30" y="15" width="40" height="30" fill="#1E293B" rx="2" />
            <text x="50" y="32" fill="#FFF" fontSize="8" fontWeight="bold" textAnchor="middle">MEGA</text>
          </g>
        ) : comp.type === 'ESP8266' ? (
          <g>
            <rect width="80" height="55" rx="4" fill="#1E293B" stroke="#334155" strokeWidth="1" />
            <rect x="20" y="10" width="40" height="25" rx="3" fill="#94A3B8" opacity="0.4" />
            <rect x="25" y="15" width="30" height="15" rx="2" fill="#64748B" />
            <text x="40" y="47" fill="#38BDF8" fontSize="7" fontWeight="bold" textAnchor="middle">ESP8266</text>
          </g>
        ) : comp.type === 'ESP32_S3' ? (
          <g>
            <rect width="80" height="55" rx="4" fill="#1E293B" stroke="#7C3AED" strokeWidth="1.2" />
            <rect x="24" y="6" width="32" height="26" rx="3" fill="#94A3B8" opacity="0.35" />
            <rect x="30" y="11" width="20" height="16" rx="2" fill="#475569" />
            {/* Cổng USB-C gốc (native USB) — điểm khác biệt lớn nhất so với ESP32 thường */}
            <rect x="34" y="34" width="12" height="6" rx="2" fill="#94A3B8" />
            <text x="40" y="49" fill="#A78BFA" fontSize="7" fontWeight="bold" textAnchor="middle">ESP32-S3</text>
          </g>
        ) : comp.type === 'DHT22' ? (
          <g>
            <rect width="70" height="55" rx="5" fill="#0EA5E9" stroke="#0284C7" strokeWidth="1" />
            <line x1="10" y1="15" x2="60" y2="15" stroke="#FFF" strokeWidth="3" strokeLinecap="round" />
            <line x1="10" y1="25" x2="60" y2="25" stroke="#FFF" strokeWidth="3" strokeLinecap="round" />
            <line x1="10" y1="35" x2="60" y2="35" stroke="#FFF" strokeWidth="3" strokeLinecap="round" />
            <text x="35" y="48" fill="#FFF" fontSize="8" fontWeight="bold" textAnchor="middle">DHT22</text>
          </g>
        ) : comp.type === 'MQ2' ? (
          <g>
            <rect width="70" height="55" rx="4" fill="#1E293B" />
            <circle cx="35" cy="25" r="18" fill="#64748B" stroke="#94A3B8" strokeWidth="2" />
            <circle cx="35" cy="25" r="10" fill={isSimulating ? "#F59E0B" : "#334155"} className={isSimulating ? "led-glow" : ""} style={{ '--glow-color': '#F59E0B' }} />
            <text x="35" y="50" fill="#F59E0B" fontSize="7" fontWeight="bold" textAnchor="middle">MQ-2 GAS</text>
          </g>
        ) : comp.type === 'PIR' ? (
          <g>
            <rect width="70" height="55" rx="4" fill="#15803D" />
            <circle cx="35" cy="25" r="18" fill={comp.config.motion ? "#22C55E" : "#F8FAFC"} stroke="#E2E8F0" strokeWidth="1" className={comp.config.motion ? "led-glow" : ""} style={{ '--glow-color': '#22C55E' }} />
            <text x="35" y="28" fill={comp.config.motion ? "#FFF" : "#64748B"} fontSize="8" fontWeight="bold" textAnchor="middle">PIR</text>
          </g>
        ) : comp.type === 'FLAME' ? (
          <g>
            <rect width="70" height="55" rx="4" fill="#1E293B" />
            <path d="M 35 12 Q 43 25 35 38 Q 27 25 35 12 Z" fill="#EF4444" className={isSimulating ? "led-glow" : ""} style={{ '--glow-color': '#EF4444' }} />
            <text x="35" y="50" fill="#EF4444" fontSize="7" fontWeight="bold" textAnchor="middle">FLAME</text>
          </g>
        ) : comp.type === 'POTENTIOMETER' ? (
          <g>
            <rect width="70" height="55" rx="4" fill="#334155" />
            <circle cx="35" cy="25" r="18" fill="#94A3B8" stroke="#64748B" strokeWidth="2" />
            <line x1="35" y1="25" x2="35" y2="12" stroke="#0F172A" strokeWidth="4" strokeLinecap="round" transform={`rotate(${((comp.config.position || 0) / 1023) * 270 - 135}, 35, 25)`} />
            <text x="35" y="50" fill="#38BDF8" fontSize="7" fontWeight="bold" textAnchor="middle">{comp.config.position || 0}</text>
          </g>
        ) : comp.type === 'RELAY' ? (
          <g>
            <rect width="75" height="55" rx="4" fill="#2563EB" />
            <rect x="8" y="8" width="59" height="39" rx="3" fill="#1E40AF" />
            {/* Active Indicator LED */}
            <circle cx="20" cy="20" r="4" fill={pinActive ? "#22C55E" : "#64748B"} className={pinActive ? "led-glow" : ""} style={{ '--glow-color': '#22C55E' }} />
            <text x="42" y="32" fill="#FFF" fontSize="9" fontWeight="bold" textAnchor="middle">RELAY 5V</text>
          </g>
        ) : comp.type === 'DC_MOTOR' ? (
          <g>
            <circle cx="35" cy="25" r="20" fill="#64748B" stroke="#334155" strokeWidth="2" />
            {/* Animated Propeller Blade */}
            <g className={pinActive ? "animate-spin-fast" : ""} style={{ transformOrigin: '35px 25px' }}>
              <path d="M 35 25 L 35 8 A 8 8 0 0 1 43 16 Z" fill="#38BDF8" />
              <path d="M 35 25 L 50 32 A 8 8 0 0 1 43 40 Z" fill="#38BDF8" />
              <path d="M 35 25 L 20 35 A 8 8 0 0 1 18 24 Z" fill="#38BDF8" />
            </g>
            <circle cx="35" cy="25" r="5" fill="#1E293B" />
          </g>
        ) : comp.type === 'STEPPER_28BYJ' ? (
          <g>
            <circle cx="35" cy="22" r="18" fill="#475569" stroke="#334155" strokeWidth="2" />
            <g className={isSimulating ? "animate-spin-fast" : ""} style={{ transformOrigin: '35px 22px' }}>
              <circle cx="35" cy="22" r="6" fill="#38BDF8" />
              <line x1="35" y1="22" x2="35" y2="8" stroke="#FFF" strokeWidth="2" />
            </g>
            <rect x="10" y="40" width="50" height="12" rx="3" fill="#22C55E" />
            <text x="35" y="49" fill="#FFF" fontSize="6" fontWeight="bold" textAnchor="middle">ULN2003 RUN</text>
          </g>
        ) : comp.type === 'LED' ? (
          <g transform="translate(5, 5)">
            <defs>
              <radialGradient id={`ledDome-${comp.id}`} cx="38%" cy="30%" r="72%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="28%" stopColor={comp.config.color || '#EF4444'} />
                <stop offset="100%" stopColor={comp.config.color || '#EF4444'} stopOpacity="0.82" />
              </radialGradient>
            </defs>
            {/* Aura Glow — khi chân board nối tới đang HIGH (code Arduino thật sự bật), HOẶC mạch thụ động (pin/khoai tây/chanh) kín */}
            {(pinActive || isLit) && (
              <circle cx="30" cy="20" r="27" fill={comp.config.color || '#EF4444'} opacity="0.4" className="led-glow" style={{ '--glow-color': comp.config.color || '#EF4444' }} />
            )}
            {/* Vòm LED — gradient bóng thay vì màu phẳng, giống LED 5mm thật */}
            <circle cx="30" cy="20" r="18" fill={`url(#ledDome-${comp.id})`} stroke="#334155" strokeWidth="2" className={(pinActive || isLit) ? 'led-glow' : ''} style={{ '--glow-color': comp.config.color || '#EF4444' }} />
            {/* Điểm sáng bóng (highlight) */}
            <ellipse cx="24" cy="13" rx="5" ry="3" fill="#FFFFFF" opacity="0.6" transform="rotate(-30 24 13)" />
            {/* 2 chân — chân Anode (phải) dài hơn chân Cathode (trái), giống LED thật */}
            <rect x="25" y="38" width="4" height="10" fill="#94A3B8" />
            <rect x="31" y="38" width="4" height="16" fill="#94A3B8" />
          </g>
        ) : comp.type === 'RGB_LED' ? (
          (() => {
            const rOn = isSimulating && !!pinState?.R;
            const gOn = isSimulating && !!pinState?.G;
            const bOn = isSimulating && !!pinState?.B;
            const anyOn = rOn || gOn || bOn;
            return (
              <g>
                <circle cx="35" cy="25" r="20" fill="#F8FAFC" stroke="#64748B" strokeWidth="2" />
                {anyOn && (
                  <circle cx="35" cy="25" r="26" fill="#3B82F6" opacity="0.35" className="led-glow" style={{ '--glow-color': '#3B82F6' }} />
                )}
                <circle cx="28" cy="22" r="6" fill="#EF4444" opacity={rOn ? 1 : 0.6} className={rOn ? "led-glow" : ""} style={{ '--glow-color': '#EF4444' }} />
                <circle cx="42" cy="22" r="6" fill="#22C55E" opacity={gOn ? 1 : 0.6} className={gOn ? "led-glow" : ""} style={{ '--glow-color': '#22C55E' }} />
                <circle cx="35" cy="30" r="6" fill="#3B82F6" opacity={bOn ? 1 : 0.6} className={bOn ? "led-glow" : ""} style={{ '--glow-color': '#3B82F6' }} />
              </g>
            );
          })()
        ) : comp.type === 'BUZZER' ? (
          <g>
            <circle cx="35" cy="25" r="20" fill="#1E293B" stroke="#0F172A" strokeWidth="2" />
            {pinActive && (
              <g>
                <circle cx="35" cy="25" r="28" fill="none" stroke="#F59E0B" strokeWidth="2" className="buzzer-ripple" />
                <circle cx="35" cy="25" r="36" fill="none" stroke="#F59E0B" strokeWidth="1.5" className="buzzer-ripple" style={{ animationDelay: '0.3s' }} />
              </g>
            )}
            <circle cx="35" cy="25" r="8" fill="#334155" />
            <circle cx="35" cy="25" r="3" fill="#0F172A" />
          </g>
        ) : comp.type === 'BUTTON' ? (
          <g>
            <rect width="70" height="55" rx="6" fill="#475569" stroke="#334155" strokeWidth="2" />
            <circle cx="35" cy="27" r="14" fill={comp.config.pressed ? "#EF4444" : "#94A3B8"} />
            <circle cx="35" cy="27" r="9" fill="#CBD5E1" />
          </g>
        ) : comp.type === 'LASER' ? (
          <g>
            <rect width="70" height="55" rx="4" fill="#1E293B" />
            <circle cx="35" cy="25" r="8" fill="#DC2626" />
            {isSimulating && (
              <line x1="35" y1="25" x2="35" y2="-120" stroke="#EF4444" strokeWidth="3" className="laser-beam" />
            )}
            <line x1="35" y1="5" x2="35" y2="17" stroke="#EF4444" strokeWidth="3" strokeDasharray="3,3" />
          </g>
        ) : comp.type === 'LCD1602' ? (
          <g>
            <rect width="80" height="55" rx="4" fill={isSimulating ? "#064E3B" : "#047857"} stroke="#065F46" strokeWidth="1" />
            <rect x="6" y="8" width="68" height="38" fill={isSimulating ? "#022C22" : "#064E3B"} rx="2" stroke={isSimulating ? "#10B981" : "none"} strokeWidth="1" />
            <text x="40" y="24" fill={isSimulating ? "#00FF66" : "#A7F3D0"} fontSize="7.5" fontFamily="monospace" fontWeight="bold" textAnchor="middle" className={isSimulating ? "led-glow" : ""} style={{ '--glow-color': '#00FF66' }}>
              {comp.config.textLine1 || 'IoT Labs Maker'}
            </text>
            <text x="40" y="38" fill={isSimulating ? "#00FF66" : "#A7F3D0"} fontSize="7.5" fontFamily="monospace" fontWeight="bold" textAnchor="middle" className={isSimulating ? "led-glow" : ""} style={{ '--glow-color': '#00FF66' }}>
              {comp.config.textLine2 || 'Virtual Display'}
            </text>
          </g>
        ) : comp.type === 'OLED_SSD1306' ? (
          <g>
            <rect width="80" height="55" rx="4" fill="#020617" stroke={isSimulating ? "#38BDF8" : "#1E293B"} strokeWidth={isSimulating ? "1.5" : "1"} />
            <text x="40" y="18" fill="#38BDF8" fontSize="7" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
              {comp.config.line1 || 'SSD1306 OLED'}
            </text>
            <text x="40" y="32" fill="#38BDF8" fontSize="7" fontFamily="monospace" textAnchor="middle">
              {comp.config.line2 || (allComps?.find(c => c.type === 'DHT11')?.config.value ? `Temp: ${allComps.find(c => c.type === 'DHT11').config.value}°C` : 'Ready...')}
            </text>
            <text x="40" y="45" fill="#38BDF8" fontSize="7" fontFamily="monospace" textAnchor="middle">
              {comp.config.line3 || (allComps?.find(c => c.type === 'DHT11')?.config.humidity ? `Humi: ${allComps.find(c => c.type === 'DHT11').config.humidity}%` : '')}
            </text>
          </g>
        ) : comp.type === 'SEVEN_SEGMENT' ? (
          <g>
            <rect width="70" height="55" rx="4" fill="#1E293B" />
            <text x="35" y="42" fill="#EF4444" fontSize="32" fontWeight="bold" textAnchor="middle" fontFamily="monospace" className={isSimulating ? "led-glow" : ""} style={{ '--glow-color': '#EF4444' }}>8</text>
          </g>
        ) : comp.type === 'BATTERY_9V' ? (
          <g>
            <defs>
              <linearGradient id={`batBody-${comp.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#334155" />
                <stop offset="100%" stopColor="#0F172A" />
              </linearGradient>
              <linearGradient id={`batCap-${comp.id}`} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#F59E0B" />
                <stop offset="100%" stopColor="#B45309" />
              </linearGradient>
            </defs>
            <rect width="70" height="50" rx="4" fill={`url(#batBody-${comp.id})`} />
            <rect x="42" width="28" height="50" rx="4" fill={`url(#batCap-${comp.id})`} />
            <rect x="2" y="2" width="36" height="6" rx="3" fill="#FFFFFF" opacity="0.08" />
            <circle cx="56" cy="16" r="6" fill="none" stroke="#1E293B" strokeWidth="1.5" />
            <text x="56" y="19" fill="#1E293B" fontSize="8" fontWeight="bold" textAnchor="middle">+</text>
            <circle cx="56" cy="34" r="6" fill="none" stroke="#1E293B" strokeWidth="1.5" />
            <text x="56" y="37" fill="#1E293B" fontSize="9" fontWeight="bold" textAnchor="middle">−</text>
            <text x="20" y="29" fill="#FFF" fontSize="9" fontWeight="bold" textAnchor="middle">9V</text>
          </g>
        ) : comp.type === 'POTATO' ? (
          <g transform="translate(0, 8)">
            <defs>
              <radialGradient id={`potatoBody-${comp.id}`} cx="35%" cy="30%" r="75%">
                <stop offset="0%" stopColor="#C2872F" />
                <stop offset="60%" stopColor="#A16207" />
                <stop offset="100%" stopColor="#78350F" />
              </radialGradient>
            </defs>
            <ellipse cx="35" cy="20" rx="34" ry="18" fill={`url(#potatoBody-${comp.id})`} stroke="#78350F" strokeWidth="1.5" />
            <ellipse cx="24" cy="14" rx="6" ry="3" fill="#78350F" opacity="0.35" />
            <ellipse cx="46" cy="26" rx="5" ry="2.5" fill="#78350F" opacity="0.35" />
            <ellipse cx="26" cy="10" rx="10" ry="4" fill="#FFFFFF" opacity="0.12" />
            {/* Đinh kẽm (−) bên trái */}
            <line x1="1" y1="18" x2="14" y2="18" stroke="#94A3B8" strokeWidth="3" />
            <circle cx="1" cy="18" r="2.5" fill="#CBD5E1" />
            {/* Cuộn dây đồng (+) bên phải */}
            <path d="M 56 12 q 4 2 0 4 q 4 2 0 4 q 4 2 0 4 q 4 2 0 4" fill="none" stroke="#D97706" strokeWidth="3" strokeLinecap="round" />
          </g>
        ) : comp.type === 'LEMON' ? (
          <g transform="translate(0, 8)">
            <defs>
              <radialGradient id={`lemonBody-${comp.id}`} cx="35%" cy="28%" r="75%">
                <stop offset="0%" stopColor="#FEF08A" />
                <stop offset="55%" stopColor="#FDE047" />
                <stop offset="100%" stopColor="#CA8A04" />
              </radialGradient>
            </defs>
            <ellipse cx="35" cy="18" rx="32" ry="16" fill={`url(#lemonBody-${comp.id})`} stroke="#CA8A04" strokeWidth="1.5" />
            <ellipse cx="35" cy="18" rx="12" ry="6" fill="#FEF9C3" opacity="0.6" />
            <ellipse cx="26" cy="9" rx="9" ry="3.5" fill="#FFFFFF" opacity="0.25" />
            {/* Đinh kẽm (−) bên trái */}
            <line x1="1" y1="16" x2="14" y2="16" stroke="#94A3B8" strokeWidth="3" />
            <circle cx="1" cy="16" r="2.5" fill="#CBD5E1" />
            {/* Cuộn dây đồng (+) bên phải */}
            <path d="M 54 10 q 4 2 0 4 q 4 2 0 4 q 4 2 0 4 q 4 2 0 4" fill="none" stroke="#D97706" strokeWidth="3" strokeLinecap="round" />
          </g>
        ) : comp.type === 'RESISTOR' ? (
          <g transform="translate(0, 10)">
            <defs>
              <linearGradient id={`resBody-${comp.id}`} x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#E8CBA0" />
                <stop offset="45%" stopColor="#D2B48C" />
                <stop offset="100%" stopColor="#B8935F" />
              </linearGradient>
            </defs>
            <line x1="5" y1="18" x2="20" y2="18" stroke="#94A3B8" strokeWidth="3" />
            <rect x="20" y="10" width="40" height="16" rx="4" fill={`url(#resBody-${comp.id})`} stroke="#8B7355" strokeWidth="1" />
            <line x1="28" y1="10" x2="28" y2="26" stroke="#EF4444" strokeWidth="3" />
            <line x1="36" y1="10" x2="36" y2="26" stroke="#EF4444" strokeWidth="3" />
            <line x1="44" y1="10" x2="44" y2="26" stroke="#8B4513" strokeWidth="3" />
            <line x1="52" y1="10" x2="52" y2="26" stroke="#FFD700" strokeWidth="3" />
            <line x1="60" y1="18" x2="75" y2="18" stroke="#94A3B8" strokeWidth="3" />
          </g>
        ) : comp.type === 'CAPACITOR' ? (
          <g transform="translate(5, 5)">
            <circle cx="30" cy="20" r="16" fill="#F59E0B" stroke="#D97706" strokeWidth="1.5" />
            <text x="30" y="24" fill="#FFF" fontSize="8" fontWeight="bold" textAnchor="middle">104</text>
            <line x1="30" y1="36" x2="30" y2="48" stroke="#94A3B8" strokeWidth="3" />
          </g>
        ) : comp.type === 'DIODE' ? (
          <g transform="translate(0, 10)">
            <line x1="5" y1="18" x2="25" y2="18" stroke="#94A3B8" strokeWidth="3" />
            <rect x="25" y="8" width="30" height="20" rx="3" fill="#1E293B" />
            <rect x="48" y="8" width="7" height="20" fill="#CBD5E1" />
            <line x1="55" y1="18" x2="75" y2="18" stroke="#94A3B8" strokeWidth="3" />
          </g>
        ) : comp.type === 'TRANSISTOR' ? (
          <g>
            <path d="M 20 10 C 20 10 50 10 50 25 C 50 40 20 40 20 40 Z" fill="#1E293B" />
            <rect x="18" y="10" width="5" height="30" fill="#0F172A" />
            <text x="32" y="28" fill="#FFF" fontSize="7" fontWeight="bold" textAnchor="middle">NPN</text>
          </g>
        ) : comp.type === 'BLUETOOTH_HC05' ? (
          <g>
            <rect width="70" height="55" rx="4" fill="#1E293B" />
            <path d="M 35 15 L 42 22 L 35 29 L 42 36 L 35 43" stroke="#3B82F6" strokeWidth="3" fill="none" />
            <text x="35" y="52" fill="#3B82F6" fontSize="7" fontWeight="bold" textAnchor="middle">HC-05</text>
          </g>
        ) : comp.type === 'RFID_RC522' ? (
          <g>
            <rect width="75" height="55" rx="4" fill="#0284C7" />
            <circle cx="37" cy="27" r="16" fill="none" stroke="#FFF" strokeWidth="2" />
            <circle cx="37" cy="27" r="10" fill="none" stroke="#FFF" strokeWidth="1.5" />
            <text x="37" y="31" fill="#FFF" fontSize="7" fontWeight="bold" textAnchor="middle">RFID</text>
          </g>
        ) : comp.type === 'BREADBOARD' ? (
          <g>
            <rect width="80" height="55" rx="4" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1.5" />
            <line x1="5" y1="12" x2="75" y2="12" stroke="#EF4444" strokeWidth="2" opacity="0.7" />
            <line x1="5" y1="18" x2="75" y2="18" stroke="#3B82F6" strokeWidth="2" opacity="0.7" />
            <line x1="5" y1="28" x2="75" y2="28" stroke="#CBD5E1" strokeWidth="3" />
            <line x1="5" y1="38" x2="75" y2="38" stroke="#EF4444" strokeWidth="2" opacity="0.7" />
            <line x1="5" y1="44" x2="75" y2="44" stroke="#3B82F6" strokeWidth="2" opacity="0.7" />
          </g>
        ) : (comp.type === 'BREADBOARD_SMALL' || comp.type === 'BREADBOARD_MINI') ? (
          <g>
            <rect width="80" height="55" rx="4" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1.5" />
            <line x1="5" y1="14" x2="75" y2="14" stroke="#EF4444" strokeWidth="2" opacity="0.7" />
            <line x1="5" y1="27" x2="75" y2="27" stroke="#CBD5E1" strokeWidth="3" />
            <line x1="5" y1="41" x2="75" y2="41" stroke="#3B82F6" strokeWidth="2" opacity="0.7" />
          </g>
        ) : CHIP_BODY_TYPES.has(comp.type) ? (
          <g>
            <rect x="0" y="6" width="80" height="44" rx="3" fill="#18181B" stroke="#000000" strokeWidth="1" />
            <path d="M 32 6 A 8 8 0 0 0 48 6 Z" fill="#0F0F11" />
            <circle cx="8" cy="12" r="2" fill="#94A3B8" />
            <text x="40" y="32" fill="#E2E8F0" fontSize="7.5" fontWeight="bold" textAnchor="middle">
              {String(comp.config?.label || comp.type.replace('IC_', '')).slice(0, 12)}
            </text>
          </g>
        ) : comp.type === 'ZENER_DIODE' ? (
          <g transform="translate(0, 10)">
            <line x1="5" y1="18" x2="25" y2="18" stroke="#94A3B8" strokeWidth="3" />
            <rect x="25" y="8" width="30" height="20" rx="3" fill="#1E293B" />
            <path d="M 48 8 L 55 8 L 55 15 M 48 28 L 41 28 L 41 21" stroke="#CBD5E1" strokeWidth="2.5" fill="none" />
            <line x1="55" y1="18" x2="75" y2="18" stroke="#94A3B8" strokeWidth="3" />
          </g>
        ) : comp.type === 'INDUCTOR' ? (
          <g transform="translate(0, 15)">
            <line x1="5" y1="10" x2="18" y2="10" stroke="#94A3B8" strokeWidth="3" />
            <path d="M 18 10 a 6 6 0 1 1 12 0 a 6 6 0 1 1 12 0 a 6 6 0 1 1 12 0 a 6 6 0 1 1 12 0" fill="none" stroke="#D97706" strokeWidth="3.5" />
            <line x1="66" y1="10" x2="79" y2="10" stroke="#94A3B8" strokeWidth="3" />
          </g>
        ) : comp.type === 'CAP_ELECTROLYTIC' ? (
          <g transform="translate(5, 3)">
            <line x1="20" y1="0" x2="20" y2="14" stroke="#94A3B8" strokeWidth="3" />
            <rect x="6" y="14" width="28" height="30" rx="4" fill="#334155" stroke="#1E293B" strokeWidth="1" />
            <rect x="6" y="14" width="28" height="8" rx="4" fill="#64748B" />
            <text x="20" y="38" fill="#F8FAFC" fontSize="10" fontWeight="bold" textAnchor="middle">+</text>
            <line x1="20" y1="44" x2="20" y2="56" stroke="#94A3B8" strokeWidth="3" />
          </g>
        ) : comp.type === 'PHOTODIODE' ? (
          <g transform="translate(0, 10)">
            <line x1="5" y1="18" x2="20" y2="18" stroke="#94A3B8" strokeWidth="3" />
            <path d="M 18 12 L 12 4 M 18 12 L 24 4 M 24 18 L 18 10 M 24 18 L 30 10" stroke="#F59E0B" strokeWidth="1.5" />
            <rect x="20" y="8" width="30" height="20" rx="3" fill="#1E293B" />
            <rect x="43" y="8" width="7" height="20" fill="#CBD5E1" />
            <line x1="50" y1="18" x2="75" y2="18" stroke="#94A3B8" strokeWidth="3" />
          </g>
        ) : (comp.type === 'FLEX_SENSOR' || comp.type === 'FORCE_SENSOR') ? (
          <g transform="translate(0, 12)">
            <line x1="5" y1="15" x2="18" y2="15" stroke="#94A3B8" strokeWidth="3" />
            <rect x="18" y="4" width="44" height="22" rx="3" fill="#475569" stroke="#334155" strokeWidth="1" />
            <text x="40" y="19" fill="#E2E8F0" fontSize="7" fontWeight="bold" textAnchor="middle">{comp.type === 'FLEX_SENSOR' ? 'FLEX' : 'FSR'}</text>
            <line x1="62" y1="15" x2="75" y2="15" stroke="#94A3B8" strokeWidth="3" />
          </g>
        ) : comp.type === 'TILT_SENSOR' ? (
          <g transform="translate(0, 12)">
            <line x1="5" y1="15" x2="20" y2="15" stroke="#94A3B8" strokeWidth="3" />
            <rect x="20" y="2" width="14" height="26" rx="4" fill="#94A3B8" stroke="#64748B" strokeWidth="1" />
            <circle cx="27" cy="10" r="4" fill="#334155" />
            <line x1="34" y1="15" x2="75" y2="15" stroke="#94A3B8" strokeWidth="3" />
          </g>
        ) : comp.type === 'PUSHBUTTON' ? (
          <g transform="translate(0, 10)">
            <line x1="5" y1="18" x2="22" y2="18" stroke="#94A3B8" strokeWidth="3" />
            <rect x="22" y="6" width="36" height="24" rx="4" fill="#475569" stroke="#334155" strokeWidth="1.5" />
            <circle cx="40" cy="18" r="8" fill={comp.config?.pressed ? '#EF4444' : '#CBD5E1'} />
            <line x1="58" y1="18" x2="75" y2="18" stroke="#94A3B8" strokeWidth="3" />
          </g>
        ) : comp.type === 'LIGHT_BULB' ? (
          <g transform="translate(5, 2)">
            {(pinActive || isLit) && (
              <circle cx="30" cy="18" r="26" fill="#FBBF24" opacity="0.4" className="led-glow" style={{ '--glow-color': '#FBBF24' }} />
            )}
            <circle cx="30" cy="18" r="17" fill={(pinActive || isLit) ? '#FEF3C7' : '#F8FAFC'} stroke="#94A3B8" strokeWidth="1.5" />
            <path d="M 22 18 Q 30 10 38 18 M 24 22 L 36 22" stroke="#D97706" strokeWidth="1.5" fill="none" />
            <rect x="24" y="34" width="12" height="10" fill="#94A3B8" />
            <path d="M 22 44 L 38 44 L 34 50 L 26 50 Z" fill="#64748B" />
          </g>
        ) : comp.type === 'VIBRATION_MOTOR' ? (
          <g>
            <circle cx="30" cy="25" r="17" fill="#475569" stroke="#334155" strokeWidth="2" />
            <circle cx="38" cy="16" r="7" fill="#1E293B" className={isSimulating ? 'animate-spin-fast' : ''} style={{ transformOrigin: '38px 16px' }} />
          </g>
        ) : (comp.type === 'NEOPIXEL' || comp.type === 'NEOPIXEL_RING' || comp.type === 'NEOPIXEL_STRIP') ? (
          comp.type === 'NEOPIXEL' ? (
            <g>
              {isSimulating && <circle cx="35" cy="25" r="24" fill={comp.config?.color || '#FFFFFF'} opacity="0.35" className="led-glow" style={{ '--glow-color': comp.config?.color || '#FFFFFF' }} />}
              <rect x="20" y="10" width="30" height="30" rx="4" fill={comp.config?.color || '#F8FAFC'} stroke="#334155" strokeWidth="1.5" className={isSimulating ? 'led-glow' : ''} style={{ '--glow-color': comp.config?.color || '#FFFFFF' }} />
            </g>
          ) : comp.type === 'NEOPIXEL_RING' ? (
            <g transform="translate(35, 25)">
              {Array.from({ length: Math.min(comp.config?.ledCount || 12, 16) }).map((_, i, arr) => {
                const angle = (i / arr.length) * Math.PI * 2;
                const r = 20;
                return (
                  <circle key={i} cx={Math.cos(angle) * r} cy={Math.sin(angle) * r} r="3.5"
                    fill={isSimulating ? (comp.config?.color || '#22D3EE') : '#334155'}
                    className={isSimulating ? 'led-glow' : ''} style={{ '--glow-color': comp.config?.color || '#22D3EE' }} />
                );
              })}
            </g>
          ) : (
            <g transform="translate(5, 22)">
              {Array.from({ length: Math.min(comp.config?.ledCount || 8, 12) }).map((_, i) => (
                <circle key={i} cx={i * 6} cy="0" r="3"
                  fill={isSimulating ? (comp.config?.color || '#22D3EE') : '#334155'}
                  className={isSimulating ? 'led-glow' : ''} style={{ '--glow-color': comp.config?.color || '#22D3EE' }} />
              ))}
            </g>
          )
        ) : (comp.type === 'BATTERY_1V5' || comp.type === 'COIN_CELL_3V') ? (
          <g>
            <defs>
              <linearGradient id={`smallBat-${comp.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38BDF8" />
                <stop offset="100%" stopColor="#0369A1" />
              </linearGradient>
            </defs>
            {comp.type === 'BATTERY_1V5' ? (
              <rect x="15" y="5" width="30" height="45" rx="6" fill={`url(#smallBat-${comp.id})`} stroke="#075985" strokeWidth="1" />
            ) : (
              <ellipse cx="35" cy="25" rx="20" ry="20" fill="#CBD5E1" stroke="#94A3B8" strokeWidth="2" />
            )}
            <text x={comp.type === 'BATTERY_1V5' ? 30 : 35} y="28" fill={comp.type === 'BATTERY_1V5' ? '#FFFFFF' : '#334155'} fontSize="8" fontWeight="bold" textAnchor="middle">
              {comp.type === 'BATTERY_1V5' ? '1.5V' : '3V'}
            </text>
          </g>
        ) : comp.type === 'SOLAR_CELL' ? (
          <g>
            <rect width="70" height="45" rx="2" fill="#1E3A8A" stroke="#1E293B" strokeWidth="1.5" />
            {Array.from({ length: 4 }).map((_, r) => Array.from({ length: 6 }).map((_, c) => (
              <rect key={`${r}-${c}`} x={2 + c * 11.3} y={2 + r * 10.5} width="10" height="9" fill="#3B82F6" stroke="#1E3A8A" strokeWidth="0.5" />
            )))}
          </g>
        ) : (comp.type === 'MULTIMETER' || comp.type === 'POWER_SUPPLY' || comp.type === 'FUNCTION_GENERATOR' || comp.type === 'OSCILLOSCOPE') ? (
          <g>
            <rect width="80" height="55" rx="4" fill="#374151" stroke="#1F2937" strokeWidth="1.5" />
            <rect x="8" y="6" width="64" height="26" rx="2" fill="#052E16" />
            <text x="40" y="23" fill="#4ADE80" fontSize="8" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
              {comp.type === 'MULTIMETER' ? `${comp.config?.reading ?? 0}` :
                comp.type === 'POWER_SUPPLY' ? `${comp.config?.voltage ?? 5}V` :
                comp.type === 'FUNCTION_GENERATOR' ? `${comp.config?.frequency ?? 1000}Hz` : '∿'}
            </text>
            <circle cx="14" cy="45" r="5" fill="#94A3B8" />
            <circle cx="30" cy="45" r="5" fill="#94A3B8" />
          </g>
        ) : comp.type === 'MICROBIT' ? (
          <g>
            <rect width="80" height="55" rx="4" fill="#111827" stroke="#000000" strokeWidth="1" />
            {Array.from({ length: 5 }).map((_, r) => Array.from({ length: 5 }).map((_, c) => (
              <circle key={`${r}-${c}`} cx={14 + c * 12} cy={10 + r * 8} r="2.2" fill={isSimulating ? '#EF4444' : '#374151'} className={isSimulating ? 'led-glow' : ''} style={{ '--glow-color': '#EF4444' }} />
            )))}
          </g>
        ) : (comp.type === 'SLIDE_SWITCH' || comp.type.startsWith('DIP_SWITCH')) ? (
          <g>
            <rect width="70" height="50" rx="3" fill="#1E293B" stroke="#0F172A" strokeWidth="1" />
            <rect x="8" y="10" width="20" height="30" rx="2" fill="#DC2626" />
            <text x="42" y="47" fill="#94A3B8" fontSize="6.5" fontWeight="bold" textAnchor="middle">SWITCH</text>
          </g>
        ) : comp.type === 'KEYPAD_4X4' ? (
          <g>
            <rect width="80" height="55" rx="3" fill="#1E293B" />
            {Array.from({ length: 4 }).map((_, r) => Array.from({ length: 4 }).map((_, c) => (
              <rect key={`${r}-${c}`} x={5 + c * 18} y={4 + r * 12} width="14" height="9" rx="1.5" fill="#475569" stroke="#0F172A" strokeWidth="0.5" />
            )))}
          </g>
        ) : comp.type === 'AMBIENT_LIGHT_SENSOR' ? (
          <g>
            <rect width="70" height="50" rx="3" fill="#0EA5E9" />
            <circle cx="35" cy="25" r="14" fill="#FEF9C3" stroke="#FDE047" strokeWidth="2" />
          </g>
        ) : comp.type === 'IR_REMOTE' ? (
          <g>
            <rect width="50" height="120" rx="10" fill="#1E293B" stroke="#0F172A" strokeWidth="1.5" />
            <circle cx="25" cy="16" r="6" fill="#DC2626" />
            {Array.from({ length: 4 }).map((_, r) => Array.from({ length: 3 }).map((_, c) => (
              <rect key={`${r}-${c}`} x={8 + c * 12} y={30 + r * 20} width="9" height="14" rx="2" fill="#475569" />
            )))}
          </g>
        ) : comp.type === 'DC_MOTOR_ENCODER' ? (
          <g>
            <circle cx="30" cy="25" r="20" fill="#64748B" stroke="#334155" strokeWidth="2" />
            <g className={isSimulating ? 'animate-spin-fast' : ''} style={{ transformOrigin: '30px 25px' }}>
              <line x1="30" y1="25" x2="30" y2="8" stroke="#FFFFFF" strokeWidth="3" />
            </g>
            <rect x="52" y="12" width="16" height="26" rx="2" fill="#22C55E" />
            <text x="60" y="49" fill="#22C55E" fontSize="6" fontWeight="bold" textAnchor="middle">ENC</text>
          </g>
        ) : comp.type === 'RELAY_DPDT' ? (
          <g>
            <rect width="75" height="55" rx="4" fill="#2563EB" />
            <rect x="8" y="8" width="59" height="39" rx="3" fill="#1E40AF" />
            <circle cx="20" cy="20" r="4" fill={isSimulating ? '#22C55E' : '#64748B'} className={isSimulating ? 'led-glow' : ''} style={{ '--glow-color': '#22C55E' }} />
            <text x="42" y="32" fill="#FFFFFF" fontSize="8" fontWeight="bold" textAnchor="middle">DPDT</text>
          </g>
        ) : (comp.type === 'PNP_TRANSISTOR' || comp.type === 'MOSFET_N' || comp.type === 'MOSFET_P' || comp.type === 'IC_TIP120') ? (
          <g>
            <path d="M 20 10 C 20 10 50 10 50 25 C 50 40 20 40 20 40 Z" fill="#1E293B" />
            <rect x="18" y="10" width="5" height="30" fill="#0F172A" />
            <text x="32" y="28" fill="#FFFFFF" fontSize="6.5" fontWeight="bold" textAnchor="middle">
              {comp.type === 'PNP_TRANSISTOR' ? 'PNP' : comp.type === 'MOSFET_N' ? 'nMOS' : comp.type === 'MOSFET_P' ? 'pMOS' : 'TIP120'}
            </text>
          </g>
        ) : (comp.type === 'PIN_HEADER_8' || comp.type === 'USB_CONNECTOR_A') ? (
          <g>
            <rect width="70" height="50" rx="2" fill="#1E293B" />
            {comp.type === 'PIN_HEADER_8' ? (
              Array.from({ length: 8 }).map((_, i) => (
                <rect key={i} x={8 + (i % 4) * 15} y={i < 4 ? 8 : 28} width="8" height="14" fill="#CBD5E1" />
              ))
            ) : (
              <rect x="15" y="10" width="40" height="30" rx="4" fill="#94A3B8" />
            )}
          </g>
        ) : (
          <g>
            <rect width="70" height="50" rx="6" fill="#3B82F6" opacity="0.1" stroke="#3B82F6" strokeWidth="1" />
            <text x="35" y="30" fill="#2563EB" fontSize="9" fontWeight="bold" textAnchor="middle">{comp.type}</text>
          </g>
        )}
      </g>

      {/* ══ 3. PIN HEADERS & LABELS (LEFT SIDE) ══ */}
      {leftPorts.map(p => (
        <g key={p.id}>
          <line x1="8" y1={p.y} x2="20" y2={p.y} stroke="#CBD5E1" strokeWidth="1" />
          <text x="22" y={p.y + 3} fill="#475569" fontSize="8" fontFamily="monospace" fontWeight="500" textAnchor="start">
            {p.name}
          </text>
        </g>
      ))}

      {/* ══ 4. PIN HEADERS & LABELS (RIGHT SIDE) ══ */}
      {rightPorts.map(p => (
        <g key={p.id}>
          <line x1={cardWidth - 20} y1={p.y} x2={cardWidth - 8} y2={p.y} stroke="#CBD5E1" strokeWidth="1" />
          <text x={cardWidth - 22} y={p.y + 3} fill="#475569" fontSize="8" fontFamily="monospace" fontWeight="500" textAnchor="end">
            {p.name}
          </text>
        </g>
      ))}

      {/* ══ 5. TOP & BOTTOM PIN HEADERS ══ */}
      {topPorts.map(p => (
        <text key={p.id} x={p.x} y={p.y + 12} fill="#475569" fontSize="7.5" fontFamily="monospace" textAnchor="middle">{p.name}</text>
      ))}
      {bottomPorts.map(p => (
        <text key={p.id} x={p.x} y={p.y - 6} fill="#475569" fontSize="7.5" fontFamily="monospace" textAnchor="middle">{p.name}</text>
      ))}

      {/* ══ 6. BOTTOM COMPONENT TITLE & SUBTITLE ══ */}
      <line x1="12" y1={cardHeight - 34} x2={cardWidth - 12} y2={cardHeight - 34} stroke="#F1F5F9" strokeWidth="1" />

      <text x={cardWidth / 2} y={cardHeight - 20} fill="#0F172A" fontSize="10" fontWeight="700" textAnchor="middle">
        {proto.name}
      </text>
      <text x={cardWidth / 2} y={cardHeight - 8} fill="#94A3B8" fontSize="8" fontWeight="500" textAnchor="middle">
        {proto.subtitle || 'Module'}
      </text>
    </g>
  );
}
