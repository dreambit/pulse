import React, {PropTypes} from 'react';

// view components
import CallComponent from '../components/online/CallComponent';
import OnlineUsersComponent from '../components/online/OnlineUsersComponent';

// stores && actions
import OnlineUsersStore from './../stores/OnlineUsersStore';
import OnlineUsersActions from './../actions/OnlineUsersActions';
import OnlineUserSettingsStore from '../stores/OnlineUserSettingsStore';

import CallStore from './../stores/CallStore';

// ws
import WsClient from '../ws/WsClient';
import { makeCall } from '../ws/CallService';

// utils
import { validate as validateUser}  from '../common/UserUtils';

class OnlineUsersView extends React.Component {

    state = {
        users: [],
        isConnected: false,
        isInCall: false
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
        CallStore.on('call.callTo', this.onCallTo);
        CallStore.on('call.callFrom', this.onCallFrom);
        CallStore.on('call.reset', this.onCallEnd);
    }

    componentDidMount() {
        this.setState({
            users: OnlineUsersStore.getUsers()
        });
    }

    onCallTo = () => {
        this.setState({
            isInCall: true
        });
    }

    onCallFrom = () => {
        console.log(CallStore.getCallType());
        console.log(CallStore.getCallFrom());
        this.setState({
            isInCall: true
        });
    }

    onCallEnd = () => {
        this.setState({
            isInCall: false
        });
    }

    onUserCallClick = (user) => {
        console.log(`Call acquired to`);
        console.log(user);
        makeCall(user);
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
                OnlineUsersActions.updateUser(settings);
            } else {
                console.log(`Sending new settings: ${JSON.stringify(settings)}`);
                WsClient.sendInfo(settings);
                OnlineUsersActions.addUser(settings);
                this.setState({
                    isConnected: true
                });
            }
        }
    }

    render() {
        return (
                this.state.isInCall ? <CallComponent />
                                    : <OnlineUsersComponent users={this.state.users} onUserCallClick={this.onUserCallClick} />
        );
    }
}

export default OnlineUsersView;
