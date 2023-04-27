const express = require('express');
const cors = require('cors');
const app = express();
const formidable = require('formidable');
const fs = require('fs');
const path = require('path');
const cookieParser = require('cookie-parser');
const db = require('../server/db');
const AuthMiddleware = require('./middlewares/authMiddleware');
const { json, response } = require('express');

app.use(express.json());
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(cookieParser());
const uploadPath = path.join(__dirname, '/uploads/');


app.listen(3030, ()=>{
    console.log('Server runs');
});


app.get('/api/v1/allArticles', async (req, res) => {
  const allArticles = await db.query(`SELECT * from article`);
  if (allArticles.rowCount !== 0) {
    res.status(200).json(allArticles.rows);
  } else {
    res.status(404).send();
  }
});

app.get('/api/v1/user/:nickname/allArticles', async (req, res) => {
  const userArticles = await db.query(`SELECT * from article where user_name = '${req.params.nickname}'`);
  if (userArticles.rows) {
    res.status(200).json(userArticles.rows);
  } else {
    res.status(404).send();
  }
});

app.get('/api/v1/user/:nickname/userData', async (req, res) => {
  const userData = await db.query(`SELECT * from person where nickname = '${req.params.nickname}'`);
  if (userData.rows[0]) {
    res.status(200).json(userData.rows[0]);
  } else {
    res.status(404).send();
  }
});

app.post('/api/v1/login', async (req, res) => {
  const {nickname, password} = req.body;
  const isExists = await db.query(`SELECT * from person where nickname = $1 and password = $2`, [nickname, password]);
  if (isExists.rows[0]) {
    const payload = { id: isExists.rows[0].id, nickname: isExists.rows[0].nickname};
    const tokens = AuthMiddleware.generateTokens(payload);
    await db.query(`UPDATE person SET token = $1 WHERE id = $2`, [tokens.refreshToken, payload.id]);
    res.status(200).cookie("refreshToken", tokens.refreshToken, { httpOnly: true }).json({ accessToken: tokens.accessToken, nickname: isExists.rows[0].nickname});
  } else {
    res.status(401).send();
  }
});

app.post('/api/v1/register', async (req, res) => {
  const {nickname, emailAdress, password} = req.body;
  const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
  if (reg.test(emailAdress)) {
    const isExists = await db.query(`SELECT * FROM person WHERE nickname = $1 or emailAdress = $2`, [nickname, emailAdress]);
    if (isExists.rowCount === 0) {
      try {
        await db.query(`INSERT INTO person (nickname, emailAdress, password) values ($1, $2, $3) RETURNING *`, [nickname, emailAdress, password]);
      } catch(err) {
        res.send('wrong');
        console.log(err);
      }
      res.status(200).send();
    } else {
        res.status(409).send();
    }
  } else {
    res.status(409).send();
  }
});
