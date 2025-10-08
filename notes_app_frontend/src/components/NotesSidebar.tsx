import React from "react";
import { Note } from "../types/note";

type Props = {
  notes: Note[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onAdd: () => void;
  onDelete: (id: string) => void;
};

// PUBLIC_INTERFACE
const NotesSidebar: React.FC<Props> = ({
  notes,
  selectedId,
  onSelect,
  onAdd,
  onDelete,
}) => {
  /** Displays notes in a list with create and delete actions. */
  return (
    <div className="notes-sidebar">
      <div className="sidebar-header">
        <h2>Notes</h2>
        <button className="btn subtle" onClick={onAdd} aria-label="Add note">
          + New
        </button>
      </div>
      <ul className="notes-list" role="list" aria-label="Notes list">
        {notes.map((note) => {
          const isSelected = note.id === selectedId;
          return (
            <li key={note.id}>
              <button
                className={`note-item ${isSelected ? "selected" : ""}`}
                onClick={() => onSelect(note.id)}
                aria-current={isSelected ? "true" : undefined}
                title={note.title}
              >
                <div className="note-title">{note.title || "Untitled"}</div>
                <div className="note-meta">
                  {new Date(note.updatedAt).toLocaleString()}
                </div>
              </button>
              <button
                className="icon-btn danger"
                aria-label={`Delete ${note.title || "note"}`}
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(note.id);
                }}
                title="Delete note"
              >
                ✕
              </button>
            </li>
          );
        })}
        {notes.length === 0 && (
          <li className="empty-row" aria-live="polite">
            No notes yet.
          </li>
        )}
      </ul>
    </div>
  );
};

export default NotesSidebar;
