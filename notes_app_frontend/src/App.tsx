import React, { useEffect, useMemo, useState, useCallback } from "react";
import Navbar from "./components/Navbar";
import NotesSidebar from "./components/NotesSidebar";
import NoteEditor from "./components/NoteEditor";
import VideoModal from "./components/VideoModal";
import { Note } from "./types/note";
import "./styles/theme.css";
import { safeLocalStorage, safeUUID } from "./utils/env";

const STORAGE_KEY = "notes_app_notes_v1";

const initialNotes: Note[] = [
  {
    id: safeUUID(),
    title: "Welcome to Ocean Notes",
    content:
      "This is your first note. Edit the title and content, then click Preview to see a video composition.",
    updatedAt: Date.now(),
  },
];

const App: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>(() => {
    try {
      const raw = safeLocalStorage.getItem(STORAGE_KEY);
      if (!raw) return initialNotes;
      const parsed = JSON.parse(raw) as Note[];
      return parsed.length ? parsed : initialNotes;
    } catch {
      return initialNotes;
    }
  });

  const [selectedId, setSelectedId] = useState<string | null>(() =>
    notes.length ? notes[0].id : null
  );

  const selectedNote = useMemo(
    () => notes.find((n) => n.id === selectedId) || null,
    [notes, selectedId]
  );

  const [isModalOpen, setIsModalOpen] = useState(false);

  // Persist to localStorage
  useEffect(() => {
    safeLocalStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  }, [notes]);

  const addNote = useCallback(() => {
    const newNote: Note = {
      id: safeUUID(),
      title: "Untitled note",
      content: "",
      updatedAt: Date.now(),
    };
    setNotes((prev) => [newNote, ...prev]);
    setSelectedId(newNote.id);
  }, []);

  const deleteNote = useCallback((id: string) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
    setSelectedId((prev) => {
      if (prev === id) {
        const remaining = notes.filter((n) => n.id !== id);
        return remaining.length ? remaining[0].id : null;
      }
      return prev;
    });
  }, [notes]);

  const updateNote = useCallback((id: string, patch: Partial<Note>) => {
    setNotes((prev) =>
      prev.map((n) =>
        n.id === id ? { ...n, ...patch, updatedAt: Date.now() } : n
      )
    );
  }, []);

  return (
    <div className="app-container">
      <Navbar onPreview={() => setIsModalOpen(true)} />
      <div className="main-layout">
        <aside className="sidebar">
          <NotesSidebar
            notes={notes}
            selectedId={selectedId}
            onSelect={setSelectedId}
            onAdd={addNote}
            onDelete={deleteNote}
          />
        </aside>
        <main className="editor-surface">
          {selectedNote ? (
            <NoteEditor
              note={selectedNote}
              onChange={(patch) => updateNote(selectedNote.id, patch)}
              onPreview={() => setIsModalOpen(true)}
            />
          ) : (
            <div className="empty-state" role="status" aria-live="polite">
              <h2>No note selected</h2>
              <p>Create a new note to get started.</p>
              <button className="btn primary" onClick={addNote}>
                + New Note
              </button>
            </div>
          )}
        </main>
      </div>

      <VideoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedNote?.title ?? ""}
        content={selectedNote?.content ?? ""}
      />
    </div>
  );
};

export default App;
