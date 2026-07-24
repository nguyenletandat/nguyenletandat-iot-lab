import React, { useState, useEffect } from 'react';
import { UserCheck, ShieldCheck, User, IdCard, GraduationCap, AlertCircle } from 'lucide-react';
import { useUIStore } from '../stores/uiStore';

/**
 * Student Identification Modal (Anti-Plagiarism & Verification)
 */
export default function StudentModal({ isOpen, onClose, onSave }) {
  const ui = useUIStore();
  const [name, setName] = useState('');
  const [studentId, setStudentId] = useState('');
  const [className, setClassName] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      setName(ui.studentInfo.name || '');
      setStudentId(ui.studentInfo.studentId || '');
      setClassName(ui.studentInfo.className || '');
      setError('');
    }
  }, [isOpen, ui.studentInfo]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Vui lòng nhập Họ và tên sinh viên.');
      return;
    }
    if (!studentId.trim()) {
      setError('Vui lòng nhập Mã số sinh viên (MSSV).');
      return;
    }

    onSave({
      name: name.trim(),
      studentId: studentId.trim(),
      className: className.trim(),
      startTime: ui.studentInfo.startTime || new Date().toLocaleString('vi-VN')
    });
    onClose();
  };

  return (
    <div className="fixed inset-[#00000080] z-50 flex items-center justify-center p-4 backdrop-blur-md animate-fadeIn">
      <div className={`w-full max-w-md border rounded-3xl p-6 shadow-2xl transition-all ${
        ui.isDarkMode ? 'bg-[#0F1423] border-white/10 text-white' : 'bg-white border-slate-200 text-slate-900'
      }`}>

        {/* Modal Header */}
        <div className="flex items-center gap-3 pb-4 mb-4 border-b border-slate-100 dark:border-white/10">
          <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-bold tracking-tight">Khai Báo Thông Tin Sinh Viên</h3>
            <p className="text-xs text-slate-500 dark:text-gray-400 mt-0.5">Xác thực quyền sở hữu & bài làm cá nhân</p>
          </div>
        </div>

        {/* Anti-Plagiarism Alert */}
        <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/50 mb-5 text-emerald-800 dark:text-emerald-300 text-xs leading-relaxed">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          <div>
            <strong>Bản quyền bài thực hành:</strong> Thông tin Sinh viên & MSSV sẽ được gắn chìm cố định ở góc trên bên phải sơ đồ và tự động đóng dấu vào mã nguồn <code className="font-mono bg-emerald-200/50 dark:bg-emerald-900/50 px-1 rounded text-[11px]">.ino</code> để chống sao chép bài.
          </div>
        </div>

        {error && (
          <div className="flex items-center gap-2 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800/50 text-rose-600 dark:text-rose-400 text-xs mb-4">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold mb-1.5 text-slate-700 dark:text-gray-300">
              Họ và tên Sinh viên <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <User className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              <input
                type="text"
                placeholder="Ví dụ: Nguyễn Văn A"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`w-full pl-9 pr-4 py-2.5 text-xs rounded-xl border outline-none transition-all ${
                  ui.isDarkMode ? 'bg-[#182035] border-white/10 text-white focus:border-emerald-500' : 'bg-slate-50 border-slate-200 focus:border-emerald-600'
                }`}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold mb-1.5 text-slate-700 dark:text-gray-300">
              Mã số sinh viên (MSSV) <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <IdCard className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              <input
                type="text"
                placeholder="Ví dụ: 21001234"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                className={`w-full pl-9 pr-4 py-2.5 text-xs rounded-xl border outline-none font-mono tracking-wider transition-all ${
                  ui.isDarkMode ? 'bg-[#182035] border-white/10 text-white focus:border-emerald-500' : 'bg-slate-50 border-slate-200 focus:border-emerald-600'
                }`}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold mb-1.5 text-slate-700 dark:text-gray-300">
              Lớp / Khóa học
            </label>
            <input
              type="text"
              placeholder="Ví dụ: 21DTH01 (Không bắt buộc)"
              value={className}
              onChange={(e) => setClassName(e.target.value)}
              className={`w-full px-4 py-2.5 text-xs rounded-xl border outline-none transition-all ${
                ui.isDarkMode ? 'bg-[#182035] border-white/10 text-white focus:border-emerald-500' : 'bg-slate-50 border-slate-200 focus:border-emerald-600'
              }`}
            />
          </div>

          <div className="pt-2 flex items-center justify-end gap-2">
            {ui.studentInfo.studentId && (
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/20 transition-all"
              >
                Hủy
              </button>
            )}
            <button
              type="submit"
              className="flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl shadow-lg hover:shadow-emerald-600/25 transition-all"
            >
              <UserCheck className="w-4 h-4" /> Xác nhận & Bắt đầu làm bài
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
