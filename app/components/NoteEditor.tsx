'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useEffect, useState } from 'react';
import useNotesStore from '../stores/useNotesStore';
import AIChatButton from './AIChatButton';
import ChatInterface from './ChatInterface';
import ListItem from '@tiptap/extension-list-item';
import OrderedList from '@tiptap/extension-ordered-list';
import BulletList from '@tiptap/extension-bullet-list';

const NoteEditor = () => {
    const { notes, currentNoteId, updateNote, updateNoteTitle } = useNotesStore();
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [isClient, setIsClient] = useState(false);
    
    const currentNote = notes.find(note => note.id === currentNoteId);
  
    const editor = useEditor({
      extensions: [
        StarterKit.configure({
          heading: {
            levels: [1, 2, 3],
            HTMLAttributes: {
                class: 'text-2xl font-bold my-4' // Add Tailwind classes
              }
          },
        }),
        BulletList.configure({
          HTMLAttributes: {
            class: 'bullet-list',
          },
        }),
        OrderedList.configure({
          HTMLAttributes: {
            class: 'ordered-list',
          },
        }),
        ListItem.configure({
          HTMLAttributes: {
            class: 'list-item',
          },
        }),
      ],
      content: currentNote?.content || '<p>Start writing here...</p>',
      onUpdate: ({ editor }) => {
        updateNote(currentNoteId!, editor.getHTML());
      },
      editorProps: {
        attributes: {
          class: 'prose max-w-none focus:outline-none min-h-[300px] p-2',
        },
        handleDOMEvents: {
          keydown: (view, event) => {
            // Handle Enter key for lists
            if (event.key === 'Enter') {
              // Let TipTap handle list item creation
              return false;
            }
            return false;
          },
        },
      },
    });

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (currentNote && editor) {
      setTitle(currentNote.title);
      // Only update content if it's different to avoid cursor jumps
      if (editor.getHTML() !== currentNote.content) {
        editor.commands.setContent(currentNote.content);
      }
    }
  }, [currentNoteId, currentNote, editor]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    if (currentNoteId) {
      updateNoteTitle(currentNoteId, e.target.value);
    }
  };

  if (!isClient) {
    return <div className="flex-1 p-8">Loading editor...</div>;
  }

  if (!currentNoteId) {
    return <div className="flex-1 p-8">Select or create a note to get started</div>;
  }

  if (!currentNote) {
    return <div className="flex-1 p-8">Note not found</div>;
  }

  return (
    <div className="flex-1 flex flex-col h-screen overflow-hidden">
      <div className="p-6">
        <input
          type="text"
          value={title}
          onChange={handleTitleChange}
          className="w-full text-2xl font-bold mb-4 p-2 border-b border-gray-300 focus:outline-none focus:border-blue-500"
          placeholder="Note title"
        />
        
        <div className="border border-gray-200 rounded-lg p-2 min-h-[300px]">
          <EditorContent editor={editor} className="min-h-[300px]" />
        </div>
        
        <AIChatButton onClick={() => setIsChatOpen(!isChatOpen)} />
        {isChatOpen && (
          <ChatInterface 
            noteId={currentNoteId!} 
            onClose={() => setIsChatOpen(false)} 
          />
        )}
      </div>
      <div className="relative">
  {/* Your existing editor content */}
  <AIChatButton onClick={() => setIsChatOpen(!isChatOpen)} />
  {isChatOpen && (
    <ChatInterface 
      noteId={currentNoteId!} 
      onClose={() => setIsChatOpen(false)} 
    />
  )}
</div>  
    </div>
  );
};

export default NoteEditor;