import * as React from 'react'
import Layout from '../components/Layout'
import { Link } from 'gatsby'

const Home = () => {
  return (
    <Layout>
      <p>Home</p>
      <br />
      <Link to="/login">login</Link>
    </Layout>
  )
}

export default Home
