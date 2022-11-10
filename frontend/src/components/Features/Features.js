import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateNote, removeNote } from "../../store/notes";
import Color from "./Color";
import PinnedAndArchived from "./PinnedAndArchived";

export default function Features({ note }) {
  const dispatch = useDispatch();

  const [color, setColor] = useState(note?.color || null);
  const [pinned, setPinned] = useState(note?.pinned || false);
  const [archived, setArchived] = useState(note?.archived || false);

  useEffect(() => {
    if (
      note?.color !== color ||
      note?.pinned !== pinned ||
      note?.archived !== archived
    ) {
      dispatch(updateNote({ ...note, color, pinned, archived }));
    }
  }, [dispatch, color, pinned, archived]);

  return (
    <div>
      <Color color={color} setColor={setColor} />
      <PinnedAndArchived
        pinned={pinned}
        setPinned={setPinned}
        archived={archived}
        setArchived={setArchived}
      />
      <button onClick={() => dispatch(removeNote(note))}>Delete Note</button>
    </div>
  );
}
