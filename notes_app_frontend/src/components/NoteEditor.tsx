import React, { useEffect, useRef, useState } from "react";
import { Note } from "../types/note";

type Props = {
  note: Note;
  onChange: (patch: Partial<Note>) => void;
  onPreview: () => void;
};

// PUBLIC_INTERFACE
const NoteEditor: React.FC<Props> = ({ note, onChange, onPreview }) => {
  /**
   * Editable Title and Content with autosave to parent state.
   * Debounced updates for smooth typing.
   */
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);
  const debounceRef = useRef<number | null>(null);

  // Keep local state in sync when selection changes
  useEffect(() => {
    setTitle(note.title);
    setContent(note.content);
  }, [note.id]);

  // Debounce emitting changes to parent
  useEffect(() => {
    const w: any = typeof window !== "undefined" ? window : undefined;
    if (debounceRef.current && w?.clearTimeout) {
      w.clearTimeout(debounceRef.current);
    }
    const schedule = (w?.setTimeout ? w.setTimeout : setTimeout) as unknown as (
      handler: () => void,
      timeout: number
    ) => number;
    debounceRef.current = schedule(() => {
      onChange({ title, content });
    }, 250);

    return () => {
      if (debounceRef.current && w?.clearTimeout) {
        w.clearTimeout(debounceRef.current);
      }
    };
  }, [title, content, onChange]);

  return (
    <div className="editor">
      <div className="editor-header">
        <input
          className="title-input"
          aria-label="Note title"
          placeholder="Note title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="editor-actions">
          <button className="btn primary" onClick={onPreview}>
            Preview
          </button>
        </div>
      </div>
      <div className="editor-body">
        <textarea
          className="content-textarea"
          aria-label="Note content"
          placeholder="Write your note here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
    </div>
  );
};

export default NoteEditor;
