import React from "react";

export default function PinnedAndArchived({ pinned, setPinned, archived, setArchived }) {

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
          {pinned ? "Unpin" : "Pin"}
        </button>
      </div>
      <div>
        <button onClick={() => clickArchived()}>
          {archived ? "Unarchive" : "Archive"}
        </button>
      </div>
    </div>
  );
}
