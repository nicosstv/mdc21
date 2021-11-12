const fs = require('fs');
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const packageDefinition = protoLoader.loadSync('./library.proto', { longs: Number });
const library = grpc.loadPackageDefinition(packageDefinition).library;
const {Login} = require('./functions/_login');
const {GetBook} = require('./functions/_server_getbook');

const credentials = grpc.ServerCredentials.createSsl(
  fs.readFileSync("../../../.ssl/ca.crt"),
  [{
    private_key: fs.readFileSync("../../../.ssl/server.key"),
    cert_chain: fs.readFileSync("../../../.ssl/server.crt")
  }],
  true
);

const server = new grpc.Server();
server.addService(library.Authentication.service, {
  Login: Login
});
server.addService(library.BookShelf.service, {
  GetBook: GetBook
});
server.bindAsync('0.0.0.0:30081', credentials, () => {
  server.start();
});