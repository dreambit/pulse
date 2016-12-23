import OnlineUserSettingsActions from '../../actions/OnlineUserSettingsActions';
import OnlineUserActions from './../../actions/OnlineUserActions';

export const handleUserId = (id) => {
  console.log(`handleUserId: ${JSON.stringify(id)}`);
  OnlineUserSettingsActions.setUserId(id);
}

export const handleUsersList = (users) => {
  console.log(`Users list: ${JSON.stringify(users)}`);
  OnlineUserActions.setUsers(users);
}