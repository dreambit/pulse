import React, { Component, PropTypes } from 'react';
import { Row, Col, Button } from 'reactstrap';
import { forEach } from 'lodash';

import * as CallStates from '../../common/CallStates';

import CallStore from '../../stores/CallStore';
import { makeCall, endCall, sendICECandidate, createOffer } from '../../ws/CallService';
import CallActions from '../../actions/CallActions';

import InCallUserComponent from './InCallUserComponent';

const OFFER_OPTIONS = {
    offerToReceiveAudio: 1,
    offerToReceiveVideo: 0
}

class OutgoingCallComponent extends Component {

    static propTypes = {
        to: PropTypes.object.isRequired
    }

    state = {
        callStatus: CallStates.OUTGOING_CALL_WAITING_MEDIA
    }

    componentWillMount() {
        CallStore.on('call.iceCandidate', this.onIceCandidate);
        CallStore.on('call.answer', this.onAnswer);
        CallStore.on('call.callAnswer', this.onCallAnswer);
    }

    componentWillUnmount() {
        CallStore.off('call.iceCandidate', this.onIceCandidate);
        CallStore.off('call.answer', this.onAnswer);
        CallStore.off('call.callAnswer', this.onCallAnswer);
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
                },
                {
                    username: 'rezvan',
                    credential: 'rezvan',
                    urls: [
                        'turn:62.109.5.232'
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

        navigator.mediaDevices.getUserMedia({audio: true, video: false})
                              .then(this.onMediaSuccess)
                              .catch(this.onMediaFailure);
    }

    /**
     * When the critical exception is thrown,
     * we should reject the call and notify the remote peer
     */
    rejectCallOnError = (description, e) => {
        console.error(`${description}: ${e}`);
    }

    onCallAnswer = () => {
        let answer = CallStore.getCallAnswer();
        console.log(`Call answer ${answer}`);
        if (answer) {
            this.pc.createOffer(OFFER_OPTIONS)
                   .then(this.onCreateOfferSuccess, this.onCreateOfferFailure);
        } else {
            CallActions.reset();
        }
    }

    onCreateOfferSuccess = (desc) => {
        console.log('UI: Creating offer');
        this.pc.setLocalDescription(desc).then(() => {
            console.log('Set local description success');
            console.log('Sending offer to the remote peer');
            createOffer(desc);
            this.setState({
                callStatus: CallStates.OUTGOING_CALL_OFFER_SENT
            });
        }, (e) => {
            this.rejectCallOnError('Set local description failed', e);
        });
    }

    onCreateOfferFailure = () => {
        this.rejectCallOnError('Create offer failure', e);
    }

    onAnswer = () => {
        let answer = CallStore.getAnswer();
        console.log('UI: Remote peer sent answer');
        console.log(answer);
        this.pc.setRemoteDescription(answer).then(() => {
            console.log('Set remote description success');
        }, (e) => {
            this.rejectCallOnError('Set remote desc failure', e);
        })
    }

    onIceCandidate = (iceCandidate) => {
        console.log(`UI: On ICE Candidate`);
        console.log(iceCandidate);

        this.pc.addIceCandidate(iceCandidate).then(() => {
            console.log('Ice successfully added');
        }, (e) => {
            this.rejectCallOnError('Ice add failure', e);
        });
    }

    onMediaSuccess = (stream) => {
        console.log('Get media success');
        this.pc.addStream(stream);
        this.localStream = stream;

        makeCall(this.props.to);

        this.setState({
            callStatus: CallStates.OUTGOING_CALL_WAITING_FOR_CALL_ANSWER
        });
    }

    onMediaFailure = (e) => {
        this.rejectCallOnError('Get media failure', e);
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

    render() {
        if (this.state.callStatus < CallStates.OUTGOING_CALL_WAITING_FOR_CALL_ANSWER) {
            return null;
        }
        return (
            <div>
                <Row style={{paddingTop: '80px', textAlign: 'center'}} className="call-component">
                    <Col lg={{ size: 6, push: 3, pull: 3 }}>
                        <InCallUserComponent userName="You"/>
                        <audio ref={(input) => { this.remoteAudio = input }} autoPlay />
                        <InCallUserComponent userName={ CallStore.getCallTo().userName } />
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
}

export default OutgoingCallComponent;


