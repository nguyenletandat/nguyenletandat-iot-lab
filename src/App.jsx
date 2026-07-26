import React, { useState, useEffect, useRef } from 'react';
import {
  Code, Terminal, Sliders, ZoomIn, ZoomOut, Maximize2,
  ChevronLeft, ChevronRight, ChevronUp, ChevronDown, Copy, FileCode, Lock,
} from 'lucide-react';
import { COMPONENT_TYPES } from './data/componentTypes';
import { PROJECT_PRESETS } from './data/projectPresets';
import { useCanvasStore } from './stores/canvasStore';
import { useSimulationStore } from './stores/simulationStore';
import { useUIStore } from './stores/uiStore';
import AppHeader from './components/AppHeader';
import CatalogModal from './components/CatalogModal';
import HardwareCatalogSidebar from './components/HardwareCatalogSidebar';
import CanvasComponentRender from './components/CanvasComponentRenders';
import SimulationControlsOverlay from './components/SimulationControlsOverlay';
import CanvasNotesRender from './components/CanvasNotesRender';
import CodeEditor from './components/CodeEditor';
import ProjectManager from './components/ProjectManager';
import TutorialOverlay from './components/TutorialOverlay';
import StudentModal from './components/StudentModal';
import { useSimulationEngine } from './hooks/useSimulationEngine';
import { useCanvasInteractions } from './hooks/useCanvasInteractions';
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';
import { useIntegrityGuard } from './hooks/useIntegrityGuard';
import { toPng } from 'html-to-image';

export default function App() {
  const [code, setCode] = useState(PROJECT_PRESETS.blink.code);
  const [selectedProjectId, setSelectedProjectId] = useState('blink');
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleString('vi-VN'));

  // Two-way arrow panel collapse states
  const [isLeftPanelCollapsed, setIsLeftPanelCollapsed] = useState(false);
  const [isRightPanelCollapsed, setIsRightPanelCollapsed] = useState(false);
  const [isMonitorCollapsed, setIsMonitorCollapsed] = useState(false);

  // Live real-time clock tick (every 1 second)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleString('vi-VN'));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Zustand stores
  const canvas = useCanvasStore();
  const sim = useSimulationStore();
  const ui = useUIStore();

  // Refs
  const consoleBottomRef = useRef(null);
  const canvasContainerRef = useRef(null);
  const studentHeaderRef = useRef(null);
  const studentWatermarkRef = useRef(null);

  // Mô phỏng (system interface, audio, mock hardware classes) — xem src/hooks/useSimulationEngine.js
  const { startSimulation, stopSimulation } = useSimulationEngine(code);

  // Tương tác canvas (pan/zoom/kéo thả/nối dây/auto-tools) — xem src/hooks/useCanvasInteractions.js
  const {
    canvasRef, handleAutoLine, handleAutoConnectI2C, handleMouseDownCanvas, handleMouseDownComponent,
    handleMouseDownWaypoint, handleMouseMove, handleMouseUp, handleWheel, handleTouchStart, handleTouchMove,
    addComponentToCanvas, deleteSelected, getPortCanvasCoords, handlePortClick, selectWire,
    handleDoubleClickWire, handleDoubleClickWaypoint, generateWirePath, getWireHandles,
  } = useCanvasInteractions({ canvas, sim });

  // Initialize on mount
  useEffect(() => {
    const saved = ui.loadAutoSave();
    if (saved && saved.components) {
      canvas.loadState(saved.components, saved.wires || []);
      setCode(saved.code || PROJECT_PRESETS.blink.code);
    } else {
      canvas.loadState(PROJECT_PRESETS.blink.components, PROJECT_PRESETS.blink.wires);
    }
    ui.initProjects();

    const student = ui.loadStudentInfo();
    if (!student || !student.studentId) {
      ui.setStudentModalOpen(true);
    }

    const tutShown = localStorage.getItem('iot_tutorial_shown');
    if (!tutShown) {
      ui.setTutorialOpen(true);
      localStorage.setItem('iot_tutorial_shown', 'true');
    }
  }, []);

  // Chống chỉnh sửa DOM thông tin Sinh viên / cảnh báo DevTools — xem src/hooks/useIntegrityGuard.js
  useIntegrityGuard({
    studentHeaderRef,
    studentWatermarkRef,
    studentInfo: ui.studentInfo,
    logToConsole: sim.logToConsole,
    loadStudentInfo: ui.loadStudentInfo,
  });

  // Auto-save debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      ui.autoSave({
        components: canvas.components,
        wires: canvas.wires,
        code,
      });
    }, 2000);
    return () => clearTimeout(timer);
  }, [canvas.components, canvas.wires, code]);

  // Auto-scroll console
  useEffect(() => {
    if (consoleBottomRef.current) {
      consoleBottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [sim.consoleLogs]);

  // ─── Project Management ──────────────────────
  // nameOverride: cho phép Quản lý Project truyền tên mới khi "Lưu" (trước đây bị bỏ qua,
  // luôn ghi đè lên project hiện tại bất kể người dùng gõ tên gì). Ctrl+S / nút Lưu nhanh
  // gọi không truyền tham số nên vẫn dùng tên project hiện tại như cũ.
  const handleQuickSave = (nameOverride) => {
    const name = (typeof nameOverride === 'string' && nameOverride.trim()) || ui.currentProjectName || 'Untitled Project';
    ui.saveProject(name, {
      code,
      components: canvas.components,
      wires: canvas.wires,
    });
    sim.logToConsole('💾 Đã lưu project: ' + name);
  };

  const handleDeleteProject = (name) => {
    ui.deleteProject(name);
    sim.logToConsole('🗑️ Đã xóa project: ' + name);
  };

  const handleLoadProject = (proj) => {
    canvas.loadState(proj.data.components, proj.data.wires);
    setCode(proj.data.code || '');
    ui.setCurrentProjectName(proj.name);
    sim.clearLogs();
    sim.logToConsole('📂 Đã tải project: ' + proj.name);
  };

  const handleExportJSON = () => {
    ui.exportProject(ui.currentProjectName, {
      code,
      components: canvas.components,
      wires: canvas.wires,
    });
  };

  const handleImportJSON = (data) => {
    canvas.loadState(data.components || [], data.wires || []);
    if (data.code) setCode(data.code);
    if (data.name) ui.setCurrentProjectName(data.name);
    sim.clearLogs();
    sim.logToConsole('📥 Đã import project: ' + (data.name || 'Unknown'));
  };

  const handleExportIno = () => {
    ui.exportIno(code, ui.currentProjectName);
  };

  useKeyboardShortcuts({ canvas, sim, startSimulation, stopSimulation, deleteSelected, handleQuickSave });

  // ─── Export Canvas as High-Contrast PNG ──────────────────────
  const handleExportPNG = async () => {
    if (!canvasContainerRef.current) return;
    try {
      const dataUrl = await toPng(canvasContainerRef.current, {
        backgroundColor: ui.isDarkMode ? '#0B0F19' : '#F8FAFC',
        fontEmbedCSS: '', // Bypass CORS CSS font errors
        filter: (node) => {
          if (node.classList && node.classList.contains('no-export')) {
            return false;
          }
          return true;
        },
        pixelRatio: 2, // Ultra HD high resolution
      });
      const a = document.createElement('a');
      a.href = dataUrl;
      const sv = ui.studentInfo.studentId || 'SV';
      a.download = `${sv}_${ui.currentProjectName.replace(/\s/g, '_')}_circuit.png`;
      a.click();
      sim.logToConsole('🖼️ Đã xuất sơ đồ mạch PNG sắc nét HD (đã làm sạch nút UI & làm nổi bật Badge Sinh viên).');
    } catch (e) {
      sim.logToConsole('🔴 Lỗi xuất PNG: ' + e.message);
    }
  };

  // ─── Load Preset ──────────────────────
  const loadProject = (id) => {
    const proj = PROJECT_PRESETS[id];
    if (proj) {
      setSelectedProjectId(id);
      setCode(proj.code);
      canvas.loadState(proj.components, proj.wires);
      sim.clearLogs();
      sim.resetSimulation();
      if (sim.isSimulating) stopSimulation();
    }
  };

  const selectedComp = canvas.selectedCompIds.length === 1 ? canvas.components.find(c => c.id === canvas.selectedCompIds[0]) : null;

  return (
    <div className={`flex flex-col h-full w-full ${ui.isDarkMode ? 'bg-[#0B0F19] text-gray-100' : 'bg-slate-50 text-slate-800'} overflow-hidden transition-colors duration-300`}>

      <AppHeader
        ui={ui}
        sim={sim}
        canvas={canvas}
        selectedProjectId={selectedProjectId}
        currentTime={currentTime}
        studentHeaderRef={studentHeaderRef}
        onLoadProject={loadProject}
        onQuickSave={handleQuickSave}
        onExportPNG={handleExportPNG}
        onStartSimulation={startSimulation}
        onStopSimulation={stopSimulation}
        onDeleteSelected={deleteSelected}
        onAutoLine={handleAutoLine}
        onAutoConnectI2C={handleAutoConnectI2C}
      />

      {/* ═══ MAIN WORKSPACE ═══ */}
      <div className="flex flex-1 overflow-hidden relative">

        {/* LEFT PANEL: HARDWARE CATALOG SIDEBAR WITH TWO-WAY COLLAPSE ARROW */}
        <HardwareCatalogSidebar
          onAddComponent={addComponentToCanvas}
          onOpenFullCatalog={() => ui.setCatalogModalOpen(false)}
          isSimulating={sim.isSimulating}
          selectedCompId={canvas.selectedCompIds[0]}
          selectedWireId={canvas.selectedWireIds[0]}
          onDeleteSelected={deleteSelected}
          isCollapsed={isLeftPanelCollapsed}
          onToggleCollapse={() => setIsLeftPanelCollapsed(!isLeftPanelCollapsed)}
        />

        <main className="flex-1 flex flex-col relative overflow-hidden" ref={canvasRef}>

          {/* Canvas Help Banner */}
          <div className="absolute top-3 left-3 z-10 flex items-center gap-2 pointer-events-none no-export">
            <span className={`flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-semibold rounded-full border shadow-sm ${
              ui.isDarkMode ? 'bg-[#131929] border-white/10 text-gray-300' : 'bg-white border-slate-200 text-slate-600'
            }`}>
              Double-click dây để thêm nút nắn | Kéo nút để dịch chuyển | Double-click nút để xóa
            </span>
          </div>

          {/* Zoom Controls */}
          <div className={`absolute top-3 right-3 z-10 flex items-center gap-1 p-1 rounded-xl shadow-md border no-export ${
            ui.isDarkMode ? 'bg-[#131929] border-white/10' : 'bg-white border-slate-200'
          }`}>
            <button onClick={() => canvas.setZoom(canvas.zoom + 0.15)} className={`p-1.5 rounded-lg transition-all ${ui.isDarkMode ? 'text-gray-300 hover:bg-white/10' : 'text-slate-600 hover:bg-slate-100'}`}>
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <span className="text-[10px] font-mono font-bold px-1.5 text-emerald-600">{Math.round(canvas.zoom * 100)}%</span>
            <button onClick={() => canvas.setZoom(canvas.zoom - 0.15)} className={`p-1.5 rounded-lg transition-all ${ui.isDarkMode ? 'text-gray-300 hover:bg-white/10' : 'text-slate-600 hover:bg-slate-100'}`}>
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <div className={`w-px h-4 mx-0.5 ${ui.isDarkMode ? 'bg-white/10' : 'bg-slate-200'}`} />
            <button onClick={() => { canvas.setZoom(1.0); canvas.setPan({ x: 0, y: 0 }); }} className={`p-1.5 rounded-lg transition-all ${ui.isDarkMode ? 'text-gray-300 hover:bg-white/10' : 'text-slate-600 hover:bg-slate-100'}`}>
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* SVG Canvas & Notes */}
          <div
            ref={canvasContainerRef}
            className={`flex-1 canvas-grid relative overflow-hidden ${canvas.isPlacingNote ? 'cursor-crosshair' : 'cursor-grab active:cursor-grabbing'}`}
            onMouseDown={handleMouseDownCanvas}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onWheel={handleWheel}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={() => handleMouseUp()}
          >
            {/* Tinkercad Canvas Sticky Notes */}
            <CanvasNotesRender zoom={canvas.zoom} pan={canvas.pan} />
            {/* Canvas Corner Watermark (Baked into PNG Export with High Contrast & DOM Protection) */}
            <div className="absolute bottom-4 right-4 z-20 pointer-events-none select-none flex flex-col items-end shadow-2xl">
              <div className="flex flex-col items-end gap-1 px-4 py-2.5 rounded-2xl bg-[#0F172A] text-white border-2 border-emerald-400 shadow-2xl">
                {/* Chỉ phần thông tin tĩnh nằm trong vùng chống chỉnh sửa DOM — đồng hồ chạy mỗi giây
                    được đặt NGOÀI vùng này để tránh tự báo động nhầm mỗi giây (xem useIntegrityGuard) */}
                <div ref={studentWatermarkRef} className="flex flex-col items-end gap-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[12px] font-extrabold uppercase tracking-wider text-emerald-400 flex items-center gap-1">
                      🎓 SV: {ui.studentInfo.name || 'Chưa khai báo'}
                    </span>
                    <span className="text-[12px] font-mono font-bold text-gray-100">
                      (MSSV: <strong className="text-amber-400 font-extrabold">{ui.studentInfo.studentId || 'N/A'}</strong>)
                    </span>
                    {ui.studentInfo.className && (
                      <span className="text-[11px] font-mono font-bold text-slate-200 bg-white/15 px-2 py-0.5 rounded border border-white/20">
                        Lớp: {ui.studentInfo.className}
                      </span>
                    )}
                  </div>
                  <span className="self-end text-[12px] font-mono font-extrabold bg-emerald-600 text-white px-2.5 py-0.5 rounded-lg shadow-md tracking-wider flex items-center gap-1">
                    <Lock className="w-3.5 h-3.5 text-emerald-200" />
                    {ui.studentInfo.authHash || 'IOT-VALIDATED'}
                  </span>
                </div>
                <span className="self-end text-[11px] font-mono text-emerald-300 font-bold mt-0.5">
                  · {currentTime}
                </span>
              </div>
            </div>

            <svg className="w-full h-full">
              <g transform={`translate(${canvas.pan.x}, ${canvas.pan.y}) scale(${canvas.zoom})`}>
                {/* Wires & Waypoints */}
                {canvas.wires.map((w, index) => {
                  const start = getPortCanvasCoords(w.from.componentId, w.from.portId);
                  const end = getPortCanvasCoords(w.to.componentId, w.to.portId);
                  const pathData = generateWirePath(start, end, w.waypoints, index);
                  const isSelected = canvas.selectedWireIds.includes(w.id);
                  const handles = getWireHandles(w, start, end);

                  return (
                    <g key={w.id} onClick={(e) => selectWire(e, w.id)} onDoubleClick={(e) => handleDoubleClickWire(e, w.id)}>
                      <path d={pathData} fill="none" stroke="transparent" strokeWidth="16" className="cursor-pointer" />
                      <path d={pathData} fill="none" stroke={isSelected ? '#2563EB' : w.color} strokeWidth={isSelected ? '4' : '2.5'} strokeLinejoin="round" strokeLinecap="round" className="wire-path" />
                      {sim.isSimulating && <path d={pathData} fill="none" stroke="#FFFFFF" strokeWidth="1.5" className="wire-current opacity-80" />}

                      {/* Hookup Jumper Caps */}
                      {w.wireType === 'hookup' && (
                        <g className="pointer-events-none">
                          <circle cx={start.x} cy={start.y} r="5.5" fill="#1E293B" stroke={isSelected ? '#2563EB' : w.color} strokeWidth="1.5" />
                          <circle cx={start.x} cy={start.y} r="2.2" fill="#E2E8F0" />
                          <circle cx={end.x} cy={end.y} r="5.5" fill="#1E293B" stroke={isSelected ? '#2563EB' : w.color} strokeWidth="1.5" />
                          <circle cx={end.x} cy={end.y} r="2.2" fill="#E2E8F0" />
                        </g>
                      )}

                      {/* Alligator Clip Heads */}
                      {w.wireType === 'alligator' && (
                        <g className="pointer-events-none">
                          <circle cx={start.x} cy={start.y} r="7.5" fill={w.color} stroke="#0F172A" strokeWidth="1.5" />
                          <circle cx={start.x} cy={start.y} r="3" fill="#64748B" />
                          <circle cx={end.x} cy={end.y} r="7.5" fill={w.color} stroke="#0F172A" strokeWidth="1.5" />
                          <circle cx={end.x} cy={end.y} r="3" fill="#64748B" />
                        </g>
                      )}

                      {/* Wire Port Badges (Labels) */}
                      {(() => {
                        const renderBadge = (c, color) => {
                          if (!c.name) return null;
                          const bw = Math.max(18, c.name.length * 5.5 + 6);
                          const bh = 12;
                          let bx = c.x - bw / 2;
                          let by = c.y - bh / 2;
                          if (c.side === 'left') bx -= bw / 2 + 10;
                          else if (c.side === 'right') bx += bw / 2 + 10;
                          else if (c.side === 'top') by -= 12;
                          else if (c.side === 'bottom') by += 12;
                          
                          return (
                            <g className="pointer-events-none">
                              <rect x={bx} y={by} width={bw} height={bh} rx="3" fill={color} />
                              <text x={bx + bw / 2} y={by + 8.5} fill="#FFFFFF" fontSize="6.5" fontWeight="bold" fontFamily="monospace" textAnchor="middle">{c.name}</text>
                            </g>
                          );
                        };
                        return (
                          <g>
                            {renderBadge(start, w.color)}
                            {renderBadge(end, w.color)}
                          </g>
                        );
                      })()}

                      {!sim.isSimulating && (isSelected || (w.waypoints && w.waypoints.length > 0)) && handles.map((h, idx) => {
                        const isCustom = h.isCustom;
                        const targetIndex = isCustom ? h.index : 0;
                        const isDraggingThis = canvas.draggingWaypoint?.wireId === w.id && canvas.draggingWaypoint?.index === targetIndex;

                        return (
                          <g key={`handle_${w.id}_${idx}`}
                            onMouseDown={(e) => {
                              e.stopPropagation();
                              canvas.selectWire(w.id);
                              if (isCustom) {
                                handleMouseDownWaypoint(e, w.id, h.index);
                              } else {
                                // Convert default 90-degree corner/mid handle into explicit draggable waypoints
                                const currentWaypoints = w.waypoints ? [...w.waypoints] : [];
                                if (currentWaypoints.length === 0) {
                                  const midX = Math.round((start.x + end.x) / 2 / 10) * 10;
                                  const newWps = [
                                    { x: midX, y: start.y },
                                    { x: midX, y: end.y }
                                  ];
                                  canvas.pushHistory();
                                  canvas.setWires(useCanvasStore.getState().wires.map(wireItem =>
                                    wireItem.id === w.id ? { ...wireItem, waypoints: newWps } : wireItem
                                  ));
                                  const dragIdx = h.cornerIndex !== undefined ? h.cornerIndex : 0;
                                  canvas.setDraggingWaypoint({ wireId: w.id, index: dragIdx });
                                } else {
                                  canvas.addWireWaypoint(w.id, { x: h.x, y: h.y });
                                  canvas.setDraggingWaypoint({ wireId: w.id, index: currentWaypoints.length });
                                }
                              }
                            }}
                            onDoubleClick={(e) => {
                              if (isCustom) handleDoubleClickWaypoint(e, w.id, h.index);
                            }}
                            className="cursor-move group/handle"
                          >
                            {/* Outer Halo */}
                            <circle cx={h.x} cy={h.y} r="9" fill={isSelected ? 'rgba(37, 99, 235, 0.25)' : 'rgba(16, 185, 129, 0.2)'} className="transition-all group-hover/handle:scale-125" />
                            {/* Inner Node Circle */}
                            <circle cx={h.x} cy={h.y} r={isDraggingThis ? '6.5' : '5'} fill="#FFFFFF" stroke={isSelected ? '#2563EB' : w.color} strokeWidth="2.5" className="transition-transform group-hover/handle:scale-110 shadow-md" />
                            <title>Kéo nút vuông góc để di chuyển đường dây</title>
                          </g>
                        );
                      })}
                    </g>
                  );
                })}

                {/* Wire Creation Preview */}
                {canvas.wireStart && (
                  <path d={generateWirePath(canvas.wireStart, canvas.mousePos, [])} fill="none" stroke="#2563EB" strokeWidth="2.5" strokeDasharray="4,4" />
                )}

                {/* Components */}
                {canvas.components.map(comp => {
                  const proto = COMPONENT_TYPES[comp.type];
                  const isSelected = canvas.selectedCompIds.includes(comp.id);
                  return (
                    <g key={comp.id} transform={`translate(${comp.x}, ${comp.y})`} className="cursor-move select-none"
                      onMouseDown={(e) => handleMouseDownComponent(e, comp.id)}
                      onTouchStart={(e) => { e.stopPropagation(); handleMouseDownComponent(e, comp.id); }}
                    >
                      <CanvasComponentRender comp={comp} allComps={canvas.components} isSelected={isSelected} isSimulating={sim.isSimulating} pinStates={sim.pinStates} />
                      {/* Port Pin Sockets — Dual Ring Hardware Socket System */}
                      {proto?.ports.map(p => {
                        const connectedWire = canvas.wires.find(w =>
                          (w.from.componentId === comp.id && w.from.portId === p.id) ||
                          (w.to.componentId === comp.id && w.to.portId === p.id)
                        );
                        const isConnected = !!connectedWire;
                        const isWireStart = canvas.wireStart?.componentId === comp.id && canvas.wireStart?.portId === p.id;
                        const activeColor = isConnected ? connectedWire.color : isWireStart ? '#2563EB' : null;

                        return (
                          <g key={p.id} onClick={(e) => handlePortClick(e, comp.id, p.id, p.type)} className="cursor-pointer group/pin">
                            {/* Outer Ring (Vòng tròn ngoài) */}
                            <circle
                              cx={p.x}
                              cy={p.y}
                              r="6"
                              fill="#FFFFFF"
                              stroke={activeColor || "#64748B"}
                              strokeWidth={isConnected ? "1.8" : "1.2"}
                              className="transition-all group-hover/pin:scale-125"
                            />
                            {/* Inner Circle (Vòng tròn bên trong: Trắng trong suốt khi chưa nối, hiển thị màu dây khi đã kết nối) */}
                            <circle
                              cx={p.x}
                              cy={p.y}
                              r="3.5"
                              fill={isConnected ? activeColor : isWireStart ? "#2563EB" : "#FFFFFF"}
                              stroke={isConnected ? "#FFFFFF" : "#CBD5E1"}
                              strokeWidth="0.8"
                              className="transition-all"
                            />
                            <title>{p.name || p.pin || p.id} {isConnected ? `(Đã nối dây: ${connectedWire.color})` : '(Trắng trong suốt - Chưa nối dây)'}</title>
                          </g>
                        );
                      })}
                      {/* Pin state badges during simulation */}
                      {sim.isSimulating && proto?.ports.filter(p => p.pin !== undefined).map(p => {
                        const pinState = sim.pinStates[p.pin];
                        if (!pinState) return null;
                        const isHigh = pinState.val === 1;
                        return (
                          <g key={`badge_${p.id}`}>
                            <circle cx={p.x} cy={p.y - 12} r="6" fill={isHigh ? '#22C55E' : '#64748B'} stroke="#FFF" strokeWidth="1" className={isHigh ? 'led-glow' : ''} style={{ '--glow-color': '#22C55E' }} />
                            <text x={p.x} y={p.y - 9} fill="#FFF" fontSize="6" fontWeight="bold" textAnchor="middle">{isHigh ? 'H' : 'L'}</text>
                          </g>
                        );
                      })}
                    </g>
                  );
                })}
              </g>
            </svg>

            <SimulationControlsOverlay
              components={canvas.components}
              isSimulating={sim.isSimulating}
              zoom={canvas.zoom}
              pan={canvas.pan}
              onUpdateConfig={(id, key, val) => canvas.updateComponentConfig(id, key, val)}
            />
          </div>

          {/* Bottom Inspector */}
          {selectedComp && (
            <div className={`absolute bottom-3 left-3 right-3 border rounded-2xl p-3 shadow-2xl backdrop-blur-md z-30 flex items-center justify-between transition-all ${
              ui.isDarkMode ? 'bg-[#0F1423]/95 border-white/10 text-white' : 'bg-white/95 border-slate-200 text-slate-800'
            }`}>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600"><Sliders className="w-4 h-4" /></div>
                <div>
                  <h4 className="text-xs font-bold">{COMPONENT_TYPES[selectedComp.type]?.name} <span className="text-emerald-600">({selectedComp.id})</span></h4>
                  <p className={`text-[10px] ${ui.isDarkMode ? 'text-gray-400' : 'text-slate-500'}`}>Chỉnh giá trị cảm biến · Double-click dây để tạo nút nắn dây · Shift+Click chọn nhiều</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                {selectedComp.type === 'LED' && (
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-medium">Màu:</span>
                    <div className="flex gap-1.5">
                      {['#EF4444', '#10B981', '#2563EB', '#F59E0B', '#8B5CF6', '#EC4899'].map(c => (
                        <button key={c} onClick={() => canvas.updateComponentConfig(selectedComp.id, 'color', c)} style={{ backgroundColor: c }}
                          className={`w-5 h-5 rounded-full border-2 transition-transform ${selectedComp.config.color === c ? 'border-black dark:border-white scale-110' : 'border-transparent'}`} />
                      ))}
                    </div>
                  </div>
                )}
                {selectedComp.type === 'RESISTOR' && (
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-medium">Điện trở:</span>
                    <select value={selectedComp.config.resistance || 220} onChange={(e) => canvas.updateComponentConfig(selectedComp.id, 'resistance', parseInt(e.target.value))}
                      className="text-xs px-2 py-1 rounded-lg bg-slate-100 dark:bg-white/10 border border-slate-200 dark:border-white/10">
                      {[100, 220, 330, 470, 1000, 2200, 4700, 10000, 47000, 100000].map(v => (
                        <option key={v} value={v}>{v >= 1000 ? `${v / 1000}kΩ` : `${v}Ω`}</option>
                      ))}
                    </select>
                  </div>
                )}
                {['DHT11', 'DHT22'].includes(selectedComp.type) && (
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-medium">Nhiệt độ:</span>
                      <input type="range" min="0" max="50" value={selectedComp.config.value !== undefined ? selectedComp.config.value : 28}
                        onChange={(e) => canvas.updateComponentConfig(selectedComp.id, 'value', parseInt(e.target.value))}
                        className="w-28 accent-orange-500" />
                      <span className="text-[10px] font-mono font-bold text-orange-600 min-w-[36px]">{selectedComp.config.value || 28}°C</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-medium">Độ ẩm:</span>
                      <input type="range" min="20" max="95" value={selectedComp.config.humidity !== undefined ? selectedComp.config.humidity : 65}
                        onChange={(e) => canvas.updateComponentConfig(selectedComp.id, 'humidity', parseInt(e.target.value))}
                        className="w-28 accent-blue-500" />
                      <span className="text-[10px] font-mono font-bold text-blue-600 min-w-[36px]">{selectedComp.config.humidity || 65}%</span>
                    </div>
                  </div>
                )}
                {['HC_SR04', 'LDR', 'SOIL_MOISTURE', 'MQ2', 'POTENTIOMETER', 'RAIN_SENSOR', 'DS18B20', 'BMP280', 'ACS712'].includes(selectedComp.type) && (
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-medium">{COMPONENT_TYPES[selectedComp.type]?.defaultConfig?.label || 'Giá trị'}:</span>
                    <input type="range" min={COMPONENT_TYPES[selectedComp.type]?.defaultConfig?.min || 0} max={COMPONENT_TYPES[selectedComp.type]?.defaultConfig?.max || 1023}
                      value={selectedComp.config[Object.keys(selectedComp.config).find(k => typeof selectedComp.config[k] === 'number' && k !== 'min' && k !== 'max') || 'value'] || 0}
                      onChange={(e) => {
                        const key = Object.keys(selectedComp.config).find(k => typeof selectedComp.config[k] === 'number' && k !== 'min' && k !== 'max') || 'value';
                        canvas.updateComponentConfig(selectedComp.id, key, parseInt(e.target.value));
                      }}
                      className="w-36 accent-emerald-600" />
                    <span className="text-[10px] font-mono font-bold text-emerald-600 min-w-[40px]">
                      {selectedComp.config[Object.keys(selectedComp.config).find(k => typeof selectedComp.config[k] === 'number' && k !== 'min' && k !== 'max') || 'value'] || 0}
                    </span>
                  </div>
                )}
                <button onClick={() => canvas.duplicateSelected()} title="Nhân bản (Ctrl+D)" className="p-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 hover:bg-indigo-100 dark:hover:bg-indigo-900/40 transition-all">
                  <Copy className="w-3.5 h-3.5" />
                </button>
                <button onClick={() => canvas.clearSelection()} className="text-[10px] py-1 px-2.5 rounded-lg bg-slate-200 hover:bg-slate-300 dark:bg-white/10 dark:hover:bg-white/20 font-semibold transition-all">Đóng</button>
              </div>
            </div>
          )}
        </main>

        {/* ═══ RIGHT PANEL — Code Editor + Serial Monitor WITH TWO-WAY COLLAPSE ARROWS ═══ */}
        {isRightPanelCollapsed ? (
          <div className="w-10 border-l flex flex-col items-center py-3 bg-white dark:bg-[#0C101D] border-slate-200 dark:border-white/5 transition-all select-none">
            <button
              onClick={() => setIsRightPanelCollapsed(false)}
              title="Mở rộng Thanh Code Editor (2 chiều)"
              className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600 hover:bg-emerald-600 hover:text-white transition-all shadow-md"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          </div>
        ) : (
          <aside className="w-[440px] border-l flex flex-col overflow-hidden bg-white dark:bg-[#0C101D] border-slate-200 dark:border-white/5 transition-all relative">

            {/* Header with Two-Way Arrow Toggle */}
            <div className={`flex items-center justify-between px-4 py-2 border-b ${ui.isDarkMode ? 'bg-[#0A0D18] border-white/5' : 'bg-slate-100 border-slate-200'}`}>
              <div className="flex items-center gap-2 text-emerald-600">
                <Code className="w-4 h-4" />
                <span className="text-[10px] font-bold uppercase tracking-wider">Code Editor (C++/Arduino)</span>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={handleExportIno} title="Download .ino có kèm MSSV" className="text-[10px] text-slate-500 hover:text-emerald-600 bg-slate-200 dark:bg-white/10 px-2 py-0.5 rounded-lg transition-all flex items-center gap-1">
                  <FileCode className="w-3 h-3" /> .ino
                </button>
                <button
                  onClick={() => setIsRightPanelCollapsed(true)}
                  title="Thu hẹp Thanh Code Editor (2 chiều)"
                  className="p-1 rounded-lg hover:bg-slate-200 dark:hover:bg-white/10 text-slate-500 transition-all"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex-1 relative">
              <CodeEditor code={code} onChange={setCode} isSimulating={sim.isSimulating} isDarkMode={ui.isDarkMode} />
            </div>

            {/* SERIAL MONITOR PANEL WITH TWO-WAY UP/DOWN COLLAPSE ARROW */}
            <div className={`border-t flex flex-col overflow-hidden transition-all duration-300 ${
              isMonitorCollapsed ? 'h-9' : 'h-96'
            } ${ui.isDarkMode ? 'bg-[#080B14] border-white/5' : 'bg-slate-50 border-slate-200'}`}>
              <div className={`flex items-center justify-between px-4 py-1.5 border-b cursor-pointer select-none ${ui.isDarkMode ? 'bg-[#090C15] border-white/5' : 'bg-slate-100 border-slate-200'}`}
                onClick={() => setIsMonitorCollapsed(!isMonitorCollapsed)}
              >
                <div className="flex items-center gap-2 text-emerald-600">
                  <Terminal className="w-3.5 h-3.5" />
                  <span className="text-[10px] font-bold uppercase tracking-wider">Serial Monitor ({sim.consoleLogs.length})</span>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={(e) => { e.stopPropagation(); sim.clearLogs(); }} className="text-[10px] text-slate-500 hover:text-slate-800 dark:hover:text-white bg-slate-200 dark:bg-white/10 px-2 py-0.5 rounded-lg transition-all">Xóa</button>
                  <button
                    title={isMonitorCollapsed ? 'Mở rộng Monitor (2 chiều)' : 'Thu hẹp Monitor (2 chiều)'}
                    className="p-0.5 rounded-lg hover:bg-slate-200 dark:hover:bg-white/10 text-slate-500 transition-all"
                  >
                    {isMonitorCollapsed ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {!isMonitorCollapsed && (
                <div className={`flex-1 p-3 overflow-y-auto font-mono text-xs space-y-0.5 ${ui.isDarkMode ? 'bg-[#07090F] text-gray-300' : 'bg-slate-900 text-slate-200'}`}>
                  {sim.consoleLogs.length === 0 ? (
                    <div className="text-slate-500 text-center py-6">Bấm "Chạy" để xem Serial output.</div>
                  ) : (
                    sim.consoleLogs.map((log, i) => (
                      <div key={i} className="flex gap-2 leading-relaxed hover:bg-white/5 rounded px-1">
                        <span className="text-slate-500 select-none text-[10px]">{log.time}</span>
                        <span className={log.text.startsWith('🔴') ? 'text-rose-400' : log.text.startsWith('ℹ️') ? 'text-sky-400' : log.text.startsWith('💾') || log.text.startsWith('📂') || log.text.startsWith('📥') ? 'text-violet-400' : 'text-emerald-300'}>{log.text}</span>
                      </div>
                    ))
                  )}
                  <div ref={consoleBottomRef} />
                </div>
              )}
            </div>
          </aside>
        )}
      </div>

      {/* ═══ MODALS ═══ */}
      <StudentModal
        isOpen={ui.isStudentModalOpen}
        onClose={() => ui.setStudentModalOpen(false)}
        onSave={(info) => {
          ui.setStudentInfo(info);
          sim.logToConsole(`🎓 Đã cập nhật sinh viên thực hiện: ${info.name} (${info.studentId})`);
        }}
      />

      <CatalogModal isOpen={ui.isCatalogModalOpen} onClose={() => ui.setCatalogModalOpen(false)} onAddComponent={addComponentToCanvas} />

      <ProjectManager
        isOpen={ui.isProjectManagerOpen}
        onClose={() => ui.setProjectManagerOpen(false)}
        onSave={handleQuickSave}
        onLoad={handleLoadProject}
        onExportJSON={handleExportJSON}
        onImportJSON={handleImportJSON}
        onExportIno={handleExportIno}
        onDeleteProject={handleDeleteProject}
        savedProjects={ui.savedProjects.length ? ui.savedProjects : ui.loadAllProjects()}
        currentProjectName={ui.currentProjectName}
      />

      <TutorialOverlay
        isOpen={ui.isTutorialOpen}
        step={ui.tutorialStep}
        onClose={() => ui.setTutorialOpen(false)}
        onNext={() => ui.setTutorialStep(ui.tutorialStep + 1)}
        onPrev={() => ui.setTutorialStep(Math.max(0, ui.tutorialStep - 1))}
      />
    </div>
  );
}
