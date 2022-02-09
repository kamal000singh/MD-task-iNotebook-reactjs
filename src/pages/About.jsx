import React, { useContext } from 'react'
import noteContext from '../contextAPI/Notes/noteContext'

const About = () => {
    const data = useContext(noteContext);
    return (
        <>
            <div className=" fs-1 fw-bold">About this app</div><hr />
            <div className=" fs-2">Developer Name : {data.about.developer}</div>
            <div className=" fs-2">Position : {data.about.position}</div>
        </>
    )
}

export default About