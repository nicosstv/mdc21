const {getToken} = require('./functions/_gettoken');
const {getBooks} = require('./functions/_getbooks');

async function main() {
  const token = await getToken;
  return await getBooks( token );
}

console.time('total');
main().then((books)=>{
  for (let i=1; i<=10; i++) {
    console.log((i*10000) + ". " + books[i*10000-1].title);
  }
  console.timeEnd('total');
});




