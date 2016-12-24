import React, { Component, PropTypes } from 'react';

import style from './InCallUserComponent.scss';
import userIcon from '../../../img/account.png';

class InCallUserComponent extends Component {

    static propTypes = {
        userName: PropTypes.string.isRequired
    }

    render() {
        return (
            <h2 style={{display: 'inline-block'}} className="text-center">
                <img width={180} height={180} src={userIcon} />
                <br />
                <span>{this.props.userName}</span>
            </h2>

        );
    }
}

export default InCallUserComponent;
