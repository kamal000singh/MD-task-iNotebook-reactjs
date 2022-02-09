import React from 'react'
import NoteContext from './Notes/noteContext'

const AboutState = (props) => {
  const about = { developer: 'Kamal Singh', position: "MERN Stack Developer" }
  return (
    <NoteContext.Provider value={about}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default AboutState