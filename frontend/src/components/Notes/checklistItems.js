export default function ChecklistItems({ note }) {
  return (
    <>
      <ul key={note?.id}>
        {note?.ChecklistItems.map((ch) => (
          <li key={ch?.id}>{ch?.item}</li>
        ))}
      </ul>
    </>
  );
}
