const express = require('express');
const cors = require('cors');
// const apiRoutes = require('./routes/chat'); // Ensure correct import
const authRoutes = require('./routes/authorizationroutes'); // Ensure correct import
const taskRoutes = require('./routes/taskroutes'); // Ensure correct import
// const searchRoutes = require('./routes/searchRoutes'); // Ensure correct import
// const notificationRoutes = require('./routes/notificationroute'); // Ensure correct import
const app = express();

// Middleware
app.use(cors());
app.use(express.json());  // Make sure express.json() middleware is here!

// Routes
app.use('/api/auth', authRoutes);  // Auth routes
app.use('/api/task', taskRoutes);  // Auth routes
// app.use('/api/search', searchRoutes);  // Auth routes
// app.use('/api/notify', notificationRoutes);  // Auth routes



module.exports = app;
