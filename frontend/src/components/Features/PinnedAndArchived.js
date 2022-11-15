import React from "react";

export default function PinnedAndArchived({
  pinned,
  setPinned,
  archived,
  setArchived,
}) {
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
    <>
      <button onClick={() => clickPinned()}>{pinned ? <i className="fas fa-thumbtack" style={{color:"red"}}></i> : <i className="fas fa-thumbtack"></i>}</button>
      <button onClick={() => clickArchived()}>
        {archived ? <i class="fas fa-archive" style={{color:"red"}}></i> : <i class="fas fa-archive"></i>}
      </button>
    </>
  );
}
