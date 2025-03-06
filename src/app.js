const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authorizationroutes');
const taskRoutes = require('./routes/taskroutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes); 
app.use('/api/task', taskRoutes); 




module.exports = app;
