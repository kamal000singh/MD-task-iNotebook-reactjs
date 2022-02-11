import React, { useContext } from 'react'
import AddNote from '../components/AddNote';
import Alert from '../components/Alert';
import ViewNotes from '../components/ViewNotes';
import noteContext from '../contextAPI/Notes/noteContext';

const Home = () => {
    const { alert } = useContext(noteContext);
    return (
        <>

            <Alert alert={alert} />
            <div className="container">
                <AddNote />
                <ViewNotes />
            </div>
        </>
    )
}

export default Home