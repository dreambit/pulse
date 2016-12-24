import React, { Component, PropTypes } from 'react';
import { Row, Col, Button } from 'reactstrap';

import InCallUserComponent from './InCallUserComponent';

import { endCall } from '../../ws/CallService';

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
        connectionStatus: 'Connecting...'
    }

    endCall = () => {
        endCall();
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
                        <InCallUserComponent userName={ CallStore.getCallType() == 'OUT' ? CallStore.getCallTo().userName
                                                                                         : CallStore.getCallFrom().userName}/>
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
