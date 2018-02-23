var fs = require('fs');
var http = require('http');

var fileName = process.argv[3];
var providedPort = process.argv[2] || 8000;

var server = http.createServer(function (request, response) {
  fs.createReadStream(fileName).pipe(response);
}).on('error', function (err) {
  throw err;
}).listen(providedPort);

