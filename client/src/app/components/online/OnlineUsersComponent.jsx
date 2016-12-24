import React, { Component, PropTypes } from 'react';
import { Row, Col } from 'reactstrap';

import UsersList from '../../components/online/UsersList';
import SettingsBar from '../../components/online/SettingsBar';

class OnlineUsersComponent extends Component {

    static propTypes = {
        users: PropTypes.array.isRequired,
        onUserCallClick: PropTypes.func.isRequired
    }

    static defaultProps = {

    }

    render() {
        return (
            <Row style={{paddingTop: '50px'}}>
                <Col lg="2">
                    <SettingsBar/>
                </Col>
                <Col lg="9">
                    <UsersList users={this.props.users} onUserCallClick={this.props.onUserCallClick}></UsersList>
                </Col>
            </Row>
        );
    }
}

export default OnlineUsersComponent;
