import { navigate } from 'gatsby'
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
      console.log(socketInstance)
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

  // useEffect(() => {
  //   const queryParams = new URLSearchParams(document.location.search)
  //   const room = queryParams.get('room')
  //   if (!room) return navigate('/')
  // }, [])

  return (
    <PrivateRoute>
      <Layout>{roomName}</Layout>
    </PrivateRoute>
  )
}

export default Play
