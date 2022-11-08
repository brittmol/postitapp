import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getNotes } from "../../store/notes";
import NoteCreateForm from "../NoteCreate";
import SingleNote from "./SingleNote";

export default function AllNotes() {
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
      <h1>All Notes!</h1>
      <NoteCreateForm />
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

        <div>
          <h3>Archived Notes</h3>
          {archivedNotes?.map((note) => (
            <SingleNote key={note?.id} note={note} />
          ))}
        </div>
      </div>
    </>
  );
}
