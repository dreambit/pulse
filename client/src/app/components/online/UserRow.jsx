import React, { PropTypes } from 'react'

class UserRow extends React.Component {

  static propTypes = {
    user: PropTypes.object.isRequired
  }

  render () {
    return (
      <div>
        User with name {this.props.user.name}
      </div>
    );
  }
}

export default UserRow;
