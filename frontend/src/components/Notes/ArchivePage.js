import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getNotes } from "../../store/notes";
import SingleNote from "./SingleNote";

export default function ArchivePage() {
  const dispatch = useDispatch();

  const notes = useSelector((state) => state.notesReducer);
  const notesArray = Object.values(notes);
  const archivedNotes = notesArray.filter((note) => note.archived === true);

  useEffect(() => {
    dispatch(getNotes());
  }, [dispatch]);

  return (
    <div className="NotesPage">
      {archivedNotes.length ? (
        <div>
          <h3>Archived Notes</h3>
          <div className="allNotes">
            {archivedNotes?.map((note) => (
              <SingleNote key={note?.id} note={note} />
            ))}
          </div>
        </div>
      ) : (
        <h1>Nothing Archived</h1>
      )}
    </div>
  );
}
