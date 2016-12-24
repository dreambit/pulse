import flux from 'flux-react';
import {find, remove, assign} from 'lodash';

import Actions from './../actions/OnlineUsersActions';

export default flux.createStore({
    users: [
    ],
    actions: [
        Actions.addUser,
        Actions.removeUser,
        Actions.updateUser,
        Actions.setUsers
    ],
    addUser: function (user) {
      this.users.push(user);
      this.emit('users.add');
    },
    removeUser: function (user) {
        debugger;

      remove(this.users, (u) => user.id == u.id);
      this.emit('users.remove');
    },
    updateUser: function (userNewSettings) {
        debugger;
        let user = find(this.users, {id: userNewSettings.id});
        if (user) {
            assign(user, userNewSettings);
            this.emit('users.update');
        } else {
            console.error(`Trying to assign, No such user: ${userNewSettings}`);
        }
    },
    setUsers: function (users) {
        this.users = users;
        this.emit('users.add');
    },
    exports: {
      getUsers: function () {
        return this.users;
      }
    }
});
