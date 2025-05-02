const express = require('express');
const app = express();
const loginRoutes = require('./routes/loginRoutes');
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use('/api', loginRoutes);

module.exports = app;
