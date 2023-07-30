/** 
 * Following Jonny Fox's Medium article
 * src: https://medium.com/factory-mind/websocket-node-js-express-step-by-step-using-typescript-725114ad5fe4
* */

import * as express from 'express';
import * as http from 'http';
import * as WebSocket from 'ws';

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

export class Message {
  constructor(public content: string, public isBroadcast: boolean, public sender: string) { }
}

interface WebSocketAug extends WebSocket {
  isAlive: boolean;
}

function createMessage(content: string, isBroadcast = false, sender = 'NS'): string {
  return JSON.stringify(new Message(content, isBroadcast, sender));
}

wss.on('connection', (ws: WebSocketAug) => {
  ws.isAlive = true;

  ws.on('pong', () => {
    ws.isAlive = true;
    console.log(`pong message recieved`);
  });

  ws.on('message', (message: string) => {
    console.log(`received ${message}`);
    const msg = JSON.parse(message) as Message;
    setTimeout(() => {
      if (msg.isBroadcast) {
        wss.clients.forEach(client => client.send(JSON.stringify(msg)));
      } else {
        ws.send(JSON.stringify(msg));
      }
    }, 100);
  });
});

// continuously ping the server to check if the connection is active
setInterval(() => {
  wss.clients.forEach(ws => {
    const wsAug = ws as WebSocketAug;
    if (!wsAug.isAlive) return wsAug.terminate();
    wsAug.isAlive = false;
    wsAug.ping(null, false);
  })
}, 6000);

// start the server
server.listen(process.env.PORT || 3000, () => {
  console.log(`Running on port ws://localhost:${(server.address() as WebSocket.AddressInfo).port}`);
});