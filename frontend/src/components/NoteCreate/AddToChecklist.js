import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createItem, removeItem } from "../../store/checklist";

export default function AddToChecklist({ note }) {

    /*
    - create as many checkbox input boxes as you want
    - on Save:
        -- dispatch new note w/ Title
        -- delete other items associated with note
        -- loop thru new inputList
            dispatch a new checklistitem
            for each item on the list


    */

  const dispatch = useDispatch();

  const [item, setItem] = useState("");
  const [checked, setChecked] = useState(false);
  const [errors, setErrors] = useState([]);

  const [inputList, setInputList] = useState([...note?.ChecklistItems]);
  console.log("inputList", inputList);

  const handleAddClick = () => {
    setInputList([...inputList, ""]);
  };

  const handleRemoveClick = (index) => {
    const list = [...inputList];
    console.log("list b4", list);
    list.splice(index, 1);
    console.log("list after", list);
    setInputList(list);
  };

  //   console.log("inputList", inputList);

  return (
    <>
      {/* <input placeholder="checklist" /> */}
      {inputList.map((x, i) => {
        return (
          <div key={x?.id}>
            <input type="checkbox" id={x?.id} defaultChecked={x?.checked} />
            <label htmlFor={x?.id}>{x?.item}</label>
            {inputList.length !== 1 && (
              <button onClick={() => handleRemoveClick(i)}>X</button>
            )}
            {inputList.length - 1 === i && (
              <button onClick={handleAddClick}>Add</button>
            )}
          </div>
        );
      })}
    </>
  );
}
