const jwt = require( 'jsonwebtoken' );
const {secret} = require('./_secret');

function authenticateJWT (headers) {
  const authHeader = headers.get('authorization');
  let status = 200;
  if (authHeader) {
    const token = authHeader[0].split(' ')[1];
    jwt.verify(token, secret, (err) => {
      if (err) {
        status = 403;
      }
    });
  } else {
    status = 401;
  }
  return status;
}

exports.authenticateJWT = authenticateJWT;