var utils = require('../common/utils');
var MessageTypes = require('../MessageTypes');

module.exports = function (socket) {
    socket.on(MessageTypes.USER_INFO_NEW, function (data) {
        console.log(data);
        if (utils.validateUser(data)) {
            socket.broadcast.emit(MessageTypes.USER_NEW, data);
        }
    });
    socket.on(MessageTypes.USER_INFO_UPDATE, function (data) {
        console.log(data);
        if (utils.validateUser(data)) {
            socket.broadcast.emit(MessageTypes.USER_INFO_UPDATE, data);
        }
    });
}