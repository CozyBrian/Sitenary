require('dotenv').config();
import http from "http";
import app from "./app";
import { Server } from "socket.io";
import MongoInit from "./mongo";
import SocketHandler from "./sockets";

const PORT = process.env.PORT || 3001;

const server = http.createServer(app);

export const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", SocketHandler);


function startServer() {
  server.listen(PORT, () => {
    MongoInit();
    console.log(`Listening on port ${PORT}`);
  });
}

startServer();
