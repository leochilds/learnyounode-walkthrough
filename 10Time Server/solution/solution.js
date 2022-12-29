var net = require('net');
var providedPort = process.argv[2] || 8000;

var date = new Date();
var year = date.getFullYear();
var month = formatWithZero(date.getUTCMonth() + 1);
var day = formatWithZero(date.getDate());
var hour = formatWithZero(date.getHours());
var minute = formatWithZero(date.getMinutes());


function formatWithZero (moment) {
	return moment < 10 ? "0" + moment : moment;
}

var formattedDate = year + '-' + month + '-' + day + ' ' + hour + ':' + minute;


var server = net.createServer(function(socket) {
  socket.write(formattedDate);
  socket.end('\n');
}).on('error', function (err) {
  throw err;
});

server.listen(providedPort);
