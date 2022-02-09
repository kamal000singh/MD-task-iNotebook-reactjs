import React, { useState } from 'react'
import NoteContext from './noteContext'

const NoteState = (props) => {
    const [name, setName] = useState("Hello World");
    const updateName = (name) => {
        setName(name);
    }
    const about = { developer: 'Kamal Singh', position: "MERN Stack Developer" }
    return (
        <NoteContext.Provider value={{ name, updateName, about }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState