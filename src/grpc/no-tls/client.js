const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const packageDefinition = protoLoader.loadSync('./library.proto', { longs: Number, enums: String } );
const library = grpc.loadPackageDefinition(packageDefinition).library;
const bookClient = new library.BookShelf('localhost:30080', grpc.credentials.createInsecure());
const { getBook } = require('./functions/_getbook.js');

async function main() {
  for (let i=1; i<=100000; i++) {
    const book = await getBook(bookClient);
    if (i % 10000 === 0) {
      console.log(i + ". " + book.title);
    }
  }
}

console.time('total');
main().then(()=>{
  console.timeEnd('total');
});
