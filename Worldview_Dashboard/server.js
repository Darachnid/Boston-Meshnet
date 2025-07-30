const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve static files
app.use(express.static('public'));

// Example endpoint for health check
app.get('/status', (req, res) => {
  res.json({status: 'ok'});
});

// WebSocket connection
io.on('connection', (socket) => {
  console.log('client connected');
  socket.on('disconnect', () => console.log('client disconnected'));
});

// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
