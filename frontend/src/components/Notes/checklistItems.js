import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateItem } from "../../store/checklist";

export default function ChecklistItems({ note }) {
  const dispatch = useDispatch();
  const [inputList, setInputList] = useState(note?.ChecklistItems);
  console.log("inputlist", inputList);

  const handleCheckedClick = (e, ch, i) => {
    const { checked } = e.target;
    ch["checked"] = checked;
    const list = [...inputList];
    list[i] = ch
    setInputList(list)
    dispatch(updateItem(ch));
  };

  return (
    <>
      {inputList.map((ch, i) => (
        <div key={ch?.id}>
          <input
            type="checkbox"
            id={ch?.id}
            checked={ch?.checked}
            onClick={(e) => handleCheckedClick(e, ch, i)}
          />
          <label htmlFor={ch?.id}>
            {ch?.item} ----------{ch?.checked ? "Checked" : "NO"}
          </label>
        </div>
      ))}
      {/* <ul key={note?.id}>
        {note?.ChecklistItems.map((ch) => (
          <li key={ch?.id}>{ch?.item}</li>
        ))}
      </ul> */}
    </>
  );
}
