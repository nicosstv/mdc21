const fs = require('fs');
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const packageDefinition = protoLoader.loadSync('./library.proto', { longs: Number, enums: String } );
const library = grpc.loadPackageDefinition(packageDefinition).library;

const credentials = grpc.credentials.createSsl(
  fs.readFileSync('../../../.ssl/ca.crt'),
  fs.readFileSync("../../../.ssl/client.key"),
  fs.readFileSync("../../../.ssl/client.crt")
);
const authClient = new library.Authentication('localhost:30081', credentials);
const bookClient = new library.BookShelf('localhost:30081', credentials);

const {getToken} = require('./functions/_gettoken');
const {getBook} = require('./functions/_getbook');

async function main() {
  const token = await getToken(authClient);
  for (let i=1; i<=100000; i++) {
    const book = await getBook(bookClient, token);
    if (i % 10000 === 0) {
      console.log(i + ". " + book.title);
    }
  }
}

console.time('total');
main().then(()=>{
  console.timeEnd('total');
});

