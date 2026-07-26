import React from 'react';
import {
  Play, Square, Trash2, StickyNote, Eye, EyeOff, Volume2, VolumeX,
  Moon, Sun, Cpu, Save, Package, Download, HelpCircle, Undo2, Redo2, Clock, GraduationCap, Lock, Zap,
} from 'lucide-react';
import { COMPONENT_TYPES } from '../data/componentTypes';
import { PROJECT_PRESETS } from '../data/projectPresets';
import WireStyleSelector from './WireStyleSelector';

/**
 * Header 2 hàng:
 *  - Hàng 1: thương hiệu, tab project, thông tin sinh viên, các nút hành động chính (lưu/xuất/giao diện) và Chạy/Dừng
 *  - Hàng 2: thanh công cụ chỉnh sửa mạch (Undo/Redo, Ghi chú, Kiểu dây, Xoá, Auto Line, Auto I2C) — tách riêng khỏi
 *    hàng 1 để icon không bị chèn lẫn lộn với tiêu đề/tab, và mỗi nút đều có nhãn chữ đi kèm icon cho rõ nghĩa.
 */
export default function AppHeader({
  ui, sim, canvas, selectedProjectId, currentTime, studentHeaderRef,
  onLoadProject, onQuickSave, onExportPNG, onStartSimulation, onStopSimulation,
  onDeleteSelected, onAutoLine, onAutoConnectI2C,
}) {
  const darkBtn = ui.isDarkMode
    ? 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'
    : 'bg-slate-100 border-slate-200 text-slate-600 hover:bg-slate-200';

  return (
    <header className="z-10 shadow-sm">
      {/* ═══ HÀNG 1: Thương hiệu, Project, Sinh viên, Hành động chính ═══ */}
      <div className={`flex items-center justify-between px-4 py-2 border-b ${ui.isDarkMode ? 'bg-[#0C101D] border-white/5' : 'bg-white border-slate-200'} backdrop-blur-md overflow-x-auto`}>
        <div className="flex items-center gap-3 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="flex items-center justify-center p-2 rounded-xl bg-emerald-600/10 border border-emerald-500/20 text-emerald-600">
              <Cpu className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h1 className={`text-base font-bold tracking-tight m-0 leading-none ${ui.isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                Nguyen Le Tan Dat - IOT Lab
              </h1>
              <p className={`text-[9px] mt-0.5 ${ui.isDarkMode ? 'text-gray-400' : 'text-slate-500'}`}>
                Virtual Simulator — <span className="text-emerald-600 font-semibold">{Object.keys(COMPONENT_TYPES).length} linh kiện</span>
              </p>
            </div>
          </div>

          {/* Project Tabs */}
          <div className={`flex items-center gap-1 p-1 rounded-xl border overflow-x-auto max-w-xl ${ui.isDarkMode ? 'bg-[#131929] border-white/5' : 'bg-slate-100 border-slate-200'}`}>
            {Object.keys(PROJECT_PRESETS).map(id => (
              <button key={id} onClick={() => onLoadProject(id)}
                className={`px-2 py-0.5 text-[10px] font-semibold rounded-lg transition-all whitespace-nowrap ${
                  selectedProjectId === id ? 'bg-emerald-600 text-white shadow-sm' : ui.isDarkMode ? 'text-gray-400 hover:text-white hover:bg-white/5' : 'text-slate-600 hover:text-slate-900 hover:bg-white'
                }`}
              >{PROJECT_PRESETS[id].name.split('.')[1] || PROJECT_PRESETS[id].name}</button>
            ))}
          </div>
        </div>

        {/* Right Section: Student Info & Action Buttons */}
        <div className="flex items-center gap-2 shrink-0 ml-4">
          <div className="flex items-center gap-2 px-2.5 py-1 rounded-xl bg-emerald-500/10 dark:bg-emerald-950/50 border border-emerald-500/30 shadow-sm text-left select-none">
            {/* Chỉ phần thông tin tĩnh (tên/MSSV/hash) nằm trong vùng chống chỉnh sửa DOM —
                đồng hồ chạy mỗi giây được đặt NGOÀI vùng này để tránh tự báo động nhầm mỗi giây */}
            <div ref={studentHeaderRef} className="flex items-center gap-2">
              <div className="p-1 rounded-lg bg-emerald-600 text-white shrink-0 shadow-sm">
                <GraduationCap className="w-3.5 h-3.5" />
              </div>
              <div className="flex flex-col justify-center">
                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-800 dark:text-gray-100">
                    {ui.studentInfo.name ? ui.studentInfo.name : <span className="text-rose-500 font-semibold">Chưa khai báo</span>}
                  </span>
                  <span className="text-[10px] font-mono font-extrabold bg-emerald-600 text-white px-1.5 py-0.5 rounded shadow-md tracking-wider flex items-center gap-1">
                    <Lock className="w-2.5 h-2.5 text-emerald-200" />
                    {ui.studentInfo.authHash || 'IOT-VALIDATED'}
                  </span>
                </div>
                <div className="text-[10px] font-mono font-bold text-slate-600 dark:text-gray-300 mt-0.5">
                  MSSV: <strong className="text-emerald-600 dark:text-emerald-400">{ui.studentInfo.studentId || 'N/A'}</strong>
                </div>
              </div>
            </div>
            <span className="flex items-center gap-1 text-[10px] font-mono font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-500/15 dark:bg-emerald-500/20 px-1 py-0.5 rounded border border-emerald-500/20">
              <Clock className="w-2.5 h-2.5 text-emerald-600 animate-spin" style={{ animationDuration: '4s' }} />
              {currentTime}
            </span>
            <button onClick={() => ui.setStudentModalOpen(true)} title="Thay đổi thông tin Sinh viên"
              className="ml-1 text-[9px] px-1.5 py-0.5 rounded bg-white dark:bg-white/10 hover:bg-emerald-600 hover:text-white border border-emerald-500/20 transition-all font-bold shrink-0">
              Sửa
            </button>
          </div>

          <div className={`w-px h-5 mx-0.5 ${ui.isDarkMode ? 'bg-white/10' : 'bg-slate-200'}`} />

          <button onClick={onQuickSave} title="Lưu nhanh (Ctrl+S)" className={`p-1.5 rounded-lg border transition-all ${darkBtn}`}>
            <Save className="w-3.5 h-3.5" />
          </button>
          <button onClick={() => ui.setProjectManagerOpen(true)} title="Quản lý Project" className={`p-1.5 rounded-lg border transition-all ${darkBtn}`}>
            <Package className="w-3.5 h-3.5" />
          </button>
          <button onClick={onExportPNG} title="Export PNG sơ đồ mạch có MSSV Nổi bật" className={`p-1.5 rounded-lg border transition-all ${darkBtn}`}>
            <Download className="w-3.5 h-3.5" />
          </button>

          <div className={`w-px h-5 mx-0.5 ${ui.isDarkMode ? 'bg-white/10' : 'bg-slate-200'}`} />

          <button onClick={() => ui.toggleDarkMode()} title="Chuyển đổi giao diện"
            className={`p-1.5 rounded-lg border transition-all ${ui.isDarkMode ? 'bg-white/5 border-white/10 text-amber-400 hover:bg-white/10' : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'}`}>
            {ui.isDarkMode ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
          </button>
          <button onClick={() => sim.setAudioEnabled(!sim.audioEnabled)} title="Âm thanh"
            className={`p-1.5 rounded-lg border transition-all ${sim.audioEnabled ? 'bg-amber-500/10 border-amber-500/20 text-amber-600' : ui.isDarkMode ? 'bg-white/5 border-white/5 text-gray-400' : 'bg-slate-100 border-slate-200 text-slate-400'}`}>
            {sim.audioEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
          </button>
          <button onClick={() => ui.setTutorialOpen(true)} title="Hướng dẫn" className={`p-1.5 rounded-lg border transition-all ${darkBtn}`}>
            <HelpCircle className="w-3.5 h-3.5" />
          </button>

          <div className={`w-px h-5 mx-0.5 ${ui.isDarkMode ? 'bg-white/10' : 'bg-slate-200'}`} />

          {!sim.isSimulating ? (
            <button onClick={onStartSimulation} className="flex items-center gap-1.5 px-3.5 py-1.5 text-[11px] font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl shadow-lg hover:shadow-emerald-600/25 transition-all">
              <Play className="w-3.5 h-3.5 fill-current" /> Chạy
            </button>
          ) : (
            <button onClick={onStopSimulation} className="flex items-center gap-1.5 px-3.5 py-1.5 text-[11px] font-bold text-white bg-rose-600 hover:bg-rose-500 rounded-xl shadow-lg transition-all">
              <Square className="w-3.5 h-3.5 fill-current" /> Dừng
            </button>
          )}
        </div>
      </div>

      {/* ═══ HÀNG 2: Thanh công cụ chỉnh sửa mạch (tách riêng, mỗi nút có nhãn chữ) ═══ */}
      {/* Không dùng overflow-x-auto ở đây: nó buộc overflow-y cũng thành "auto" theo spec CSS,
          làm dropdown (Wire Color/Wire Type) bị cắt mất vì nó xổ xuống dưới bằng position:absolute.
          Dùng flex-wrap để hàng công cụ tự xuống dòng trên màn hình hẹp thay vì cắt nội dung. */}
      <div className={`flex items-center flex-wrap gap-1.5 px-4 py-1.5 border-b no-export ${ui.isDarkMode ? 'bg-[#0A0D18] border-white/5' : 'bg-slate-50 border-slate-200'}`}>
        <span className={`text-[9px] font-extrabold uppercase tracking-wider mr-1 shrink-0 ${ui.isDarkMode ? 'text-gray-500' : 'text-slate-400'}`}>
          Công cụ mạch:
        </span>

        <button onClick={() => canvas.undo()} disabled={!canvas.canUndo()} title="Undo (Ctrl+Z)"
          className={`flex items-center gap-1 px-2 py-1 text-[10px] font-semibold rounded-lg border transition-all disabled:opacity-30 ${darkBtn}`}>
          <Undo2 className="w-3.5 h-3.5" /> Hoàn tác
        </button>
        <button onClick={() => canvas.redo()} disabled={!canvas.canRedo()} title="Redo (Ctrl+Y)"
          className={`flex items-center gap-1 px-2 py-1 text-[10px] font-semibold rounded-lg border transition-all disabled:opacity-30 ${darkBtn}`}>
          <Redo2 className="w-3.5 h-3.5" /> Làm lại
        </button>

        <div className={`w-px h-4 mx-1 shrink-0 ${ui.isDarkMode ? 'bg-white/10' : 'bg-slate-200'}`} />

        <button
          onClick={() => canvas.togglePlacingNote()}
          title="Notes tool — Nhấp vào canvas để tạo Ghi chú"
          className={`flex items-center gap-1 px-2 py-1 text-[10px] font-semibold rounded-lg border transition-all ${
            canvas.isPlacingNote
              ? 'bg-amber-500 text-white border-amber-400 shadow-md ring-2 ring-amber-300'
              : ui.isDarkMode ? 'bg-white/5 border-white/10 text-amber-400 hover:bg-white/10' : 'bg-slate-100 border-slate-200 text-amber-600 hover:bg-slate-200'
          }`}
        >
          <StickyNote className="w-3.5 h-3.5" /> Ghi chú
        </button>
        <button
          onClick={() => canvas.toggleNotesVisibility()}
          title={canvas.notesVisible ? 'Ẩn tất cả ghi chú' : 'Hiện tất cả ghi chú'}
          className={`flex items-center gap-1 px-2 py-1 text-[10px] font-semibold rounded-lg border transition-all ${
            !canvas.notesVisible
              ? 'bg-rose-500/10 text-rose-500 border-rose-500/30'
              : darkBtn
          }`}
        >
          {canvas.notesVisible ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
          {canvas.notesVisible ? 'Ẩn ghi chú' : 'Hiện ghi chú'}
        </button>

        <div className={`w-px h-4 mx-1 shrink-0 ${ui.isDarkMode ? 'bg-white/10' : 'bg-slate-200'}`} />

        <WireStyleSelector />

        <div className={`w-px h-4 mx-1 shrink-0 ${ui.isDarkMode ? 'bg-white/10' : 'bg-slate-200'}`} />

        <button onClick={onDeleteSelected} title="Xóa linh kiện / dây đang chọn (Delete)"
          className={`flex items-center gap-1 px-2 py-1 text-[10px] font-semibold rounded-lg border transition-all ${ui.isDarkMode ? 'bg-white/5 border-white/10 text-rose-400 hover:bg-white/10' : 'bg-slate-100 border-slate-200 text-rose-600 hover:bg-slate-200'}`}>
          <Trash2 className="w-3.5 h-3.5" /> Xóa
        </button>
        <button onClick={onAutoLine} title="Auto Line — Căn thẳng & bẻ góc 90°"
          className={`flex items-center gap-1 px-2 py-1 text-[10px] font-semibold rounded-lg border transition-all ${ui.isDarkMode ? 'bg-white/5 border-white/10 text-amber-400 hover:bg-white/10' : 'bg-slate-100 border-slate-200 text-amber-600 hover:bg-slate-200'}`}>
          <Zap className="w-3.5 h-3.5" /> Auto Line
        </button>
        <button onClick={onAutoConnectI2C} title="Tự động kết nối Màn hình LCD / Module I2C"
          className={`flex items-center gap-1 px-2 py-1 text-[10px] font-semibold rounded-lg border transition-all ${ui.isDarkMode ? 'bg-white/5 border-white/10 text-emerald-400 hover:bg-white/10' : 'bg-slate-100 border-slate-200 text-emerald-600 hover:bg-slate-200'}`}>
          <Cpu className="w-3.5 h-3.5" /> Auto I2C
        </button>
      </div>
    </header>
  );
}
