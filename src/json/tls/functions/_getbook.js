const https = require('https');

const getBook = token => new Promise((resolve) => {
  const req = https.request( {
    host: 'localhost',
    port: '30081',
    path: '/book',
    method: 'GET',
    rejectUnauthorized: false,
    requestCert: true,
    agent: false,
    headers: { 'Content-Type': 'application/json', 'Authorization' : 'Bearer ' + token }
  }, res => {
    res.on( 'data', data => {
      resolve(JSON.parse(data));
    } )
  } );
  req.on('error', error => {
    console.error(error)
  })
  req.end();
});

exports.getBook = getBook;