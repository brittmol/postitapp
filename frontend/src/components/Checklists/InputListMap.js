export default function InputListMap({ inputList, setInputList, isChecked }) {
  const handleRemoveClick = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  const handleInputChange = (e, index) => {
    const { value } = e.target;
    const list = [...inputList];
    list[index]["item"] = value;
    setInputList(list);
  };

  const handleCheckedClick = (e, index) => {
    const { checked } = e.target;
    const list = [...inputList];
    list[index]["checked"] = checked;
    setInputList(list);
  };

  return (
    <div>
      {inputList.map(
        (x, i) =>
          x?.checked === isChecked && (
            <div key={i}>
              <input
                type="checkbox"
                id={i}
                checked={x?.checked}
                onChange={(e) => handleCheckedClick(e, i)}
              />
              <input
                type="text"
                id={`chItem${i}`}
                // placeholder="+ List item"
                value={x?.item}
                onChange={(e) => handleInputChange(e, i)}
              />
              {inputList.length !== 0 && (
                <button onClick={() => handleRemoveClick(i)}>X</button>
              )}
            </div>
          )
      )}
    </div>
  );
}
