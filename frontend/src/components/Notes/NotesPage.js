import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getNotes } from "../../store/notes";
import NoteCreateForm from "../NoteCreate";
import SingleNote from "./SingleNote";
import PinnedAndArchived from "../Features/PinnedAndArchived";

export default function NotesPage() {
  const dispatch = useDispatch();

  const notes = useSelector((state) => state.notesReducer);
  const notesArray = Object.values(notes);

  const pinnedNotes = notesArray.filter((note) => note.pinned === true);
  const archivedNotes = notesArray.filter((note) => note.archived === true);

  const otherNotes = notesArray.filter(
    (note) => note.pinned === false && note.archived === false
  );

  useEffect(() => {
    dispatch(getNotes());
  }, [dispatch]);

  return (
    <>
      <h1>Notes!</h1>
      <NoteCreateForm />
      <div>
        <h3>Pinned</h3>
        {pinnedNotes?.map((note) => (
          <ul>
            <li key={note?.id}>{note?.title}</li>
            <PinnedAndArchived note={note} />
          </ul>
        ))}
        <h3>Archived</h3>
        {archivedNotes?.map((note) => (
          <ul>
            <li key={note?.id}>{note?.title}</li>
            <PinnedAndArchived note={note} />
          </ul>
        ))}
        <h3>Other</h3>
        {otherNotes?.map((note) => (
          <ul>
            <li key={note?.id}>{note?.title}</li>
            <PinnedAndArchived note={note} />
          </ul>
        ))}
        <p>--------------------------------------------------------------</p>
      </div>

      <div>
        {pinnedNotes.length ? (
          <div>
            <div>
              <h3>Pinned Notes</h3>
              {pinnedNotes?.map((note) => (
                <SingleNote key={note?.id} note={note} />
              ))}
            </div>
            <div>
              <h3>Other Notes</h3>
              {otherNotes?.map((note) => (
                <SingleNote key={note?.id} note={note} />
              ))}
            </div>
          </div>
        ) : (
          <div>
            {otherNotes?.map((note) => (
              <SingleNote key={note?.id} note={note} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
