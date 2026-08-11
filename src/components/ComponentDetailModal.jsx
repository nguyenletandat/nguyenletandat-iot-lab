import React, { useEffect, useMemo, useRef } from 'react';
import { X, Zap, Plug, ArrowRight, BookOpen } from 'lucide-react';
import { COMPONENT_TYPES } from '../data/componentTypes';
import { COMPONENT_GUIDE } from '../data/componentGuide';
import { PROJECT_PRESETS } from '../data/projectPresets';
import CanvasComponentRender from './CanvasComponentRenders';

const PORT_TYPE_STYLE = {
  power: { label: 'Nguồn (Power)', dark: 'bg-rose-500/10 text-rose-400 border-rose-500/25', light: 'bg-rose-50 text-rose-600 border-rose-200' },
  gnd: { label: 'Đất (GND)', dark: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/25', light: 'bg-emerald-50 text-emerald-600 border-emerald-200' },
  analog: { label: 'Tương tự (Analog)', dark: 'bg-amber-500/10 text-amber-400 border-amber-500/25', light: 'bg-amber-50 text-amber-600 border-amber-200' },
  gpio: { label: 'Tín hiệu số (Digital I/O)', dark: 'bg-blue-500/10 text-blue-400 border-blue-500/25', light: 'bg-blue-50 text-blue-600 border-blue-200' },
};

function describePort(port) {
  const style = PORT_TYPE_STYLE[port.type] || PORT_TYPE_STYLE.gpio;
  let desc;
  if (port.type === 'power') {
    desc = `Chân cấp nguồn${port.voltage ? ` ${port.voltage}V` : ''} cho linh kiện.`;
  } else if (port.type === 'gnd') {
    desc = 'Chân nối đất (GND / Mass) — cực âm chung của mạch.';
  } else if (port.type === 'analog') {
    desc = `Chân tín hiệu tương tự${port.pin != null ? ` — tương ứng GPIO${port.pin} trên board thật` : ''}.`;
  } else {
    desc = `Chân tín hiệu số (digitalWrite/digitalRead)${port.pin != null ? ` — tương ứng GPIO${port.pin} trên board thật` : ''}.`;
  }
  return { style, desc };
}

function ComponentThumbnail({ typeKey }) {
  const proto = COMPONENT_TYPES[typeKey];
  const fakeComp = { id: `detail_${typeKey}`, type: typeKey, config: proto.defaultConfig || {} };
  return (
    <svg viewBox={`0 0 ${proto.width} ${proto.height}`} className="w-full h-full" preserveAspectRatio="xMidYMid meet">
      <CanvasComponentRender comp={fakeComp} allComps={[]} isSelected={false} isSimulating={false} isLit={false} />
    </svg>
  );
}

/**
 * Modal chi tiết 1 linh kiện — mo tu tab "Thu vien linh kien": mo ta day du,
 * bang giai thich tung cong ket noi, va danh sach bai mau (N1-N5/B1-B6) co
 * dung linh kien nay, cho phep nhay thang sang bai do de xem cach dau day thuc te.
 */
export default function ComponentDetailModal({ typeKey, isDarkMode, onClose, onJumpToLesson }) {
  const proto = typeKey ? COMPONENT_TYPES[typeKey] : null;
  const guide = typeKey ? COMPONENT_GUIDE[typeKey] : null;

  const usedInLessons = useMemo(() => {
    if (!typeKey) return [];
    return Object.entries(PROJECT_PRESETS)
      .filter(([, preset]) => preset.components.some(c => c.type === typeKey))
      .map(([id, preset]) => ({ id, name: preset.name }));
  }, [typeKey]);

  const onCloseRef = useRef(onClose);
  useEffect(() => { onCloseRef.current = onClose; });

  useEffect(() => {
    if (!typeKey) return;
    const onKeyDown = (e) => { if (e.key === 'Escape') onCloseRef.current(); };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [typeKey]);

  if (!proto) return null;

  return (
    <div
      className="fixed inset-0 z-[55] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className={`flex flex-col w-full max-w-3xl max-h-[88vh] rounded-2xl shadow-2xl border overflow-hidden ${
          isDarkMode ? 'bg-[#0F1423] border-white/10' : 'bg-white border-slate-200'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className={`shrink-0 flex items-start gap-4 px-6 py-5 border-b ${isDarkMode ? 'border-white/5 bg-[#131929]' : 'border-slate-200 bg-slate-50'}`}>
          <div className={`w-24 h-24 shrink-0 rounded-xl flex items-center justify-center p-2 border ${isDarkMode ? 'bg-[#090C15] border-white/5' : 'bg-white border-slate-200'}`}>
            <ComponentThumbnail typeKey={typeKey} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className={`px-2 py-0.5 text-[10px] font-mono font-semibold rounded-md border ${isDarkMode ? 'bg-white/5 text-gray-300 border-white/10' : 'bg-slate-100 text-slate-600 border-slate-200'}`}>
                {proto.subtitle}
              </span>
              <span className={`px-2 py-0.5 text-[10px] font-semibold rounded-md border ${isDarkMode ? 'bg-violet-500/10 text-violet-400 border-violet-500/20' : 'bg-violet-50 text-violet-600 border-violet-200'}`}>
                {proto.category}
              </span>
            </div>
            <h2 className={`mt-1.5 text-lg font-bold leading-snug ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{guide.en}</h2>
            <h3 className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 leading-snug">{guide.vi}</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className={`shrink-0 p-2 rounded-xl transition-colors ${isDarkMode ? 'text-slate-400 hover:text-white hover:bg-white/10' : 'text-slate-400 hover:text-slate-700 hover:bg-slate-200'}`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">

          {/* Mo ta */}
          <div>
            <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-slate-700'}`}>{guide.descEn}</p>
            <p className={`text-sm italic leading-relaxed mt-1 ${isDarkMode ? 'text-gray-500' : 'text-slate-500'}`}>{guide.descVi}</p>
          </div>

          {/* Cong ket noi */}
          <div>
            <div className="flex items-center gap-2 mb-2.5">
              <Plug className={`w-4 h-4 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`} />
              <h4 className={`text-xs font-bold uppercase tracking-wide ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                Cổng kết nối ({proto.ports.length})
              </h4>
            </div>
            {proto.ports.length === 0 ? (
              <p className="text-xs text-slate-400 italic">Linh kiện này không có cổng dây (không cần đấu nối).</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {proto.ports.map(port => {
                  const { style, desc } = describePort(port);
                  return (
                    <div
                      key={port.id}
                      className={`flex items-start gap-2.5 p-2.5 rounded-xl border ${isDarkMode ? 'bg-[#131929] border-white/5' : 'bg-slate-50 border-slate-200/70'}`}
                    >
                      <span className={`shrink-0 px-2 py-1 text-[10px] font-mono font-bold rounded-lg border ${isDarkMode ? style.dark : style.light}`}>
                        {port.name || port.id}
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className={`text-[10px] font-semibold ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>{style.label}</span>
                          {port.pin != null && (
                            <span className={`px-1.5 py-0.5 text-[9px] font-mono rounded ${isDarkMode ? 'bg-white/10 text-gray-300' : 'bg-slate-200 text-slate-600'}`}>
                              GPIO{port.pin}
                            </span>
                          )}
                          <span className={`px-1.5 py-0.5 text-[9px] rounded ${isDarkMode ? 'bg-white/5 text-gray-500' : 'bg-slate-100 text-slate-400'}`}>
                            {port.side === 'left' ? '← trái' : 'phải →'}
                          </span>
                        </div>
                        <p className={`text-[11px] leading-snug mt-0.5 ${isDarkMode ? 'text-gray-400' : 'text-slate-500'}`}>{desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Bai mau su dung */}
          <div>
            <div className="flex items-center gap-2 mb-2.5">
              <BookOpen className={`w-4 h-4 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`} />
              <h4 className={`text-xs font-bold uppercase tracking-wide ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                Bài mẫu có dùng linh kiện này {usedInLessons.length > 0 && `(${usedInLessons.length})`}
              </h4>
            </div>
            {usedInLessons.length === 0 ? (
              <div className={`p-3 rounded-xl text-xs italic border ${isDarkMode ? 'bg-[#131929] border-white/5 text-gray-500' : 'bg-slate-50 border-slate-200/70 text-slate-500'}`}>
                Chưa có bài mẫu N1-N5/B1-B6 nào dùng linh kiện này — bạn vẫn có thể tự thêm vào bài thực hành của mình ở tab "Thực hành trên mạch".
              </div>
            ) : (
              <div className="flex flex-col gap-1.5">
                {usedInLessons.map(l => (
                  <button
                    key={l.id}
                    type="button"
                    onClick={() => onJumpToLesson?.(l.id)}
                    className={`group flex items-center justify-between gap-2 px-3.5 py-2.5 rounded-xl border text-left transition-all ${
                      isDarkMode
                        ? 'bg-[#131929] border-white/5 hover:border-emerald-500/60 hover:bg-emerald-500/5'
                        : 'bg-slate-50 border-slate-200/70 hover:border-emerald-400 hover:bg-emerald-50'
                    }`}
                  >
                    <span className={`text-xs font-semibold ${isDarkMode ? 'text-gray-200' : 'text-slate-700'}`}>{l.name}</span>
                    <ArrowRight className={`w-3.5 h-3.5 shrink-0 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`} />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className={`shrink-0 flex items-center justify-between px-6 py-3 border-t text-[11px] ${isDarkMode ? 'border-white/5 bg-[#131929] text-gray-500' : 'border-slate-200 bg-slate-50 text-slate-400'}`}>
          <span className="flex items-center gap-1.5">
            <Zap className="w-3 h-3" /> ID nội bộ: <span className="font-mono">{typeKey}</span>
          </span>
          <span>Bấm ra ngoài hoặc nhấn Esc để đóng</span>
        </div>
      </div>
    </div>
  );
}
