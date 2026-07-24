import React, { useState } from 'react';
import { Search, Plus, ExternalLink, Cpu, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';
import { COMPONENT_TYPES, COMPONENT_CATEGORIES } from '../data/componentTypes';
import HardwareThumbnail from './HardwareThumbnail';

export default function HardwareCatalogSidebar({
  onAddComponent,
  onOpenFullCatalog,
  isSimulating,
  selectedCompId,
  selectedWireId,
  onDeleteSelected,
  isCollapsed,
  onToggleCollapse
}) {
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredKeys = Object.keys(COMPONENT_TYPES).filter(key => {
    const comp = COMPONENT_TYPES[key];
    const catMatch = activeCategory === 'ALL' || comp.category === activeCategory;
    const searchMatch = comp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        comp.subtitle.toLowerCase().includes(searchQuery.toLowerCase());
    return catMatch && searchMatch;
  });

  if (isCollapsed) {
    return (
      <aside className="w-14 border-r flex flex-col items-center py-3 bg-white dark:bg-[#0C101D] border-slate-200 dark:border-white/5 transition-all relative z-20 select-none">
        <button
          onClick={onToggleCollapse}
          title="Mở rộng Thanh Thư viện Linh kiện (2 chiều)"
          className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600 hover:bg-emerald-600 hover:text-white transition-all shadow-md mb-4"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        <div className="flex-1 flex flex-col items-center gap-3 overflow-y-auto w-full px-1">
          {filteredKeys.slice(0, 10).map(typeKey => (
            <button
              key={typeKey}
              onClick={() => !isSimulating && onAddComponent(typeKey)}
              disabled={isSimulating}
              title={COMPONENT_TYPES[typeKey].name}
              className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-[#151D2F] p-1 border border-slate-200 dark:border-white/10 hover:border-emerald-500 flex items-center justify-center transition-transform hover:scale-110 disabled:opacity-40"
            >
              <HardwareThumbnail type={typeKey} />
            </button>
          ))}
        </div>
      </aside>
    );
  }

  return (
    <aside className="w-80 border-r flex flex-col overflow-hidden bg-white dark:bg-[#0C101D] border-slate-200 dark:border-white/5 transition-all relative z-20">

      {/* Catalog Title Header */}
      <div className="p-4 border-b border-slate-200 dark:border-white/5">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-gray-300 flex items-center gap-1.5">
            <Cpu className="w-4 h-4 text-emerald-600" />
            Hardware Catalog
          </h2>
          <div className="flex items-center gap-1">
            <button
              onClick={onOpenFullCatalog}
              className="flex items-center gap-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 hover:underline mr-1"
            >
              <span>Mở catalog</span>
              <ExternalLink className="w-3 h-3" />
            </button>
            <button
              onClick={onToggleCollapse}
              title="Thu hẹp Thanh Thư viện Linh kiện (2 chiều)"
              className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-white/10 text-slate-500 transition-all"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Quick Search */}
        <div className="relative mt-2">
          <Search className="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-slate-400" />
          <input
            type="text"
            placeholder="Tìm kiếm hardware..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl bg-slate-100 dark:bg-[#151D2F] border border-slate-200 dark:border-white/5 text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-emerald-500"
          />
        </div>
      </div>

      {/* Category Pills Bar */}
      <div className="flex items-center gap-1.5 p-2 overflow-x-auto border-b border-slate-200 dark:border-white/5 bg-slate-50/50 dark:bg-[#090C15]">
        {COMPONENT_CATEGORIES.map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-2.5 py-1 text-[11px] font-semibold rounded-lg transition-all whitespace-nowrap ${
              activeCategory === cat.id
                ? 'bg-emerald-600 text-white shadow-sm font-semibold'
                : 'text-slate-600 dark:text-gray-400 hover:bg-slate-200/60 dark:hover:bg-white/5'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Hardware Item List */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2.5">
        {filteredKeys.length === 0 ? (
          <div className="text-center py-8 text-xs text-slate-400">Không tìm thấy linh kiện</div>
        ) : (
          filteredKeys.map(typeKey => {
            const proto = COMPONENT_TYPES[typeKey];
            return (
              <div
                key={typeKey}
                onClick={() => !isSimulating && onAddComponent(typeKey)}
                className={`group flex items-center justify-between p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                  isSimulating
                    ? 'opacity-50 cursor-not-allowed border-slate-200 dark:border-white/5'
                    : 'bg-slate-50/80 dark:bg-[#121826] border-slate-200/80 dark:border-white/5 hover:border-emerald-500 dark:hover:border-emerald-500 hover:shadow-md'
                }`}
              >
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="w-12 h-12 rounded-lg bg-white dark:bg-[#090C15] p-1 border border-slate-200/60 dark:border-white/5 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                    <HardwareThumbnail type={typeKey} />
                  </div>

                  <div className="overflow-hidden">
                    <div className="text-xs font-bold text-slate-800 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors truncate">
                      {proto.name}
                    </div>
                    <div className="text-[10px] text-slate-400 dark:text-gray-400 truncate mt-0.5">
                      {proto.category}
                    </div>
                  </div>
                </div>

                <div className="p-1.5 rounded-lg text-slate-400 group-hover:text-emerald-600 group-hover:bg-emerald-50 dark:group-hover:bg-emerald-950/50 transition-colors flex-shrink-0">
                  <Plus className="w-4 h-4" />
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Delete Button */}
      <div className="p-3 border-t border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-[#090D18]">
        <button
          onClick={onDeleteSelected}
          disabled={isSimulating || (!selectedCompId && !selectedWireId)}
          className="w-full flex items-center justify-center gap-2 py-2 px-3 text-xs font-medium text-rose-600 hover:text-white bg-rose-50 hover:bg-rose-600 border border-rose-200 dark:border-rose-900/40 rounded-xl transition-all disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <Trash2 className="w-4 h-4" />
          Xóa Linh kiện / Dây nối
        </button>
      </div>

    </aside>
  );
}
