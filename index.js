const express = require('express');
const app = express();
const routes = require('./src/routes/routes');
const dotenv = require("dotenv");
const jwt = require('jsonwebtoken');

app.use(express.json());
dotenv.config();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, token, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// app.use((req, res, next) => {
//   console.log("path",req.path)
//   console.log("token",process.env.TOKEN_SECRET_KEY)
//   if (req.path == "/heathcheck") {
//     return res.status(200).send({
//       success: true,
//       message: "Everything is Ok",
//     });
//   } else if (
//     req.path != "/api/login" &&
//     req.path != "/api/register"
//   ) {
//     var token = req.body.token || req.query.token || req.headers["auth-token"];
//     console.log("token", req.body.token , process.env.TOKEN_SECRET_KEY)
//     if (!token)
//       return res.status(401).json("token is required for authentication");
//     try {
//       const decoded = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
//       req.user = decoded;
//       next();
//     } catch (e) {
//       res.status(400).json("Invalid token");
//     }
//   } else {
//     console.log("next", next)
//     next();
//   }
// });

app.use('/api', routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});










// const express = require('express');
// const dotenv = require('dotenv');
// const knexConfig = require('./src/knexfile');
// const knex = require('knex')(knexConfig[process.env.NODE_ENV || 'development']);
// const bookRoutes = require('./src/routes/bookRoutes');
// const authRoutes = require('./src/routes/authRoutes');

// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 3001;

// app.use(express.json());

// app.use('/books', bookRoutes); 
// app.use('/api/auth', authRoutes);

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

// knex.raw('SELECT 1+1 as result').then((rows) => {
//   console.log('Knex connected successfully!');
// }).catch((error) => {
//   console.error('Knex connection error:', error);
// });
