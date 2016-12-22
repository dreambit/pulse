import flux from 'flux-react';
import _ from 'lodash';

import Actions from './../actions/OnlineUserActions';
import Gender from '../common/Gender';

export default flux.createStore({
    users: [
        {
            name: `Rezvan`,
            id: 1,
            gender: Gender.MALE,
            level: 'Intermediate',
            countryCode: 'ru'
        },
        {
            name: `Dreambitc`,
            id: 2,
            gender: Gender.MALE,
            level: 'Upper-Intermediate',
            countryCode: 'us'
        },
        {
            name: `Loosy`,
            id: 3,
            gender: Gender.FEMALE,
            level: 'Advanced',
            countryCode: 'am'
        },
        {
            name: `Rezvan`,
            id: 4,
            gender: Gender.MALE,
            level: 'Intermediate',
            countryCode: 'ru'
        },
        {
            name: `Dreambitc`,
            id: 5,
            gender: Gender.MALE,
            level: 'Upper-Intermediate',
            countryCode: 'us'
        },
        {
            name: `Loosy`,
            id: 6,
            gender: Gender.FEMALE,
            level: 'Advanced',
            countryCode: 'us'
        },
        {
            name: `Dreambitc`,
            id: 7,
            gender: Gender.MALE,
            level: 'Upper-Intermediate',
            countryCode: 'us'
        },
        {
            name: `Loosy`,
            id: 8,
            gender: Gender.FEMALE,
            level: 'Advanced',
            countryCode: 'us'
        },
        {
            name: `Loosy`,
            id: 9,
            gender: Gender.FEMALE,
            level: 'Advanced',
            countryCode: 'us'
        }

    ],
    actions: [
        Actions.addUser,
        Actions.removeUser
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
