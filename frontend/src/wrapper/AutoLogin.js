import * as React from 'react';
import { useUserContext } from '../components/Context/UserContext';
import {  useEffect } from 'react';
import axios from 'axios';
import Login from '../components/LoginSignup/Login';
import { useHistory } from 'react-router-dom';

const GET_USER_API = "/api/user/"

export default function AutoLogin ({props}) {
    const { setLogin, setLoginUsername, setUserCommunityList } = useUserContext();

    React.useEffect(() => {
        if(localStorage.getItem('token') && localStorage.getItem('username')){
            const name = localStorage.getItem('username')
            const token = JSON.parse(localStorage.getItem('token')).jwtToken
            authenticateToken(name, token);
        }
    },[])

    const authenticateToken = (name, token) => {
        axios.get(GET_USER_API +  name, {headers: {
            'Authorization': `Bearer ${token}`
        }
             })
            .then(
                response => {
                    console.log(response.data.communities)
                    setLogin(true)
                    setLoginUsername(response.data.name)
                    setUserCommunityList(response.data.communities)
                }
            ).catch(error => {
                alert("Session Expried!")
                localStorage.removeItem('token')
                localStorage.removeItem('username')
            })
    }

    return (
        <>
        </>
    );
}