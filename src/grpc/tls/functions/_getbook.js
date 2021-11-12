const grpc = require( '@grpc/grpc-js' );

const getBook = (client, token) => new Promise((resolve, reject) => {
  const meta = new grpc.Metadata();
  meta.add('Authorization', 'Bearer ' + token);

  client.GetBook({}, meta, (err, book) => {
    if(err) {
      reject(err);
    } else {
      resolve(book);
    }
  })
});

exports.getBook = getBook;