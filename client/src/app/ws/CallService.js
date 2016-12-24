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

function sendCallAnswer(answer) {
  let user = CallStore.getCallFrom();

  WsClient.sendCallAnswer(user.id, answer);
}

function sendICECandidate(ice) {
  let user = CallStore.getCallType() == 'IN' ? CallStore.getCallFrom()
                                             : CallStore.getCallTo();

  console.log('Call service: sendICECandidate');
  console.log(ice);

  WsClient.sendICECandidate(user.id, ice);
}

function createOffer(sdp) {
  let user = CallStore.getCallTo();

  console.log('Call service: createOffer');
  console.log(sdp);

  WsClient.createOffer(user.id, sdp);
}

function createAnswer(sdp) {
  let user = CallStore.getCallFrom();

  console.log('Call service: createAnswer');
  console.log(sdp);

  WsClient.createAnswer(user.id, sdp);
}

export { makeCall, endCall, sendICECandidate, createOffer, createAnswer, sendCallAnswer }