import React, { Component } from "react";
import './LoginSignup.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class Login extends Component {
    render() {
        return (
            <div className="auth-wrapper">
                    <div className="auth-inner">
                    <form>
                    <h3>Login</h3>
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
                    <div className="form-group">
                        <div className="custom-control custom-checkbox">
                            <input type="checkbox" 
                            className="custom-control-input" 
                            id="customCheck1" 
                            style={{paddingRight:250}}/>
                            <label className="custom-control-label" 
                            htmlFor="customCheck1">
                                Remember me
                                </label>
                        </div>
                    </div>
                    </div>
                    
                    <div className="form-padding">
                    <button type="submit" className="btn btn-primary btn-block">
                        Submit
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
}