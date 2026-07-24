/**
 * Global keyboard shortcuts cho khu vực làm việc: undo/redo, lưu nhanh, xoá,
 * nhân bản, chạy/dừng mô phỏng, zoom, escape.
 */
import { useEffect } from 'react';

export function useKeyboardShortcuts({ canvas, sim, startSimulation, stopSimulation, deleteSelected, handleQuickSave }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      const isMod = e.ctrlKey || e.metaKey;
      const isEditableTarget = () =>
        document.activeElement?.tagName === 'TEXTAREA' || !!document.activeElement?.closest('.monaco-editor');

      if (isMod && !e.shiftKey && e.key === 'z') {
        if (!isEditableTarget()) {
          e.preventDefault();
          canvas.undo();
        }
      }
      if (isMod && (e.key === 'y' || (e.shiftKey && e.key === 'z' || e.key === 'Z'))) {
        if (!isEditableTarget()) {
          e.preventDefault();
          canvas.redo();
        }
      }
      if (isMod && e.key === 's') {
        e.preventDefault();
        handleQuickSave();
      }
      if (e.key === 'Delete' || e.key === 'Backspace') {
        if (document.activeElement?.tagName !== 'TEXTAREA' && document.activeElement?.tagName !== 'INPUT' && !document.activeElement?.closest('.monaco-editor')) {
          e.preventDefault();
          deleteSelected();
        }
      }
      if (isMod && e.key === 'd') {
        if (!isEditableTarget()) {
          e.preventDefault();
          canvas.duplicateSelected();
        }
      }
      if (isMod && e.shiftKey && e.key === 'R') {
        e.preventDefault();
        if (sim.isSimulating) stopSimulation(); else startSimulation();
      }
      if (isMod && (e.key === '=' || e.key === '+')) {
        e.preventDefault();
        canvas.setZoom(canvas.zoom + 0.15);
      }
      if (isMod && e.key === '-') {
        e.preventDefault();
        canvas.setZoom(canvas.zoom - 0.15);
      }
      if (isMod && e.key === '0') {
        e.preventDefault();
        canvas.setZoom(1.0);
        canvas.setPan({ x: 0, y: 0 });
      }
      if (e.key === 'Escape') {
        canvas.clearSelection();
        canvas.setWireStart(null);
        canvas.setDraggingWaypoint(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [canvas.zoom, sim.isSimulating]);
}
