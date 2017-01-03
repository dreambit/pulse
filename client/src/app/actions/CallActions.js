var flux = require('flux-react');

export default flux.createActions([
  'setCallTo',
  'setCallFrom',
  'setCallStatus',
  'addIceCandidate',
  'setCallAnswer',
  'setOffer',
  'setAnswer',
  'reset'
]);
