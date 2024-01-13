import { navigate } from 'gatsby'
import React, { useEffect, useState } from 'react'

import Layout from '@components/layout'
import PrivateRoute from '@components/PrivateRoute'
import { useAppContext } from '@contexts'
import { connectWithWs } from '@services'

const App = () => {
  const [roomName, setRoomName] = useState('')
  const [rooms, setRooms] = useState([])

  const {
    auth: userAuthenticated,
    socketInstance,
    connectionStatus,
    setConnectionStatus,
    setSocketInstance,
    cleanAuth,
    setIsLoading,
  } = useAppContext()

  const endSession = () => {
    setIsLoading(true)
    cleanAuth()
    setIsLoading(false)
    navigate('/login')
  }

  const startConnectionWithWs = (e) => {
    const socket = connectWithWs()
    setSocketInstance(socket)
    return socket
  }

  const createRoom = (ws) => {
    ws.emit('create_room', {
      name: `${userAuthenticated.username}-${roomName}`,
      owner: userAuthenticated,
      config: {},
      players: [userAuthenticated],
    })
  }

  const connectAndCreateRoom = (e) => {
    e.preventDefault()
    let socket = socketInstance

    if (!connectionStatus) {
      socket = startConnectionWithWs()
      setSocketInstance(socket)
      createRoom(socket)
    } else {
      createRoom(socket)
    }
  }

  const handleChange = (e) => {
    const value = e.target.value
    setRoomName(value)
  }

  useEffect(() => {
    if (socketInstance) {
      socketInstance.on('connection_status', ({ connected }) => {
        setConnectionStatus(connected)
      })

      socketInstance.on('room_created', (event) => {
        if (event) {
          navigate(`play/?room=${event}`)
        }
      })

      socketInstance.on('auth', ({ sessionID, userID }) => {
        // attach the session ID to the next reconnection attempts
        socketInstance.auth = { sessionID }
        // store it in the localStorage
        localStorage.setItem('sessionID', sessionID)
        // save the ID of the user
        socketInstance.userID = userID
      })
    }
  }, [socketInstance])

  return (
    <PrivateRoute>
      <Layout>
        <form>
          <label>
            Nome da sala:
            <input type="text" onChange={handleChange} />
          </label>
          {roomName ? (
            <>
              <p>
                preview do link:{' '}
                {`istop.fun/play/${userAuthenticated.username}-${roomName}`}
              </p>
            </>
          ) : null}
        </form>

        <button type="button" onClick={connectAndCreateRoom}>
          create room
        </button>

        <p>status: {connectionStatus ? 'conectado' : 'desconectado'}</p>
        <div>
          <p>rooms:</p>
          <ul>
            {rooms.map((item) => {
              if (!item) return null
              return (
                <li>
                  {item.name} <span>{item.id}</span>
                </li>
              )
            })}
          </ul>
        </div>

        <br />
        <button type="button" onClick={endSession}>
          exit
        </button>
      </Layout>
    </PrivateRoute>
  )
}

export default App
