import OnlineUsersActions from './../../actions/OnlineUsersActions';
import { DEFAULT_USER_NAME } from '../../common/UserUtils';

export default (user) => {
  if (!user.userName) {
    user.userName = DEFAULT_USER_NAME;
  }
  OnlineUsersActions.updateUser(user);
  console.log(`User update: ${JSON.stringify(user)}`);
};

