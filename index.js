const express = require('express');
const connectDB = require('./config/db');
const tradeRoutes = require('./routes/tradeRoutes');

const app = express();

connectDB();

app.use(express.json());

app.use('/api/trades', tradeRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
