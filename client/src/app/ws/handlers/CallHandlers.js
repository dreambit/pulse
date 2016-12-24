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

/**
 * ICE Candidate. Remote peer sent ICE candidate
 * @param ice ice description
 */
function handleICECandidate(ice) {

}

/**
 * Remote peer sent sdp
 * @param sdp sdp description
 */
function handleSDP(sdp) {

}

export { handleIncomingCall, handleEndCall, handleICECandidate, handleSDP }