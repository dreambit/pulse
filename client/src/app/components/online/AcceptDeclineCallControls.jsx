import React, { Component, PropTypes } from 'react';

class AcceptDeclineCallControls extends Component {

    static propTypes= {
        onAccept: PropTypes.func.isRequired,
        onDecline: PropTypes.func.isRequired
    }

    render() {
        return (
            <span>
                <Button color="success" onClick={this.props.onAccept}>Accept call</Button>
                <Button color="danger" onClick={this.props.onDecline}>Decline call</Button>
            </span>
        );
    }
}

export default AcceptDeclineCallControls;
