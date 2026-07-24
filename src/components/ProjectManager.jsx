import React, { useState, useRef } from 'react';
import { X, Save, FolderOpen, Trash2, Download, Upload, FileCode, Clock, Package } from 'lucide-react';

/**
 * Project Manager Modal — Save, Load, Export, Import IoT Projects
 */
export default function ProjectManager({ isOpen, onClose, onSave, onLoad, onExportJSON, onImportJSON, onExportIno, savedProjects, currentProjectName }) {
  const [newName, setNewName] = useState(currentProjectName);
  const [activeTab, setActiveTab] = useState('save');
  const fileInputRef = useRef(null);

  if (!isOpen) return null;

  const handleImport = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const data = JSON.parse(ev.target.result);
        onImportJSON(data);
        onClose();
      } catch (err) {
        alert('File JSON không hợp lệ!');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="flex flex-col w-full max-w-2xl bg-white dark:bg-[#0F1423] rounded-2xl shadow-2xl border border-slate-200 dark:border-white/10 overflow-hidden max-h-[80vh]">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#131929]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-indigo-600/10 text-indigo-600 border border-indigo-500/20">
              <Package className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">Quản lý Project</h2>
              <p className="text-[11px] text-slate-500">Lưu, tải, xuất & nhập dự án IoT</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-white/10">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 p-2 mx-4 mt-3 bg-slate-100 dark:bg-[#0D121F] rounded-xl">
          {[
            { id: 'save', label: 'Lưu', icon: Save },
            { id: 'load', label: 'Tải Project', icon: FolderOpen },
            { id: 'export', label: 'Xuất / Nhập', icon: Download },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-semibold rounded-lg transition-all ${
                activeTab === tab.id
                  ? 'bg-white dark:bg-[#1A2235] text-indigo-600 shadow-sm'
                  : 'text-slate-500 hover:text-slate-700 dark:text-gray-400'
              }`}
            >
              <tab.icon className="w-3.5 h-3.5" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'save' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-gray-300 mb-1.5">Tên Project</label>
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="Nhập tên project..."
                  className="w-full px-4 py-2.5 text-sm rounded-xl bg-slate-50 dark:bg-[#0D121F] border border-slate-200 dark:border-white/10 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <button
                onClick={() => { onSave(newName); onClose(); }}
                disabled={!newName.trim()}
                className="w-full flex items-center justify-center gap-2 py-3 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl shadow-lg shadow-indigo-600/20 transition-all disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                Lưu Project vào trình duyệt
              </button>
              <p className="text-[11px] text-slate-400 text-center">
                💡 Dữ liệu được lưu trong localStorage. Xóa dữ liệu trình duyệt sẽ mất project.
              </p>
            </div>
          )}

          {activeTab === 'load' && (
            <div className="space-y-3">
              {savedProjects.length === 0 ? (
                <div className="text-center py-12 text-slate-400">
                  <FolderOpen className="w-10 h-10 mx-auto mb-2 opacity-50" />
                  <p className="text-sm font-medium">Chưa có project nào được lưu</p>
                  <p className="text-xs mt-1">Hãy lưu project đầu tiên tại tab "Lưu"</p>
                </div>
              ) : (
                savedProjects.map(proj => (
                  <div
                    key={proj.name}
                    className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 dark:bg-[#121826] border border-slate-200/80 dark:border-white/5 hover:border-indigo-500 transition-all group cursor-pointer"
                    onClick={() => { onLoad(proj); onClose(); }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-500">
                        <FileCode className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-slate-800 dark:text-white group-hover:text-indigo-600 transition-colors">{proj.name}</div>
                        <div className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5">
                          <Clock className="w-3 h-3" />
                          {new Date(proj.updatedAt).toLocaleString('vi-VN')}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (confirm(`Xóa project "${proj.name}"?`)) {
                          // Trigger delete from parent
                          const event = new CustomEvent('delete-project', { detail: proj.name });
                          window.dispatchEvent(event);
                        }
                      }}
                      className="p-1.5 rounded-lg text-slate-300 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === 'export' && (
            <div className="space-y-3">
              <button
                onClick={() => { onExportJSON(); }}
                className="w-full flex items-center gap-3 p-3.5 rounded-xl bg-slate-50 dark:bg-[#121826] border border-slate-200 dark:border-white/5 hover:border-emerald-500 transition-all text-left group"
              >
                <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-600">
                  <Download className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-800 dark:text-white group-hover:text-emerald-600">Export Project (.json)</div>
                  <div className="text-[11px] text-slate-400">Tải xuống toàn bộ sơ đồ mạch + code dưới dạng JSON</div>
                </div>
              </button>

              <button
                onClick={() => { onExportIno(); }}
                className="w-full flex items-center gap-3 p-3.5 rounded-xl bg-slate-50 dark:bg-[#121826] border border-slate-200 dark:border-white/5 hover:border-sky-500 transition-all text-left group"
              >
                <div className="p-2 rounded-lg bg-sky-500/10 text-sky-600">
                  <FileCode className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-800 dark:text-white group-hover:text-sky-600">Export Arduino Code (.ino)</div>
                  <div className="text-[11px] text-slate-400">Tải xuống mã nguồn Arduino để nạp vào board thật</div>
                </div>
              </button>

              <div className="relative">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".json,.iot.json"
                  onChange={handleImport}
                  className="hidden"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full flex items-center gap-3 p-3.5 rounded-xl bg-slate-50 dark:bg-[#121826] border border-slate-200 dark:border-white/5 hover:border-amber-500 transition-all text-left group"
                >
                  <div className="p-2 rounded-lg bg-amber-500/10 text-amber-600">
                    <Upload className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-800 dark:text-white group-hover:text-amber-600">Import Project (.json)</div>
                    <div className="text-[11px] text-slate-400">Tải lên file project JSON đã export trước đó</div>
                  </div>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
