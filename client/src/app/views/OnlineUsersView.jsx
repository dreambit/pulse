import React, {PropTypes} from 'react';

// view components
import IncomingCallComponent from '../components/online/IncomingCallComponent';
import OutgoingCallComponent from '../components/online/OutgoingCallComponent';
import OnlineUsersComponent from '../components/online/OnlineUsersComponent';

// stores && actions
import OnlineUsersStore from './../stores/OnlineUsersStore';
import OnlineUsersActions from './../actions/OnlineUsersActions';
import OnlineUserSettingsStore from '../stores/OnlineUserSettingsStore';

import CallStore, { CALL_TYPE } from './../stores/CallStore';

// ws
import WsClient from '../ws/WsClient';

// utils
import { validate as validateUser}  from '../common/UserUtils';

class OnlineUsersView extends React.Component {

    state = {
        users: [],
        isConnected: false,
        isInCall: false,
        callType: undefined,
        callTo: undefined
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
        CallStore.on('call.callFrom', this.onCallFrom);
        CallStore.on('call.reset', this.onCallEnd);
    }

    componentDidMount() {
        this.setState({
            users: OnlineUsersStore.getUsers()
        });
    }

    onCallFrom = () => {
        this.setState({
            isInCall: true,
            callType: CALL_TYPE.IN
        });
    }

    onCallEnd = () => {
        this.setState({
            isInCall: false,
            callType: undefined,
            callTo: undefined
        });
    }

    onUserCallClick = (user) => {
        console.log(`Call acquired to`);
        console.log(user);

        this.setState({
            isInCall: true,
            callType: CALL_TYPE.OUT,
            callTo: user
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
        if (this.state.isInCall) {
            if (this.state.callType === CALL_TYPE.IN) {
                return <IncomingCallComponent />
            } else {
                return <OutgoingCallComponent to={this.state.callTo} />
            }
        } else {
            return <OnlineUsersComponent users={this.state.users} onUserCallClick={this.onUserCallClick} />
        }

    }
}

export default OnlineUsersView;
