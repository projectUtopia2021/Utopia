import React, { useState } from "react";
import { createContext, useContext } from "react";
import { useStateWithCallbackLazy } from "use-state-with-callback";

const userInfo = createContext()

export function useUserContext(){
    return useContext(userInfo)
}

export function UserContextProvider({children}){
    const [username, setUsername] = useStateWithCallbackLazy("")
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    const setLoginUsername = (name, todo) => {
        setUsername(name, todo)
    }
    const setLogin = (loggedIn) => {
        setIsLoggedIn(loggedIn)
        console.log(isLoggedIn)
        console.log("setting")
    }
    return (
        <userInfo.Provider value={{username, setLoginUsername, isLoggedIn, setLogin}}>
            {children}
        </userInfo.Provider>
    )
}