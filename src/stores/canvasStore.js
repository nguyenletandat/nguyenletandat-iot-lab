/**
 * Canvas Store — Zustand-based state management for components, wires, waypoints, zoom/pan, undo/redo
 */
import { create } from 'zustand';

const MAX_HISTORY = 50;

function cloneState(state) {
  return {
    components: JSON.parse(JSON.stringify(state.components)),
    wires: JSON.parse(JSON.stringify(state.wires)),
    notes: JSON.parse(JSON.stringify(state.notes || [])),
  };
}

export const useCanvasStore = create((set, get) => ({
  // Canvas items
  components: [],
  wires: [],
  notes: [],

  // Notes Tool state
  isPlacingNote: false,
  notesVisible: true,

  togglePlacingNote: () => set(s => ({ isPlacingNote: !s.isPlacingNote })),
  toggleNotesVisibility: () => set(s => ({ notesVisible: !s.notesVisible })),
  addNote: (note) => {
    get().pushHistory();
    set(s => ({ notes: [...s.notes, note], isPlacingNote: false }));
  },
  updateNoteText: (id, text) => {
    set(s => ({ notes: s.notes.map(n => n.id === id ? { ...n, text } : n) }));
  },
  removeNote: (id) => {
    get().pushHistory();
    set(s => ({ notes: s.notes.filter(n => n.id !== id) }));
  },

  // Zoom & Pan
  zoom: 1.0,
  pan: { x: 0, y: 0 },

  // Selection (multi-select support)
  selectedCompIds: [],
  selectedWireIds: [],

  // Drag state for components & wire waypoints
  draggingCompId: null,
  // Active Wire Styling (Tinkercad-style Wire Color & Wire Type)
  activeWireColor: '#2563EB',
  activeWireType: 'normal',

  setActiveWireColor: (color) => {
    const { selectedWireIds, wires } = get();
    set({ activeWireColor: color });
    if (selectedWireIds.length > 0) {
      get().pushHistory();
      set({
        wires: wires.map(w => selectedWireIds.includes(w.id) ? { ...w, color } : w)
      });
    }
  },

  setActiveWireType: (wireType) => {
    const { selectedWireIds, wires } = get();
    set({ activeWireType: wireType });
    if (selectedWireIds.length > 0) {
      get().pushHistory();
      set({
        wires: wires.map(w => selectedWireIds.includes(w.id) ? { ...w, wireType } : w)
      });
    }
  },

  // Panning
  isPanning: false,
  panStart: { x: 0, y: 0 },

  // Undo/Redo history
  history: [],
  historyIndex: -1,

  // Push to undo history
  pushHistory: () => {
    const { components, wires, notes, history, historyIndex } = get();
    const snapshot = cloneState({ components, wires, notes });
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(snapshot);
    if (newHistory.length > MAX_HISTORY) newHistory.shift();
    set({ history: newHistory, historyIndex: newHistory.length - 1 });
  },

  undo: () => {
    const { history, historyIndex } = get();
    if (historyIndex <= 0) return;
    const newIndex = historyIndex - 1;
    const snapshot = history[newIndex];
    set({
      components: JSON.parse(JSON.stringify(snapshot.components)),
      wires: JSON.parse(JSON.stringify(snapshot.wires)),
      notes: JSON.parse(JSON.stringify(snapshot.notes || [])),
      historyIndex: newIndex,
      selectedCompIds: [],
      selectedWireIds: [],
    });
  },

  redo: () => {
    const { history, historyIndex } = get();
    if (historyIndex >= history.length - 1) return;
    const newIndex = historyIndex + 1;
    const snapshot = history[newIndex];
    set({
      components: JSON.parse(JSON.stringify(snapshot.components)),
      wires: JSON.parse(JSON.stringify(snapshot.wires)),
      notes: JSON.parse(JSON.stringify(snapshot.notes || [])),
      historyIndex: newIndex,
      selectedCompIds: [],
      selectedWireIds: [],
    });
  },

  canUndo: () => get().historyIndex > 0,
  canRedo: () => get().historyIndex < get().history.length - 1,

  // Actions
  setComponents: (components) => set({ components }),
  setWires: (wires) => set({ wires }),
  setZoom: (zoom) => set({ zoom: Math.min(Math.max(0.3, zoom), 3.0) }),
  setPan: (pan) => set({ pan }),
  setIsPanning: (v) => set({ isPanning: v }),
  setPanStart: (v) => set({ panStart: v }),
  setDraggingCompId: (v) => set({ draggingCompId: v }),
  setDragOffset: (v) => set({ dragOffset: v }),
  setDraggingWaypoint: (v) => set({ draggingWaypoint: v }),
  // wireStart != null nghia la dang giu chuot ve day; wireDraftPoints tich luy cac
  // diem gap khuc nguoi dung bam vao khoang trong trong luc do (xem handleMouseDownCanvas).
  // Xoa het khi wireStart ve null (huy hoac hoan tat day) de khong ron sang lan ve tiep theo.
  wireDraftPoints: [],
  setWireStart: (v) => set(s => ({ wireStart: v, wireDraftPoints: v ? s.wireDraftPoints : [] })),
  addWireDraftPoint: (pt) => set(s => ({ wireDraftPoints: [...s.wireDraftPoints, pt] })),
  setMousePos: (v) => set({ mousePos: v }),

  // Multi-select
  selectComponent: (id, multi = false) => {
    if (multi) {
      set(s => ({
        selectedCompIds: s.selectedCompIds.includes(id)
          ? s.selectedCompIds.filter(x => x !== id)
          : [...s.selectedCompIds, id],
        selectedWireIds: [],
      }));
    } else {
      set({ selectedCompIds: [id], selectedWireIds: [] });
    }
  },

  selectWire: (id, multi = false) => {
    if (multi) {
      set(s => ({
        selectedWireIds: s.selectedWireIds.includes(id)
          ? s.selectedWireIds.filter(x => x !== id)
          : [...s.selectedWireIds, id],
        selectedCompIds: [],
      }));
    } else {
      set({ selectedWireIds: [id], selectedCompIds: [] });
    }
  },

  clearSelection: () => set({ selectedCompIds: [], selectedWireIds: [] }),

  addComponent: (comp) => {
    get().pushHistory();
    set(s => ({ components: [...s.components, comp] }));
  },

  removeComponents: (ids) => {
    get().pushHistory();
    set(s => ({
      components: s.components.filter(c => !ids.includes(c.id)),
      wires: s.wires.filter(w => !ids.includes(w.from.componentId) && !ids.includes(w.to.componentId)),
      selectedCompIds: [],
    }));
  },

  addWire: (wire) => {
    get().pushHistory();
    set(s => ({ wires: [...s.wires, { ...wire, waypoints: wire.waypoints || [] }] }));
  },

  removeWires: (ids) => {
    get().pushHistory();
    set(s => ({
      wires: s.wires.filter(w => !ids.includes(w.id)),
      selectedWireIds: [],
    }));
  },

  // Waypoint actions for wires
  addWireWaypoint: (wireId, point) => {
    get().pushHistory();
    set(s => ({
      wires: s.wires.map(w => {
        if (w.id !== wireId) return w;
        const waypoints = w.waypoints ? [...w.waypoints] : [];
        waypoints.push(point);
        return { ...w, waypoints };
      })
    }));
  },

  updateWireWaypoint: (wireId, index, x, y) => {
    set(s => ({
      wires: s.wires.map(w => {
        if (w.id !== wireId) return w;
        const waypoints = w.waypoints ? [...w.waypoints] : [];
        waypoints[index] = { x, y };
        return { ...w, waypoints };
      })
    }));
  },

  removeWireWaypoint: (wireId, index) => {
    get().pushHistory();
    set(s => ({
      wires: s.wires.map(w => {
        if (w.id !== wireId) return w;
        const waypoints = (w.waypoints || []).filter((_, i) => i !== index);
        return { ...w, waypoints };
      })
    }));
  },

  updateComponentPosition: (id, x, y) => {
    set(s => ({
      components: s.components.map(c => c.id === id ? { ...c, x, y } : c),
    }));
  },

  updateComponentConfig: (id, key, val) => {
    set(s => ({
      components: s.components.map(c =>
        c.id === id ? { ...c, config: { ...c.config, [key]: val } } : c
      ),
    }));
  },

  duplicateSelected: () => {
    const { selectedCompIds, components, wires } = get();
    if (selectedCompIds.length === 0) return;
    get().pushHistory();

    const idMap = {};
    const newComps = selectedCompIds.map(id => {
      const comp = components.find(c => c.id === id);
      if (!comp) return null;
      const newId = `${comp.type.toLowerCase()}_${Date.now().toString().slice(-4)}_${Math.random().toString(36).slice(2, 5)}`;
      idMap[id] = newId;
      return { ...comp, id: newId, x: comp.x + 30, y: comp.y + 30, config: { ...comp.config } };
    }).filter(Boolean);

    const newWires = wires
      .filter(w => selectedCompIds.includes(w.from.componentId) && selectedCompIds.includes(w.to.componentId))
      .map(w => ({
        ...w,
        id: `wire_${Date.now()}_${Math.random().toString(36).slice(2, 5)}`,
        from: { ...w.from, componentId: idMap[w.from.componentId] || w.from.componentId },
        to: { ...w.to, componentId: idMap[w.to.componentId] || w.to.componentId },
      }));

    set(s => ({
      components: [...s.components, ...newComps],
      wires: [...s.wires, ...newWires],
      selectedCompIds: newComps.map(c => c.id),
    }));
  },

  moveSelected: (dx, dy) => {
    const { selectedCompIds } = get();
    set(s => ({
      components: s.components.map(c =>
        selectedCompIds.includes(c.id) ? { ...c, x: c.x + dx, y: c.y + dy } : c
      ),
    }));
  },

  loadState: (components, wires) => {
    set({
      components: JSON.parse(JSON.stringify(components)),
      wires: JSON.parse(JSON.stringify(wires)),
      selectedCompIds: [],
      selectedWireIds: [],
      zoom: 1.0,
      pan: { x: 0, y: 0 },
      wireStart: null,
      draggingWaypoint: null,
      history: [cloneState({ components, wires })],
      historyIndex: 0,
    });
  },

  initHistory: () => {
    const { components, wires } = get();
    set({
      history: [cloneState({ components, wires })],
      historyIndex: 0,
    });
  },
}));
