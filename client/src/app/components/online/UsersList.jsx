import React, { PropTypes } from 'react'

import UserRow from './UserRow';

class UsersList extends React.Component {

  static propTypes = {
    users: PropTypes.array.isRequired
  }

  render () {
    return (
      <div>
        {
          (this.props.users || []).map(user => <UserRow key={user.id} user={user}></UserRow>)
        }
      </div>
    );
  }
}

export default UsersList;
