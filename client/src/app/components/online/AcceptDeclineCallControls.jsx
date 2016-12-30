import React, { Component, PropTypes } from 'react';
import { Button } from 'reactstrap';

class AcceptDeclineCallControls extends Component {

    static propTypes= {
        onAccept: PropTypes.func.isRequired,
        onDecline: PropTypes.func.isRequired
    }

    render() {
        return (
            <div className="text-center">
                <Button color="success" onClick={this.props.onAccept}>Accept call</Button>
                <Button color="danger" onClick={this.props.onDecline}>Decline call</Button>
            </div>
        );
    }
}

export default AcceptDeclineCallControls;
