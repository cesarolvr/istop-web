import React from 'react'

import Layout from '@components/layout'
import { useAppContext } from '@contexts'
import { Link } from 'gatsby'

const Login = () => {
  const { auth, updateAuth } = useAppContext()

  const logonLogoff = () => {
    const updatedValue = !auth.isLogged
    updateAuth({ ...auth, isLogged: updatedValue })
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
      <Link to="/app">go to app</Link>
    </Layout>
  )
}

export default Login
