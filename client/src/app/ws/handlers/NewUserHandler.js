import OnlineUserActions from './../../actions/OnlineUserActions';

export default (data) => {
  let user = JSON.parse(data);
  OnlineUserActions.addUser(user);
};
