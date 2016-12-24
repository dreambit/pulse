import io from 'socket.io-client';

import WsMessageTypes from './WsMessageTypes';
import handleNewUser from './handlers/NewUserHandler';
import handleUserHasLeft from './handlers/UserHasLeftHandler';
import handleUserUpdate from './handlers/UserInfoUpdateHandler';

import { handleUserId, handleUsersList } from './handlers/UserHandler';

import { handleIncomingCall, handleEndCall } from './handlers/CallHandlers';

/**
 * Class to handle websocket connection;
 * Handles online users, users messages, calls etc.
 */
class WsClient {

  constructor() {
    console.log('Ws Created');
    this.socket = io.connect(process.env.WS_CONNECTION_URL);
    this.attachListeners();
  }

  attachListeners() {
    this.socket.on(WsMessageTypes.IN_USER_NEW, (data) => handleNewUser(data));
    this.socket.on(WsMessageTypes.IN_USER_HAS_LEFT, (data) => handleUserHasLeft(data));
    this.socket.on(WsMessageTypes.IN_OUT_USER_INFO_UPDATE, (data) => handleUserUpdate(data));
    this.socket.on(WsMessageTypes.IN_USER_ID, (data) => handleUserId(data));
    this.socket.on(WsMessageTypes.IN_USERS_LIST, (data) => handleUsersList(data));

    this.socket.on(WsMessageTypes.IN_INCOMING_CALL, (data) => handleIncomingCall(data));
    this.socket.on(WsMessageTypes.IN_OUT_END_CALL, () => handleEndCall());
  }

  /**
   * When user fills all required fields like username etc., send it to the server to notify all users.
   * Until required fields are not filled user is not going to be appeared in the users list.
   *
   * @param userData
   */
  sendInfo(userData) {
    this.socket.emit(WsMessageTypes.OUT_USER_INFO_NEW, userData);
  }

  updateInfo(userData) {
    this.socket.emit(WsMessageTypes.IN_OUT_USER_INFO_UPDATE, userData);
  }

  makeCall(userId) {
    console.log(`WsClient: Making call to ${userId}`);
    this.socket.emit(WsMessageTypes.OUT_MAKE_CALL, userId);
  }

  endCall(userId) {
    console.log(`WsClient: End call ${userId}`);
    this.socket.emit(WsMessageTypes.IN_OUT_END_CALL, userId);
  }

  emit(message, data) {
    this.socket.emit(message, data);
  }

}

export default new WsClient();
