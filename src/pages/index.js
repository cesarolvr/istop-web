import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const userAuthenticated = {
  username: "cesarolvr",
  email: "cesar2012oliveira@gmail.com",
  userId: 987371470,
};

const Home = () => {
  const [roomName, setRoomName] = useState("");
  const [socketInstance, setSocketInstance] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState(false);

  const disconnect = () => {
    socketInstance.disconnect();
    setConnectionStatus(false);
    setSocketInstance(null);
  };

  const createRoom = () => {
    socketInstance.emit("create_room", {
      name: roomName,
      owner: userAuthenticated,
      config: {},
      players: [userAuthenticated],
    });
  };

  const connect = (e) => {
    e.preventDefault();

    const socket = io("ws://localhost:3000", { reconnection: true });
    setSocketInstance(socket);
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
        const a = event;
        console.log(a);
        debugger;
      });
    }
  }, [socketInstance]);

  useEffect(() => {
    return () => {
      disconnect();
    };
  }, []);

  return (
    <main>
      <form>
        <label>
          Nome da sala:
          <input type="text" onChange={handleChange} />
        </label>
        <input
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
        </button>
      </form>

      <button
        type="button"
        disabled={!socketInstance?.connected}
        onClick={createRoom}
      >
        create room
      </button>

      <p>status: {connectionStatus ? "conectado" : "desconectado"}</p>
    </main>
  );
};

export default Home;

export const Head = () => <title>Home Page</title>;
