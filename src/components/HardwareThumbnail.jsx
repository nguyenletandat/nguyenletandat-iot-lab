import React from 'react';

/**
 * Real Photo + Vector Thumbnail Renderer for Hardware Catalog Sidebar + Modal
 */

// Dùng BASE_URL của Vite thay vì path tuyệt đối "/assets/..." để ảnh không vỡ
// khi app được deploy dưới 1 subpath (vd: GitHub Pages project site)
const ASSET_BASE = `${import.meta.env.BASE_URL}assets/components/`;

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
};

export default function HardwareThumbnail({ type }) {
  if (REAL_IMAGES[type]) {
    return (
      <div className="w-full h-full flex items-center justify-center p-1">
        <img
          src={REAL_IMAGES[type]}
          alt={type}
          className="max-w-full max-h-full object-contain filter drop-shadow-md hover:scale-105 transition-transform"
        />
      </div>
    );
  }

  // Vector fallback for other components
  switch (type) {
    case 'ARDUINO_NANO':
      return (
        <svg viewBox="0 0 48 48" className="w-full h-full">
          <rect x="12" y="4" width="24" height="40" rx="3" fill="#0284C7" stroke="#0369A1" strokeWidth="1.5" />
          <rect x="18" y="0" width="12" height="8" rx="2" fill="#64748B" />
          <text x="24" y="28" fill="#FFF" fontSize="5" fontWeight="bold" textAnchor="middle">NANO</text>
        </svg>
      );
    case 'ARDUINO_MEGA':
      return (
        <svg viewBox="0 0 48 48" className="w-full h-full">
          <rect x="4" y="6" width="40" height="36" rx="4" fill="#0284C7" stroke="#0369A1" strokeWidth="1.5" />
          <rect x="6" y="2" width="14" height="8" rx="2" fill="#64748B" />
          <text x="24" y="28" fill="#FFF" fontSize="5" fontWeight="bold" textAnchor="middle">MEGA</text>
        </svg>
      );
    case 'ESP8266':
      return (
        <svg viewBox="0 0 48 48" className="w-full h-full">
          <rect x="10" y="4" width="28" height="40" rx="4" fill="#1E293B" stroke="#334155" strokeWidth="1.5" />
          <rect x="14" y="10" width="20" height="12" rx="2" fill="#94A3B8" opacity="0.5" />
          <text x="24" y="18" fill="#1E293B" fontSize="4" fontWeight="bold" textAnchor="middle">8266</text>
          <rect x="18" y="38" width="12" height="6" rx="1.5" fill="#475569" />
        </svg>
      );
    case 'DHT22':
      return (
        <svg viewBox="0 0 48 48" className="w-full h-full">
          <rect x="10" y="6" width="28" height="32" rx="4" fill="#0EA5E9" />
          <line x1="14" y1="14" x2="34" y2="14" stroke="#1E40AF" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="14" y1="22" x2="34" y2="22" stroke="#1E40AF" strokeWidth="2.5" strokeLinecap="round" />
          <text x="24" y="35" fill="#FFF" fontSize="6" fontWeight="bold" textAnchor="middle">DHT22</text>
        </svg>
      );
    case 'ADXL345':
      return (
        <svg viewBox="0 0 48 48" className="w-full h-full">
          <rect x="8" y="8" width="32" height="32" rx="4" fill="#3B82F6" />
          <text x="24" y="28" fill="#FFF" fontSize="6" fontWeight="bold" textAnchor="middle">ADXL</text>
        </svg>
      );
    case 'LDR':
      return (
        <svg viewBox="0 0 48 48" className="w-full h-full">
          <rect x="8" y="8" width="32" height="28" rx="4" fill="#1E293B" />
          <circle cx="24" cy="20" r="10" fill="#EF4444" stroke="#F59E0B" strokeWidth="1.5" />
          <text x="24" y="38" fill="#F59E0B" fontSize="5" fontWeight="bold" textAnchor="middle">LDR</text>
        </svg>
      );
    case 'SOIL_MOISTURE':
      return (
        <svg viewBox="0 0 48 48" className="w-full h-full">
          <rect x="10" y="6" width="28" height="14" rx="3" fill="#1E293B" />
          <line x1="18" y1="20" x2="18" y2="40" stroke="#94A3B8" strokeWidth="4" strokeLinecap="round" />
          <line x1="30" y1="20" x2="30" y2="40" stroke="#94A3B8" strokeWidth="4" strokeLinecap="round" />
          <text x="24" y="16" fill="#38BDF8" fontSize="5" fontWeight="bold" textAnchor="middle">SOIL</text>
        </svg>
      );
    case 'MQ2':
      return (
        <svg viewBox="0 0 48 48" className="w-full h-full">
          <rect x="6" y="8" width="36" height="28" rx="4" fill="#1E293B" />
          <circle cx="24" cy="20" r="10" fill="#64748B" stroke="#475569" strokeWidth="2" />
          <circle cx="24" cy="20" r="5" fill="#334155" />
          <text x="24" y="38" fill="#F59E0B" fontSize="5" fontWeight="bold" textAnchor="middle">MQ-2</text>
        </svg>
      );
    case 'PIR':
      return (
        <svg viewBox="0 0 48 48" className="w-full h-full">
          <rect x="8" y="10" width="32" height="26" rx="4" fill="#15803D" />
          <circle cx="24" cy="22" r="10" fill="#F8FAFC" />
          <text x="24" y="26" fill="#64748B" fontSize="6" fontWeight="bold" textAnchor="middle">PIR</text>
        </svg>
      );
    case 'FLAME':
      return (
        <svg viewBox="0 0 48 48" className="w-full h-full">
          <rect x="10" y="8" width="28" height="28" rx="4" fill="#1E293B" />
          <path d="M 24 12 Q 28 20 24 28 Q 20 20 24 12 Z" fill="#EF4444" />
          <text x="24" y="40" fill="#EF4444" fontSize="5" fontWeight="bold" textAnchor="middle">FLAME</text>
        </svg>
      );
    case 'POTENTIOMETER':
      return (
        <svg viewBox="0 0 48 48" className="w-full h-full">
          <rect x="8" y="8" width="32" height="28" rx="4" fill="#334155" />
          <circle cx="24" cy="20" r="10" fill="#94A3B8" />
          <line x1="24" y1="20" x2="24" y2="12" stroke="#0F172A" strokeWidth="3" strokeLinecap="round" />
          <text x="24" y="40" fill="#F8FAFC" fontSize="5" fontWeight="bold" textAnchor="middle">POT</text>
        </svg>
      );
    case 'IR_RECEIVER':
      return (
        <svg viewBox="0 0 48 48" className="w-full h-full">
          <rect x="12" y="10" width="24" height="26" rx="3" fill="#1E293B" />
          <circle cx="24" cy="20" r="7" fill="#7C3AED" opacity="0.6" />
          <text x="24" y="40" fill="#A78BFA" fontSize="5" fontWeight="bold" textAnchor="middle">IR</text>
        </svg>
      );
    case 'TOUCH_SENSOR':
      return (
        <svg viewBox="0 0 48 48" className="w-full h-full">
          <rect x="8" y="8" width="32" height="28" rx="4" fill="#1E293B" />
          <circle cx="24" cy="20" r="8" fill="#0EA5E9" opacity="0.3" stroke="#0EA5E9" strokeWidth="2" />
          <text x="24" y="24" fill="#0EA5E9" fontSize="5" fontWeight="bold" textAnchor="middle">TAP</text>
        </svg>
      );
    case 'RAIN_SENSOR':
      return (
        <svg viewBox="0 0 48 48" className="w-full h-full">
          <rect x="8" y="8" width="32" height="28" rx="4" fill="#1E293B" />
          <path d="M 24 14 L 27 22 L 24 28 L 21 22 Z" fill="#3B82F6" />
          <text x="24" y="40" fill="#3B82F6" fontSize="5" fontWeight="bold" textAnchor="middle">RAIN</text>
        </svg>
      );
    case 'LED':
      return (
        <svg viewBox="0 0 48 48" className="w-full h-full">
          <path d="M 16 16 A 12 12 0 0 1 32 16 L 32 30 L 16 30 Z" fill="#EF4444" />
          <line x1="20" y1="30" x2="20" y2="42" stroke="#94A3B8" strokeWidth="2" />
          <line x1="28" y1="30" x2="28" y2="42" stroke="#94A3B8" strokeWidth="2" />
        </svg>
      );
    case 'RGB_LED':
      return (
        <svg viewBox="0 0 48 48" className="w-full h-full">
          <circle cx="24" cy="20" r="12" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="2" />
          <circle cx="20" cy="18" r="4" fill="#EF4444" opacity="0.6" />
          <circle cx="28" cy="18" r="4" fill="#22C55E" opacity="0.6" />
          <circle cx="24" cy="24" r="4" fill="#3B82F6" opacity="0.6" />
          <text x="24" y="40" fill="#64748B" fontSize="5" fontWeight="bold" textAnchor="middle">RGB</text>
        </svg>
      );
    case 'BUZZER':
      return (
        <svg viewBox="0 0 48 48" className="w-full h-full">
          <circle cx="24" cy="22" r="14" fill="#1E293B" stroke="#0F172A" strokeWidth="2" />
          <circle cx="24" cy="22" r="5" fill="#334155" />
          <text x="24" y="42" fill="#64748B" fontSize="5" fontWeight="bold" textAnchor="middle">BUZ</text>
        </svg>
      );
    case 'RELAY':
      return (
        <svg viewBox="0 0 48 48" className="w-full h-full">
          <rect x="6" y="8" width="36" height="28" rx="4" fill="#2563EB" />
          <rect x="10" y="12" width="28" height="18" rx="2" fill="#1E40AF" />
          <text x="24" y="24" fill="#FFF" fontSize="6" fontWeight="bold" textAnchor="middle">RELAY</text>
        </svg>
      );
    case 'DC_MOTOR':
      return (
        <svg viewBox="0 0 48 48" className="w-full h-full">
          <circle cx="24" cy="22" r="14" fill="#64748B" stroke="#334155" strokeWidth="2" />
          <path d="M 24 22 L 24 10 A 6 6 0 0 1 30 16 Z" fill="#38BDF8" />
          <path d="M 24 22 L 36 26 A 6 6 0 0 1 30 32 Z" fill="#38BDF8" />
          <path d="M 24 22 L 14 30 A 6 6 0 0 1 12 22 Z" fill="#38BDF8" />
          <text x="24" y="42" fill="#64748B" fontSize="5" fontWeight="bold" textAnchor="middle">FAN</text>
        </svg>
      );
    case 'STEPPER_28BYJ':
      return (
        <svg viewBox="0 0 48 48" className="w-full h-full">
          <circle cx="24" cy="20" r="14" fill="#475569" stroke="#334155" strokeWidth="2" />
          <circle cx="24" cy="20" r="4" fill="#94A3B8" />
          <rect x="8" y="32" width="32" height="10" rx="2" fill="#22C55E" />
          <text x="24" y="40" fill="#FFF" fontSize="4" fontWeight="bold" textAnchor="middle">ULN2003</text>
        </svg>
      );
    case 'LASER':
      return (
        <svg viewBox="0 0 48 48" className="w-full h-full">
          <rect x="14" y="10" width="20" height="28" rx="3" fill="#1E293B" />
          <circle cx="24" cy="18" r="5" fill="#DC2626" />
          <line x1="24" y1="4" x2="24" y2="13" stroke="#EF4444" strokeWidth="2" strokeDasharray="2,2" />
          <text x="24" y="40" fill="#DC2626" fontSize="5" fontWeight="bold" textAnchor="middle">LASER</text>
        </svg>
      );
    case 'BUTTON':
      return (
        <svg viewBox="0 0 48 48" className="w-full h-full">
          <rect x="10" y="10" width="28" height="28" rx="6" fill="#475569" stroke="#334155" strokeWidth="2" />
          <circle cx="24" cy="24" r="8" fill="#94A3B8" />
          <circle cx="24" cy="24" r="5" fill="#CBD5E1" />
        </svg>
      );
    case 'LCD1602':
      return (
        <svg viewBox="0 0 48 48" className="w-full h-full">
          <rect x="2" y="8" width="44" height="28" rx="3" fill="#047857" />
          <rect x="6" y="12" width="36" height="18" fill="#064E3B" />
          <text x="24" y="24" fill="#A7F3D0" fontSize="5" fontFamily="monospace" textAnchor="middle">LCD 16x2</text>
        </svg>
      );
    case 'SEVEN_SEGMENT':
      return (
        <svg viewBox="0 0 48 48" className="w-full h-full">
          <rect x="10" y="6" width="28" height="36" rx="3" fill="#1E293B" />
          <text x="24" y="32" fill="#EF4444" fontSize="22" fontWeight="bold" textAnchor="middle" fontFamily="monospace">8</text>
        </svg>
      );
    case 'RESISTOR':
      return (
        <svg viewBox="0 0 48 48" className="w-full h-full">
          <line x1="4" y1="24" x2="14" y2="24" stroke="#94A3B8" strokeWidth="2" />
          <rect x="14" y="18" width="20" height="12" rx="2" fill="#D2B48C" stroke="#8B7355" strokeWidth="1" />
          <line x1="18" y1="18" x2="18" y2="30" stroke="#EF4444" strokeWidth="2" />
          <line x1="22" y1="18" x2="22" y2="30" stroke="#EF4444" strokeWidth="2" />
          <line x1="26" y1="18" x2="26" y2="30" stroke="#8B4513" strokeWidth="2" />
          <line x1="30" y1="18" x2="30" y2="30" stroke="#FFD700" strokeWidth="2" />
          <line x1="34" y1="24" x2="44" y2="24" stroke="#94A3B8" strokeWidth="2" />
        </svg>
      );
    case 'CAPACITOR':
      return (
        <svg viewBox="0 0 48 48" className="w-full h-full">
          <line x1="24" y1="6" x2="24" y2="18" stroke="#94A3B8" strokeWidth="2" />
          <line x1="14" y1="18" x2="34" y2="18" stroke="#F59E0B" strokeWidth="3" />
          <path d="M 14 24 Q 24 28 34 24" stroke="#F59E0B" strokeWidth="3" fill="none" />
          <line x1="24" y1="24" x2="24" y2="42" stroke="#94A3B8" strokeWidth="2" />
        </svg>
      );
    case 'DIODE':
      return (
        <svg viewBox="0 0 48 48" className="w-full h-full">
          <line x1="4" y1="24" x2="16" y2="24" stroke="#94A3B8" strokeWidth="2" />
          <polygon points="16,16 32,24 16,32" fill="#1E293B" stroke="#334155" strokeWidth="1.5" />
          <line x1="32" y1="16" x2="32" y2="32" stroke="#334155" strokeWidth="2" />
          <line x1="32" y1="24" x2="44" y2="24" stroke="#94A3B8" strokeWidth="2" />
        </svg>
      );
    case 'TRANSISTOR':
      return (
        <svg viewBox="0 0 48 48" className="w-full h-full">
          <circle cx="24" cy="24" r="14" fill="none" stroke="#334155" strokeWidth="1.5" />
          <rect x="16" y="14" width="3" height="20" fill="#1E293B" />
          <line x1="4" y1="24" x2="16" y2="24" stroke="#94A3B8" strokeWidth="2" />
          <line x1="19" y1="18" x2="36" y2="8" stroke="#94A3B8" strokeWidth="2" />
          <line x1="19" y1="30" x2="36" y2="40" stroke="#94A3B8" strokeWidth="2" />
          <text x="24" y="48" fill="#64748B" fontSize="4" fontWeight="bold" textAnchor="middle">NPN</text>
        </svg>
      );
    case 'BLUETOOTH_HC05':
      return (
        <svg viewBox="0 0 48 48" className="w-full h-full">
          <rect x="8" y="6" width="32" height="36" rx="4" fill="#1E293B" />
          <path d="M 24 14 L 30 20 L 24 26 L 30 32 L 24 38" stroke="#3B82F6" strokeWidth="2" fill="none" />
          <text x="24" y="46" fill="#3B82F6" fontSize="4" fontWeight="bold" textAnchor="middle">HC-05</text>
        </svg>
      );
    case 'RFID_RC522':
      return (
        <svg viewBox="0 0 48 48" className="w-full h-full">
          <rect x="6" y="8" width="36" height="28" rx="4" fill="#0284C7" />
          <circle cx="24" cy="20" r="8" fill="none" stroke="#FFF" strokeWidth="1.5" />
          <circle cx="24" cy="20" r="4" fill="none" stroke="#FFF" strokeWidth="1" />
          <text x="24" y="40" fill="#38BDF8" fontSize="4" fontWeight="bold" textAnchor="middle">RFID</text>
        </svg>
      );
    case 'BREADBOARD':
      return (
        <svg viewBox="0 0 48 48" className="w-full h-full">
          <rect x="4" y="8" width="40" height="32" rx="3" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1.5" />
          <line x1="4" y1="14" x2="44" y2="14" stroke="#EF4444" strokeWidth="1" opacity="0.5" />
          <line x1="4" y1="18" x2="44" y2="18" stroke="#3B82F6" strokeWidth="1" opacity="0.5" />
          <line x1="4" y1="24" x2="44" y2="24" stroke="#CBD5E1" strokeWidth="2" />
          <line x1="4" y1="30" x2="44" y2="30" stroke="#EF4444" strokeWidth="1" opacity="0.5" />
          <line x1="4" y1="34" x2="44" y2="34" stroke="#3B82F6" strokeWidth="1" opacity="0.5" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 48 48" className="w-full h-full">
          <rect x="8" y="8" width="32" height="32" rx="6" fill="#E2E8F0" stroke="#CBD5E1" strokeWidth="1.5" />
          <text x="24" y="28" fill="#94A3B8" fontSize="8" fontWeight="bold" textAnchor="middle">?</text>
        </svg>
      );
  }
}
