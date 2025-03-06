require('dotenv').config();
const http = require('http');
const connectDB = require('./src/config/db');
const app = require('./src/app');

const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Create server and setup Socket.IO
const server = http.createServer(app);


// Start server
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
