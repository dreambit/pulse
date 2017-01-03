import React, { Component, PropTypes } from 'react';
import { Row, Col, Button } from 'reactstrap';
import { forEach } from 'lodash';

import CallStore, { CALL_STATUS } from '../../stores/CallStore';
import { endCall, sendICECandidate, createAnswer, sendCallAnswer } from '../../ws/CallService';
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
        this.releaseConnection();
    }

    componentDidMount() {
        this.pc = new RTCPeerConnection({
            iceServers: [
                {
                    urls: ['stun:stun.l.google.com:19302']
                },
                {
                    username: 'CNr1rsMFEgZtDOUUjgQYzc/s6OMT',
                    credential: 'o8QL47SMsvCAVlNiogf1//glSvw=',
                    urls: [
                        'turn:64.233.161.127:19305?transport=udp',
                        'turn:[2A00:1450:4010:C01::7F]:19305?transport=udp',
                        'turn:64.233.161.127:443?transport=tcp',
                        'turn:[2A00:1450:4010:C01::7F]:443?transport=tcp'
                    ]
                }

            ]
        });

        this.pc.onicecandidate = function (evt) {
            console.log("UI: On Local ICE Candidate");
            console.log(evt);
            console.log(evt.candidate);
            sendICECandidate(evt.candidate);
        };

        this.pc.onaddstream = (evt) => {
            console.log('UI: On Remote stream');
            console.log(evt);
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
        let ice = CallStore.getAndResetIceCandidate();
        console.log(`UI: On ICE Candidate`);
        console.log(ice);

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
        this.localStream = stream;

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
        if (this.localStream) {
            this.localStream.getTracks().forEach((track) => {
                track.stop();
            });
        }
        this.pc.close();
        this.pc = null;
    }

    hangUp = () => {
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
                        <div className="text-center">
                            <Button color="danger" onClick={this.hangUp}>End Call</Button>
                        </div>
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
