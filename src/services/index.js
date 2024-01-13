import io from 'socket.io-client'

export const connectWithWs = () => {
  const sessionID = localStorage.getItem('sessionID')

  const socket = io('ws://localhost:3000', { reconnection: true })
  
  return socket
}
