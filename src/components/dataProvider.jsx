import React, { createContext, useState } from 'react';

export const DataContext = createContext(null)


export const DataProvider =  ({children})=>{
    const [data, setData] = useState(null)
    

    return(
        <DataContext.Provider value={[data,setData]}>
            
                {children}
            
        </DataContext.Provider>
    )
}