import OnlineUserSettingsActions from '../../actions/OnlineUserSettingsActions';
import OnlineUsersActions from './../../actions/OnlineUsersActions';

export const handleUserId = (id) => {
  console.log(`handleUserId: ${JSON.stringify(id)}`);
  OnlineUserSettingsActions.setUserId(id);
}

export const handleUsersList = (users) => {
  console.log(`Users list: ${JSON.stringify(users)}`);
  OnlineUsersActions.setUsers(users);
}