import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getNotes } from "../../store/notes";
import NoteCreateForm from "../NoteCreate";
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
    <div className="NotesPage">
      <NoteCreateForm />
      {/* <NotesList notesArray={notesArray} /> */}
      <div>
        {pinnedNotes.length ? (
          <div>
            <h3>Pinned Notes</h3>
            <div className="allNotes">
              {pinnedNotes?.map((note) => (
                <SingleNote key={note?.id} note={note} />
              ))}
            </div>
            <h3>Other Notes</h3>
            <div className="allNotes">
              {otherNotes?.map((note) => (
                <SingleNote key={note?.id} note={note} />
              ))}
            </div>
          </div>
        ) : (
          <div className="allNotes">
            {otherNotes?.map((note) => (
              <SingleNote key={note?.id} note={note} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
