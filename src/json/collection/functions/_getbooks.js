const https = require('https');

const getBooks = token => new Promise((resolve) => {
  const req = https.request( {
    host: 'localhost',
    port: '30081',
    path: '/books',
    method: 'GET',
    rejectUnauthorized: false,
    requestCert: true,
    agent: false,
    headers: { 'Content-Type': 'application/json', 'Authorization' : 'Bearer ' + token }
  }, res => {
    let data = '';
    res.on('data', chunk => {
      data += chunk.toString();
    });
    res.on('end', () => {
      const books = JSON.parse( data );
      resolve(books);
    })
  } );
  req.on('error', error => {
    console.error(error)
  });
  req.end();
});

exports.getBooks = getBooks;