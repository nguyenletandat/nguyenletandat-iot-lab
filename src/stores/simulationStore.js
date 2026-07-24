/**
 * Simulation Store — Pin states, console logs, simulation lifecycle
 */
import { create } from 'zustand';

export const useSimulationStore = create((set, get) => ({
  isSimulating: false,
  consoleLogs: [],
  audioEnabled: true,
  pinStates: {},

  setIsSimulating: (v) => set({ isSimulating: v }),
  setAudioEnabled: (v) => set({ audioEnabled: v }),
  setPinStates: (updater) => {
    if (typeof updater === 'function') {
      set(s => ({ pinStates: updater(s.pinStates) }));
    } else {
      set({ pinStates: updater });
    }
  },

  logToConsole: (msg) => {
    set(s => ({
      consoleLogs: [...s.consoleLogs, { text: msg, time: new Date().toLocaleTimeString() }],
    }));
  },
  clearLogs: () => set({ consoleLogs: [] }),

  resetSimulation: () => set({
    isSimulating: false,
    pinStates: {},
  }),
}));
