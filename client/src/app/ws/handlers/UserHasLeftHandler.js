import OnlineUserActions from './../../actions/OnlineUserActions';

export default (data) => {
  OnlineUserActions.removeUser(data);
  console.log(`User left: ${JSON.stringify(data)}`);
};
