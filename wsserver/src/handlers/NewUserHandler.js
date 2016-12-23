var utils = require('../common/utils');
var MessageTypes = require('../MessageTypes');
var io = require('socket.io');
var _ = require('lodash');

module.exports = function (io, socket) {
    console.log(`Connection: ${socket.id}`);
    socket.emit(MessageTypes.OUT_USER_ID, socket.id);
    socket.emit(MessageTypes.OUT_USERS_LIST, _.chain(io.sockets.sockets)
                                              .filter((val) => socket.id != val.id)
                                              .map((v) => v['data'])
                                              .filter()
                                              .value());

    socket.on(MessageTypes.USER_INFO_NEW, function (data) {
        console.log(`${MessageTypes.USER_INFO_NEW}: ${data}`);
        if (utils.validateUser(data)) {
            socket['data'] = data;
            socket.broadcast.emit(MessageTypes.USER_NEW, data);
        }
    });
    socket.on(MessageTypes.USER_INFO_UPDATE, function (data) {
        console.log(`${MessageTypes.USER_INFO_UPDATE}: ${data}`);
        if (utils.validateUser(data)) {
            socket['data'] = data;
            socket.broadcast.emit(MessageTypes.USER_INFO_UPDATE, data);
        }
    });
    socket.on('disconnect', function () {
        console.log(`Disconnect: ${socket['data']}`);
        socket.broadcast.emit(MessageTypes.OUT_USER_HAS_LEFT, socket['data']);
    });
}