import React, {Component, PropTypes} from 'react';

import CallStore, {CALL_STATUS} from '../../stores/CallStore';
import { makeCall, endCall, sendICECandidate, createOffer, createAnswer, sendCallAnswer } from '../../ws/CallService';
import CallActions from '../../actions/CallActions';

import InCallUserComponent from './InCallUserComponent';
import AcceptDeclineCallControls from './AcceptDeclineCallControls';

class IncomingCallComponent extends Component {

    state = {
        callStatus: CALL_STATUS.INCOMING_CALL
    }

    componentWillMount() {
        CallStore.on('call.iceCandidate', this.onIceCandidate);
        CallStore.on('call.offer', this.onOffer);
    }

    componentWillUnmount() {
        CallStore.off('call.iceCandidate', this.onIceCandidate);
        CallStore.off('call.offer', this.onOffer);
    }

    componentDidMount() {
        this.pc = new RTCPeerConnection();

        this.pc.onicecandidate = function (evt) {
            console.log("UI: On Local ICE Candidate");
            sendICECandidate(evt.candidate);
        };

        this.pc.onaddstream = (evt) => {
            console.log('UI: On Remote stream');
            this.remoteAudio.src = URL.createObjectURL(evt.stream);
        };
    }

    /**
     * When critical exception is thrown from our size,
     * we should reject the call and inform the remote peer
     */
    rejectCallOnError = (description, e) => {
        console.error(`${description}: ${e}`);
    }

    /**
     * Handle remote peer offer
     */
    onOffer = () => {
        let offer = CallStore.getOffer();
        console.log(`UI: On offer: ${offer}`);

        this.pc.setRemoteDescription(offer).then(() => {
            console.log('Set remote description success');
            console.log('Sending answer to remote peer');
            this.pc.createAnswer().then((sdp) => {
                console.log('Creating answer success. Sending to remote peer');
                this.pc.setLocalDescription(sdp).then(() => {
                    console.log('Set local description success');
                    console.log('Sending answer to remote peer');
                    createAnswer(sdp);
                }, (e) => {
                    this.rejectCallOnError('Set local description error', e);
                })
            }, (e) => {
                this.rejectCallOnError('Creating answer failure', e);
            })
        }, (e) => {
            this.rejectCallOnError('Set remote desc failure', e);
        })
    }

    onIceCandidate = () => {
        let ice = CallStore.getIceCandidate();
        console.log(`UI: On ICE Candidate: ${ice}`);

        forEach(ice, (val) => {
            this.pc.addIceCandidate(val).then(() => {
                console.log('Ice successfully added');
            }, (e) => {
                this.rejectCallOnError('Ice add failure', e);
            });
        });

    }

    onMediaSuccess = (stream) => {
        console.log('Get media success');
        this.pc.addStream(stream);

        sendCallAnswer(true);

        this.setState({
            callStatus: CALL_STATUS.ANSWER_ACCEPT
        });
    }

    onMediaFailure = (e) => {
        this.rejectCallOnError('Get media failure', e);
    }

    // i accept the call
    onAccept = () => {
        navigator.mediaDevices.getUserMedia({audio: true, video: false})
                              .then(this.onMediaSuccess)
                              .catch(this.onMediaFailure);
    }

    // i decline tha call
    onDecline = () => {
        sendCallAnswer(false);
        CallActions.reset();
    }

    releaseConnection = () => {
        this.remoteAudio.getTracks().forEach ((track) => {
            track.stop();
        });
        this.pc.close();
        this.pc = null;
    }

    hangUp = () => {
        this.releaseConnection();
        endCall();
    }

    renderIncomingCall = () => {
        return (
            <div>
                <Row style={{paddingTop: '80px', textAlign: 'center'}} className="call-component">
                    <Col lg={{ size: 6, push: 3, pull: 3 }}>
                        <InCallUserComponent userName={CallStore.getCallFrom().userName} />
                    </Col>
                </Row>
                <Row>
                    <Col lg={{ size: 6, push: 3, pull: 3 }}>
                        <AcceptDeclineCallControls onAccept={this.onAccept} onDecline={this.onDecline}/>
                    </Col>
                </Row>
            </div>
        );
    }

    renderActiveCall = () => {
        return (
            <div>
                <Row style={{paddingTop: '80px', textAlign: 'center'}} className="call-component">
                    <Col lg={{ size: 6, push: 3, pull: 3 }}>
                        <InCallUserComponent userName="You"/>
                        <audio ref={(input) => { this.remoteAudio = input }} autoPlay />
                        <InCallUserComponent userName={ CallStore.getCallFrom().userName } />
                    </Col>
                </Row>
                <Row>
                    <Col lg={{ size: 6, push: 3, pull: 3 }}>
                        <Button color="danger" onClick={this.hangUp}>End Call</Button>
                    </Col>
                </Row>
            </div>
        );
    }

    render() {
        return (
            this.state.callStatus === CALL_STATUS.INCOMING_CALL ? this.renderIncomingCall()
                                                                : this.renderActiveCall()
        );
    }
}

export default IncomingCallComponent;
