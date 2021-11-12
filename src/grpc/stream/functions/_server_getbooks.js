const { authenticateJWT } = require( './_authenticate' );
const grpc = require( '@grpc/grpc-js' );
const fs = require( 'fs' );
const books = JSON.parse(fs.readFileSync('../../books.json').toString());

function GetBooks(call) {
  let status = authenticateJWT(call.metadata);
  if (status === 200)
  {
    for (let i=0; i<100000; i++) {
      call.write(books[ Math.floor( Math.random() * books.length ) ]);
    }
    call.end();
  } else {
    call.end({
      code: status,
      message: "wrong or missing JWT",
      status: grpc.status.UNAUTHENTICATED
    });
  }
}

exports.GetBooks = GetBooks;