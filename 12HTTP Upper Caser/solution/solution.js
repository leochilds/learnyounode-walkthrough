var map = require('through2-map');
var http = require('http');
var port = process.argv[2];

var server = http.createServer(function (request, response) {
  request.pipe(map(function (chunk) {
    return chunk.toString().toUpperCase();
})).pipe(response)}).listen(port);
