import React, {PropTypes} from 'react'

import UsersList from './../components/online/UsersList';
import OnlineUsersStore from './../stores/OnlineUsersStore';

class OnlineUsersView extends React.Component {

    state = {
        users: []
    }

    componentWillMount() {
        OnlineUsersStore.on('users.*', () => {
            this.setState({
                users: OnlineUsersStore.getUsers()
            });
        });
    }

    componentDidMount() {
        this.setState({
            users: OnlineUsersStore.getUsers()
        });
    }

    render() {
        return (
            <div style={{paddingTop: '50px'}}>
                <UsersList users={this.state.users}></UsersList>
            </div>
        );
    }
}

export default OnlineUsersView;
