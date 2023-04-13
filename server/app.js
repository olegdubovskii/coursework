const express = require('express');
const cors = require('cors');
const app = express();
const formidable = require('formidable');
const fs = require('fs');
const path = require('path');
const cookieParser = require('cookie-parser');
const AuthMiddleware = require('./middlewares/authMiddleware');

app.use(express.json());
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(cookieParser());
const uploadPath = path.join(__dirname, '/uploads/');

  const users = [
  {
      id: 1,
      username: "testUser",
      password: "12345",
      cars: [],
      token: {}
  }];

app.listen(3030, ()=>{
    console.log('Server runs');
});

  app.post('/api/v1/login', (req, res) => {
    const payload = { username: req.body.username, password: req.body.password};
    const user = users.find(usr => usr.username === payload.username);
    if (payload.password === user.password) {
      const tokens = AuthMiddleware.generateTokens(payload);
      users.find(usr => usr.id === user.id).token = tokens.refreshToken;
      res.status(200).cookie("refreshToken", tokens.refreshToken, { httpOnly: true }).json(tokens);
    } else {
      res.status(401).send();
    }
  });

  app.post('/api/v1/registration', (req, res) => {
    const payload = { username: req.body.username, password: req.body.password};
    const user = { id: users.length+1,
      username: payload.username,
      password: payload.password,
      tasks: [],
      token: {}};
    users.push(user);
    res.status(200).send();
  });

  // app.get('/api/v1/validation', (req, res) => {
  //   const user = AuthMiddleware.validateAccessToken(req);
  //   if (user === 401) {
  //     res.status(401).send();
  //   } else {
  //     res.status(200).json(users.find(usr=> usr.username === user.username));
  //   }
  // });

  app.post('/api/v1/refresh', (req, res) => {
    
  });
