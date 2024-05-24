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

app.use((req, res, next) => {
  if (req.path == "/heathcheck") {
    return res.status(200).send({
      success: true,
      message: "Everything is Ok",
    });
  } else if (
    req.path != "/api/login" &&
    req.path != "/api/register" && 
    req.path != "/api/verify"
  ) {
    var token = req.body.token || req.query.token || req.headers["auth-token"];
    if (!token)
      return res.status(401).json("token is required for authentication");
    try {
      const decoded = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
      req.user = decoded;
      next();
    } catch (e) {
      res.status(400).json("Invalid token");
    }
  } else {
    next();
  }
});

app.use('/api', routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});










