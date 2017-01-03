var https = require('https');
var fs =    require('fs');
var socketIO = require('socket.io');

var newUserHandler = require('./handlers/NewUserHandler');

var options = {
    key:    fs.readFileSync('ssl/alice.key'),
    cert:   fs.readFileSync('ssl/alice.crt')
};

var app = https.createServer(options);

io = socketIO.listen(app);
app.listen(3000, "0.0.0.0");

io.on('connection', function(socket) {
    newUserHandler(io, socket);
});