var io = require('socket.io')();
var MessageTypes = require('./MessageTypes');
var newUserHandler = require('./handlers/NewUserHandler');

io.on('connection', function(socket) {
    newUserHandler(socket);
});


io.listen(3000);