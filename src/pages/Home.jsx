import React, { useContext } from 'react'
import noteContext from '../contextAPI/Notes/noteContext';

const Home = () => {
    const title = useContext(noteContext);
    return (
        <>
            <div className=" fs-1 fw-bold"><h1>This is {title.name}</h1>
                <div className="btn btn-primary" onClick={() => title.updateName("iNotebook")}>Click</div></div>
        </>
    )
}

export default Home