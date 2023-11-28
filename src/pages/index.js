import { navigate } from "gatsby";
import React, { useEffect, useState } from "react";

import Layout from "../components/layout";
import { useAppContext } from "../contexts";
import { connectWithWs } from "../services";

const Home = () => {
  const [roomName, setRoomName] = useState("");

  const { auth: userAuthenticated, socketInstance, connectionStatus, setConnectionStatus, setSocketInstance } = useAppContext()

  const startConnectionWithWs = (e) => {
    const socket = connectWithWs()
    setSocketInstance(socket);
    return socket
  };

  const createRoom = (ws) => {
    ws.emit("create_room", {
      name: `${userAuthenticated.username}-${roomName}`,
      owner: userAuthenticated,
      config: {},
      players: [userAuthenticated],
    });
  }

  const connectAndCreateRoom = (e) => {
    e.preventDefault();
    let socket = socketInstance

    if (!connectionStatus) {
      socket = startConnectionWithWs()
      setSocketInstance(socket);
      createRoom(socket)
    } else {
      createRoom(socket)
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setRoomName(value);
  };

  useEffect(() => {
    if (socketInstance) {
      socketInstance.on("connection_status", ({ connected }) => {
        setConnectionStatus(connected);
      });

      socketInstance.on("room_created", (event) => {
        if (event) {
          navigate(`play/?room=${event}`)
        }
      });
    }
  }, [socketInstance]);

  return (
    <Layout>
      <form>
        <label>
          Nome da sala:
          <input type="text" onChange={handleChange} />
        </label>
        {
          roomName ? <>
            <p>preview do link: {`istop.fun/play/${userAuthenticated.username}-${roomName}`}</p></> : null
        }

        {/* <input
          type="button"
          onClick={connect}
          disabled={!roomName}
          value="connect"
        />

        <button
          type="button"
          disabled={!socketInstance?.connected}
          onClick={disconnect}
        >
          disconnect
        </button> */}
      </form>

      <button
        type="button"
        // disabled={!socketInstance?.connected}
        onClick={connectAndCreateRoom}
      >
        create room
      </button>

      <p>status: {connectionStatus ? "conectado" : "desconectado"}</p>
    </Layout>
  );
};

export default Home;
