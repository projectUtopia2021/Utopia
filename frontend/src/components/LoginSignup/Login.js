import React, { useState } from "react";
import './LoginSignup.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import { useHistory } from "react-router";

const pre_fixed_API = "http://localhost:8080/authenticate"

export default function Login(props) {
    const history = useHistory();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (event) => {
        event.preventDefault()
        axios.post(pre_fixed_API, {
            'username': username, 
            'password': password})
            .then(
                response => {
                    localStorage.setItem('token', response.data)
                    history.push("/")
                }
            ).catch(error => {
                alert("Account doesn't exist")
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
                        console.log(username)
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
                        console.log(password)
                    }}
                    />
                </div>
                </div>
                
                {/* <div className="form-padding">
                <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" 
                        className="custom-control-input" 
                        id="customCheck1" 
                        style={{paddingRight:250}}
                        onChange={this.handleRememberStatus}
                        checked={this.state.remembered}/>
                        <label className="custom-control-label" 
                        htmlFor="customCheck1">
                            Remember me
                            </label>
                    </div>
                </div>
                </div> */}
                
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