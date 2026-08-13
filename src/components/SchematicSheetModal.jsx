import React, { useMemo, useRef, useState } from 'react';
import { toPng } from 'html-to-image';
import { X, Download, Printer, FileText } from 'lucide-react';
import CanvasComponentRender from './CanvasComponentRenders';
import { computeSchematicSheetPlan } from '../utils/schematicSheet';

/**
 * "Xuất sơ đồ" — dựng 1 trang bản vẽ nguyên lý (schematic sheet) đúng quy ước kỹ
 * thuật (khung viền + toạ độ lưới + khung tên) để in/tải ảnh, tách biệt hoàn toàn
 * với canvas thực hành hàng ngày. Ký hiệu linh kiện dùng lại nguyên renderer của
 * chế độ Schematic trên canvas (CanvasComponentRender isSchematicView) để không
 * lặp code và luôn khớp hình vẽ giữa 2 nơi.
 */
const PAGE_W = 1600;
const PAGE_H = 1120;
const OUTER = 12;      // viền ngoài cùng, sát mép trang
const FRAME = 46;      // khung vẽ chính (vùng có toạ độ lưới A-.../1-...)
const TITLE_W = 460;
const TITLE_H = 118;
const COLS = 8;
const ROWS = 6;

function colLabel(i) { return String(i + 1); }
function rowLabel(i) { return String.fromCharCode(65 + i); }

function orthoPath(a, b) {
  const midX = (a.x + b.x) / 2;
  return `M ${a.x} ${a.y} L ${midX} ${a.y} L ${midX} ${b.y} L ${b.x} ${b.y}`;
}

function GroundSymbol({ x, y, side, label, color, stubRank = 0 }) {
  const stubLen = 16 + stubRank * 22;
  const dx = side === 'right' ? 1 : side === 'left' ? -1 : 0;
  const dy = side === 'bottom' ? 1 : side === 'top' ? -1 : 0;
  const ex = x + dx * stubLen, ey = y + dy * stubLen;
  const vertical = dx === 0;
  return (
    <g>
      <line x1={x} y1={y} x2={ex} y2={ey} stroke={color} strokeWidth="2" />
      <g stroke={color} strokeWidth="2" strokeLinecap="round" transform={`translate(${ex},${ey})`}>
        {vertical ? (
          <g>
            <line x1="-9" y1="0" x2="9" y2="0" />
            <line x1="-6" y1="4" x2="6" y2="4" />
            <line x1="-3" y1="8" x2="3" y2="8" />
          </g>
        ) : (
          <g transform={`rotate(${dx > 0 ? 90 : -90})`}>
            <line x1="-9" y1="0" x2="9" y2="0" />
            <line x1="-6" y1="4" x2="6" y2="4" />
            <line x1="-3" y1="8" x2="3" y2="8" />
          </g>
        )}
      </g>
      <text x={ex + (vertical ? 12 : 0)} y={ey + (vertical ? 4 : 22)} fontSize="10" fontWeight="700" fill="#334155" textAnchor="middle">
        {label}
      </text>
    </g>
  );
}

function NetFlag({ x, y, side, label, color, stubRank = 0 }) {
  const stubLen = 14 + stubRank * 22;
  const dx = side === 'right' ? 1 : side === 'left' ? -1 : 0;
  const dy = side === 'bottom' ? 1 : side === 'top' ? -1 : 0;
  const ex = x + dx * stubLen, ey = y + dy * stubLen;
  const w = Math.max(44, label.length * 6.4);
  const h = 17;
  const boxX = dx >= 0 ? ex : ex - w;
  const boxY = ey - h / 2;
  return (
    <g>
      <line x1={x} y1={y} x2={ex} y2={ey} stroke={color} strokeWidth="2" />
      <rect x={boxX} y={boxY} width={w} height={h} rx="3" fill="#FFFBEB" stroke="#B45309" strokeWidth="1" />
      <text x={boxX + w / 2} y={boxY + h / 2 + 3.5} fontSize="9" fontWeight="700" textAnchor="middle" fill="#7C2D12">
        {label}
      </text>
    </g>
  );
}

export default function SchematicSheetModal({ isOpen, onClose, components, wires, lessonTitle, studentInfo, isDarkMode }) {
  const sheetRef = useRef(null);
  const [exporting, setExporting] = useState(false);

  const plan = useMemo(
    () => (isOpen ? computeSchematicSheetPlan(components, wires) : null),
    [isOpen, components, wires]
  );

  if (!isOpen || !plan) return null;

  const { items, directWires, flags, bounds } = plan;
  const boundsW = Math.max(1, bounds.maxX - bounds.minX);
  const boundsH = Math.max(1, bounds.maxY - bounds.minY);

  const drawX = FRAME + 20, drawY = FRAME + 20;
  const drawW = PAGE_W - FRAME * 2 - 40;
  const drawH = PAGE_H - FRAME * 2 - 40 - TITLE_H - 16;

  const k = Math.min(3, Math.max(0.3, Math.min(drawW / boundsW, drawH / boundsH) * 0.92));
  const ox = drawX + (drawW - boundsW * k) / 2 - bounds.minX * k;
  const oy = drawY + (drawH - boundsH * k) / 2 - bounds.minY * k;

  const now = new Date();
  const dateStr = now.toLocaleString('vi-VN');
  const sv = studentInfo?.name || 'Chưa khai báo';
  const mssv = studentInfo?.studentId || 'N/A';

  const handleDownload = async () => {
    if (!sheetRef.current) return;
    setExporting(true);
    try {
      const dataUrl = await toPng(sheetRef.current, {
        backgroundColor: '#FFFFFF',
        fontEmbedCSS: '',
        pixelRatio: 2,
      });
      const a = document.createElement('a');
      a.href = dataUrl;
      a.download = `${mssv}_${(lessonTitle || 'schematic').replace(/\s/g, '_')}_schematic.png`;
      a.click();
    } finally {
      setExporting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[999] flex flex-col bg-black/70 backdrop-blur-sm">
      <div className={`no-print flex items-center justify-between px-4 py-2.5 border-b shrink-0 ${isDarkMode ? 'bg-[#0C101D] border-white/10' : 'bg-white border-slate-200'}`}>
        <div className={`flex items-center gap-2 text-sm font-bold ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
          <FileText className="w-4 h-4 text-indigo-500" /> Xuất sơ đồ nguyên lý (Schematic Sheet)
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleDownload}
            disabled={exporting}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50 transition-all"
          >
            <Download className="w-3.5 h-3.5" /> {exporting ? 'Đang xuất...' : 'Tải ảnh PNG'}
          </button>
          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-600 text-white hover:bg-slate-700 transition-all"
          >
            <Printer className="w-3.5 h-3.5" /> In
          </button>
          <button
            onClick={onClose}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all ${isDarkMode ? 'border-white/10 text-gray-300 hover:bg-white/10' : 'border-slate-200 text-slate-600 hover:bg-slate-100'}`}
          >
            <X className="w-3.5 h-3.5" /> Đóng
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto flex items-start justify-center p-6">
        <div ref={sheetRef} id="schematic-print-sheet" style={{ width: PAGE_W, height: PAGE_H, background: '#FFFFFF' }}>
          <svg viewBox={`0 0 ${PAGE_W} ${PAGE_H}`} width={PAGE_W} height={PAGE_H} style={{ display: 'block' }}>
            <rect x="0" y="0" width={PAGE_W} height={PAGE_H} fill="#FFFFFF" />

            {/* Viền ngoài + khung vẽ chính */}
            <rect x={OUTER} y={OUTER} width={PAGE_W - OUTER * 2} height={PAGE_H - OUTER * 2} fill="none" stroke="#DC2626" strokeWidth="1" />
            <rect x={FRAME} y={FRAME} width={PAGE_W - FRAME * 2} height={PAGE_H - FRAME * 2} fill="none" stroke="#DC2626" strokeWidth="1.5" />

            {/* Toạ độ lưới: số cột trên/dưới, chữ hàng trái/phải */}
            {Array.from({ length: COLS }).map((_, i) => {
              const segW = (PAGE_W - FRAME * 2) / COLS;
              const cx = FRAME + segW * i + segW / 2;
              return (
                <g key={`col-${i}`}>
                  <text x={cx} y={OUTER + (FRAME - OUTER) / 2 + 4} fontSize="12" fontWeight="600" fill="#DC2626" textAnchor="middle">{colLabel(i)}</text>
                  <text x={cx} y={PAGE_H - OUTER - (FRAME - OUTER) / 2 + 4} fontSize="12" fontWeight="600" fill="#DC2626" textAnchor="middle">{colLabel(i)}</text>
                </g>
              );
            })}
            {Array.from({ length: ROWS }).map((_, i) => {
              const segH = (PAGE_H - FRAME * 2) / ROWS;
              const cy = FRAME + segH * i + segH / 2;
              return (
                <g key={`row-${i}`}>
                  <text x={OUTER + (FRAME - OUTER) / 2} y={cy + 4} fontSize="12" fontWeight="600" fill="#DC2626" textAnchor="middle">{rowLabel(i)}</text>
                  <text x={PAGE_W - OUTER - (FRAME - OUTER) / 2} y={cy + 4} fontSize="12" fontWeight="600" fill="#DC2626" textAnchor="middle">{rowLabel(i)}</text>
                </g>
              );
            })}

            {/* Nội dung mạch — 1 phép biến đổi affine duy nhất (translate + scale) nên
                mọi toạ độ chân (port) bên trong đều khớp tuyệt đối với vị trí linh kiện,
                không cần tính lại theo từng phần. */}
            <g transform={`translate(${ox},${oy}) scale(${k})`}>
              {directWires.map(w => (
                <path key={w.id} d={orthoPath(w.a, w.b)} fill="none" stroke={w.color} strokeWidth="2" />
              ))}
              {flags.map(f => (
                f.isGround
                  ? <GroundSymbol key={f.id} {...f} />
                  : <NetFlag key={f.id} {...f} />
              ))}
              {items.map(({ comp, refDes }) => (
                <g key={comp.id} transform={`translate(${comp.x},${comp.y})`}>
                  <CanvasComponentRender
                    comp={comp}
                    allComps={components}
                    isSelected={false}
                    isSimulating={false}
                    isLit={false}
                    pinState={undefined}
                    isSchematicView={true}
                  />
                  <text x="4" y="-6" fontSize="11" fontWeight="800" fill="#1D4ED8">{refDes}</text>
                </g>
              ))}
            </g>

            {/* Khung tên góc dưới phải */}
            <g transform={`translate(${PAGE_W - FRAME - TITLE_W}, ${PAGE_H - FRAME - TITLE_H})`}>
              <rect x="0" y="0" width={TITLE_W} height={TITLE_H} fill="#FFFFFF" stroke="#DC2626" strokeWidth="1.5" />
              <line x1="0" y1="30" x2={TITLE_W} y2="30" stroke="#DC2626" strokeWidth="1" />
              <line x1="0" y1="58" x2={TITLE_W} y2="58" stroke="#DC2626" strokeWidth="1" />
              <line x1="0" y1="86" x2={TITLE_W} y2="86" stroke="#DC2626" strokeWidth="1" />
              <text x="10" y="20" fontSize="12" fontWeight="700" fill="#1E293B">Title: {lessonTitle || 'Untitled'}</text>
              <text x="10" y="48" fontSize="11" fill="#334155">Date: {dateStr}</text>
              <text x="10" y="76" fontSize="11" fill="#334155">SV: {sv} · MSSV: {mssv}</text>
              <text x="10" y="104" fontSize="10" fill="#64748B">Sheet: 1/1</text>
              <text x={TITLE_W - 10} y="104" fontSize="10" fill="#64748B" textAnchor="end">IOT Lab TDMU</text>
            </g>

            <text x={FRAME + 6} y={PAGE_H - FRAME - 10} fontSize="10" fill="#94A3B8">
              Nguyễn Lê Tấn Đạt – IOT Lab · Virtual Simulator
            </text>
          </svg>
        </div>
      </div>
    </div>
  );
}
