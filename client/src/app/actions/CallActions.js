var flux = require('flux-react');

export default flux.createActions([
  'setCallTo',
  'setCallFrom',
  'setCallStatus',
  'setIceCandidate',
  'setCallAnswer',
  'setOffer',
  'setAnswer',
  'reset'
]);
