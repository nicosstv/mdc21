const fs = require('fs');
const books = JSON.parse(fs.readFileSync('../../books.json').toString());
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const packageDefinition = protoLoader.loadSync('./library.proto', { longs: Number });
const library = grpc.loadPackageDefinition(packageDefinition).library;

function GetBook(call, callback) {
  let book = books[ Math.floor( Math.random() * books.length ) ];
  callback( null, book );
}

let server = new grpc.Server();
server.addService(library.BookShelf.service, { GetBook: GetBook });

server.bindAsync('0.0.0.0:30080', grpc.ServerCredentials.createInsecure(), () => {
  server.start();
});
