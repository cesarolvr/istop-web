import { Link, navigate } from 'gatsby'
import React, { useContext, useEffect, useState } from 'react'
import Layout from '@components/Layout'
import PrivateRoute from '@components/PrivateRoute'
import { useAppContext } from '@contexts'
import { connectWithWs } from '@services'

const Play = () => {
  const { socketInstance, setSocketInstance, auth } = useAppContext()
  const [roomName, setRoomName] = useState('')

  useEffect(() => {
    const queryParams = new URLSearchParams(document.location.search)
    const room = queryParams.get('room')
    if (!room) return navigate('/app/')

    if (socketInstance?.connected) {
      socketInstance.emit('request_to_join', { auth, roomName: room })
    } else {
      const socket = connectWithWs()
      setSocketInstance(socket)
      socket.emit('request_to_join', { auth, roomName: room })
    }
  }, [])

  useEffect(() => {
    if (socketInstance) {
      socketInstance.on('player_joined', ({ roomName }) => {
        console.log(auth, roomName)
        setRoomName(roomName)
      })
    }
  }, [socketInstance])

  const deleteRoom = () => {
    console.log('aaa')
  }

  return (
    <PrivateRoute>
      <Layout>
        {roomName}
        <br />
        <Link to="/app">voltar</Link>
        <button type="button" onClick={(f) => f}>
          leave room
        </button>
        <button type="button" onClick={deleteRoom}>
          delete room
        </button>
      </Layout>
    </PrivateRoute>
  )
}

export default Play
