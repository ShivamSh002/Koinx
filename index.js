const express = require('express');
const connectDB = require('./config/db');
const tradeRoutes = require('./routes/tradeRoutes');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware to handle JSON requests
app.use(express.json());

// Use trade routes
app.use('/api/trades', tradeRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
