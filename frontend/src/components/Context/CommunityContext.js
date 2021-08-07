import React, { useState } from "react";
import { createContext, useContext } from "react";

const communitiesInfo = createContext()

export function useCommunitiesContext(){
    return useContext(communitiesInfo)
}

export function CommunitiesContextProvider({children}){
    const [joinedCommunities, setJoinedCommunities] = useState([])

    const setJoinedList = (list) => {
        setJoinedCommunities(list)
    }

    return (
        <communitiesInfo.Provider 
        value={{
            joinedCommunities,
            setJoinedList,
            }}>
            {children}
        </communitiesInfo.Provider>
    )
}