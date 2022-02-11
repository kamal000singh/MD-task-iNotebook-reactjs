import React from 'react'
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
    let location = useLocation();
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand fs-1" to="/">Navbar</Link>
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
                        <form className="d-flex me-5">
                            <Link className={`btn btn-primary me-1`} to="/login">Login</Link>
                            <Link className={`btn btn-success`} to="/addNewUser">Register New User</Link>
                        </form>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar