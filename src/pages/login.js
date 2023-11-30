import React, { useEffect } from 'react'

import Layout from '@components/layout'
import { useAppContext } from '@contexts'
import { Link } from 'gatsby'

const Login = () => {
  const { auth, updateAuth } = useAppContext()

  const logonLogoff = () => {
    const updatedValue = !auth.isLogged
    updateAuth({ isLogged: updatedValue })
  }

  return (
    <Layout>
      <form>
        <label>
          Online:
          <input
            type="checkbox"
            checked={auth.isLogged}
            onChange={logonLogoff}
          />
        </label>
      </form>
      <br />
      <Link to="/app">enter</Link>
    </Layout>
  )
}

export default Login
