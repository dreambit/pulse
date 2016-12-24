import React, {PropTypes} from 'react'
import {Container, Row, Col} from 'reactstrap';

import UserRow from './UserRow';
import style from './UserList.scss';

class UsersList extends React.Component {

    static propTypes = {
        users: PropTypes.array.isRequired,
        onUserCallClick: PropTypes.func.isRequired
    }


    render() {
        return (
            <Row className="users-list">
                <Col lg="12">
                    <div className="main-box no-header clearfix">
                        <div className="main-box-body clearfix">
                            <div className="table-responsive">
                                <table className="table user-list">
                                    <thead>
                                    <tr>
                                        <th className="left"><span>Nick</span></th>
                                        <th><span>Country</span></th>
                                        <th><span>Level</span></th>
                                        <th><span>Favorite topics</span></th>
                                        <th><span>Contacts</span></th>
                                        <th><span>Actions</span></th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        this.props.users.map(user => <UserRow key={user.id} user={user} onUserCallClick={this.props.onUserCallClick}>

                                                                      </UserRow>)
                                    }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
        );
    }
}

export default UsersList;
