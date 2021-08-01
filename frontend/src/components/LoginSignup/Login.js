import React, { useContext, useState } from "react";
import './LoginSignup.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import { useUserContext } from "../Context/UserContext";

const pre_fixed_API = "/api/authenticate"

export default function Login(props) {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const { setLoginUsername, setLogin } = useUserContext()

    const handleLogin = (event) => {
        event.preventDefault()
        axios.post(pre_fixed_API, {
            'username': name, 
            'password': password})
            .then(
                response => {
                    setLoginUsername(name)
                    localStorage.setItem('token', JSON.stringify(response.data))
                    localStorage.setItem('username', `${name}`)
                    setLogin(true)
                    props.history.push('/')
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
                        setName(event.target.value)
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