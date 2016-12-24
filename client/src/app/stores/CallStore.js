import flux from 'flux-react';
import Actions from './../actions/CallActions';

export default flux.createStore({

  callTo: undefined,
  callFrom: undefined,
  callStatus: undefined,
  callType: undefined,

  actions: [
    Actions.setCallTo,
    Actions.setCallFrom,
    Actions.setCallStatus,
    Actions.reset
  ],
  setCallTo: function (user) {
    this.callTo = user;
    this.callType = 'OUT';
    this.emit('call.callTo');
  },
  setCallFrom: function (user) {
    this.callFrom = user;
    this.emit('call.callFrom');
    this.callType = 'IN';
  },
  setCallStatus: function (callStatus) {
    this.callStatus = callStatus;
    this.emit('call.status');
  },
  reset: function () {
    this.callTo = undefined;
    this.callType = undefined;
    this.callFrom = undefined;
    this.callStatus = undefined;
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
    }
  }
});

