import React, { useContext } from 'react'
import noteContext from '../contextAPI/Notes/noteContext';

const NoteElement = ({ note, handleUpdate }) => {
    const { deleteNote } = useContext(noteContext);
    const { _id, title, tag, description, date } = note;
    return (
        <div className="col-lg-4 col-md-6 col-sm-6 my-2">
            <div className="card">
                <div className="card-body">
                    <p className="card-text text-muted">Date : {date}</p>
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{description}</p>
                    <h6 className="card-subtitle mb-3 text-muted">Tag : {tag}</h6>
                    <p className="card-text  d-flex justify-content-between">
                        <button onClick={() => { handleUpdate() }} className="btn btn-primary "><i className="fa-solid fa-pen-to-square"></i></button>
                        <button onClick={() => { deleteNote(_id) }} className="btn btn-danger"><i className="fa-solid fa-trash-can"></i></button>
                    </p>
                </div>
            </div>

        </div>
    )
}

export default NoteElement