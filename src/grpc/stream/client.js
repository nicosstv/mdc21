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
const {getBooks} = require('./functions/_getbooks');

async function main() {
  const token = await getToken(authClient).catch((err)=>{console.log(err)});
  getBooks(bookClient, token);
}

main().then();
