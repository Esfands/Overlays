const { WebSocketServer } = require('ws');

module.exports = (expressServer, connections) => {
  const websocketServer = new WebSocketServer({ noServer: true });

  expressServer.on('upgrade', (request, socket, head) => {
    websocketServer.handleUpgrade(request, socket, head, (ws) => {
      websocketServer.emit('connection', ws, request);
    });
  });

  websocketServer.on('connection', (connection) => {
    connections.push(connection);

    connection.on('close', () => {
      const connectionIdx = connections.indexOf(connection);
      connections.splice(connectionIdx, 1);
    });
  });

  return expressServer;
};
