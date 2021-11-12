const jwt = require( 'jsonwebtoken' );
const {secret} = require('./_secret');

function authenticateJWT (metadata) {
  const authHeader = metadata.get('headers');
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