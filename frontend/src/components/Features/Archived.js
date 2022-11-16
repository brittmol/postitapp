import React from "react";

export default function Archived({ pinned, setPinned, archived, setArchived }) {
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
      <button className="ft-btn" onClick={() => clickArchived()}>
        {archived ? (
          <span className="material-symbols-outlined">unarchive</span>
        ) : (
          <span className="material-symbols-outlined">archive</span>
        )}
      </button>
    </>
  );
}
