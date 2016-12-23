import React, {PropTypes} from 'react';
import { Row, Col } from 'reactstrap';

import UsersList from './../components/online/UsersList';
import OnlineUsersStore from './../stores/OnlineUsersStore';
import WsClient from '../ws/WsClient';
import SettingsBar from '../components/online/SettingsBar';
import OnlineUserActions from './../actions/OnlineUserActions';

import OnlineUserSettingsStore from '../stores/OnlineUserSettingsStore';

import { validate as validateUser}  from '../common/UserUtils';

class OnlineUsersView extends React.Component {

    state = {
        users: [],
        isConnected: false
    }

    componentWillMount() {
        // listen for new users, etc
        OnlineUsersStore.on('users.*', () => {
            this.setState({
                users: OnlineUsersStore.getUsers()
            });
        });
        // listen for settings update
        OnlineUserSettingsStore.on('settings.setAll', () => {
            this.onSettingsChange();
        });
    }

    componentDidMount() {
        this.setState({
            users: OnlineUsersStore.getUsers()
        });
    }

    onSettingsChange = () => {
        let settings = OnlineUserSettingsStore.getSettings();

        // check user settings
        if (!validateUser(settings)) {
            console.log(`You settings are not valid: ${JSON.stringify(settings)}`);
        } else {
            // if user is in list
            if (this.state.isConnected) {
                console.log(`Updating settings: ${JSON.stringify(settings)}`);
                WsClient.updateInfo(settings);
                OnlineUserActions.updateUser(settings);
            } else {
                console.log(`Sending new settings: ${JSON.stringify(settings)}`);
                WsClient.sendInfo(settings);
                OnlineUserActions.addUser(settings);
                this.setState({
                    isConnected: true
                });
            }
        }
    }

    render() {
        return (
            <Row style={{paddingTop: '50px'}}>
                <Col lg="2">
                    <SettingsBar/>
                </Col>
                <Col lg="9">
                    <UsersList users={this.state.users}></UsersList>
                </Col>
            </Row>
        );
    }
}

export default OnlineUsersView;
