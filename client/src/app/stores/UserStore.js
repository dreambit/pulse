import flux from 'flux-react';
import Actions from '../actions/UserActions';
import { clone } from 'lodash';

import Level from '../common/Level';

export default flux.createStore({
  user: {
    id: undefined,
    userName: undefined,
    countryCode: undefined,
    gender: undefined,
    level: Level.BEGINNER
  },
  actions: [
    Actions.setUser,
    Actions.setUserId,
    Actions.setUserName,
    Actions.setUserCountryCode,
    Actions.setUserGender,
    Actions.setUserLevel
  ],

  setUser: function (user) {
    this.user = clone(user);
    this.emit('user.set');
  },

  setUserId: function (id) {
    this.user['id'] = id;
    this.emit('user.global.id');
  },

  setUserName: function (userName) {
    this.user.userName = userName;
    this.emit('user.userName');
  },

  setUserCountryCode: function (countryCode) {
    this.user.countryCode = countryCode;
    this.emit('user.countryCode');
  },

  setUserGender: function (gender) {
    this.user.gender = gender;
    this.emit('user.gender');
  },

  setUserLevel: function (level) {
    this.user.level = level;
    this.emit('user.level');
  },

  exports: {
    getUser: function () {
      return this.user;
    }
  }
});
