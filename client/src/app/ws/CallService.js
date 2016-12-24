import WsClient from './WsClient';
import CallActions from '../actions/CallActions';
import CallStore from '../stores/CallStore';

function makeCall(user) {
  console.log('Call service: Making call to');
  console.log(user);

  WsClient.makeCall(user.id);
  CallActions.setCallTo(user);

}

function endCall() {
  let user = CallStore.getCallType() == 'IN' ? CallStore.getCallFrom()
                                             : CallStore.getCallTo();

  console.log('Call service: End call');
  console.log(user);

  WsClient.endCall(user.id);
  CallActions.reset();

}
export { makeCall, endCall }