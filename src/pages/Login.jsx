import React, { useState } from 'react';
// import { useHistory, useLocation } from "react-router-dom";

const Login = () => {
    const [login, setLogin] = useState({ email: '', password: '' })
    // let history = useHistory();
    const handleChange = (e) => {
        setLogin({ ...login, [e.target.name]: e.target.value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/api/v1/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: login.email, password: login.password }),
        })
        const json = await response.json();
        if (json.success) {
            localStorage.setItem("authToken", json.authToken);
            // history.push("/");
        }
        else {
            alert(`Failed to login, ${json.error}`);
        }
        console.log(json);
    }
    return (
        <>
            <div className="container mx-5 my-3">
                <h2>LOGIN CREDENTIALS</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control" name="email" onChange={handleChange} placeholder="Enter Email address here..." aria-describedby="emailHelp" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" name="password" onChange={handleChange} placeholder="Enter Password Here..." id="exampleInputPassword1" />
                    </div>
                    <button type="submit" className="btn btn-primary">Login</button>
                </form>
            </div>
        </>
    )
}

export default Login