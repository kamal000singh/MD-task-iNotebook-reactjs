import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import noteContext from '../contextAPI/Notes/noteContext';

const SignUp = () => {
    const { showAlert } = useContext(noteContext);
    const navigate = useNavigate();
    const [signUp, setSignUp] = useState({ name: '', email: '', password: '' });
    const handleChange = (e) => {
        setSignUp({ ...signUp, [e.target.name]: e.target.value });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, password } = signUp;
        const response = await fetch(`http://localhost:5000/auth/createuser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password }),
        })
        const json = await response.json();
        if (json.success) {
            localStorage.setItem("token", json.authToken);
            navigate("/");
        }
        else {
            showAlert(`Failed to login, ${json.errors}`, "danger")
        }
    }
    return (
        <>
            <h1>Add New User</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Full Name</label>
                    <input type="text" name="name" onChange={handleChange} placeholder="Enter Full Name Here..." className="form-control" id="name" aria-describedby="emailHelp" minLength={5} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" name="email" onChange={handleChange} placeholder="Enter Email address here..." className="form-control" id="email" aria-describedby="emailHelp" minLength={5} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" name="password" onChange={handleChange} placeholder="Enter Password Here..." className="form-control" id="password" minLength={5} required />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </>
    )
}

export default SignUp;