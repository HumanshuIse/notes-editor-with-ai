import { create } from 'zustand';

interface Message {
  id: string;
  content: string;
  isUser: boolean;
}

interface Note {
  id: string;
  title: string;
  content: string;
  chatHistory: Message[];
}

interface NotesStore {
  notes: Note[];
  currentNoteId: string | null;
  addNote: () => void;
  updateNote: (id: string, content: string) => void;
  updateNoteTitle: (id: string, title: string) => void;
  setCurrentNote: (id: string) => void;
  addChatMessage: (noteId: string, message: string, isUser: boolean) => void;
}

const useNotesStore = create<NotesStore>((set) => ({
  notes: [
    {
      id: '1',
      title: 'First Note',
      content: '<p>Start writing here...</p>',
      chatHistory: [],
    },
  ],
  currentNoteId: '1',
  
  addNote: () => set((state) => {
    const newNote = {
      id: Date.now().toString(),
      title: 'Untitled Note',
      content: '<p>Start writing here...</p>',
      chatHistory: [],
    };
    return {
      notes: [...state.notes, newNote],
      currentNoteId: newNote.id,
    };
  }),
  
  updateNote: (id, content) => set((state) => ({
    notes: state.notes.map(note => 
      note.id === id ? { ...note, content } : note
    ),
  })),
  
  updateNoteTitle: (id, title) => set((state) => ({
    notes: state.notes.map(note => 
      note.id === id ? { ...note, title } : note
    ),
  })),
  
  setCurrentNote: (id) => set({ currentNoteId: id }),
  
  addChatMessage: (noteId: string, message: string, isUser: boolean) => set((state) => ({
    notes: state.notes.map(note => 
      note.id === noteId 
        ? { 
            ...note, 
            chatHistory: [
              ...note.chatHistory, 
              { id: Date.now().toString(), content: message, isUser }
            ] 
          } 
        : note
    ),
  })),
}));

export default useNotesStore;