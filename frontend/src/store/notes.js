import { csrfFetch } from "./csrf";

const LOAD_NOTES = "notes/loadNotes";
const loadNotes = (notes) => ({
  type: LOAD_NOTES,
  notes,
});

export const getNotes = () => async (dispatch) => {
  const response = await csrfFetch("/api/notes");
  if (response.ok) {
    const notes = await response.json();
    dispatch(loadNotes(notes));
    return notes;
  }
};

export default function notesReducer(state = {}, action) {
  let newState = {};
  switch (action.type) {
    case LOAD_NOTES:
      action.notes.forEach((note) => {
        newState[note.id] = note;
      });
      return newState;
    default:
      return state;
  }
}
