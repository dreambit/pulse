import OnlineUserSettingsActions from '../../actions/UserActions';
import OnlineUsersActions from './../../actions/OnlineUsersActions';

import { DEFAULT_USER_NAME } from '../../common/UserUtils';

export const handleUserId = (id) => {
  console.log(`handleUserId: ${JSON.stringify(id)}`);
  OnlineUserSettingsActions.setUserId(id);
}

export const handleUsersList = (users) => {
  users.forEach((user) => {
    if (!user.userName) {
      user.userName = DEFAULT_USER_NAME;
    }
  });
  console.log(`Users list: ${JSON.stringify(users)}`);
  OnlineUsersActions.setUsers(users);
}