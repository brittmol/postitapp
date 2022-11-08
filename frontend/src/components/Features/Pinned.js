import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateNote } from "../../store/notes";

export default function Pinned({ note }) {
  const dispatch = useDispatch();
  const [pinned, setPinned] = useState(note?.pinned || false);

  useEffect(() => {
    if (note?.pinned !== pinned) {
      dispatch(updateNote({ ...note, pinned }));
    }
  }, [dispatch, pinned]);

  return (
    <div>
      <button
        onClick={() => {
          pinned ? setPinned(false) : setPinned(true);
        }}
      >
        {note?.pinned ? "Unpin" : "Pin"}
      </button>
    </div>
  );
}
