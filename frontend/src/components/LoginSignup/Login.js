import React, { useState } from "react";
import './LoginSignup.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";

const pre_fixed_API = "/api/authenticate"

export default function Login(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (event) => {
        event.preventDefault()
        axios.post(pre_fixed_API, {
            'username': username, 
            'password': password})
            .then(
                response => {
                    localStorage.setItem('token', JSON.stringify(response.data))
                    props.history.push('/')
                    window.location.reload()
                }
            ).catch(error => {
                alert(error)
            })
    }
    return (
        <div className="auth-wrapper">
                <div className="auth-inner">
                <form onSubmit={handleLogin}>
                <h3>Login</h3>
                <div className="form-padding">
                <div className="form-group">
                    <label>Username</label>
                    <input type="text" 
                    className="form-control" 
                    placeholder="Enter Username" 
                    onChange={(event) => {
                        setUsername(event.target.value)
                    }}/>
                </div>
                </div>
                <div className="form-padding">
                    <div className="form-group">
                    <label>Password</label>
                    <input type="password" 
                    className="form-control" 
                    placeholder="Enter password" 
                    onChange={(event) => {
                        setPassword(event.target.value)
                    }}
                    />
                </div>
                </div>
                
                <div className="form-padding" style={{paddingTop:'5px'}}>
                <button type="submit" className="btn btn-primary btn-block"
                    onClick={handleLogin}>
                    Login
                    </button>
                <p className="forgot-password text-right">
                    Forgot <a href="#">password?</a>
                </p>
                </div>
                </form>
                </div>
            </div>
        
    );
}