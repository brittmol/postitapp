import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateItem } from "../../store/checklist";

export default function ChecklistItems({ note }) {
  const dispatch = useDispatch();
  const [inputList, setInputList] = useState(note?.ChecklistItems);

  const handleCheckedClick = (e, ch, i) => {
    const { checked } = e.target;
    ch["checked"] = checked;
    const list = [...inputList];
    list[i] = ch;
    setInputList(list);
    dispatch(updateItem(ch));
  };

  return (
    <>
      <div>
        {note?.ChecklistItems?.sort((a, b) => a.id - b.id).map(
          (ch, i) =>
            ch?.checked === false && (
              <div key={ch?.id}>
                <input
                  type="checkbox"
                  id={ch?.id}
                  checked={ch?.checked}
                  onChange={(e) => handleCheckedClick(e, ch, i)}
                />
                <label htmlFor={ch?.id}>{ch?.item}</label>
              </div>
            )
        )}
      </div>
      <div>
        {note?.ChecklistItems?.sort((a, b) => a.id - b.id).map(
          (ch, i) =>
            ch?.checked === true && (
              <div key={ch?.id}>
                <input
                  type="checkbox"
                  id={ch?.id}
                  checked={ch?.checked}
                  onChange={(e) => handleCheckedClick(e, ch, i)}
                />
                <label htmlFor={ch?.id}>{ch?.item}</label>
              </div>
            )
        )}
      </div>
    </>
  );
}
