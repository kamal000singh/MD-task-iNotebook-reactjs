import React, { useState } from 'react'
import NoteContext from './noteContext'
const url = 'http://localhost:5000/api/v1';
const NoteState = (props) => {
    const { showAlert } = props;
    const [notes, setNotes] = useState([]);
    const [user, setUser] = useState([]);
    const getNotes = async () => {
        const response = await fetch(`${url}/note/fetchallnotes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
        });
        const json = await response.json();
        setNotes(json);
    }
    const fetchUser = async () => {
        const response = await fetch(`${url}/auth/fetchuser`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        });
        const json = await response.json();
        setUser(json);
        console.log(json);
    }
    const addNewNote = async (newNote) => {
        await fetch(`${url}/note/addnote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify(newNote),
        })
        getNotes();
        showAlert("Add New Node successfully", "success")


    }
    const deleteNote = async (id) => {
        await fetch(`${url}/note/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
        })
        getNotes();
        showAlert("Node delete successfully", "danger")
    }
    const updateNote = async ({ id, title, description, tag }) => {
        await fetch(`${url}/note/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag }),
        })
        getNotes();
        showAlert("Update Node successfully", "primary")
    }
    return (
        <NoteContext.Provider value={{ notes, user, addNewNote, fetchUser, deleteNote, updateNote, getNotes, showAlert }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState