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
    <>
      <h1>Archived</h1>
      <div>
        <h3>Archived Notes</h3>
        {archivedNotes?.map((note) => (
          <SingleNote key={note?.id} note={note} />
        ))}
      </div>
    </>
  );
}
