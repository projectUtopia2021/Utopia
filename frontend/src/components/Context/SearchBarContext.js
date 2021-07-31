import React, { useState } from "react";
import { createContext, useContext } from "react";
import { useStateWithCallbackLazy } from "use-state-with-callback";

const searchBarInfo = createContext()

export function useSearchContext(){
    return useContext(searchBarInfo)
}

export function SearchContextProvider({children}){
    const [searchContent, setSearchContent] = useState(undefined)
    const [searchResultList, setSearchResultList] = useState(undefined)

    const setSearch = (searchInput) => {
        setSearchContent(searchInput)
    }

    const setResultList = (list) => {
        setSearchResultList(list)
    }
    return (
        <searchBarInfo.Provider 
        value={{
            searchContent, 
            setSearch, 
            searchResultList, 
            setResultList, 
            }}>
            {children}
        </searchBarInfo.Provider>
    )
}