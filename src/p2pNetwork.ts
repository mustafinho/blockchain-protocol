import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { io } from "socket.io-client";
import getPort from "get-port"

const app = express();
const httpServer = createServer(app);
const ioServer = new Server(httpServer);

const PEERS = [{}];
const ROOM = "Arepa Chain";



(async () => {
  let port = await getPort();

  console.log("server listening on port: " + port);

  ioServer.on("connection", (socket) => {
    const peerId = socket.id;
    console.log(`this is my id from the server: ${peerId}`);

    socket.on('data', (data) => {
      const message = JSON.parse(data);

      console.log(
        '------------- Recived Message start -------------'
      );
      console.log(
        'from: ' + peerId,
        'to: ' + peerId.toString(message.to),
        'my: ' + peerId,
        'type: ' + JSON.stringify(message.type)
      );

      console.log('------------- Recived Message End -------------')
    })

    socket.on('close', () => {
      console.log(`Connection closed, peer ID ${peerId}`);

    })

  });

  httpServer.listen(port);

  const ioClient = io(`http://localhost:${port}`)

  ioClient.on("connect", () => {
    console.log(`this is my id from the client: ${ioClient.id} `)
  })

})()

