import React, { useState } from 'react';
import { Search, Boxes, Info } from 'lucide-react';
import { COMPONENT_TYPES, COMPONENT_CATEGORIES } from '../data/componentTypes';
import { COMPONENT_GUIDE } from '../data/componentGuide';
import CanvasComponentRender from './CanvasComponentRenders';
import ComponentDetailModal from './ComponentDetailModal';

// Nhãn song ngữ cho danh mục (COMPONENT_CATEGORIES vốn chỉ có tên tiếng Việt)
const CATEGORY_EN = {
  ALL: 'All',
  Power: 'Power',
  EnvSensors: 'Environmental Sensors',
  Boards: 'Boards',
  Sensors: 'Sensors',
  Actuators: 'Actuators',
  Displays: 'Displays',
  Passive: 'Passive',
  ICs: 'Integrated Circuits',
  Instruments: 'Instruments',
  Comm: 'Communication',
  Others: 'Others',
};

function ComponentThumbnail({ typeKey }) {
  const proto = COMPONENT_TYPES[typeKey];
  const fakeComp = { id: `guide_${typeKey}`, type: typeKey, config: proto.defaultConfig || {} };
  return (
    <svg viewBox={`0 0 ${proto.width} ${proto.height}`} className="w-full h-full" preserveAspectRatio="xMidYMid meet">
      <CanvasComponentRender comp={fakeComp} allComps={[]} isSelected={false} isSimulating={false} isLit={false} />
    </svg>
  );
}

/**
 * Tab "Thư viện linh kiện" — giới thiệu song ngữ Anh/Việt toàn bộ 115 linh kiện
 * có trong bộ mô phỏng (không phải catalog của bên thứ ba) để sinh viên tra cứu
 * công dụng trước khi kéo thả vào bài thực hành.
 */
export default function ComponentGuideTab({ isDarkMode, onJumpToLesson }) {
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTypeKey, setSelectedTypeKey] = useState(null);

  const typeKeys = Object.keys(COMPONENT_TYPES).filter(typeKey => {
    const proto = COMPONENT_TYPES[typeKey];
    const guide = COMPONENT_GUIDE[typeKey];
    const matchesCategory = selectedCategory === 'ALL' || proto.category === selectedCategory;
    const q = searchQuery.trim().toLowerCase();
    const matchesSearch = !q ||
      proto.name.toLowerCase().includes(q) ||
      guide?.en.toLowerCase().includes(q) ||
      guide?.vi.toLowerCase().includes(q) ||
      typeKey.toLowerCase().includes(q);
    return matchesCategory && matchesSearch;
  });

  return (
    <div className={`flex h-full overflow-hidden ${isDarkMode ? 'bg-[#0B0F19]' : 'bg-slate-50'}`}>

      {/* Category Sidebar */}
      <div className={`w-56 shrink-0 overflow-y-auto p-3 space-y-1 border-r ${isDarkMode ? 'border-white/5 bg-[#0D121F]' : 'border-slate-200 bg-white'}`}>
        {COMPONENT_CATEGORIES.map(cat => {
          const isActive = selectedCategory === cat.id;
          const count = cat.id === 'ALL' ? Object.keys(COMPONENT_TYPES).length : Object.values(COMPONENT_TYPES).filter(c => c.category === cat.id).length;
          if (count === 0) return null;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 text-xs font-semibold rounded-xl transition-all text-left ${
                isActive
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                  : isDarkMode ? 'text-gray-300 hover:bg-white/5' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <span className="leading-tight">
                <span className="block">{CATEGORY_EN[cat.id] || cat.id}</span>
                <span className={`block text-[10px] font-normal ${isActive ? 'text-emerald-100' : 'text-slate-400'}`}>{cat.name.replace(/^[^\s]+\s/, '')}</span>
              </span>
              <span className={`px-2 py-0.5 text-[10px] rounded-full ${isActive ? 'bg-white/20 text-white' : isDarkMode ? 'bg-white/10 text-gray-400' : 'bg-slate-200 text-slate-500'}`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className={`shrink-0 px-6 py-4 border-b flex items-center justify-between gap-4 ${isDarkMode ? 'border-white/5 bg-[#0D121F]' : 'border-slate-200 bg-white'}`}>
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-600/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              <Boxes className="w-5 h-5" />
            </div>
            <div>
              <h2 className={`text-base font-bold flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                Component Library <span className="text-slate-400 font-normal">· Thư viện linh kiện</span>
              </h2>
              <p className="text-xs text-slate-400">
                {Object.keys(COMPONENT_TYPES).length} components used in this simulator — bilingual EN/VI reference.
              </p>
            </div>
          </div>
          <div className="relative w-72 shrink-0">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search / Tìm linh kiện..."
              className={`w-full pl-9 pr-3 py-2 text-xs rounded-xl border focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                isDarkMode ? 'bg-[#1A2235] border-white/10 text-white placeholder-slate-500' : 'bg-slate-50 border-slate-200 text-slate-800 placeholder-slate-400'
              }`}
            />
          </div>
        </div>

        {/* Card Grid */}
        <div className="flex-1 overflow-y-auto p-6">
          {typeKeys.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-center">
              <Search className="w-12 h-12 text-slate-300 dark:text-gray-600 mb-3 stroke-[1.5]" />
              <p className="text-sm font-medium text-slate-500">No matching component / Không tìm thấy linh kiện phù hợp</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {typeKeys.map(typeKey => {
                const proto = COMPONENT_TYPES[typeKey];
                const guide = COMPONENT_GUIDE[typeKey];
                return (
                  <button
                    key={typeKey}
                    type="button"
                    onClick={() => setSelectedTypeKey(typeKey)}
                    className={`group flex flex-col p-3.5 rounded-2xl border shadow-sm transition-all text-left cursor-pointer ${
                      isDarkMode ? 'bg-[#131929] border-white/5 hover:border-emerald-500/60 hover:shadow-lg hover:shadow-emerald-500/5' : 'bg-white border-slate-200/80 hover:border-emerald-400 hover:shadow-md'
                    }`}
                  >
                    <div className={`relative w-full h-28 mb-3 rounded-xl flex items-center justify-center p-2 border ${isDarkMode ? 'bg-[#090C15] border-white/5' : 'bg-slate-50 border-slate-100'}`}>
                      <ComponentThumbnail typeKey={typeKey} />
                      <span className={`absolute top-1.5 right-1.5 flex items-center gap-1 px-1.5 py-0.5 rounded-md text-[9px] font-semibold opacity-0 group-hover:opacity-100 transition-opacity ${
                        isDarkMode ? 'bg-emerald-500/20 text-emerald-300' : 'bg-emerald-600 text-white'
                      }`}>
                        <Info className="w-2.5 h-2.5" /> Chi tiết
                      </span>
                    </div>

                    <h3 className={`text-xs font-bold leading-snug ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
                      {guide.en}
                    </h3>
                    <h4 className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 leading-snug mb-1.5">
                      {guide.vi}
                    </h4>

                    <p className={`text-[10.5px] leading-snug ${isDarkMode ? 'text-gray-400' : 'text-slate-500'}`}>
                      {guide.descEn}
                    </p>
                    <p className={`text-[10.5px] italic leading-snug mt-1 ${isDarkMode ? 'text-gray-500' : 'text-slate-400'}`}>
                      {guide.descVi}
                    </p>

                    <span className={`self-start mt-2.5 px-2 py-0.5 text-[9px] font-mono font-medium rounded-md border ${
                      isDarkMode ? 'bg-white/5 text-gray-300 border-white/5' : 'bg-slate-100 text-slate-600 border-slate-200/60'
                    }`}>
                      {proto.subtitle}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <ComponentDetailModal
        typeKey={selectedTypeKey}
        isDarkMode={isDarkMode}
        onClose={() => setSelectedTypeKey(null)}
        onJumpToLesson={(id) => {
          setSelectedTypeKey(null);
          onJumpToLesson?.(id);
        }}
      />
    </div>
  );
}
