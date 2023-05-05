import React, { createContext, useState } from 'react';

export const DataContext = createContext(null)
export const CheckedItemsContext = createContext(null)

export const DataProvider =  ({children})=>{
    const [data, setData] = useState(null)
    const [checkedItems, setCheckedItems] = useState([])

    return(
        <DataContext.Provider value={[data,setData]}>
            <CheckedItemsContext.Provider value={[checkedItems, setCheckedItems]}>
                {children}
            </CheckedItemsContext.Provider>
        </DataContext.Provider>
    )
}