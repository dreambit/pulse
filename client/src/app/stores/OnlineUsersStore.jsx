import flux from 'flux-react';
import _ from 'lodash';

import actions from './../actions/OnlineUserActions';

export default flux.createStore({
    users: [],
    actions: [
        actions.addUser,
        actions.removeUser
    ],
    addUser: function (user) {
      this.users.push(user);
      this.emit('users.add');
    },
    removeUser: function (user) {
      _.remove(this.users, (u) => user.id == u.id);
      this.emit('users.remove');
    },
    exports: {
      getUsers: function () {
        return this.users;
      }
    }
});
