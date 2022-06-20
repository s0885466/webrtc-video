import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

import dotEnv from 'dotenv';
import chalk from 'chalk';

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
  console.log(`user with id: ${socket.id} connected to socket.IO server`);
  connectedPeers.push(socket.id);

  socket.on('pre-offer', (data) => {
    const { calleePersonalCode, callType } = data;

    const connectedPeer = connectedPeers.find(
      (peerId) => peerId === calleePersonalCode
    );

    if (connectedPeer) {
      const data = {
        callerSocketId: socket.id,
        callType,
      };

      console.log(chalk.red('Hello'));

      io.to(calleePersonalCode).emit('pre-offer', data);
    }

    console.log('pre-offer', data);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');

    connectedPeers = connectedPeers.filter((peerId) => peerId !== socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`server is listening on port: ${PORT}`);
});
