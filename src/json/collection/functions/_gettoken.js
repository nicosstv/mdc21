const https = require('https');
const credentials = new TextEncoder().encode(JSON.stringify({username: "admin", password: "admin"}));

const getToken = new Promise((resolve) => {
  const req = https.request( {
    host: 'localhost',
    port: '30081',
    path: '/login',
    method: 'POST',
    rejectUnauthorized: false,
    requestCert: true,
    agent: false,
    headers: { 'Content-Type': 'application/json' }
  }, res => {
    res.on( 'data', data => {
      const token = JSON.parse( data ).token;
      resolve(token);
    } )
  } );
  req.write(credentials);
  req.end();
});

exports.getToken = getToken;