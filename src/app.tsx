import { useEffect, useState } from "react";
import logo from "./assets/logo-nlw-expert.svg";
import { NewNoteCard } from "./components/new-note-card";
import { NoteCard } from "./components/note-card";

interface INote {
  id: string;
  date: Date;
  content: string;
}

export const App = () => {
  const [search, setSearch] = useState<string>("");
  const [notes, setNotes] = useState<INote[]>(() => {
    const notesOnStorage = localStorage.getItem("notes");
    if (notesOnStorage) {
      return JSON.parse(notesOnStorage);
    }
    return [];
  });

  const onNoteCreated = (content: string) => {
    const newNote = {
      id: crypto.randomUUID(),
      date: new Date(),
      content,
    };

    const notesArray = [newNote, ...notes];

    setNotes(notesArray);
    localStorage.setItem("notes", JSON.stringify(notesArray));
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const filtered =
    search.trim() !== ""
      ? notes.filter((note) =>
          note.content.toLocaleLowerCase().includes(search.toLocaleLowerCase())
        )
      : notes;

  const onNoteDeleted = (id: string) => {
    const notesArray = notes.filter((note) => note.id !== id);
    setNotes(notesArray);
    localStorage.setItem("notes", JSON.stringify(notesArray));
  };

  return (
    <div className="mx-auto px-12 max-w-6xl my-12 space-y-6">
      <img className="w-32" src={logo} alt="NLW Expert" />

      <form className="w-full">
        <input
          onChange={handleSearch}
          value={search}
          placeholder="Busque em suas notas..."
          type="text"
          name=""
          id=""
          className="w-full bg-transparent text-3xl font-semibold tracking-tight outline-none placeholder:text-slate-500"
        />
      </form>
      <div className="h-px bg-slate-700" />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 auto-rows-[250px]">
        <NewNoteCard onNoteCreated={onNoteCreated} />
        {filtered.map((note) => (
          <NoteCard key={note.id} note={note} onNoteDeleted={onNoteDeleted}  />
        ))}
      </div>
    </div>
  );
};
