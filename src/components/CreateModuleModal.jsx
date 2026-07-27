import React, { useState } from 'react';
import { X, Plus, Trash2, Cpu, FileText, Layout, Info } from 'lucide-react';
import { useUIStore } from '../stores/uiStore';

export default function CreateModuleModal({ isOpen, onClose }) {
  const ui = useUIStore();
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Sensors');
  const [subtitle, setSubtitle] = useState('Module tự tạo');
  const [desc, setDesc] = useState('');
  const [width, setWidth] = useState(240);
  const [height, setHeight] = useState(120);
  const [datasheetUrl, setDatasheetUrl] = useState('');
  const [ports, setPorts] = useState([
    { id: 'VCC', name: 'VCC', x: 8, y: 24, side: 'left', type: 'power' },
    { id: 'GND', name: 'GND', x: 8, y: 44, side: 'left', type: 'gnd' },
    { id: 'OUT', name: 'SIG', x: 232, y: 34, side: 'right', type: 'gpio' }
  ]);

  if (!isOpen) return null;

  const handleAddPort = () => {
    setPorts([...ports, { id: 'PIN_' + (ports.length + 1), name: 'P' + (ports.length + 1), x: 8, y: 24 + ports.length * 20, side: 'left', type: 'gpio' }]);
  };

  const handleRemovePort = (idx) => {
    setPorts(ports.filter((_, i) => i !== idx));
  };

  const handlePortChange = (idx, key, val) => {
    const next = [...ports];
    next[idx] = { ...next[idx], [key]: val };
    
    // Auto calculate coordinate X based on side
    if (key === 'side') {
      if (val === 'left') next[idx].x = 8;
      else if (val === 'right') next[idx].x = width - 8;
      else if (val === 'top') next[idx].x = width / 2;
      else if (val === 'bottom') next[idx].x = width / 2;
    }
    
    setPorts(next);
  };

  const handleSave = () => {
    if (!name.trim()) {
      alert('Vui lòng nhập tên linh kiện.');
      return;
    }
    
    const moduleId = 'custom_' + name.toLowerCase().replace(/[^a-z0-9]/g, '_') + '_' + Date.now().toString().slice(-4);
    
    // Ensure all X positions match the current width
    const updatedPorts = ports.map(p => {
      let x = p.x;
      if (p.side === 'left') x = 8;
      else if (p.side === 'right') x = width - 8;
      return { ...p, x };
    });

    const newModule = {
      id: moduleId,
      name: name.trim(),
      subtitle: subtitle.trim() || 'Module tự tạo',
      category,
      tags: ['Custom', category],
      width: parseInt(width) || 240,
      height: parseInt(height) || 120,
      ports: updatedPorts,
      datasheet: datasheetUrl.trim() || null,
      desc: desc.trim() || 'Linh kiện tự tạo bởi sinh viên',
      defaultConfig: { label: name.trim() }
    };

    ui.addMyModule(newModule);
    onClose();
    
    // Reset state
    setName('');
    setDesc('');
    setDatasheetUrl('');
    setPorts([
      { id: 'VCC', name: 'VCC', x: 8, y: 24, side: 'left', type: 'power' },
      { id: 'GND', name: 'GND', x: 8, y: 44, side: 'left', type: 'gnd' },
      { id: 'OUT', name: 'SIG', x: 232, y: 34, side: 'right', type: 'gpio' }
    ]);
  };

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className={`w-[680px] max-h-[85vh] flex flex-col rounded-3xl border shadow-2xl overflow-hidden transition-all duration-300 ${
        ui.isDarkMode ? 'bg-[#0E1324] border-slate-700/50 text-white' : 'bg-white border-slate-200 text-slate-800'
      }`}>
        
        {/* Header */}
        <div className={`flex items-center justify-between px-6 py-4 border-b ${ui.isDarkMode ? 'border-slate-700/40 bg-slate-900/30' : 'border-slate-100 bg-slate-50/50'}`}>
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-500">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider">Thiết kế Linh kiện Mới</h3>
              <p className={`text-[10px] ${ui.isDarkMode ? 'text-gray-400' : 'text-slate-500'}`}>Tự định nghĩa chân pinout & thông số kích thước mạch</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-xl hover:bg-slate-200 dark:hover:bg-white/10 transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 text-xs">
          <div className="grid grid-cols-2 gap-4">
            
            {/* Left: General Info */}
            <div className="space-y-3">
              <h4 className="font-bold text-[11px] text-emerald-500 uppercase tracking-widest flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5" /> Thông tin cơ bản
              </h4>
              
              <div className="space-y-1">
                <label className="font-semibold opacity-85">Tên linh kiện *</label>
                <input
                  type="text"
                  placeholder="Ví dụ: HX711 - Khuếch đại loadcell"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border bg-slate-50 dark:bg-[#151D2F] border-slate-200 dark:border-white/5 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="font-semibold opacity-85">Phân nhóm</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border bg-slate-50 dark:bg-[#151D2F] border-slate-200 dark:border-white/5 focus:outline-none"
                  >
                    <option value="Boards">Bo mạch</option>
                    <option value="Sensors">Cảm biến</option>
                    <option value="Actuators">Đầu ra / Bơm</option>
                    <option value="Displays">Hiển thị</option>
                    <option value="Passive">Thụ động</option>
                    <option value="Comm">Truyền thông</option>
                    <option value="Others">Khác</option>
                  </select>
                </div>
                
                <div className="space-y-1">
                  <label className="font-semibold opacity-85">Nhãn phụ</label>
                  <input
                    type="text"
                    placeholder="Module / Sensor"
                    value={subtitle}
                    onChange={(e) => setSubtitle(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border bg-slate-50 dark:bg-[#151D2F] border-slate-200 dark:border-white/5 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="font-semibold opacity-85">Rộng Card (px)</label>
                  <input
                    type="number"
                    value={width}
                    onChange={(e) => setWidth(Math.max(120, parseInt(e.target.value) || 240))}
                    className="w-full px-3.5 py-2 rounded-xl border bg-slate-50 dark:bg-[#151D2F] border-slate-200 dark:border-white/5 focus:outline-none"
                  />
                </div>
                
                <div className="space-y-1">
                  <label className="font-semibold opacity-85">Cao Card (px)</label>
                  <input
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(Math.max(80, parseInt(e.target.value) || 120))}
                    className="w-full px-3.5 py-2 rounded-xl border bg-slate-50 dark:bg-[#151D2F] border-slate-200 dark:border-white/5 focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold opacity-85">Tài liệu Datasheet PDF (Link URL)</label>
                <input
                  type="text"
                  placeholder="https://example.com/datasheet.pdf"
                  value={datasheetUrl}
                  onChange={(e) => setDatasheetUrl(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border bg-slate-50 dark:bg-[#151D2F] border-slate-200 dark:border-white/5 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold opacity-85">Mô tả tính năng</label>
                <textarea
                  rows="3"
                  placeholder="Nhập mô tả tính năng của cảm biến hoặc vi mạch..."
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border bg-slate-50 dark:bg-[#151D2F] border-slate-200 dark:border-white/5 focus:outline-none focus:ring-1 focus:ring-emerald-500 resize-none"
                />
              </div>
            </div>

            {/* Right: Pinout Configuration */}
            <div className="space-y-3 flex flex-col h-full border-l pl-4 border-slate-200 dark:border-white/5">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-[11px] text-emerald-500 uppercase tracking-widest flex items-center gap-1.5">
                  <Layout className="w-3.5 h-3.5" /> Sơ đồ chân (Pinout)
                </h4>
                <button
                  onClick={handleAddPort}
                  className="flex items-center gap-1 px-2.5 py-1 text-[10px] font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg shadow transition-colors"
                >
                  <Plus className="w-3 h-3" /> Thêm chân
                </button>
              </div>

              <div className="flex-1 overflow-y-auto space-y-2 max-h-[300px] pr-1">
                {ports.map((p, idx) => (
                  <div key={idx} className="p-2.5 rounded-xl border bg-slate-50/50 dark:bg-[#131929] border-slate-200 dark:border-white/5 space-y-2 relative">
                    <button
                      onClick={() => handleRemovePort(idx)}
                      className="absolute top-2 right-2 p-1 text-slate-400 hover:text-rose-500 rounded-lg hover:bg-rose-500/10 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                    
                    <div className="grid grid-cols-2 gap-2 pr-6">
                      <div className="space-y-0.5">
                        <label className="text-[9px] font-semibold opacity-75">ID chân</label>
                        <input
                          type="text"
                          value={p.id}
                          onChange={(e) => handlePortChange(idx, 'id', e.target.value.toUpperCase())}
                          className="w-full px-2 py-1 rounded bg-white dark:bg-[#1D273E] border border-slate-200 dark:border-white/5 focus:outline-none"
                        />
                      </div>
                      
                      <div className="space-y-0.5">
                        <label className="text-[9px] font-semibold opacity-75">Tên hiển thị</label>
                        <input
                          type="text"
                          value={p.name}
                          onChange={(e) => handlePortChange(idx, 'name', e.target.value)}
                          className="w-full px-2 py-1 rounded bg-white dark:bg-[#1D273E] border border-slate-200 dark:border-white/5 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      <div>
                        <label className="text-[9px] font-semibold opacity-75">Vị trí</label>
                        <select
                          value={p.side}
                          onChange={(e) => handlePortChange(idx, 'side', e.target.value)}
                          className="w-full p-1 rounded bg-white dark:bg-[#1D273E] border border-slate-200 dark:border-white/5"
                        >
                          <option value="left">Trái</option>
                          <option value="right">Phải</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-[9px] font-semibold opacity-75">Kiểu chân</label>
                        <select
                          value={p.type}
                          onChange={(e) => handlePortChange(idx, 'type', e.target.value)}
                          className="w-full p-1 rounded bg-white dark:bg-[#1D273E] border border-slate-200 dark:border-white/5"
                        >
                          <option value="gpio">GPIO / Tín hiệu</option>
                          <option value="analog">Analog Input</option>
                          <option value="power">VCC / Nguồn</option>
                          <option value="gnd">GND / Mass</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-[9px] font-semibold opacity-75">Tọa độ Y (px)</label>
                        <input
                          type="number"
                          value={p.y}
                          onChange={(e) => handlePortChange(idx, 'y', parseInt(e.target.value) || 24)}
                          className="w-full p-1 rounded bg-white dark:bg-[#1D273E] border border-slate-200 dark:border-white/5 focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Footer */}
        <div className={`px-6 py-4 border-t flex justify-end gap-3 ${ui.isDarkMode ? 'border-slate-700/40 bg-slate-900/30' : 'border-slate-100 bg-slate-50/50'}`}>
          <button onClick={onClose} className="px-4 py-2 rounded-xl border border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors">Hủy</button>
          <button onClick={handleSave} className="px-5 py-2 font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl shadow-lg hover:shadow-emerald-600/20 transition-all flex items-center gap-1.5">
            Lưu Module
          </button>
        </div>

      </div>
    </div>
  );
}
