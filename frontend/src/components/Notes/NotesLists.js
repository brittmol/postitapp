import PinnedAndArchived from "../Features/PinnedAndArchived";

export default function NotesList({ notesArray }) {
  const pinnedNotes = notesArray.filter((note) => note.pinned === true);
  const archivedNotes = notesArray.filter((note) => note.archived === true);

  const otherNotes = notesArray.filter(
    (note) => note.pinned === false && note.archived === false
  );

  return (
    <div>
      <h3>Pinned</h3>
      {pinnedNotes?.map((note) => (
        <ul key={note?.id}>
          <li key={note?.id}>
            {note?.title ? note?.title : "***Empty Note***"}
          </li>
          <PinnedAndArchived note={note} />
        </ul>
      ))}
      <h3>Archived</h3>
      {archivedNotes?.map((note) => (
        <ul key={note?.id}>
          <li key={note?.id}>
            {note?.title ? note?.title : "***Empty Note***"}
          </li>
          <PinnedAndArchived note={note} />
        </ul>
      ))}
      <h3>Other</h3>
      {otherNotes?.map((note) => (
        <ul key={note?.id}>
          <li key={note?.id}>
            {note?.title ? note?.title : "***Empty Note***"}
          </li>
          <PinnedAndArchived note={note} />
        </ul>
      ))}
      <p>--------------------------------------------------------------</p>
    </div>
  );
}
