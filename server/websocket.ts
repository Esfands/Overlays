import { WebSocketServer } from 'ws';
import type { WebSocket } from 'ws';
import type { Server } from 'http';

const PROCESS_END_CODES = ['SIGINT', 'SIGTERM', 'SIGQUIT'];
const SERVER_RESTARTING_CODE = 1012;

export default function handleWebsocket(
  expressServer: Server,
  connections: WebSocket[]
) {
  const websocketServer = new WebSocketServer({ noServer: true });

  expressServer.on('upgrade', (request, socket, head) => {
    websocketServer.handleUpgrade(request, socket, head, (ws) => {
      websocketServer.emit('connection', ws, request);
    });
  });

  websocketServer.on('connection', (connection: WebSocket) => {
    connections.push(connection);
    console.log(`WebSocket connection opened (${connections.length})`);

    connection.on('close', () => {
      const connectionIdx = connections.indexOf(connection);
      connections.splice(connectionIdx, 1);

      console.log(`WebSocket connection closed (${connections.length})`);
    });
  });

  PROCESS_END_CODES.forEach((sig) => {
    process.on(sig, () => {
      connections.forEach(
        (c: WebSocket) => c.close(SERVER_RESTARTING_CODE),
        'Server is restarting'
      );
      process.exit();
    });
  });

  return expressServer;
}
