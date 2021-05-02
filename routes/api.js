const request = require('request');

var headers = {
  'Authorization': `Token ${process.env.DB_YOUR_API_KEY_HERE}`,
  'Content-Type': 'application/json'
};

var dataString = '{"texts":[]}';

var options = {
  url: 'https://api.uclassify.com/v1/',
  method: 'POST',
  headers: headers,
  body: dataString
};

function callback(error, response, body) {
  if (!error && response.statusCode == 200) {
      console.log(body);
  }
}

request(options, callback);
console.log(request(options, callback));
