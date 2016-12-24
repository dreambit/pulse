import OnlineUsersActions from './../../actions/OnlineUsersActions';

export default (data) => {
  OnlineUsersActions.removeUser(data);
  console.log(`User left: ${JSON.stringify(data)}`);
};
