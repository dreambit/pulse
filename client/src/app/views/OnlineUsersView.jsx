import React, {PropTypes} from 'react';

// view components
import IncomingCallComponent from '../components/online/IncomingCallComponent';
import OutgoingCallComponent from '../components/online/OutgoingCallComponent';
import OnlineUsersComponent from '../components/online/OnlineUsersComponent';

// stores && actions
import OnlineUsersStore from './../stores/OnlineUsersStore';
import OnlineUsersActions from './../actions/OnlineUsersActions';
import UserStore from '../stores/UserStore';

import CallStore, { CALL_TYPE } from './../stores/CallStore';

// ws
import WsClient from '../ws/WsClient';

class OnlineUsersView extends React.Component {

    state = {
        users: [],
        isInCall: false,
        callType: undefined,
        callTo: undefined
    }

    componentWillMount() {
        // listen for new users, etc
        OnlineUsersStore.on('users.*', this.onUsersUpdate);
        UserStore.on('user.*', this.onUserChange);
        CallStore.on('call.callFrom', this.onCallFrom);
        CallStore.on('call.reset', this.onCallEnd);
    }

    componentDidMount() {
        this.setState({
            users: OnlineUsersStore.getUsers()
        });
    }

    componentWillUnmount() {
        OnlineUsersStore.off('users.*', this.onUsersUpdate);
        UserStore.off('user.*', this.onUserChange);
        CallStore.off('call.callFrom', this.onCallFrom);
        CallStore.off('call.reset', this.onCallEnd);
    }

    onUsersUpdate = () => {
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

    onUserChange = () => {
        WsClient.updateInfo(UserStore.getUser());
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
