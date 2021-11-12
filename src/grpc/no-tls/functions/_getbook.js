const getBook = (client) => new Promise((resolve, reject) => {
  client.GetBook({}, (err, book) => {
    if(err) {
      reject(err);
    } else {
      resolve(book);
    }
  })
});

exports.getBook = getBook;