import io from 'socket.io-client';

import WsMessageTypes from './WsMessageTypes';
import handleNewUser from './handlers/NewUserHandler';
import handleUserHasLeft from './handlers/UserHasLeftHandler';

/**
 * Class to handle websocket connection;
 * Handles online users, users mesages, calles etc.
 */
class WsClient {

  constructor() {
    this.socket = io();
    this.attachListeners();
  }

  attachListeners() {
    this.socket.on(WsMessageTypes.USER_NEW, (data) => handleNewUser(data));
    this.socket.on(WsMessageTypes.USER_HAS_LEFT, (data) => handleUserHasLeft(data));
  }
}

export default new WsClient();
