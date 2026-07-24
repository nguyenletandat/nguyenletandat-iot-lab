import React from 'react';
import { COMPONENT_TYPES } from '../data/componentTypes';

/**
 * IoT Labs Maker Card-Style Component Renderer
 * Matches maker.iotlabs.vn diagram card aesthetics with dynamic simulation output effects for ALL Actuators & Displays.
 */

const REAL_IMAGES = {
  ESP32: '/assets/components/esp32.png',
  ESP32_V4: '/assets/components/esp32.png',
  ARDUINO_UNO: '/assets/components/arduino_uno.png',
  DHT11: '/assets/components/dht11.png',
  HC_SR04: '/assets/components/hc_sr04.png',
  OLED_SSD1306: '/assets/components/oled.png',
  SERVO: '/assets/components/servo.png',
  DS18B20: '/assets/components/ds18b20.png',
  BMP280: '/assets/components/bmp280.png',
  DS3231: '/assets/components/ds3231.png',
  ACS712: '/assets/components/acs712.png',
  SOIL_MOISTURE: '/assets/components/soil_moisture.png',
  LDR: '/assets/components/ldr.png',
};

export default function CanvasComponentRender({ comp, allComps, isSelected, isSimulating, pinStates }) {
  const proto = COMPONENT_TYPES[comp.type] || {
    name: comp.type,
    subtitle: 'Module',
    width: 240,
    height: 120,
    ports: []
  };

  const cardWidth = proto.width;
  const cardHeight = proto.height;

  const leftPorts = proto.ports.filter(p => p.side === 'left');
  const rightPorts = proto.ports.filter(p => p.side === 'right');
  const topPorts = proto.ports.filter(p => p.side === 'top');
  const bottomPorts = proto.ports.filter(p => p.side === 'bottom');

  // Helper to check if any connected pin is HIGH
  const isPinHigh = (pinNumber) => {
    if (pinNumber === undefined || !pinStates) return false;
    return pinStates[pinNumber]?.val === 1;
  };

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
            <circle cx="20" cy="20" r="4" fill={isSimulating ? "#22C55E" : "#64748B"} className={isSimulating ? "led-glow" : ""} style={{ '--glow-color': '#22C55E' }} />
            <text x="42" y="32" fill="#FFF" fontSize="9" fontWeight="bold" textAnchor="middle">RELAY 5V</text>
          </g>
        ) : comp.type === 'DC_MOTOR' ? (
          <g>
            <circle cx="35" cy="25" r="20" fill="#64748B" stroke="#334155" strokeWidth="2" />
            {/* Animated Propeller Blade */}
            <g className={isSimulating ? "animate-spin-fast" : ""} style={{ transformOrigin: '35px 25px' }}>
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
            {/* Aura Glow when simulating */}
            {isSimulating && (
              <circle cx="30" cy="20" r="26" fill={comp.config.color || '#EF4444'} opacity="0.4" className="led-glow" style={{ '--glow-color': comp.config.color || '#EF4444' }} />
            )}
            <circle cx="30" cy="20" r="18" fill={comp.config.color || '#EF4444'} stroke="#334155" strokeWidth="2" className={isSimulating ? 'led-glow' : ''} style={{ '--glow-color': comp.config.color || '#EF4444' }} />
            <rect x="25" y="38" width="4" height="12" fill="#94A3B8" />
            <rect x="31" y="38" width="4" height="12" fill="#94A3B8" />
          </g>
        ) : comp.type === 'RGB_LED' ? (
          <g>
            <circle cx="35" cy="25" r="20" fill="#F8FAFC" stroke="#64748B" strokeWidth="2" />
            {isSimulating && (
              <circle cx="35" cy="25" r="26" fill="#3B82F6" opacity="0.35" className="led-glow" style={{ '--glow-color': '#3B82F6' }} />
            )}
            <circle cx="28" cy="22" r="6" fill="#EF4444" opacity={isSimulating ? 1 : 0.6} className={isSimulating ? "led-glow" : ""} style={{ '--glow-color': '#EF4444' }} />
            <circle cx="42" cy="22" r="6" fill="#22C55E" opacity={isSimulating ? 1 : 0.6} className={isSimulating ? "led-glow" : ""} style={{ '--glow-color': '#22C55E' }} />
            <circle cx="35" cy="30" r="6" fill="#3B82F6" opacity={isSimulating ? 1 : 0.6} className={isSimulating ? "led-glow" : ""} style={{ '--glow-color': '#3B82F6' }} />
          </g>
        ) : comp.type === 'BUZZER' ? (
          <g>
            <circle cx="35" cy="25" r="20" fill="#1E293B" stroke="#0F172A" strokeWidth="2" />
            {isSimulating && (
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
        ) : comp.type === 'RESISTOR' ? (
          <g transform="translate(0, 10)">
            <line x1="5" y1="18" x2="20" y2="18" stroke="#94A3B8" strokeWidth="3" />
            <rect x="20" y="10" width="40" height="16" rx="4" fill="#D2B48C" stroke="#8B7355" strokeWidth="1" />
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
            <line x1="5" y1="44" x2="75" y2="44" stroke="#3B82F6" strokeWidth="2" opacity="0.7" opacity="0.7" />
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
