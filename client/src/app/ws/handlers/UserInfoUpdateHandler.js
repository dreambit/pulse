import OnlineUsersActions from './../../actions/OnlineUsersActions';

export default (data) => {
  OnlineUsersActions.updateUser(data);
  console.log(`User update: ${JSON.stringify(data)}`);
  console.log();
};

