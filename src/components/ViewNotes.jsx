import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../contextAPI/Notes/noteContext';
import NoteElement from '../components/NoteElement';
import { useNavigate } from 'react-router-dom';

const ViewNotes = () => {
    const [isLoading, setIsLoading] = useState(false);
    const Navigate = useNavigate();
    const { notes, getNotes } = useContext(noteContext);

    useEffect(() => {
        setIsLoading(true);
        if (localStorage.getItem('token')) {
            getNotes()
            setIsLoading(false);
        }
        else {
            Navigate("/login")
            setIsLoading(false);
        }
    }, [getNotes, Navigate, setIsLoading]);
    const { updateNote } = useContext(noteContext);
    const [unote, setUnote] = useState({ id: '', title: '', description: '', tag: 'default', })
    const handleChange = (e) => {
        setUnote({ ...unote, [e.target.name]: e.target.value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        await updateNote(unote);
        await close.current.click();
    }

    const handleUpdate = (currentNode) => {
        ref.current.click();
        const { _id, title, description, tag } = currentNode;
        setUnote({ id: _id, title, description, tag });
    }
    let ref = useRef(null)
    let close = useRef(null)
    return (<>
        <button type="button" className="btn btn-primary d-none" ref={ref} data-bs-toggle="modal" data-bs-target="#exampleModal"></button>
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Update Note</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="mb-3">
                                <label htmlFor="exampleFormControlInput1" className="form-label">Title</label>
                                <input type="text" name="title" className="form-control" value={unote.title} onChange={handleChange} id="title" placeholder="Enter Title Here..." minLength={5} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleFormControlInput1" className="form-label">Tag</label>
                                <input type="text" name="tag" className="form-control" value={unote.tag} onChange={handleChange} id="tag" placeholder="Enter tag Here..." minLength={5} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleFormControlTextarea1" className="form-label">Description</label>
                                <textarea className="form-control" name="description" value={unote.description} onChange={handleChange} id="description" placeholder="Enter Description Here..." rows="3" minLength={5} required></textarea>
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" ref={close} data-bs-dismiss="modal">Close</button>
                        <button type="button" disabled={unote.title.length < 5 || unote.description.length < 5} onClick={handleSubmit} className="btn btn-primary">Update Note</button>
                    </div>
                </div>
            </div>
        </div>

        {isLoading ? "loading..." : <div className='mt-5'>
            <h1>Your Notes</h1>
            <div className="row">
                <div className='container fs-4 text-secondary'>{notes.length === 0 && "No notes available yet..."}</div>
                {notes.map((item, index) => { return (<NoteElement key={index} handleUpdate={handleUpdate} note={item} />); })}
            </div>
        </div>}
    </>
    )
}

export default ViewNotes