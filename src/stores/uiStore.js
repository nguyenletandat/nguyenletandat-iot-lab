/**
 * UI Store — Theme, modals, tutorial, project management, hardware fingerprinting
 */
import { create } from 'zustand';

const STORAGE_KEY = 'iot_labs_projects';
const CURRENT_PROJECT_KEY = 'iot_labs_current';
const STUDENT_KEY = 'iot_student_info';

/**
 * Generates a deterministic Hardware & System Fingerprint for the current machine/computer.
 * Uses CPU core count, RAM, Screen resolution, Canvas GPU renderer fingerprinting, and Timezone offset.
 */

const getHardwareFingerprint = () => {
  try {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.textBaseline = 'top';
      ctx.font = "14px 'Arial'";
      ctx.fillStyle = '#f60';
      ctx.fillRect(125, 1, 62, 20);
      ctx.fillStyle = '#069';
      ctx.fillText('IoT-Labs-Hardware-Fingerprint', 2, 15);
      ctx.fillStyle = 'rgba(102, 204, 0, 0.7)';
      ctx.fillText('IoT-Labs-Hardware-Fingerprint', 4, 17);
    }
    const canvasData = canvas.toDataURL ? canvas.toDataURL() : 'canvas-fallback';

    const rawSignals = [
      navigator.hardwareConcurrency || 4,
      navigator.deviceMemory || 8,
      window.screen?.width || 1920,
      window.screen?.height || 1080,
      window.screen?.colorDepth || 24,
      navigator.userAgent || '',
      navigator.language || 'vi',
      new Date().getTimezoneOffset(),
      canvasData.slice(-100)
    ].join('||');

    // FNV-1a 32-bit Hash
    let hash = 2166136261;
    for (let i = 0; i < rawSignals.length; i++) {
      hash ^= rawSignals.charCodeAt(i);
      hash += (hash << 1) + (hash << 4) + (hash << 7) + (hash << 8) + (hash << 24);
    }
    return (hash >>> 0).toString(16).toUpperCase().padStart(8, '0');
  } catch (e) {
    return 'MAC-HARDWARE-8F73A9B2';
  }
};

const CUSTOM_MODULES_KEY = 'iot_my_custom_modules';

export const useUIStore = create((set, get) => ({
  isDarkMode: false,
  isCatalogModalOpen: false,
  isProjectManagerOpen: false,
  isTutorialOpen: false,
  isStudentModalOpen: false,
  tutorialStep: 0,
  showTutorialOnStart: true,
  myModules: [],

  // Student Identity Info (Anti-Plagiarism & Hardware Signature)
  studentInfo: {
    name: '',
    studentId: '',
    className: '',
    startTime: '',
    authHash: '',
    hardwareMac: ''
  },

  // Project management
  savedProjects: [],
  currentProjectName: 'Untitled Project',

  toggleDarkMode: () => {
    set(s => {
      const next = !s.isDarkMode;
      if (next) document.body.classList.add('dark');
      else document.body.classList.remove('dark');
      return { isDarkMode: next };
    });
  },
  setDarkMode: (v) => {
    if (v) document.body.classList.add('dark');
    else document.body.classList.remove('dark');
    set({ isDarkMode: v });
  },
  setCatalogModalOpen: (v) => set({ isCatalogModalOpen: v }),
  setProjectManagerOpen: (v) => set({ isProjectManagerOpen: v }),
  setTutorialOpen: (v) => set({ isTutorialOpen: v }),
  setStudentModalOpen: (v) => set({ isStudentModalOpen: v }),
  setTutorialStep: (v) => set({ tutorialStep: v }),
  setCurrentProjectName: (name) => set({ currentProjectName: name }),

  // Student Identity & Hardware MAC-Fingerprint Management
  setStudentInfo: (info) => {
    const startTime = info.startTime || new Date().toLocaleString('vi-VN');
    const hardwareMac = getHardwareFingerprint();
    const authHash = `IOT-${(info.studentId || 'SV').toUpperCase()}-${hardwareMac}`;

    const fullInfo = {
      ...info,
      startTime,
      hardwareMac,
      authHash
    };
    try {
      localStorage.setItem(STUDENT_KEY, JSON.stringify(fullInfo));
    } catch (e) {}
    set({ studentInfo: fullInfo });
  },

  loadStudentInfo: () => {
    try {
      const raw = localStorage.getItem(STUDENT_KEY);
      if (raw) {
        const info = JSON.parse(raw);
        // Ensure hardware hash is tied to the current machine
        const currentHardwareMac = getHardwareFingerprint();
        const authHash = `IOT-${(info.studentId || 'SV').toUpperCase()}-${currentHardwareMac}`;
        const updated = { ...info, hardwareMac: currentHardwareMac, authHash };
        set({ studentInfo: updated });
        return updated;
      }
    } catch (e) {}
    return null;
  },

  // Save project to localStorage
  saveProject: (name, data) => {
    const projects = get().loadAllProjects();
    const existing = projects.findIndex(p => p.name === name);
    const entry = {
      name,
      data,
      studentInfo: get().studentInfo,
      updatedAt: new Date().toISOString(),
      createdAt: existing >= 0 ? projects[existing].createdAt : new Date().toISOString(),
    };
    if (existing >= 0) {
      projects[existing] = entry;
    } else {
      projects.push(entry);
    }
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
    } catch (e) {
      console.warn('Failed to save to localStorage:', e);
    }
    set({ savedProjects: projects, currentProjectName: name });
  },

  // Load all saved projects from localStorage
  loadAllProjects: () => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  },

  // Delete a saved project
  deleteProject: (name) => {
    const projects = get().loadAllProjects().filter(p => p.name !== name);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
    } catch (e) {}
    set({ savedProjects: projects });
  },

  // Auto-save current state
  autoSave: (data) => {
    try {
      localStorage.setItem(CURRENT_PROJECT_KEY, JSON.stringify({
        ...data,
        studentInfo: get().studentInfo,
        savedAt: new Date().toISOString(),
      }));
    } catch (e) {}
  },

  // Load auto-saved state
  loadAutoSave: () => {
    try {
      const raw = localStorage.getItem(CURRENT_PROJECT_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  },

  // Export project as JSON file
  exportProject: (name, data) => {
    const student = get().studentInfo;
    const blob = new Blob([JSON.stringify({
      name,
      studentInfo: student,
      ...data,
      exportedAt: new Date().toISOString()
    }, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${(student.studentId || 'SV')}_${name.replace(/[^a-zA-Z0-9_-]/g, '_')}.iot.json`;
    a.click();
    URL.revokeObjectURL(url);
  },

  // Export Arduino .ino file with Student Identity & Hardware Fingerprint Header
  exportIno: (code, name) => {
    const student = get().studentInfo;
    const header = `// ========================================================\n` +
      `// BÀI THỰC HÀNH HỆ THỐNG IOT & MÔ PHỎNG MẠCH\n` +
      `// Sinh viên thực hiện: ${student.name || 'Chưa khai báo'}\n` +
      `// Mã số sinh viên (MSSV): ${student.studentId || 'N/A'}\n` +
      `// Lớp / Khóa: ${student.className || 'N/A'}\n` +
      `// Thời gian khởi tạo: ${student.startTime || new Date().toLocaleString('vi-VN')}\n` +
      `// Mã định danh phần cứng máy (Hardware Fingerprint): ${student.hardwareMac || 'N/A'}\n` +
      `// Mã xác thực chống chép bài: ${student.authHash || 'IOT-VALIDATED'}\n` +
      `// ========================================================\n\n`;

    const blob = new Blob([header + code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${(student.studentId || 'SV')}_${name.replace(/[^a-zA-Z0-9_-]/g, '_')}.ino`;
    a.click();
    URL.revokeObjectURL(url);
  },

  loadMyModules: () => {
    try {
      const raw = localStorage.getItem(CUSTOM_MODULES_KEY);
      const modules = raw ? JSON.parse(raw) : [];
      set({ myModules: modules });
      return modules;
    } catch {
      return [];
    }
  },

  addMyModule: (mod) => {
    const modules = get().loadMyModules();
    const existingIdx = modules.findIndex(m => m.id === mod.id);
    if (existingIdx >= 0) {
      modules[existingIdx] = mod;
    } else {
      modules.push(mod);
    }
    try {
      localStorage.setItem(CUSTOM_MODULES_KEY, JSON.stringify(modules));
    } catch (e) {}
    set({ myModules: modules });
  },

  deleteMyModule: (id) => {
    const modules = get().loadMyModules().filter(m => m.id !== id);
    try {
      localStorage.setItem(CUSTOM_MODULES_KEY, JSON.stringify(modules));
    } catch (e) {}
    set({ myModules: modules });
  },

  initProjects: () => {
    const projects = get().loadAllProjects();
    get().loadMyModules();
    set({ savedProjects: projects });
  },
}));
