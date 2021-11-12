const jwt = require( 'jsonwebtoken' );
const grpc = require( '@grpc/grpc-js' );
const {secret} = require('./_secret');

function Login(call, callback) {
  if (call.request.username==='admin' && call.request.password==='admin') {
    let token = jwt.sign({'user':'admin'}, secret, {expiresIn: '1h'});
    callback(null, {token});
  } else {
    callback({code: 400, message: "wrong credentials", status: grpc.status.PERMISSION_DENIED});
  }
}
exports.Login = Login;