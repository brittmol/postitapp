import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getNotes } from "../../store/notes";
// import NoteCreateForm from "../NoteCreate";
import NoteCreate from "../NoteCreate/NoteCreate";
import SingleNote from "./SingleNote";
import NotesList from "./NotesLists";

export default function NotesPage() {
  const dispatch = useDispatch();

  const notes = useSelector((state) => state.notesReducer);
  const notesArray = Object.values(notes);

  const pinnedNotes = notesArray.filter((note) => note.pinned === true);

  const otherNotes = notesArray.filter(
    (note) => note.pinned === false && note.archived === false
  );

  useEffect(() => {
    dispatch(getNotes());
  }, [dispatch]);

  return (
    <>
      <h1>Notes!</h1>
      <NoteCreate />
      {/* <NoteCreateForm /> */}
      {/* <NotesList notesArray={notesArray} /> */}
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
