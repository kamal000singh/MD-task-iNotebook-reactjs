import React, { useState } from 'react'
import NoteContext from './noteContext'
const url = 'http://localhost:5000/api/v1';
const NoteState = (props) => {
    const [notes, setNotes] = useState([])
    const [alert, setAlert] = useState(null);
    const showAlert = (message, type) => {
        setAlert({
            msg: message,
            type: type
        })
        setTimeout(() => {
            setAlert(null);
        }, 2000);
    }
    const getNotes = async () => {
        const response = await fetch(`${url}/note/fetchallnotes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjIwMjk5YWJmY2QwNTgxNTI2ZDc2NGM0In0sImlhdCI6MTY0NDM4NTE5Nn0.vYGXZwzOtxZ1Wi7P2JUTthZ-TDoDHVBtLuED7uSO_sY'
            },
        });
        const json = await response.json();
        setNotes(json);
    }
    const addNewNote = async (newNote) => {
        await fetch(`${url}/note/addnote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjIwMjk5YWJmY2QwNTgxNTI2ZDc2NGM0In0sImlhdCI6MTY0NDM4NTE5Nn0.vYGXZwzOtxZ1Wi7P2JUTthZ-TDoDHVBtLuED7uSO_sY'
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
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjIwMjk5YWJmY2QwNTgxNTI2ZDc2NGM0In0sImlhdCI6MTY0NDM4NTE5Nn0.vYGXZwzOtxZ1Wi7P2JUTthZ-TDoDHVBtLuED7uSO_sY'
            },
        })
        getNotes();
        showAlert("Node delete successfully", "danger")
    }
    const updateNote = async ({ id, title, description, tag }) => {
        console.log("update : " + title, description, tag);
        await fetch(`${url}/note/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjIwMjk5YWJmY2QwNTgxNTI2ZDc2NGM0In0sImlhdCI6MTY0NDM4NTE5Nn0.vYGXZwzOtxZ1Wi7P2JUTthZ-TDoDHVBtLuED7uSO_sY'
            },
            body: JSON.stringify({ title, description, tag }),
        })
        getNotes();
        showAlert("Update Node successfully", "primary")
        // const json = response.json();

        // for (let i = 0; i < notes.length; i++) {
        //     const element = notes[i];
        //     if (element._id === id) {
        //         element.title = title;
        //         element.description = description;
        //         element.tag = tag;

        //     }

        // }
    }
    return (
        <NoteContext.Provider value={{ notes, addNewNote, deleteNote, updateNote, getNotes, alert }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState