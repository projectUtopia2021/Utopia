import * as React from 'react';
import { useUserContext } from '../components/Context/UserContext';
import axios from 'axios';
import { useCommunitiesContext } from '../components/Context/CommunityContext';

const GET_USER_API = "/api/user/"

export default function AutoLogin ({props}) {
    const { setLogin, setLoginUsername } = useUserContext();
    const { setJoinedList } = useCommunitiesContext();

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
                    setLogin(true)
                    setLoginUsername(response.data.name)
                    setJoinedList(response.data.communities)
                }
            ).catch(error => {
                alert("Session Expried!")
                localStorage.removeItem('token')
                localStorage.removeItem('username')
                setLogin(false)
                window.location.reload()
            })
    }

    return (
        <>
        </>
    );
}