const express = require('express');
const fs = require('fs');
const https = require('https');
const jwt = require('jsonwebtoken');
const app = express();
const books = JSON.parse(fs.readFileSync('../../books.json').toString());
const {secret} = require('./functions/_secret');

const {authenticateJWT} = require('./functions/_authenticate');

app.use(express.json());

app.post('/login', (req, res) => {
 if (req.body.username==='admin' && req.body.password==='admin') {
   let token = jwt.sign({'user':'admin'}, secret, {expiresIn: '1h'});
   res.json({token});
 } else {
   res.status(403).send({error: 'Wrong credentials'});
 }
});

app.get('/book', authenticateJWT, (req, res) => {
  let book = books[Math.floor(Math.random()*books.length)];
  res.send(book);
});

app.listen(30080);

const options = {
  key: fs.readFileSync("../../../.ssl/server.key"),
  cert: fs.readFileSync("../../../.ssl/server.crt")
};
https.createServer(options, app).listen(30081);