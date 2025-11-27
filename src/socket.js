import { io } from "socket.io-client";

let socket = null;

export const connectSocket = (token) => {
  if (!socket) {
    socket = io("https://fastresponse.onrender.com", {
      auth: { token },
      transports: ["websocket"],
    });
  }
  return socket;
};

export const getSocket = () => socket;


export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null; 
  }
};
