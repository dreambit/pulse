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
    debugger;
    this.socket = io.connect(process.env.WS_CONNECTION_URL);
    this.attachListeners();
  }

  attachListeners() {
    this.socket.on(WsMessageTypes.USER_NEW, (data) => handleNewUser(data));
    this.socket.on(WsMessageTypes.USER_HAS_LEFT, (data) => handleUserHasLeft(data));
  }

  /**
   * When user fills all required fields like username etc., send it to the server to notify all users.
   * Until required fields are not filled user is not going to be appeared in the users list.
   *
   * @param userData
   */
  sendInfo(userData) {
    this.socket.emit(WsMessageTypes.USER_INFO_NEW, userData);
  }

  /**
   * Sends message to selected user.
   *
   * @param user user to send message to
   */
  sendMessage(user) {

  }
}

export default new WsClient();
