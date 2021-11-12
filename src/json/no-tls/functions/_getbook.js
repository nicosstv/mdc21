const http = require('http');

const getBook = () => new Promise((resolve) => {
  const agent = new http.Agent({ keepAlive: true });
  const req = http.request( {
    host: 'localhost',
    port: '30080',
    path: '/book',
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    agent: agent
  }, res => {
    res.on( 'data', data => {
      resolve(JSON.parse(data));
    } )
  } );
  req.on('error', error => {
    console.error(error);
  })
  req.end();
});

exports.getBook = getBook;