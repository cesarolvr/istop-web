import React, { createContext, useState, useContext } from 'react';

export const AppContext = createContext({});

export const AppContextProvider = ({ children }) => {
    const [socketInstance, setSocketInstance] = useState(null);
    const [connectionStatus, setConnectionStatus] = useState(false);
    const [auth, setAuth] = useState({
        username: "cesarolvr",
        email: "cesar2012oliveira@gmail.com",
        userId: 987371470,
    })

    return (
        <AppContext.Provider value={{ setAuth, setConnectionStatus, setSocketInstance, socketInstance, auth, connectionStatus }}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => useContext(AppContext)