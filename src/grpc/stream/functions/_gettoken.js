const getToken = (client) => new Promise((resolve, reject) => {
  client.Login( {
    username: 'admin',
    password: 'admin'
  }, (err, data) => {
    if(err) {
      reject( err );
    } else {
      resolve( data.token );
    }
  });
});

exports.getToken = getToken;