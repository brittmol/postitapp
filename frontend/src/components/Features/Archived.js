import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateNote } from "../../store/notes";

export default function Archived({ note }) {
  const dispatch = useDispatch();
  const [archived, setArchived] = useState(note?.archived || false);

  useEffect(() => {
    if (note?.archived !== archived) {
      dispatch(updateNote({ ...note, archived }));
    }
  }, [dispatch, archived]);

  return (
    <div>
      <button
        onClick={() => {
          archived ? setArchived(false) : setArchived(true);
        }}
      >
        {note?.archived ? "Unarchive" : "Archive"}
      </button>
    </div>
  );
}
