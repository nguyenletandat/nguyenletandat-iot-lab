import React from 'react';
import { Thermometer, Droplets, Sun, Flame, Wind, Radio, Eye, Gauge, ToggleLeft, Zap } from 'lucide-react';

/**
 * Tinkercad-Style Interactive Simulation Overlay & Environmental Controls
 * Positioned cleanly ABOVE the top border of each component card with zero overlap over the card or photo.
 */
export default function SimulationControlsOverlay({
  components,
  isSimulating,
  zoom,
  pan,
  onUpdateConfig
}) {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
      <div
        className="w-full h-full relative"
        style={{
          transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
          transformOrigin: '0 0'
        }}
      >
        {components.map(comp => {
          const x = comp.x;
          const y = comp.y;

          switch (comp.type) {
            case 'HC_SR04':
              const dist = comp.config.distance !== undefined ? comp.config.distance : 25;
              return (
                <div
                  key={comp.id}
                  style={{ left: `${x + 10}px`, top: `${y - 100}px` }}
                  className="absolute pointer-events-auto flex flex-col items-center p-2.5 rounded-2xl bg-white/95 dark:bg-[#0F1423]/95 border-2 border-sky-400 dark:border-sky-500/60 shadow-2xl backdrop-blur-md transition-all z-30 min-w-[220px]"
                >
                  <div className="flex items-center justify-between w-full mb-1">
                    <span className="text-[10px] font-bold text-sky-600 dark:text-sky-400 flex items-center gap-1 uppercase tracking-wider">
                      <Radio className="w-3.5 h-3.5 animate-pulse" />
                      Khoảng cách Vật cản
                    </span>
                    <span className="text-xs font-mono font-extrabold text-sky-600 bg-sky-50 dark:bg-sky-950/60 px-2 py-0.5 rounded-full border border-sky-200 dark:border-sky-800">
                      {dist} cm
                    </span>
                  </div>

                  <input
                    type="range"
                    min="2"
                    max="300"
                    value={dist}
                    onChange={(e) => onUpdateConfig(comp.id, 'distance', parseInt(e.target.value))}
                    className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-sky-500 my-1"
                  />

                  <div className="flex items-center justify-between w-full text-[9px] font-mono text-slate-400">
                    <span>2 cm (Gần)</span>
                    <span>300 cm (Xa)</span>
                  </div>
                </div>
              );

            case 'DHT11':
              const temp = comp.config.value !== undefined ? comp.config.value : 28;
              const humi = comp.config.humidity !== undefined ? comp.config.humidity : 65;
              return (
                <div
                  key={comp.id}
                  style={{ left: `${x + 5}px`, top: `${y - 145}px` }}
                  className="absolute pointer-events-auto flex flex-col gap-2 p-2.5 rounded-2xl bg-white/95 dark:bg-[#0F1423]/95 border-2 border-orange-400 dark:border-orange-500/60 shadow-2xl backdrop-blur-md transition-all z-30 min-w-[230px]"
                >
                  {/* Temp slider */}
                  <div>
                    <div className="flex items-center justify-between w-full mb-0.5">
                      <span className="text-[10px] font-bold text-orange-600 dark:text-orange-400 flex items-center gap-1 uppercase tracking-wider">
                        <Thermometer className="w-3.5 h-3.5" />
                        Nhiệt độ
                      </span>
                      <span className="text-xs font-mono font-extrabold text-orange-600 bg-orange-50 dark:bg-orange-950/60 px-2 py-0.5 rounded-full border border-orange-200 dark:border-orange-800">
                        {temp} °C
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="50"
                      value={temp}
                      onChange={(e) => onUpdateConfig(comp.id, 'value', parseInt(e.target.value))}
                      className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-orange-500"
                    />
                  </div>

                  {/* Humidity slider */}
                  <div>
                    <div className="flex items-center justify-between w-full mb-0.5">
                      <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1 uppercase tracking-wider">
                        <Droplets className="w-3.5 h-3.5" />
                        Độ ẩm không khí
                      </span>
                      <span className="text-xs font-mono font-extrabold text-blue-600 bg-blue-50 dark:bg-blue-950/60 px-2 py-0.5 rounded-full border border-blue-200 dark:border-blue-800">
                        {humi} %
                      </span>
                    </div>
                    <input
                      type="range"
                      min="20"
                      max="95"
                      value={humi}
                      onChange={(e) => onUpdateConfig(comp.id, 'humidity', parseInt(e.target.value))}
                      className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
                    />
                  </div>
                </div>
              );

            case 'LDR':
              const lightVal = comp.config.value !== undefined ? comp.config.value : 450;
              return (
                <div
                  key={comp.id}
                  style={{ left: `${x + 10}px`, top: `${y - 100}px` }}
                  className="absolute pointer-events-auto flex flex-col items-center p-2.5 rounded-2xl bg-white/95 dark:bg-[#0F1423]/95 border-2 border-amber-400 dark:border-amber-500/60 shadow-2xl backdrop-blur-md transition-all z-30 min-w-[220px]"
                >
                  <div className="flex items-center justify-between w-full mb-1">
                    <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1 uppercase tracking-wider">
                      <Sun className="w-3.5 h-3.5" />
                      Ánh sáng môi trường
                    </span>
                    <span className="text-xs font-mono font-extrabold text-amber-600 bg-amber-50 dark:bg-amber-950/60 px-2 py-0.5 rounded-full border border-amber-200 dark:border-amber-800">
                      {lightVal} Lux
                    </span>
                  </div>

                  <input
                    type="range"
                    min="0"
                    max="1023"
                    value={lightVal}
                    onChange={(e) => onUpdateConfig(comp.id, 'value', parseInt(e.target.value))}
                    className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500 my-1"
                  />

                  <div className="flex items-center justify-between w-full text-[9px] font-mono text-slate-400">
                    <span>🌙 Tối (0)</span>
                    <span>☀️ Sáng (1023)</span>
                  </div>
                </div>
              );

            case 'SOIL_MOISTURE':
              const moist = comp.config.moisture !== undefined ? comp.config.moisture : 350;
              return (
                <div
                  key={comp.id}
                  style={{ left: `${x + 10}px`, top: `${y - 100}px` }}
                  className="absolute pointer-events-auto flex flex-col items-center p-2.5 rounded-2xl bg-white/95 dark:bg-[#0F1423]/95 border-2 border-emerald-400 dark:border-emerald-500/60 shadow-2xl backdrop-blur-md transition-all z-30 min-w-[220px]"
                >
                  <div className="flex items-center justify-between w-full mb-1">
                    <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 uppercase tracking-wider">
                      <Droplets className="w-3.5 h-3.5" />
                      Độ ẩm đất
                    </span>
                    <span className="text-xs font-mono font-extrabold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                      {moist}
                    </span>
                  </div>

                  <input
                    type="range"
                    min="0"
                    max="1023"
                    value={moist}
                    onChange={(e) => onUpdateConfig(comp.id, 'moisture', parseInt(e.target.value))}
                    className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500 my-1"
                  />

                  <div className="flex items-center justify-between w-full text-[9px] font-mono text-slate-400">
                    <span>🏜 Khô (0)</span>
                    <span>💧 Ướt (1023)</span>
                  </div>
                </div>
              );

            case 'MQ2':
              const gas = comp.config.gasLevel !== undefined ? comp.config.gasLevel : 120;
              return (
                <div
                  key={comp.id}
                  style={{ left: `${x + 10}px`, top: `${y - 100}px` }}
                  className="absolute pointer-events-auto flex flex-col items-center p-2.5 rounded-2xl bg-white/95 dark:bg-[#0F1423]/95 border-2 border-amber-400 dark:border-amber-500/60 shadow-2xl backdrop-blur-md transition-all z-30 min-w-[220px]"
                >
                  <div className="flex items-center justify-between w-full mb-1">
                    <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1 uppercase tracking-wider">
                      <Wind className="w-3.5 h-3.5" />
                      Nồng độ Khí Gas
                    </span>
                    <span className="text-xs font-mono font-extrabold text-amber-600 bg-amber-50 dark:bg-amber-950/60 px-2 py-0.5 rounded-full border border-amber-200 dark:border-amber-800">
                      {gas} PPM
                    </span>
                  </div>

                  <input
                    type="range"
                    min="0"
                    max="1023"
                    value={gas}
                    onChange={(e) => onUpdateConfig(comp.id, 'gasLevel', parseInt(e.target.value))}
                    className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500 my-1"
                  />

                  <div className="flex items-center justify-between w-full text-[9px] font-mono text-slate-400">
                    <span>Sạch (0)</span>
                    <span>💨 Rò rỉ (1023)</span>
                  </div>
                </div>
              );

            case 'PIR':
              const isMotion = !!comp.config.motion;
              return (
                <div
                  key={comp.id}
                  style={{ left: `${x + 15}px`, top: `${y - 65}px` }}
                  className="absolute pointer-events-auto flex items-center justify-between p-2 rounded-2xl bg-white/95 dark:bg-[#0F1423]/95 border-2 border-emerald-400 dark:border-emerald-500/60 shadow-2xl backdrop-blur-md transition-all z-30 min-w-[210px]"
                >
                  <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 uppercase">
                    <Eye className="w-3.5 h-3.5" />
                    Chuyển động
                  </span>
                  <button
                    onClick={() => onUpdateConfig(comp.id, 'motion', !isMotion)}
                    className={`px-3 py-1 rounded-xl text-xs font-bold text-white transition-all shadow-md ${
                      isMotion
                        ? 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-600/30 ring-2 ring-emerald-400'
                        : 'bg-slate-400 hover:bg-slate-500'
                    }`}
                  >
                    {isMotion ? '🏃 Đang di chuyển' : '🧍 Tĩnh'}
                  </button>
                </div>
              );

            case 'FLAME':
              const isFlame = !!comp.config.detected;
              return (
                <div
                  key={comp.id}
                  style={{ left: `${x + 15}px`, top: `${y - 65}px` }}
                  className="absolute pointer-events-auto flex items-center justify-between p-2 rounded-2xl bg-white/95 dark:bg-[#0F1423]/95 border-2 border-rose-400 dark:border-rose-500/60 shadow-2xl backdrop-blur-md transition-all z-30 min-w-[210px]"
                >
                  <span className="text-[10px] font-bold text-rose-600 dark:text-rose-400 flex items-center gap-1 uppercase">
                    <Flame className="w-3.5 h-3.5" />
                    Ngọn lửa
                  </span>
                  <button
                    onClick={() => onUpdateConfig(comp.id, 'detected', !isFlame)}
                    className={`px-3 py-1 rounded-xl text-xs font-bold text-white transition-all shadow-md ${
                      isFlame
                        ? 'bg-rose-600 hover:bg-rose-500 shadow-rose-600/30 ring-2 ring-rose-400 animate-pulse'
                        : 'bg-slate-400 hover:bg-slate-500'
                    }`}
                  >
                    {isFlame ? '🔥 Có Lửa!' : 'An toàn'}
                  </button>
                </div>
              );

            case 'POTENTIOMETER':
              const potPos = comp.config.position !== undefined ? comp.config.position : 512;
              return (
                <div
                  key={comp.id}
                  style={{ left: `${x + 10}px`, top: `${y - 100}px` }}
                  className="absolute pointer-events-auto flex flex-col items-center p-2.5 rounded-2xl bg-white/95 dark:bg-[#0F1423]/95 border-2 border-indigo-400 dark:border-indigo-500/60 shadow-2xl backdrop-blur-md transition-all z-30 min-w-[210px]"
                >
                  <div className="flex items-center justify-between w-full mb-1">
                    <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-1 uppercase tracking-wider">
                      <Gauge className="w-3.5 h-3.5" />
                      Biến trở Xoay
                    </span>
                    <span className="text-xs font-mono font-extrabold text-indigo-600 bg-indigo-50 dark:bg-indigo-950/60 px-2 py-0.5 rounded-full border border-indigo-200 dark:border-indigo-800">
                      {potPos}
                    </span>
                  </div>

                  <input
                    type="range"
                    min="0"
                    max="1023"
                    value={potPos}
                    onChange={(e) => onUpdateConfig(comp.id, 'position', parseInt(e.target.value))}
                    className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500 my-1"
                  />
                </div>
              );

            case 'DS18B20':
              const waterTemp = comp.config.temp !== undefined ? comp.config.temp : 25;
              return (
                <div
                  key={comp.id}
                  style={{ left: `${x + 10}px`, top: `${y - 100}px` }}
                  className="absolute pointer-events-auto flex flex-col items-center p-2.5 rounded-2xl bg-white/95 dark:bg-[#0F1423]/95 border-2 border-cyan-400 dark:border-cyan-500/60 shadow-2xl backdrop-blur-md transition-all z-30 min-w-[220px]"
                >
                  <div className="flex items-center justify-between w-full mb-1">
                    <span className="text-[10px] font-bold text-cyan-600 dark:text-cyan-400 flex items-center gap-1 uppercase tracking-wider">
                      <Thermometer className="w-3.5 h-3.5" />
                      Nhiệt độ Nguồn Nước
                    </span>
                    <span className="text-xs font-mono font-extrabold text-cyan-600 bg-cyan-50 dark:bg-cyan-950/60 px-2 py-0.5 rounded-full border border-cyan-200 dark:border-cyan-800">
                      {waterTemp} °C
                    </span>
                  </div>

                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={waterTemp}
                    onChange={(e) => onUpdateConfig(comp.id, 'temp', parseInt(e.target.value))}
                    className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500 my-1"
                  />

                  <div className="flex items-center justify-between w-full text-[9px] font-mono text-slate-400">
                    <span>❄️ Lạnh (0°C)</span>
                    <span>🔥 Sôi (100°C)</span>
                  </div>
                </div>
              );

            case 'BMP280':
              const bmpTemp = comp.config.temp !== undefined ? comp.config.temp : 26;
              const bmpPress = comp.config.pressure !== undefined ? comp.config.pressure : 1013;
              return (
                <div
                  key={comp.id}
                  style={{ left: `${x + 5}px`, top: `${y - 145}px` }}
                  className="absolute pointer-events-auto flex flex-col gap-2 p-2.5 rounded-2xl bg-white/95 dark:bg-[#0F1423]/95 border-2 border-teal-400 dark:border-teal-500/60 shadow-2xl backdrop-blur-md transition-all z-30 min-w-[230px]"
                >
                  <div>
                    <div className="flex items-center justify-between w-full mb-0.5">
                      <span className="text-[10px] font-bold text-teal-600 dark:text-teal-400 flex items-center gap-1 uppercase tracking-wider">
                        <Thermometer className="w-3.5 h-3.5" />
                        Nhiệt độ Khí quyển
                      </span>
                      <span className="text-xs font-mono font-extrabold text-teal-600 bg-teal-50 dark:bg-teal-950/60 px-2 py-0.5 rounded-full border border-teal-200 dark:border-teal-800">
                        {bmpTemp} °C
                      </span>
                    </div>
                    <input
                      type="range"
                      min="-10"
                      max="60"
                      value={bmpTemp}
                      onChange={(e) => onUpdateConfig(comp.id, 'temp', parseInt(e.target.value))}
                      className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-teal-500"
                    />
                  </div>
                  <div>
                    <div className="flex items-center justify-between w-full mb-0.5">
                      <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-1 uppercase tracking-wider">
                        <Gauge className="w-3.5 h-3.5" />
                        Áp suất Khí quyển
                      </span>
                      <span className="text-xs font-mono font-extrabold text-indigo-600 bg-indigo-50 dark:bg-indigo-950/60 px-2 py-0.5 rounded-full border border-indigo-200 dark:border-indigo-800">
                        {bmpPress} hPa
                      </span>
                    </div>
                    <input
                      type="range"
                      min="900"
                      max="1100"
                      value={bmpPress}
                      onChange={(e) => onUpdateConfig(comp.id, 'pressure', parseInt(e.target.value))}
                      className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                    />
                  </div>
                </div>
              );

            default:
              return null;
          }
        })}
      </div>
    </div>
  );
}
