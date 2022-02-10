import React, { useState } from 'react'
import NoteContext from './noteContext'
const url = 'http://localhost:5000/api/v1';
const NoteState = (props) => {
    const [notes, setNotes] = useState([])
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
    }
    const updateNote = async ({ id, title, description, tag }) => {
        const response = await fetch(`${url}/note/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjIwMjk5YWJmY2QwNTgxNTI2ZDc2NGM0In0sImlhdCI6MTY0NDM4NTE5Nn0.vYGXZwzOtxZ1Wi7P2JUTthZ-TDoDHVBtLuED7uSO_sY'
            },
            body: JSON.stringify({ title, description, tag }),
        })
        const json = response.json();

        for (let i = 0; i < notes.length; i++) {
            const element = notes[i];
            if (element._id === id) {
                element.title = title;
                element.description = description;
                element.tag = tag;

            }

        }
    }
    return (
        <NoteContext.Provider value={{ notes, addNewNote, deleteNote, updateNote, getNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState