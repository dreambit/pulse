import CallActions from '../../actions/CallActions';
import CallStore from '../../stores/CallStore';

/**
 * Incoming call
 * @param call call description:
 * {
 *   userName:
 * }
 */
function handleIncomingCall(call) {
  console.log('Call Handler: handleIncomingCall');
  console.log(call);

  // if user is in call, in, out
  if (CallStore.getCallFrom() || CallStore.getCallTo()) {
    console.log('Call Handler: handleIncomingCall; Is busy');
  } else {
    CallActions.setCallFrom(call);
  }
}

function handleEndCall() {
  console.log('Call Handler: handleEndCall');
  CallActions.reset();
}

function handleCallAnswer(answer) {
  console.log('Call Handler: handleCallAnswer');
  CallActions.setCallAnswer(answer);
}

/**
 * ICE Candidate. Remote peer sent ICE candidate
 * @param ice ice description
 */
function handleICECandidate(ice) {
  console.log('Call Handler: handleICECandidate');
  CallActions.addIceCandidate(ice);
}

function handleOffer(offer) {
  console.log('Call Handler: handleOffer');
  CallActions.setOffer(offer);
}

function handleAnswer(answer) {
  console.log('Call Handler: handleAnswer');
  CallActions.setAnswer(answer);
}

/**
 * Remote peer sent sdp
 * @param sdp sdp description
 */
function handleSDP(sdp) {

}

export { handleIncomingCall, handleEndCall, handleICECandidate, handleSDP, handleOffer, handleAnswer, handleCallAnswer }