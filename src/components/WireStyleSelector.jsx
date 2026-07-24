import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { useCanvasStore } from '../stores/canvasStore';

const WIRE_COLORS = [
  { id: 'black', name: 'Black (Đen)', hex: '#1F2937' },
  { id: 'red', name: 'Red (Đỏ)', hex: '#EF4444' },
  { id: 'orange', name: 'Orange (Cam)', hex: '#F97316' },
  { id: 'yellow', name: 'Yellow (Vàng)', hex: '#EAB308' },
  { id: 'green', name: 'Green (Xanh lá)', hex: '#10B981' },
  { id: 'turquoise', name: 'Turquoise (Xanh lam)', hex: '#06B6D4' },
  { id: 'blue', name: 'Blue (Xanh dương)', hex: '#2563EB' },
  { id: 'purple', name: 'Purple (Tím)', hex: '#8B5CF6' },
  { id: 'pink', name: 'Pink (Hồng)', hex: '#EC4899' },
  { id: 'brown', name: 'Brown (Nâu)', hex: '#B45309' },
  { id: 'grey', name: 'Grey (Xám)', hex: '#6B7280' },
  { id: 'white', name: 'White (Trắng)', hex: '#F8FAFC' },
];

const WIRE_TYPES = [
  { id: 'normal', name: 'Normal (Dây thường)', icon: '➖' },
  { id: 'hookup', name: 'Hookup (Dây Cắm Jumper)', icon: '🔌' },
  { id: 'alligator', name: 'Alligator (Kẹp Cá sấu)', icon: '🐊' },
  { id: 'automatic', name: 'Automatic (Tự động uốn góc)', icon: '⚡' },
];

export default function WireStyleSelector() {
  const [colorOpen, setColorOpen] = useState(false);
  const [typeOpen, setTypeOpen] = useState(false);

  const activeWireColor = useCanvasStore(s => s.activeWireColor);
  const activeWireType = useCanvasStore(s => s.activeWireType);
  const selectedWireIds = useCanvasStore(s => s.selectedWireIds);
  const wires = useCanvasStore(s => s.wires);
  const setActiveWireColor = useCanvasStore(s => s.setActiveWireColor);
  const setActiveWireType = useCanvasStore(s => s.setActiveWireType);

  const containerRef = useRef(null);

  // If a wire is selected, sync active color and type from selected wire
  const selectedWire = selectedWireIds.length === 1 ? wires.find(w => w.id === selectedWireIds[0]) : null;
  const currentColor = selectedWire ? (selectedWire.color || activeWireColor) : activeWireColor;
  const currentType = selectedWire ? (selectedWire.wireType || activeWireType) : activeWireType;

  const activeTypeObj = WIRE_TYPES.find(t => t.id === currentType) || WIRE_TYPES[0];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setColorOpen(false);
        setTypeOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="flex items-center gap-1.5 no-export">
      {/* 🟢 Wire Color Dropdown Selector */}
      <div className="relative">
        <button
          onClick={() => { setColorOpen(!colorOpen); setTypeOpen(false); }}
          title="Chọn Màu dây nối (Wire Color)"
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/20 border border-slate-300 dark:border-white/15 transition-all shadow-sm"
        >
          <span
            className="w-4 h-4 rounded-md border border-black/20 shadow-sm shrink-0"
            style={{ backgroundColor: currentColor }}
          />
          <ChevronDown className="w-3.5 h-3.5 text-slate-500 dark:text-gray-400" />
        </button>

        {colorOpen && (
          <div className="absolute left-0 top-full mt-2 w-48 p-2 rounded-2xl bg-white dark:bg-[#0F1423] border border-slate-200 dark:border-white/15 shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-150">
            <div className="text-[9px] font-extrabold text-slate-400 dark:text-gray-400 px-2.5 py-1 uppercase tracking-wider">
              WIRE COLOR
            </div>
            <div className="flex flex-col gap-0.5 max-h-64 overflow-y-auto custom-scrollbar">
              {WIRE_COLORS.map(c => {
                const isSelected = currentColor === c.hex;
                return (
                  <button
                    key={c.id}
                    onClick={() => {
                      setActiveWireColor(c.hex);
                      setColorOpen(false);
                    }}
                    className={`flex items-center gap-2.5 px-2.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                      isSelected
                        ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800'
                        : 'hover:bg-slate-100 dark:hover:bg-white/5 text-slate-700 dark:text-gray-200'
                    }`}
                  >
                    <span
                      className="w-4 h-4 rounded-md border border-black/20 shadow-sm shrink-0"
                      style={{ backgroundColor: c.hex }}
                    />
                    <span className="truncate">{c.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* 🐊 Wire Type Dropdown Selector */}
      <div className="relative">
        <button
          onClick={() => { setTypeOpen(!typeOpen); setColorOpen(false); }}
          title="Chọn Kiểu dây nối (Wire Type)"
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/20 border border-slate-300 dark:border-white/15 transition-all shadow-sm"
        >
          <span className="text-sm leading-none">{activeTypeObj.icon}</span>
          <ChevronDown className="w-3.5 h-3.5 text-slate-500 dark:text-gray-400" />
        </button>

        {typeOpen && (
          <div className="absolute left-0 top-full mt-2 w-56 p-2 rounded-2xl bg-white dark:bg-[#0F1423] border border-slate-200 dark:border-white/15 shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-150">
            <div className="text-[9px] font-extrabold text-slate-400 dark:text-gray-400 px-2.5 py-1 uppercase tracking-wider">
              WIRE TYPE
            </div>
            <div className="flex flex-col gap-0.5">
              {WIRE_TYPES.map(t => {
                const isSelected = currentType === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => {
                      setActiveWireType(t.id);
                      setTypeOpen(false);
                    }}
                    className={`flex items-center gap-2.5 px-2.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                      isSelected
                        ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800'
                        : 'hover:bg-slate-100 dark:hover:bg-white/5 text-slate-700 dark:text-gray-200'
                    }`}
                  >
                    <span className="text-base leading-none">{t.icon}</span>
                    <span className="truncate">{t.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
