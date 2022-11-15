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
      <button onClick={() => clickArchived()}>
        {/* {archived ? <i class="fas fa-archive" style={{color:"red"}}></i> : <i class="fas fa-archive"></i>} */}
        {archived ? (
          <span className="material-symbols-outlined">unarchive</span>
        ) : (
          <span className="material-symbols-outlined">archive</span>
        )}
      </button>
    </>
  );
}
