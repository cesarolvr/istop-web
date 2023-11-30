import React, { createContext, useState, useContext, useEffect } from 'react'

export const AppContext = createContext({})

const userAuthenticated = {
  isLogged: false,
  username: 'cesarolvr',
  email: 'cesar2012oliveira@gmail.com',
  userId: 987371470,
  token: '423423423',
}

export const AppContextProvider = ({ children }) => {
  const [socketInstance, setSocketInstance] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [connectionStatus, setConnectionStatus] = useState(false)
  const [auth, setAuth] = useState(userAuthenticated)

  const updateAuth = (payload) => {
    setIsLoading(true)
    setAuth({ ...auth, ...payload })
    sessionStorage.setItem('auth', JSON.stringify(payload))
    setIsLoading(false)
  }

  const cleanAuth = () => {
    setIsLoading(true)
    setAuth({})
    sessionStorage.removeItem('auth')
    setIsLoading(false)
  }

  useEffect(() => {
    const rawAuth = sessionStorage.getItem('auth')
    const newAuth = rawAuth ? JSON.parse(sessionStorage.getItem('auth')) : null
    if (newAuth) {
      setAuth(newAuth)
    }
    setIsLoading(false)
  }, [])

  return (
    <AppContext.Provider
      value={{
        updateAuth,
        cleanAuth,
        setConnectionStatus,
        setSocketInstance,
        setIsLoading,
        socketInstance,
        auth,
        connectionStatus,
        isLoading,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => useContext(AppContext)
