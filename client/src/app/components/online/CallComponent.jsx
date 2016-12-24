import React, { Component, PropTypes } from 'react';
import { Row, Col, Button } from 'reactstrap';
import { forEach } from 'lodash';

import InCallUserComponent from './InCallUserComponent';

import { makeCall, endCall, sendICECandidate, createOffer, createAnswer, sendCallAnswer } from '../../ws/CallService';

import CallStore from '../../stores/CallStore';
import CallActions from '../../actions/CallActions';

import style from './CallComponent.scss';
import userIcon from '../../../img/account.png';

class CallComponent extends Component {

    static propTypes = {

    }

    static defaultProps = {

    }

    state = {
        connectionStatus: 'Connecting...',
        peerConnection: undefined
    }

    componentWillMount() {
        CallStore.on('call.iceCandidate', this.onIceCandidate);
        CallStore.on('call.offer', this.onOffer);
        CallStore.on('call.answer', this.onAnswer);
        CallStore.on('call.callAnswer', this.onCallAnswer);
    }

    componentWillUnmount() {
        CallStore.off('call.iceCandidate', this.onIceCandidate);
        CallStore.off('call.offer', this.onOffer);
        CallStore.off('call.answer', this.onAnswer);
        CallStore.off('call.callAnswer', this.onCallAnswer);
    }


    componentDidMount() {
        this.pc = new RTCPeerConnection();

        this.pc.onicecandidate = function (evt) {
            console.log("ICE Event");
            console.log(evt);
            sendICECandidate(evt.candidate);
        };

        this.pc.onaddstream = (evt) => {
            console.log('On add stream');
            console.log(evt);
            this.remoteAudio.src = URL.createObjectURL(evt.stream);
        };

        if (CallStore.getCallType() == 'IN') {
            navigator.mediaDevices.getUserMedia({audio: true, video: false}).then(this.onMediaSuccess).catch(this.onMediaFailure);
        }
    }

    onCallAnswer = () => {
        let answer = CallStore.getCallAnswer();
        console.log(`Call answer ${answer}`);
        if (answer) {
            navigator.mediaDevices.getUserMedia({audio: true, video: false}).then(this.onMediaSuccess).catch(this.onMediaFailure);
        }
    }

    onOffer = () => {
        console.log('On offer');
        let offer = CallStore.getOffer();
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
                    console.log(`Set local description error: ${e}`);
                })
            }, (e) => {
                console.log(`Creating answer failure: ${e}`);
            })
        }, (e) => {
            console.log(`Set remote desc failure: ${e}`);
        })
    }

    onAnswer = () => {
        let answer = CallStore.getAnswer();
        console.log('On answer');
        console.log(answer);
        this.pc.setRemoteDescription(answer).then(() => {
            console.log('Set remote description success');
        }, (e) => {
            console.log(`Set remote desc failure: ${e}`);
        })
    }

    onIceCandidate = () => {
        console.log('On ICE');
        let ice = CallStore.getIceCandidate();

        forEach(ice, (val) => {
            this.pc.addIceCandidate(val).then(() => {
                console.log('Ice successfully added');
            }, (e) => {
                console.log(`Ice add failure: ${e}`);
            });
        });

    }

    endCall = () => {
        endCall();
    }

    onMediaSuccess = (stream) => {
        console.log('Success');
        this.pc.addStream(stream);

        if (CallStore.getCallType() == 'OUT') {
            this.pc.createOffer({offerToReceiveAudio: 1, offerToReceiveVideo: 0})
                   .then(this.onCreateOfferSuccess, this.onCreateSessionDescriptionError);
        } else {
            sendCallAnswer(true);
        }
    }

    onMediaFailure = (e) => {
        console.log(e);
    }

    onCreateOfferSuccess = (desc) => {
        console.log('Creating offer');
        this.pc.setLocalDescription(desc).then(() => {
            console.log('Set local description success');
            console.log('Sending offer to remote peer');
            createOffer(desc);
        }, (e) => {
            console.log(`Set local description failed: ${e}`);
        });
    }

    onCreateSessionDescriptionError = (error) => {
        console.log(error);
    }

    render() {
        return (
            <div>
                <Row style={{paddingTop: '80px', textAlign: 'center'}} className="call-component">
                    <Col lg={{ size: 6, push: 3, pull: 3 }}>
                        <InCallUserComponent userName="You"/>
                        <span>
                            {
                                this.state.connectionStatus
                            }
                        </span>
                        <audio ref={(input) => { this.remoteAudio = input }} autoPlay />
                        <InCallUserComponent userName={ CallStore.getCallType() == 'OUT' ? CallStore.getCallTo().userName
                                                                                         : CallStore.getCallFrom().userName} />
                    </Col>
                </Row>
                <Row>
                    <Col lg={{ size: 6, push: 3, pull: 3 }} style={{textAlign: 'center'}}>
                        <Button color="danger" onClick={this.endCall}>End Call</Button>
                    </Col>
                </Row>
            </div>

        );
    }
}

export default CallComponent;
