'use strict'

var utils = require('../common/utils');
var MessageTypes = require('../MessageTypes');
var _ = require('lodash');

module.exports = function (io, socket) {
    console.log(`Connection: ${socket.id}`);

    socket['data'] = {id: socket.id};
    // assign user id to connected user
    socket.emit(MessageTypes.OUT_USER_ID, socket.id);

    // send all connected users list to connected user
    socket.emit(MessageTypes.OUT_USERS_LIST, _.chain(io.sockets.sockets)
                                              .filter((val) => socket.id != val.id)  // do not send itself
                                              .map((v) => v['data'])
                                              .value());

    // notify all users about new one
    socket.broadcast.emit(MessageTypes.USER_NEW, {id: socket.id});

    // user has updated his settings like userName, level etc.
    socket.on(MessageTypes.USER_INFO_UPDATE, function (data) {
        console.log(`${MessageTypes.USER_INFO_UPDATE}: ${data}`);
        socket['data'] = data;
        socket.broadcast.emit(MessageTypes.USER_INFO_UPDATE, data);
    });

    // user is making call to the user with id(userId)
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

    // user accepts or declines the call
    socket.on(MessageTypes.IN_OUT_CALL_ANSWER, function (data) {
        console.log(MessageTypes.IN_OUT_CALL_ANSWER + "11111111111111111");
        let candidate = io.sockets.sockets[data.userId];
        if (candidate) {
            candidate.emit(MessageTypes.IN_OUT_CALL_ANSWER, data.answer);
        } else {
            console.log(`${MessageTypes.IN_OUT_END_CALL}: ${data.userId}; Candidate not found!`);
        }
    });

    // user completes the call
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

    // WebRTC, ICE candidate exchange
    socket.on(MessageTypes.IN_OUT_ICE_CANDIDATE, function (data) {
        console.log(`${MessageTypes.IN_OUT_ICE_CANDIDATE}`);
        console.log(data);

        let candidate = io.sockets.sockets[data.userId];
        if (candidate) {
            console.log(`${MessageTypes.IN_OUT_ICE_CANDIDATE}`);
            candidate.emit(MessageTypes.IN_OUT_ICE_CANDIDATE, data.ice);
        } else {
            console.log(`${MessageTypes.IN_OUT_ICE_CANDIDATE}: ${data.userId}; Candidate not found!`);
        }
    });

    // WebRTC, exchange offer
    socket.on(MessageTypes.IN_OUT_OFFER, function (data) {
        console.log(`${MessageTypes.IN_OUT_OFFER}`);
        console.log(data);

        let candidate = io.sockets.sockets[data.userId];
        if (candidate) {
            candidate.emit(MessageTypes.IN_OUT_OFFER, data.sdp);
        } else {
            console.log(`${MessageTypes.IN_OUT_OFFER}: ${data.userId}; Candidate not found!`);
        }
    });

    // WebRTC, exchange answer
    socket.on(MessageTypes.IN_OUT_ANSWER, function (data) {
        console.log(`${MessageTypes.IN_OUT_ANSWER}`);
        console.log(data);

        let candidate = io.sockets.sockets[data.userId];
        if (candidate) {
            console.log(`${MessageTypes.IN_OUT_ANSWER}`);
            candidate.emit(MessageTypes.IN_OUT_ANSWER, data.sdp);
        } else {
            console.log(`${MessageTypes.IN_OUT_ANSWER}: ${data.userId}; Candidate not found!`);
        }
    });

    // user has disconnected
    socket.on('disconnect', function () {
        console.log(`Disconnect: ${socket['data']}`);
        socket.broadcast.emit(MessageTypes.OUT_USER_HAS_LEFT, socket['data']);
    });
}