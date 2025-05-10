'use client';
import Sidebar from './components/Sidebar';
import NoteEditor from './components/NoteEditor';

export default function Home() {
  return (
    <div className="flex">
      <Sidebar />
      <NoteEditor />
    </div>
  );
}
