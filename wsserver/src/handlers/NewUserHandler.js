'use strict'

var utils = require('../common/utils');
var MessageTypes = require('../MessageTypes');
var io = require('socket.io');
var _ = require('lodash');

module.exports = function (io, socket) {
    console.log(`Connection: ${socket.id}`);

    socket.emit(MessageTypes.OUT_USER_ID, socket.id);
    socket.emit(MessageTypes.OUT_USERS_LIST, _.chain(io.sockets.sockets)
                                              .filter((val) => socket.id != val.id)  // do not send itself
                                              .map((v) => v['data'])
                                              .filter()                              // do not send empty users
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
    socket.on(MessageTypes.IN_MAKE_CALL, function (userId) {
        console.log(`${MessageTypes.IN_MAKE_CALL}: ${userId}`);
        let candidate = io.sockets.sockets[userId];
        if (candidate) {
            console.log(`${MessageTypes.IN_MAKE_CALL}`);
            console.log(candidate['data']);
            candidate.emit(MessageTypes.OUT_INCOMING_CALL, socket['data']);
        } else {
            console.log(`${MessageTypes.IN_MAKE_CALL}: ${userId}; Candidate not found!`);
        }
    });
    socket.on(MessageTypes.IN_OUT_END_CALL, function (userId) {
        console.log(`${MessageTypes.IN_OUT_END_CALL}: ${userId}`);
        let candidate = io.sockets.sockets[userId];
        if (candidate) {
            console.log(`${MessageTypes.IN_OUT_END_CALL}`);
            console.log(candidate['data']);
            candidate.emit(MessageTypes.IN_OUT_END_CALL);
        } else {
            console.log(`${MessageTypes.IN_OUT_END_CALL}: ${userId}; Candidate not found!`);
        }
    });
    socket.on('disconnect', function () {
        console.log(`Disconnect: ${socket['data']}`);
        socket.broadcast.emit(MessageTypes.OUT_USER_HAS_LEFT, socket['data']);
    });
}