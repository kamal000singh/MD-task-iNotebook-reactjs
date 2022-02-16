import React, { useContext, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom';
import noteContext from '../contextAPI/Notes/noteContext';

const Navbar = () => {
    const { user, fetchUser } = useContext(noteContext);
    let location = useLocation();
    const handlelogout = () => {
        localStorage.removeItem('token');
    }
    useEffect(() => {
        localStorage.getItem('token') && fetchUser();
    }, [fetchUser]);

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand fs-3" to="/">iNotebook</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto me-4 mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`} to="/about">About</Link>
                            </li>
                        </ul>
                        {localStorage.getItem('token') && <div className="text-light me-4">{user.name}</div>
                        }
                        {localStorage.getItem('token') ? <button className="btn btn-success me-4" onClick={handlelogout} >Logout</button> : <form className="d-flex me-5">
                            <Link className={`btn btn-primary me-1`} to="/login">Login</Link>
                            <Link className={`btn btn-success`} to="/addNewUser">Register New User</Link>
                        </form>}
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar