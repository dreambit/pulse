'use strict'

var utils = require('../common/utils');
var MessageTypes = require('../MessageTypes');
var _ = require('lodash');

var isBusy = function (socket) {
    return socket['data'].isBusy;
}

/**
 * User is making call to the user
 * @param socket caller socket
 * @param userId id of the user the caller is making call to
 */
var onUserMakingCall = function (io, socket, userId) {
    let candidate = io.sockets.sockets[userId];
    let callerData = socket['data'];

    if (candidate && !isBusy(candidate)) {
        console.log(`User[${callerData.id}] is making call to: ${userId}`);
        //
        socket['inCallWith'] = userId;
        candidate['inCallWith'] = socket.id;
        // the caller is busy now
        callerData.isBusy = true;
        // the user receiving the call is also busy now
        candidate['data'].isBusy = true;
        // notify users that the caller and receiver are busy now
        socket.broadcast.emit(MessageTypes.USER_INFO_UPDATE, callerData);
        candidate.broadcast.emit(MessageTypes.USER_INFO_UPDATE, candidate['data']);

        // notify receiver about the call
        candidate.emit(MessageTypes.OUT_INCOMING_CALL, callerData);
    }
}

/**
 *
 * @param io
 * @param socket
 * @param data
 */
var onUserCallAnswer = function (io, socket, data) {
    let candidate = io.sockets.sockets[data.userId];
    if (candidate) {
        if (!data.answer) {
            // when the receiver rejects the call, mark both users as available for call
            // and notify another users about it
            candidate['data'].isBusy = false;
            socket['data'].isBusy = false;
            candidate['inCallWith'] = undefined;
            socket['inCallWith'] = undefined;

            socket.broadcast.emit(MessageTypes.USER_INFO_UPDATE, socket['data']);
            candidate.broadcast.emit(MessageTypes.USER_INFO_UPDATE, candidate['data']);
        }
        // notify caller about answer (accept, reject)
        candidate.emit(MessageTypes.IN_OUT_CALL_ANSWER, data.answer);
    }
}

var onUserEndCall = function (io, socket) {
    let candidateId = socket['inCallWith'];

    if (candidateId) {
        let candidate = io.sockets.sockets[candidateId];

        if (candidate) {
            console.log(`User[${socket['data'].id}] ends the conversation with: ${candidateId}`);

            candidate.emit(MessageTypes.IN_OUT_END_CALL);
            // mark both users as available for call
            // and notify another users about it
            candidate['data'].isBusy = false;
            socket['data'].isBusy = false;
            candidate['inCallWith'] = undefined;
            socket['inCallWith'] = undefined;

            socket.broadcast.emit(MessageTypes.USER_INFO_UPDATE, socket['data']);
            candidate.broadcast.emit(MessageTypes.USER_INFO_UPDATE, candidate['data']);
        }
    }
}

var onUserDisconnect = function (io, socket) {
    console.log(`Disconnecting: ${socket.id}`);

    // if the user has disconnected(like tab close etc.) and the user has an active call,
    // notify the user he has call with about disconnection.
    if (socket['inCallWith']) {
        let candidate = io.sockets.sockets[socket['inCallWith']];
        if (candidate) {
            candidate.emit(MessageTypes.IN_OUT_END_CALL);
            candidate['inCallWith'] = undefined;
            candidate['data'].isBusy = false;
            candidate.broadcast.emit(MessageTypes.USER_INFO_UPDATE, candidate['data']);
        }
    }
    socket.broadcast.emit(MessageTypes.OUT_USER_HAS_LEFT, socket['data']);
}

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
    socket.on(MessageTypes.IN_MAKE_CALL, (userId) => onUserMakingCall(io, socket, userId));

    // user accepts or declines the call
    socket.on(MessageTypes.IN_OUT_CALL_ANSWER, (data) => onUserCallAnswer(io, socket, data));

    // user completes the call
    socket.on(MessageTypes.IN_OUT_END_CALL, (userId) => onUserEndCall(io, socket, userId));

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
    socket.on('disconnect', () => onUserDisconnect(io, socket));
}