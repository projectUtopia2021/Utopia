import React, { Component } from "react";
import './LoginSignup.css';
import 'bootstrap/dist/css/bootstrap.min.css';


export default class SignUp extends Component {
    render() {
        return (
            <div className="auth-wrapper">
                    <div className="auth-inner">
                    <form>
                        <h3>Sign Up</h3>
                    <div className="form-padding">
                    <div className="form-group">
                        <label>Name</label>
                        <input type="text" 
                        className="form-control" 
                        placeholder="Enter your Name" />
                    </div>
                    </div>
                    <div className="form-padding">
                    <div className="form-group">
                        <label>Email address</label>
                        <input type="email" 
                        className="form-control" 
                        placeholder="Enter email" />
                    </div>
                    </div>
                    <div className="form-padding">
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" 
                        className="form-control" 
                        placeholder="Enter password" />
                    </div>
                    </div>
                    <div className="form-padding">
                    <button type="submit" 
                    className="btn btn-primary btn-block">
                        Sign Up
                        </button>
                    <p className="forgot-password text-right">
                        Already registered <a href="#">sign in?</a>
                    </p>
                    </div>
                 </form>
                    </div>
            </div>
            
        );
    }
}