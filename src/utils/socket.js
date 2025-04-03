import { io } from "socket.io-client";

const SOCKET_SERVER_URL = process.env.REACT_APP_URL.replace("/api",""); 

const socket = io(SOCKET_SERVER_URL, {
  transports: ["websocket"],
  autoConnect: false,
});

export default socket;
