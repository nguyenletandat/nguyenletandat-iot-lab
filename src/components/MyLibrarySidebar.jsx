import React from 'react';
import { Save, Trash2, ChevronLeft, Clock, FolderGit2 } from 'lucide-react';

/**
 * Thư viện của tôi — danh sách các bài thực hành (sơ đồ + code) mà sinh viên
 * tự xây dựng và lưu lại, mô phỏng theo cấu trúc các bài mẫu của giảng viên.
 * Dùng chung dữ liệu/luồng lưu-tải với Quản lý Project (đã kiểm thử kỹ).
 */
export default function MyLibrarySidebar({
  savedProjects,
  onLoadProject,
  onDeleteProject,
  onOpenSaveDialog,
  isSimulating,
  isCollapsed,
  onToggleCollapse,
}) {
  const projects = savedProjects || [];

  if (isCollapsed) {
    return (
      <aside className="w-14 border-r flex flex-col items-center py-3 bg-white dark:bg-[#0C101D] border-slate-200 dark:border-white/5 transition-all relative z-20 select-none">
        <button
          onClick={onToggleCollapse}
          title="Mở rộng Thư viện bài thực hành (2 chiều)"
          className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600 hover:bg-emerald-600 hover:text-white transition-all shadow-md mb-4"
        >
          <FolderGit2 className="w-5 h-5" />
        </button>

        <div className="flex-1 flex flex-col items-center gap-3 overflow-y-auto w-full px-1">
          {projects.map(proj => (
            <button
              key={proj.name}
              onClick={() => !isSimulating && onLoadProject(proj)}
              disabled={isSimulating}
              title={proj.name}
              className="w-10 h-10 rounded-xl bg-violet-500/10 dark:bg-[#151D2F] p-1 border border-violet-500/20 hover:border-emerald-500 flex items-center justify-center transition-transform hover:scale-110 disabled:opacity-40 text-violet-600 font-bold text-xs"
            >
              {proj.name.slice(0, 2).toUpperCase()}
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
            <FolderGit2 className="w-4 h-4 text-emerald-600" />
            Thư viện của tôi
          </h2>
          <button
            onClick={onToggleCollapse}
            title="Thu hẹp Thư viện bài thực hành"
            className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-white/10 text-slate-500 transition-all"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        </div>
        <p className="text-[10px] text-slate-400 dark:text-gray-400">
          Các bài thực hành do bạn tự xây dựng, mô phỏng theo cấu trúc bài mẫu của giảng viên.
        </p>

        {/* Save current circuit as a new library entry */}
        <button
          onClick={onOpenSaveDialog}
          disabled={isSimulating}
          className="w-full mt-3 flex items-center justify-center gap-2 py-2 px-3 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl shadow-md transition-all disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          Lưu bài thực hành hiện tại
        </button>
      </div>

      {/* Saved Projects List */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2.5">
        {projects.length === 0 ? (
          <div className="text-center py-12 text-xs text-slate-400 space-y-2">
            <div>Chưa có bài thực hành nào được lưu.</div>
            <div className="text-[10px] opacity-75">Xây dựng mạch của riêng bạn rồi bấm "Lưu bài thực hành hiện tại"!</div>
          </div>
        ) : (
          projects.map(proj => (
            <div
              key={proj.name}
              onClick={() => !isSimulating && onLoadProject(proj)}
              className={`group flex items-center justify-between p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                isSimulating
                  ? 'opacity-50 cursor-not-allowed border-slate-200 dark:border-white/5'
                  : 'bg-slate-50/80 dark:bg-[#121826] border-slate-200/80 dark:border-white/5 hover:border-emerald-500 dark:hover:border-emerald-500 hover:shadow-md'
              }`}
            >
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="w-12 h-12 rounded-lg bg-emerald-500/10 dark:bg-[#090C15] p-1 border border-emerald-500/20 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform text-emerald-600 font-extrabold text-[13px] tracking-wide">
                  {proj.name.slice(0, 2).toUpperCase()}
                </div>

                <div className="overflow-hidden">
                  <div className="text-xs font-bold text-slate-800 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors truncate">
                    {proj.name}
                  </div>
                  <div className="text-[10px] text-slate-400 dark:text-gray-400 truncate mt-0.5 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {new Date(proj.updatedAt).toLocaleString('vi-VN')}
                  </div>
                </div>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (confirm(`Xóa bài thực hành "${proj.name}"?`)) {
                    onDeleteProject(proj.name);
                  }
                }}
                className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 transition-colors opacity-0 group-hover:opacity-100 flex-shrink-0"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))
        )}
      </div>

    </aside>
  );
}
