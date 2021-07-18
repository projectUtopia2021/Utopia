import React, { useState } from "react";
import './LoginSignup.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import { useHistory } from "react-router";
import API_PREFIX from '../../API_PREFIX';
import { useUserContext } from "../Context/UserContext";

const register_API = "/api/register"

export default function Register(props) {
    const history = useHistory();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { setLoginUsername, setLogin } = useUserContext()

    const handleRgister = (event) => {
        event.preventDefault();
        axios.post(register_API, {
            name, 
            email, 
            password
        }).then(
            response => {
                axios.post("/api/authenticate", {
                    'username': name, 
                    'password': password})
                    .then(
                        res => {
                            setLoginUsername(name, () => {
                                localStorage.setItem('token', JSON.stringify(response.data))
                                localStorage.setItem('username', `${name}`)
                                setLogin(true)
                            })
                            props.history.push('/')
                        }
                    )
            }).catch(error => {
                const errorMessage = (
                    error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                    error.message ||
                    error.toString()
                alert(errorMessage)
            })
    }

    return (
        <div className="auth-wrapper">
                <div className="auth-inner">
                <form onSubmit={handleRgister}>
                    <h3>Sign Up</h3>
                <div className="form-padding">
                <div className="form-group">
                    <label>Username</label>
                    <input type="text" 
                    className="form-control" 
                    placeholder="Enter your Name" 
                    onChange={(event) => {
                        setName(event.target.value);
                    }}
                    required/>
                </div>
                </div>
                <div className="form-padding">
                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" 
                    className="form-control" 
                    placeholder="Enter email" 
                    onChange={(event) => {
                        setEmail(event.target.value);
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
                        setPassword(event.target.value);
                    }}/>
                </div>
                </div>
                <div className="form-padding"
                style={{paddingTop:'5px'}}>
                <button type="submit" 
                className="btn btn-primary btn-block">
                    Sign Up
                    </button>
                <p className="forgot-password text-right">
                    Already registered <a href="/login">Sign in</a>?
                </p>
                </div>
                </form>
                </div>
        </div>
    );
}