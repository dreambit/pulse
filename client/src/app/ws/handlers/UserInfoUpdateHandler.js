import OnlineUserActions from './../../actions/OnlineUserActions';

export default (data) => {
  OnlineUserActions.updateUser(data);
  console.log(`User update: ${JSON.stringify(data)}`);
  console.log();
};

