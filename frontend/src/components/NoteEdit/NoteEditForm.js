import React, { useState } from "react";
import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";
import ChecklistItems from "../Notes/checklistItems";

export default function NoteEditForm({note}) {
    return (
        <div id="note-modal" style={{backgroundColor:`#${note?.color}`}}>
            <h3>{note?.title}</h3>
            <ChecklistItems note={note}  />
        </div>
    )
}
