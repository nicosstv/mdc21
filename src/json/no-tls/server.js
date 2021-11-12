const express = require('express');
const fs = require('fs');
const app = express();
const books = JSON.parse(fs.readFileSync('../../books.json').toString());

app.get('/book', (req, res) => {
  let book = books[Math.floor(Math.random()*books.length)];
  res.send(JSON.stringify(book));
});

app.listen(30080);
