import React from 'react';
import { Cpu, Plus, Trash2, ChevronLeft, ExternalLink, BookOpen } from 'lucide-react';
import { useUIStore } from '../stores/uiStore';

export default function MyLibrarySidebar({
  onAddComponent,
  onCreateNewModule,
  isSimulating,
  isCollapsed,
  onToggleCollapse
}) {
  const ui = useUIStore();
  const myModules = ui.myModules || [];

  if (isCollapsed) {
    return (
      <aside className="w-14 border-r flex flex-col items-center py-3 bg-white dark:bg-[#0C101D] border-slate-200 dark:border-white/5 transition-all relative z-20 select-none">
        <button
          onClick={onToggleCollapse}
          title="Mở rộng Thanh Thư viện Linh kiện (2 chiều)"
          className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600 hover:bg-emerald-600 hover:text-white transition-all shadow-md mb-4"
        >
          <Cpu className="w-5 h-5" />
        </button>

        <div className="flex-1 flex flex-col items-center gap-3 overflow-y-auto w-full px-1">
          {myModules.map(mod => (
            <button
              key={mod.id}
              onClick={() => !isSimulating && onAddComponent(mod.id)}
              disabled={isSimulating}
              title={mod.name}
              className="w-10 h-10 rounded-xl bg-violet-500/10 dark:bg-[#151D2F] p-1 border border-violet-500/20 hover:border-emerald-500 flex items-center justify-center transition-transform hover:scale-110 disabled:opacity-40 text-violet-600 font-bold text-xs"
            >
              {mod.name.slice(0, 2).toUpperCase()}
            </button>
          ))}
        </div>
      </aside>
    );
  }

  return (
    <aside className="w-80 border-r flex flex-col overflow-hidden bg-white dark:bg-[#0C101D] border-slate-200 dark:border-white/5 transition-all relative z-20">
      
      {/* Title Header */}
      <div className="p-4 border-b border-slate-200 dark:border-white/5">
        <div className="flex items-center justify-between mb-1">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-gray-300 flex items-center gap-1.5">
            <BookOpen className="w-4 h-4 text-emerald-600" />
            Module của tôi
          </h2>
          <button
            onClick={onToggleCollapse}
            title="Thu hẹp Thanh Thư viện Linh kiện"
            className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-white/10 text-slate-500 transition-all"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        </div>
        <p className="text-[10px] text-slate-400 dark:text-gray-400">
          Các linh kiện tự tạo của sinh viên để kết nối trên sơ đồ mạch.
        </p>
        
        {/* Create Button */}
        <button
          onClick={onCreateNewModule}
          className="w-full mt-3 flex items-center justify-center gap-2 py-2 px-3 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl shadow-md transition-all"
        >
          <Plus className="w-4 h-4" />
          Tạo module mới
        </button>
      </div>

      {/* Custom Module List */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2.5">
        {myModules.length === 0 ? (
          <div className="text-center py-12 text-xs text-slate-400 space-y-2">
            <div>Chưa có linh kiện tự thiết kế.</div>
            <div className="text-[10px] opacity-75">Bấm "Tạo module mới" để bắt đầu xây dựng mạch tùy chọn của bạn!</div>
          </div>
        ) : (
          myModules.map(mod => (
            <div
              key={mod.id}
              onClick={() => !isSimulating && onAddComponent(mod.id)}
              className={`group flex items-center justify-between p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                isSimulating
                  ? 'opacity-50 cursor-not-allowed border-slate-200 dark:border-white/5'
                  : 'bg-slate-50/80 dark:bg-[#121826] border-slate-200/80 dark:border-white/5 hover:border-emerald-500 dark:hover:border-emerald-500 hover:shadow-md'
              }`}
            >
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="w-12 h-12 rounded-lg bg-emerald-500/10 dark:bg-[#090C15] p-1 border border-emerald-500/20 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform text-emerald-600 font-extrabold text-[13px] tracking-wide">
                  {mod.name.slice(0, 2).toUpperCase()}
                </div>

                <div className="overflow-hidden">
                  <div className="text-xs font-bold text-slate-800 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors truncate">
                    {mod.name}
                  </div>
                  <div className="text-[10px] text-slate-400 dark:text-gray-400 truncate mt-0.5 flex items-center gap-1.5">
                    <span>{mod.ports.length} chân</span>
                    <span>•</span>
                    <span>{mod.category}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1.5 flex-shrink-0">
                {mod.datasheet && (
                  <a
                    href={mod.datasheet}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    title="Mở Datasheet tài liệu tra cứu"
                    className="p-1.5 rounded-lg text-slate-400 hover:text-blue-500 hover:bg-blue-500/10 transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
                
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (confirm(`Bạn có chắc muốn xóa module "${mod.name}" không?`)) {
                      ui.deleteMyModule(mod.id);
                    }
                  }}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 transition-colors opacity-0 group-hover:opacity-100"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>

                <div className="p-1.5 rounded-lg text-slate-400 group-hover:text-emerald-600 group-hover:bg-emerald-50 dark:group-hover:bg-emerald-950/50 transition-colors">
                  <Plus className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))
        )}
      </div>

    </aside>
  );
}
