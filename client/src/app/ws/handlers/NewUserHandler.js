import OnlineUsersActions from './../../actions/OnlineUsersActions';

export default (data) => {
  OnlineUsersActions.addUser(data);
  console.log(`New user: ${JSON.stringify(data)}`);
};
