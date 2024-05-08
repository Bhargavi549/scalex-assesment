const express = require('express');
const dotenv = require('dotenv');
const knexConfig = require('./src/knexfile');
const knex = require('knex')(knexConfig[process.env.NODE_ENV || 'development']);
const bookRoutes = require('./src/routes/bookRoutes');
const authRoutes = require('./src/routes/authRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

app.use('/books', bookRoutes); 
app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

knex.raw('SELECT 1+1 as result').then((rows) => {
  console.log('Knex connected successfully!');
}).catch((error) => {
  console.error('Knex connection error:', error);
});
