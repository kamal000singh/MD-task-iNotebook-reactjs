import React, { useContext, useState } from 'react'
import noteContext from '../contextAPI/Notes/noteContext';

const AddNote = () => {
    const { addNewNote } = useContext(noteContext);
    const [note, setNote] = useState({ title: '', description: '', tag: 'default', })
    const handleChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        addNewNote(note);
    }

    return (
        <div><h2>Add New Note</h2>
            <form>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">Title</label>
                    <input type="text" name="title" className="form-control" onChange={handleChange} id="title" placeholder="Enter Title Here..." minLength={5} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">Tag</label>
                    <input type="text" name="tag" className="form-control" onChange={handleChange} id="tag" placeholder="Enter tag Here..." minLength={5} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlTextarea1" className="form-label">Description</label>
                    <textarea className="form-control" name="description" onChange={handleChange} id="description" placeholder="Enter Description Here..." rows="3" minLength={5} required></textarea>
                </div>
                <button type="submit" disabled={note.title.length < 5 || note.description.length < 5} onClick={handleSubmit} className="btn btn-success">Add Note</button>
            </form></div>
    )
}

export default AddNote;