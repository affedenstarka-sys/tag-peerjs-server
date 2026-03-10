const express = require('express');
const { ExpressPeerServer } = require('peer');
const http = require('http');

const app = express();
const PORT = process.env.PORT || 9000;

app.enable('trust proxy');

app.get('/', (req, res) => {
  res.send('TAG PeerJS Server is running!');
});

const server = http.createServer(app);

// path:'/' means the server responds at /peerjs (where app.use mounts it)
const peerServer = ExpressPeerServer(server, {
  path: '/',
  allow_discovery: true,
  proxied: true,
});

app.use('/peerjs', peerServer);

peerServer.on('connection', (client) => {
  console.log('Peer connected:', client.getId());
});

peerServer.on('disconnect', (client) => {
  console.log('Peer disconnected:', client.getId());
});

server.listen(PORT, () => {
  console.log('Server listening on port', PORT);
  console.log('PeerJS available at /peerjs');
});
