import React, {PropTypes} from 'react';
import { Container, Row, Col } from 'reactstrap';

import UsersList from './../components/online/UsersList';
import OnlineUsersStore from './../stores/OnlineUsersStore';
import WsClient from '../ws/WsClient';
import SettingsBar from '../components/online/SettingsBar';
import Gender from '../common/Gender';
import Level from '../common/Level';

class OnlineUsersView extends React.Component {

    state = {
        users: [],
        settings: {
            userName: '',
            gender: Gender.MALE,
            countryCode: '',
            topics: [],
            level: Level.BEGINNER
        }
    }

    componentWillMount() {
        OnlineUsersStore.on('users.*', () => {
            this.setState({
                users: OnlineUsersStore.getUsers()
            });
        });
    }

    componentDidMount() {
        WsClient.sendInfo({userName: 'Rezvan'});
        this.setState({
            users: OnlineUsersStore.getUsers()
        });
    }

    onSettingsChange = () => {

    }

    render() {
        return (
            <Row style={{paddingTop: '50px'}}>
                <Col lg="2">
                    <SettingsBar settings={this.state.settings} onChange={this.onSettingsChange}>

                    </SettingsBar>
                </Col>
                <Col lg="9">
                    <UsersList users={this.state.users}></UsersList>
                </Col>
            </Row>
        );
    }
}

export default OnlineUsersView;
