import React, { useContext, useEffect, useRef } from 'react'
import noteContext from '../contextAPI/Notes/noteContext';
import NoteElement from '../components/NoteElement';

const ViewNotes = () => {
    const { notes, getNotes } = useContext(noteContext);
    useEffect(() => { getNotes() }, [])
    console.log(notes);
    const handleUpdate = () => {
        ref.current.click()
    }
    const ref = useRef(null)
    return (<>
        <button type="button" class="btn btn-primary" ref={ref} data-bs-toggle="modal" data-bs-target="#exampleModal">
            Launch demo modal
        </button>
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        ...
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary">Save changes</button>
                    </div>
                </div>
            </div>
        </div>

        <div className='mt-5'>
            <h1>Your Notes</h1>
            <div className="row">
                {notes.map((item, index) => { return (<NoteElement key={index} handleUpdate={handleUpdate} note={item} />); })}
            </div>
        </div>
    </>
    )
}

export default ViewNotes