const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const formidable = require('formidable');
const db = require('../server/db');
const fs = require('fs');
const AuthMiddleware = require('./middlewares/authMiddleware');



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

app.get('/api/v1/users/:user_id/userArticles', async (req, res) => {
  const userArticles = await db.query(`SELECT * from article where user_id = '${req.params.user_id}'`);
  if (userArticles.rowCount !== 0) {
    res.status(200).json(userArticles.rows);
  } else {
    res.status(404).send();
  }
});

app.get('/api/v1/users/:user_id/userData', async (req, res) => {
  const userData = await db.query(`SELECT * from person where id = '${req.params.user_id}'`);
  if (userData.rows[0]) {
    res.status(200).json(userData.rows[0]);
  } else {
    res.status(404).send();
  }
});

app.post('/api/v1/image', async (req, res) => {
  const form = formidable({
    uploadDir: uploadPath,
    maxFileSize: 1024 * 1024 * 1024 
  });
  form.parse(req, async (err, fields, files) => {
    if (err) {
      next(err);
      return;
    }
    fs.renameSync(uploadPath + files.image.newFilename, uploadPath + files.image.originalFilename);
    
    const fileForCloud = new FormData();
    fileForCloud.append('media', new Blob([fs.readFileSync(uploadPath + files.image.originalFilename)]));
    fileForCloud.append('key', '00003e3824719c2f50d722c708ceb6c8');

    const response = await fetch('https://thumbsnap.com/api/upload', {
      method:'POST',
      body: fileForCloud,
    }).then(res => res.json());
    
    
    res.status(200).json(response.data.thumb);


  });
});

app.post('/api/v1/users/:user_id/articles/newArticle', async (req, res) => {
  const { title, content, user_id, dueTo, user_name, imageLink} = req.body;
  const newArticle = await db.query(`INSERT INTO article (title, content, user_id, creation_date, user_name, imagelink) values ($1, $2, $3, $4, $5, $6) RETURNING *`, [title, content, user_id, dueTo, user_name, imageLink]);
  if (newArticle.rows[0]) {
    res.status(200).send();
  } else {
    res.status(404).send();
  }
});

app.put('/api/v1/users/:user_id/articles/:article_id', async (req, res) => {
  const { title, content, user_id, dueTo, user_name, imageLink} = req.body;
  const editedArticle = await db.query(`UPDATE article SET title = $1, content = $2, creation_date = $3, imagelink = $4 where id = $5  RETURNING *`, [title, content, dueTo, imageLink, req.params.article_id]);
  if(editedArticle.rows[0]) {
    res.status(200).send();
  } else {
    res.status(404).send();
  }
});

app.delete('/api/v1/users/:user_id/articles/:article_id', async (req, res) => {
  const isDeleted = await db.query(`DELETE from article where id = $1 RETURNING *`, [req.params.article_id]);
  const articlesWODeleted= await db.query(`SELECT * from article`);
  if (articlesWODeleted.rows) {
    res.status(200).json(articlesWODeleted.rows);
  } else {
    res.status(404).send();
  }
})

app.post('/api/v1/login', async (req, res) => {
  const {nickname, password} = req.body;
  const isExists = await db.query(`SELECT * from person where nickname = $1 and password = $2`, [nickname, password]);
  if (isExists.rows[0]) {
    const payload = { id: isExists.rows[0].id, nickname: isExists.rows[0].nickname};
    const tokens = AuthMiddleware.generateTokens(payload);
    await db.query(`UPDATE person SET token = $1 WHERE id = $2`, [tokens.refreshToken, payload.id]);
    res.status(200).cookie("refreshToken", tokens.refreshToken, { httpOnly: true }).json(
      { 
        accessToken: tokens.accessToken, 
        nickname: isExists.rows[0].nickname, 
        id: isExists.rows[0].id, 
        emailadress: isExists.rows[0].emailadress
      }
    );
  } else {
    res.status(401).send();
  }
});

app.post('/api/v1/register', async (req, res) => {
  const {nickname, emailAdress, password} = req.body;

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
});
