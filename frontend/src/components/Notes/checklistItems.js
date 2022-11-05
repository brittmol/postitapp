export default function ChecklistItems({ note }) {
  return (
    <>
        {note?.ChecklistItems.map((ch) => (
            <div key={ch?.id}>
                <input type="checkbox" id={ch?.id} defaultChecked={ch?.checked} />
                <label htmlFor={ch?.id}>{ch?.item}</label>
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
