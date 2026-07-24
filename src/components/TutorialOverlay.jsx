import React from 'react';
import { X, ChevronRight, ChevronLeft, Sparkles, MousePointer, Cable, Play, Save, Keyboard } from 'lucide-react';

const TUTORIAL_STEPS = [
  {
    title: '🎉 Chào mừng đến Nguyen Le Tan Dat - IOT Lab!',
    desc: 'Đây là công cụ thiết kế mạch điện tử và lập trình Arduino/ESP32 trực tuyến. Hãy cùng khám phá các tính năng chính.',
    icon: Sparkles,
    color: 'emerald',
  },
  {
    title: '🔲 Thêm linh kiện',
    desc: 'Click vào bất kỳ linh kiện nào ở thanh bên trái để thêm vào canvas. Bạn cũng có thể mở "Hardware Catalog" đầy đủ để xem tất cả 40+ thiết bị.',
    icon: MousePointer,
    color: 'blue',
  },
  {
    title: '🔗 Nối dây (Wiring)',
    desc: 'Click vào chân của linh kiện thứ nhất, rồi click chân linh kiện thứ hai để tạo dây nối. Dây sẽ tự động tạo đường vuông góc gọn gàng.',
    icon: Cable,
    color: 'amber',
  },
  {
    title: '💻 Viết code Arduino',
    desc: 'Editor bên phải hỗ trợ syntax highlighting C++, autocomplete các hàm Arduino (pinMode, digitalWrite...) và hiển thị line numbers.',
    icon: Keyboard,
    color: 'indigo',
  },
  {
    title: '▶️ Chạy mô phỏng',
    desc: 'Nhấn "Chạy mô phỏng" để thực thi code. Điều chỉnh slider cảm biến trên canvas để thay đổi giá trị đầu vào realtime. Kết quả Serial.println hiển thị ở Serial Monitor.',
    icon: Play,
    color: 'rose',
  },
  {
    title: '💾 Lưu & Xuất Project',
    desc: 'Sử dụng Ctrl+S để lưu nhanh. Mở Project Manager để xuất file JSON chia sẻ hoặc tải .ino nạp vào board thật. Ctrl+Z/Y để Undo/Redo.',
    icon: Save,
    color: 'violet',
  },
];

const colorMap = {
  emerald: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', text: 'text-emerald-600', btn: 'bg-emerald-600 hover:bg-emerald-500' },
  blue: { bg: 'bg-blue-500/10', border: 'border-blue-500/30', text: 'text-blue-600', btn: 'bg-blue-600 hover:bg-blue-500' },
  amber: { bg: 'bg-amber-500/10', border: 'border-amber-500/30', text: 'text-amber-600', btn: 'bg-amber-600 hover:bg-amber-500' },
  indigo: { bg: 'bg-indigo-500/10', border: 'border-indigo-500/30', text: 'text-indigo-600', btn: 'bg-indigo-600 hover:bg-indigo-500' },
  rose: { bg: 'bg-rose-500/10', border: 'border-rose-500/30', text: 'text-rose-600', btn: 'bg-rose-600 hover:bg-rose-500' },
  violet: { bg: 'bg-violet-500/10', border: 'border-violet-500/30', text: 'text-violet-600', btn: 'bg-violet-600 hover:bg-violet-500' },
};

export default function TutorialOverlay({ isOpen, step, onClose, onNext, onPrev }) {
  if (!isOpen) return null;

  const current = TUTORIAL_STEPS[step] || TUTORIAL_STEPS[0];
  const colors = colorMap[current.color];
  const isLast = step >= TUTORIAL_STEPS.length - 1;
  const isFirst = step === 0;
  const Icon = current.icon;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
      <div className={`relative w-full max-w-md bg-white dark:bg-[#0F1423] rounded-2xl shadow-2xl border ${colors.border} overflow-hidden`}>
        
        {/* Progress bar */}
        <div className="h-1.5 bg-slate-100 dark:bg-[#1A2235]">
          <div
            className={`h-full ${colors.btn} transition-all duration-500 rounded-r-full`}
            style={{ width: `${((step + 1) / TUTORIAL_STEPS.length) * 100}%` }}
          />
        </div>

        {/* Content */}
        <div className="p-8 text-center">
          <div className={`inline-flex p-4 rounded-2xl ${colors.bg} ${colors.text} mb-5`}>
            <Icon className="w-8 h-8" />
          </div>

          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">{current.title}</h3>
          <p className="text-sm text-slate-500 dark:text-gray-400 leading-relaxed">{current.desc}</p>

          <div className="flex items-center justify-center gap-2 mt-5">
            {TUTORIAL_STEPS.map((_, i) => (
              <div
                key={i}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  i === step ? `${colors.btn} scale-125 text-white` : 'bg-slate-200 dark:bg-white/10'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-50 dark:bg-[#0D121F] border-t border-slate-200 dark:border-white/5">
          <button
            onClick={onClose}
            className="text-xs font-medium text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors"
          >
            Bỏ qua tutorial
          </button>

          <div className="flex items-center gap-2">
            {!isFirst && (
              <button
                onClick={onPrev}
                className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-slate-600 dark:text-gray-300 bg-slate-200 dark:bg-white/10 hover:bg-slate-300 dark:hover:bg-white/15 rounded-lg transition-all"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                Trước
              </button>
            )}
            <button
              onClick={isLast ? onClose : onNext}
              className={`flex items-center gap-1 px-4 py-1.5 text-xs font-bold text-white ${colors.btn} rounded-lg shadow-md transition-all`}
            >
              {isLast ? 'Bắt đầu!' : 'Tiếp theo'}
              {!isLast && <ChevronRight className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
