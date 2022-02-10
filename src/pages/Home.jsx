import React, { useContext, useEffect } from 'react'
import AddNote from '../components/AddNote';
import ViewNotes from '../components/ViewNotes';

const Home = () => {

    return (
        <div className="container">
            <AddNote />
            <ViewNotes />
        </div>
    )
}

export default Home