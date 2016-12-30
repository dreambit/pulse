import flux from 'flux-react';
import Actions from './../actions/CallActions';

const CALL_TYPE = {
  IN: 'IN',
  OUT: 'OUT'
}

const CALL_STATUS = {
  INCOMING_CALL: 'INCOMING_CALL',
  OUTGOING_CALL: 'OUTGOING_CALL',
  WAITING_FOR_ANSWER: 'WAITING_FOR_ANSWER',
  ANSWER_ACCEPT: 'ANSWER_ACCEPT',
  WAITING_RTC_OFFER: 'WAITING_RTC_OFFER',
  WAITING_RTC_ANSWER: 'WAITING_RTC_ANSWER',
  CONNECTING: 'CONNECTING',
  ACTIVE: 'ACTIVE'
}

export default flux.createStore({

  callTo: undefined,
  callFrom: undefined,
  callStatus: undefined,
  callType: undefined,
  iceCandidate: [],
  offer: undefined,
  answer: undefined,
  callAnswer: undefined,

  actions: [
    Actions.setCallTo,
    Actions.setCallFrom,
    Actions.setCallStatus,
    Actions.setIceCandidate,
    Actions.setOffer,
    Actions.setAnswer,
    Actions.setCallAnswer,
    Actions.reset
  ],
  setCallTo: function (user) {
    this.callTo = user;
    this.callType = CALL_TYPE.OUT;
    this.emit('call.callTo');
  },
  setCallFrom: function (user) {
    this.callFrom = user;
    this.emit('call.callFrom');
    this.callType = CALL_TYPE.IN;
  },
  setCallStatus: function (callStatus) {
    this.callStatus = callStatus;
    this.emit('call.status');
  },
  setIceCandidate: function (ice) {
    this.iceCandidate.push(ice);
    this.emit('call.iceCandidate');
  },
  setOffer: function (offer) {
    this.offer = offer;
    this.emit('call.offer');
  },
  setAnswer: function (answer) {
    this.answer = answer;
    this.emit('call.answer');
  },
  setCallAnswer: function (answer) {
    this.callAnswer = answer;
    this.emit('call.callAnswer');
  },
  reset: function () {
    this.callTo = undefined;
    this.callType = undefined;
    this.callFrom = undefined;
    this.callStatus = undefined;
    this.iceCandidate = [];
    this.offer = undefined;
    this.answer = undefined;
    this.emit('call.reset');
  },
  exports: {
    getCallTo: function () {
      return this.callTo;
    },
    getCallFrom: function () {
      return this.callFrom;
    },
    getCallStatus: function () {
      return this.callStatus;
    },
    getCallType: function () {
      return this.callType;
    },
    getOffer: function () {
      return this.offer;
    },
    getAnswer: function () {
      return this.answer;
    },
    getIceCandidate: function () {
      return this.iceCandidate;
    },
    getCallAnswer: function () {
      return this.callAnswer
    }
  }
});

export {CALL_STATUS, CALL_TYPE}

