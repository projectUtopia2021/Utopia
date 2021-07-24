import * as React from 'react';
import { useUserContext } from '../components/Context/UserContext';
import {  useEffect } from 'react';
import axios from 'axios';
import Login from '../components/LoginSignup/Login';
import { useHistory } from 'react-router-dom';

const GET_USER_API = "/api/user/"

export default function AutoLogin ({props}) {
    // const [ isLoggedIn, 
    //         setIsLoggedIn,
    //         username,
    //         setUsername ] = useUserContext();
    const history = useHistory()

    React.useEffect(() => {
        if(localStorage.getItem('token') && localStorage.getItem('username')){
            const name = localStorage.getItem('username')
            const token = localStorage.getItem('token')
            authenticateToken(name, token);
            console.log("token ", token)
        }
    },[])

    const authenticateToken = (name, token) => {
        // axios.defaults.headers.common['Authorization'] = `Bearer ` + token;
        console.log("getting information", token)
        axios.get(GET_USER_API +  name, {headers: {
            'Authorization': `Bearer ${token}`
        }
             })
            .then(
                response => {
                    console.log("got")
                }
            ).catch(error => {
                console.log(error)
            })
    }

    return (
        <>
        </>
    );
}