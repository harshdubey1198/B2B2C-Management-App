import { io } from "socket.io-client";

const SOCKET_SERVER_URL = "http://localhost:7200"; 

const socket = io(SOCKET_SERVER_URL, {
  transports: ["websocket"],
  autoConnect: false,
});

export default socket;
