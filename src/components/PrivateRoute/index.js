import { navigate } from 'gatsby'
import React, { useEffect } from 'react'
import { useAppContext } from '@contexts'

const PrivateRoute = ({ children }) => {
  const { auth, isLoading } = useAppContext()

  useEffect(() => {
    if (isLoading) return
    if (!auth.isLogged) return navigate('/login')
  }, [isLoading])

  return <div>{children}</div>
}

export default PrivateRoute
