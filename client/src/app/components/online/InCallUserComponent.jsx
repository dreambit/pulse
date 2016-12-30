import React, { Component, PropTypes } from 'react';

require('./InCallUserComponent.scss');

class InCallUserComponent extends Component {

    static propTypes = {
        userName: PropTypes.string.isRequired
    }

    render() {
        return (
            <h2 style={{display: 'inline-block'}} className="incall-user-component">
                <div className="user-icon"/>
                <span>{this.props.userName}</span>
            </h2>

        );
    }
}

export default InCallUserComponent;
