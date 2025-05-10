'use client';
import useNotesStore from '../stores/useNotesStore';

const Sidebar = () => {
  const { notes, currentNoteId, addNote, setCurrentNote } = useNotesStore();
  
  return (
    <div className="w-64 h-screen bg-gray-100 border-r border-gray-200 p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Notes</h2>
        <button 
          onClick={addNote}
          className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          New Note
        </button>
      </div>
      
      <div className="space-y-2">
        {notes.map((note) => (
          <div
            key={note.id}
            onClick={() => setCurrentNote(note.id)}
            className={`p-3 rounded cursor-pointer ${
              currentNoteId === note.id
                ? 'bg-blue-100 border border-blue-300'
                : 'hover:bg-gray-200'
            }`}
          >
            <h3 className="font-medium truncate">{note.title}</h3>
            <p className="text-sm text-gray-500 truncate">
              {note.content.replace(/<[^>]*>/g, '').substring(0, 30)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;