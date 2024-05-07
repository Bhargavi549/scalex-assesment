const express = require('express');
const dotenv = require('dotenv');
const knexConfig = require('./src/knexfile');
const knex = require('knex')(knexConfig[process.env.NODE_ENV || 'development']);

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

knex.raw('SELECT 1+1 as result').then((rows) => {
  console.log('Knex connected successfully!');
}).catch((error) => {
  console.error('Knex connection error:', error);
});

