const grpc = require( '@grpc/grpc-js' );

function getBooks(client, token) {
  const meta = new grpc.Metadata();
  meta.add('Authorization', 'Bearer ' + token);
  console.time('total');
  console.time('first');
  let counter = 0;
  let call = client.GetBooks({}, meta);
  call.on('data', function(book) {
    if (counter === 0) {
      console.timeEnd('first');
    }
    counter++;
    if (counter % 10000 === 0) {
      console.log(counter + ". " + book.title);
    }
  });
  call.on('error', (err)=>{
    console.error(err);
  });
  call.on('end', ()=>{
    console.timeEnd('total');
  })
}

exports.getBooks = getBooks;