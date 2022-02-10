import React, { useState } from 'react'

const Test = () => {
    const [note, setNote] = useState({ title: '', description: '', tags: '', })
    const handleChange = (event) => {
        event.preventDefault();
        setNote({ ...note, [event.target.name]: event.target.value })
    }
    const handleSubmit = () => {
        // addNewNote(note);
    }
    return (
        <div><h2>Add New Note</h2>
            <form>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">Title</label>
                    <input type="text" name="title" className="form-control" onChange={handleChange} id="title" placeholder="Enter Title Here..." />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">Tag</label>
                    <input type="text" name="tag" className="form-control" onChange={handleChange} id="tag" placeholder="Enter tag Here..." />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlTextarea1" className="form-label">Description</label>
                    <textarea className="form-control" name="description" onChange={handleChange} id="description" placeholder="Enter Description Here..." rows="3"></textarea>
                </div>
                <button type="submit" onClick={handleSubmit} className="btn btn-primary">Submit</button>
            </form></div>
    )
}

export default Test