import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateNote } from "../../store/notes";

export default function PinnedAndArchived({ note }) {
  const dispatch = useDispatch();

  const [pinned, setPinned] = useState(note?.pinned || false);
  const [archived, setArchived] = useState(note?.archived || false);

  useEffect(() => {
    if (note?.pinned !== pinned || note?.archived !== archived) {
      dispatch(updateNote({ ...note, pinned, archived }));
    }
  }, [dispatch, pinned, archived]);

  const clickPinned = () => {
    if (pinned === false) {
      setArchived(false);
      setPinned(true);
    } else {
      setPinned(false);
    }
  };

  const clickArchived = () => {
    if (archived === false) {
      setPinned(false);
      setArchived(true);
    } else {
      setArchived(false);
    }
  };

  return (
    <div>
      <div>
        <button onClick={() => clickPinned()}>
          {note?.pinned ? "Unpin" : "Pin"}
        </button>
      </div>
      <div>
        <button onClick={() => clickArchived()}>
          {note?.archived ? "Unarchive" : "Archive"}
        </button>
      </div>
    </div>
  );
}
