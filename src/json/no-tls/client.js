const {getBook} = require('./functions/_getbook');

async function main() {
  for (let i=1; i<=100000; i++) {
    const book = await getBook();
    if (i % 10000 === 0) {
      console.log(i + ". " + book.title);
    }
  }
}

console.time('total');
main().then(()=>{
  console.timeEnd('total');
});




