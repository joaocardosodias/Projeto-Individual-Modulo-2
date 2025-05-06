// server.js
const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const routes = require('./routes'); 
const db = require('./config/database');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(express.static(path.join(__dirname, 'assets')));
app.use('/scripts', express.static(path.join(__dirname, 'scripts')));
app.use('/styles', express.static(path.join(__dirname, 'styles')));


app.use('/', routes);


app.get('/', (req, res) => {
  res.send('Servidor está rodando! 🚀');
});


app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
