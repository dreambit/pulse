import CallActions from '../../actions/CallActions';

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
  CallActions.setCallFrom(call);
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
  CallActions.setIceCandidate(ice);
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