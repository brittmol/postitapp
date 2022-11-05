import React, { useState } from 'react'
import { Modal } from '../../context/Modal'
import NoteEditForm from './NoteEditForm'

export default function NoteEditModal({note}) {
    const [showModal, setShowModal] = useState(false)

    return (
        <>
            <button onClick={() => setShowModal(true)}>Edit Note</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <NoteEditForm note={note} />
                </Modal>
            )}
        </>
    )
}
