import React, { useState, useRef } from 'react';
import { StickyNote, Trash2, X } from 'lucide-react';
import { useCanvasStore } from '../stores/canvasStore';

export default function CanvasNotesRender({ zoom, pan }) {
  const notes = useCanvasStore(s => s.notes);
  const notesVisible = useCanvasStore(s => s.notesVisible);
  const updateNoteText = useCanvasStore(s => s.updateNoteText);
  const removeNote = useCanvasStore(s => s.removeNote);

  const [draggingNoteId, setDraggingNoteId] = useState(null);
  const dragStartRef = useRef({ x: 0, y: 0, noteX: 0, noteY: 0 });

  if (!notesVisible || !notes || notes.length === 0) return null;

  const handleMouseDown = (e, note) => {
    e.stopPropagation();
    setDraggingNoteId(note.id);
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      noteX: note.x,
      noteY: note.y
    };

    const handleMouseMove = (moveEvt) => {
      const dx = (moveEvt.clientX - dragStartRef.current.x) / zoom;
      const dy = (moveEvt.clientY - dragStartRef.current.y) / zoom;
      const newX = Math.round((dragStartRef.current.noteX + dx) / 10) * 10;
      const newY = Math.round((dragStartRef.current.noteY + dy) / 10) * 10;

      useCanvasStore.setState(s => ({
        notes: s.notes.map(n => n.id === note.id ? { ...n, x: newX, y: newY } : n)
      }));
    };

    const handleMouseUp = () => {
      setDraggingNoteId(null);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-25">
      <div
        className="w-full h-full relative"
        style={{
          transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
          transformOrigin: '0 0'
        }}
      >
        {notes.map(note => (
          <div
            key={note.id}
            style={{ left: `${note.x}px`, top: `${note.y}px` }}
            className="absolute pointer-events-auto flex flex-col w-56 rounded-2xl bg-amber-100 dark:bg-amber-950/90 border-2 border-amber-300 dark:border-amber-600/60 shadow-2xl backdrop-blur-md transition-all group no-export"
          >
            {/* Note Pin & Header */}
            <div
              onMouseDown={(e) => handleMouseDown(e, note)}
              className="flex items-center justify-between px-3 py-1.5 bg-amber-200/80 dark:bg-amber-900/80 rounded-t-2xl cursor-move border-b border-amber-300 dark:border-amber-700/50 select-none"
            >
              <span className="text-[10px] font-extrabold text-amber-900 dark:text-amber-200 flex items-center gap-1 uppercase tracking-wider">
                <StickyNote className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                Ghi chú (Note)
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeNote(note.id);
                }}
                title="Xóa ghi chú này"
                className="p-1 rounded-lg hover:bg-rose-500 hover:text-white text-amber-800 dark:text-amber-300 transition-all"
              >
                <X className="w-3 h-3" />
              </button>
            </div>

            {/* Editable Content */}
            <div className="p-2.5">
              <textarea
                value={note.text || ''}
                onChange={(e) => updateNoteText(note.id, e.target.value)}
                placeholder="Nhập nội dung ghi chú ở đây..."
                rows={3}
                className="w-full bg-transparent text-xs font-semibold text-amber-950 dark:text-amber-100 placeholder-amber-700/50 dark:placeholder-amber-400/50 resize-none outline-none border-none leading-relaxed"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
