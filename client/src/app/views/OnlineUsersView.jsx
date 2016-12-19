import React, { PropTypes } from 'react'
import { Row } from 'reactstrap';

import UsersList from './../components/online/UsersList';
import OnlineUsersStore from './../stores/OnlineUsersStore';
import OnlineUserActions from './../actions/OnlineUserActions';

import WsClient from './../ws/WsClient';

const users = [
  {
    name: 'Rezvan',
    id: 34553
  },
  {
    name: 'Eugen',
    id: 34321
  }
];

class OnlineUsersView extends React.Component {

  state = {
    users: []
  }

  componentWillMount() {
    OnlineUsersStore.on('users.*', () => {
      this.setState({
        users: OnlineUsersStore.getUsers()
      });
    });
  }

  componentDidMount() {
    setInterval(() => {
      let id = Math.floor(Math.random() * 1000000) + 1;
      OnlineUserActions.addUser({
        name: `user with name ${id}`,
        id: id
      });
    }, 2000);
  }

  render() {
    return (
      <div>
        Online users
        <UsersList users={this.state.users}></UsersList>
      </div>
    );
  }
}

export default OnlineUsersView;
