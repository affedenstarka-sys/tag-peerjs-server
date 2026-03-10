const { PeerServer } = require('peer');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 9000;

// Health check endpoint (Render needs this)
app.get('/', (req, res) => {
  res.send('TAG PeerJS Server is running!');
});

const server = app.listen(PORT, () => {
  console.log('HTTP server listening on port', PORT);
});

// PeerJS server mounted at /peerjs
const peerServer = PeerServer({
  server,
  path: '/peerjs',
  allow_discovery: true,
  proxied: true,
});

peerServer.on('connection', (client) => {
  console.log('Peer connected:', client.getId());
});

peerServer.on('disconnect', (client) => {
  console.log('Peer disconnected:', client.getId());
});

console.log('PeerJS server ready at /peerjs');
