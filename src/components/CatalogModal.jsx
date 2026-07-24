import React, { useState } from 'react';
import { Search, X, Plus, Cpu, Zap, Radio, Eye, Sun, Thermometer, Droplets, Flame, Wind, Gauge, Sparkles, Disc, Compass, ToggleLeft, RefreshCw, MonitorPlay, Tv } from 'lucide-react';
import { COMPONENT_TYPES, COMPONENT_CATEGORIES } from '../data/componentTypes';
import HardwareThumbnail from './HardwareThumbnail';

export default function CatalogModal({ isOpen, onClose, onAddComponent }) {
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen) return null;

  const filteredComponents = Object.keys(COMPONENT_TYPES).filter(typeKey => {
    const comp = COMPONENT_TYPES[typeKey];
    const matchesCategory = selectedCategory === 'ALL' || comp.category === selectedCategory;
    const matchesSearch = comp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          comp.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          comp.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="flex flex-col w-full max-w-5xl h-[85vh] bg-white dark:bg-[#0F1423] rounded-2xl shadow-2xl border border-slate-200 dark:border-white/10 overflow-hidden">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#131929]">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-600/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              <Cpu className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                Hardware Catalog <span className="text-xs font-normal text-emerald-600 bg-emerald-50 dark:bg-emerald-900/40 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-700/50">{Object.keys(COMPONENT_TYPES).length} linh kiện</span>
              </h2>
              <p className="text-xs text-slate-500 dark:text-gray-400">Chọn bo mạch, cảm biến hoặc linh kiện để thêm trực tiếp vào workspace</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Search Bar */}
            <div className="relative w-72">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Tìm kiếm hardware..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-8 py-2 text-xs rounded-xl bg-white dark:bg-[#1A2235] border border-slate-200 dark:border-white/10 text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600">
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex flex-1 overflow-hidden">
          
          {/* Category Tabs Sidebar */}
          <div className="w-52 p-3 border-r border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-[#0D121F] space-y-1">
            {COMPONENT_CATEGORIES.map(cat => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 text-xs font-semibold rounded-xl transition-all ${
                    isActive
                      ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                      : 'text-slate-600 dark:text-gray-300 hover:bg-slate-200/60 dark:hover:bg-white/5'
                  }`}
                >
                  <span>{cat.name}</span>
                  <span className={`px-2 py-0.5 text-[10px] rounded-full ${
                    isActive ? 'bg-white/20 text-white' : 'bg-slate-200 dark:bg-white/10 text-slate-500 dark:text-gray-400'
                  }`}>
                    {cat.id === 'ALL' ? Object.keys(COMPONENT_TYPES).length : Object.values(COMPONENT_TYPES).filter(c => c.category === cat.id).length}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Hardware Card Grid */}
          <div className="flex-1 overflow-y-auto p-6 bg-slate-100/50 dark:bg-[#0B0F19]">
            {filteredComponents.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 text-center">
                <Search className="w-12 h-12 text-slate-300 dark:text-gray-600 mb-3 stroke-[1.5]" />
                <p className="text-sm font-medium text-slate-600 dark:text-gray-300">Không tìm thấy linh kiện phù hợp</p>
                <p className="text-xs text-slate-400 mt-1">Thử từ khóa khác hoặc chuyển danh mục</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredComponents.map(typeKey => {
                  const comp = COMPONENT_TYPES[typeKey];
                  return (
                    <div
                      key={typeKey}
                      onClick={() => {
                        onAddComponent(typeKey);
                        onClose();
                      }}
                      className="group relative flex flex-col p-3.5 bg-white dark:bg-[#131929] rounded-2xl border border-slate-200/80 dark:border-white/5 hover:border-emerald-500 dark:hover:border-emerald-500 shadow-sm hover:shadow-xl hover:shadow-emerald-500/10 transition-all cursor-pointer overflow-hidden"
                    >
                      {/* Hardware Visual Preview Box */}
                      <div className="w-full h-32 mb-3 rounded-xl bg-slate-50 dark:bg-[#090C15] flex items-center justify-center p-2 border border-slate-100 dark:border-white/5 group-hover:scale-[1.02] transition-transform">
                        <HardwareThumbnail type={typeKey} />
                      </div>

                      {/* Title & Description */}
                      <div className="flex-1">
                        <h3 className="text-xs font-bold text-slate-800 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors line-clamp-1">
                          {comp.name}
                        </h3>
                        <p className="text-[11px] text-slate-400 dark:text-gray-400 line-clamp-1 mt-0.5">
                          {comp.subtitle}
                        </p>

                        {/* Hardware Tags */}
                        <div className="flex flex-wrap gap-1 mt-2.5">
                          {comp.tags.map(tag => (
                            <span
                              key={tag}
                              className="px-2 py-0.5 text-[9px] font-mono font-medium rounded-md bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-gray-300 border border-slate-200/60 dark:border-white/5"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Quick Add Floating Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onAddComponent(typeKey);
                          onClose();
                        }}
                        className="mt-3 w-full flex items-center justify-center gap-1.5 py-1.5 px-3 text-xs font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-600 hover:text-white dark:hover:bg-emerald-600 rounded-xl border border-emerald-200 dark:border-emerald-800/50 transition-all"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        Thêm vào workspace
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
