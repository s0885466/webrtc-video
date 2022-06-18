import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

import dotEnv from 'dotenv';

dotEnv.config();

const PORT = process.env.BACKEND_PORT || 5000;
const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

let connectedPeers = [];

io.on('connection', (socket) => {
  console.log(' user connected to socket.IO server');
  connectedPeers.push(socket.id);

  socket.on('disconnect', () => {
    console.log('user disconnected');

    connectedPeers = connectedPeers.filter((peerId) => peerId !== socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`server is listening on port: ${PORT}`);
});
