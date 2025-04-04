import { io } from "socket.io-client";

const SOCKET_SERVER_URL = "https://aamobee.com"; 

const socket = io(SOCKET_SERVER_URL, {
  transports: ["websocket"],
  autoConnect: false,
});

export default socket;
