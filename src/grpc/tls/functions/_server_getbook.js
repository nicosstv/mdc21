const { authenticateJWT } = require( './_authenticate' );
const grpc = require( '@grpc/grpc-js' );
const fs = require( 'fs' );
const books = JSON.parse(fs.readFileSync('../../books.json').toString());

function GetBook(call, callback) {
  let status = authenticateJWT(call.metadata);
  if (status === 200)
  {
    let book = books[ Math.floor( Math.random() * books.length ) ];
    callback( null, book );
  } else {
    callback({
      code: status,
      message: "wrong or missing JWT",
      status: grpc.status.UNAUTHENTICATED
    });
  }
}

exports.GetBook = GetBook;