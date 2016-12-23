import OnlineUserActions from './../../actions/OnlineUserActions';

export default (data) => {
  OnlineUserActions.addUser(data);
  console.log(`New user: ${JSON.stringify(data)}`);
};
