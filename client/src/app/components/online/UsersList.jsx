import React, {PropTypes} from 'react'
import { Row, Col, Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import { chain } from 'lodash';

import UserRow from './UserRow';

// style
require('./UserList.scss');

const PAGE_SIZE = 10;

class UsersList extends React.Component {

    static propTypes = {
        users: PropTypes.array.isRequired,
        onUserCallClick: PropTypes.func.isRequired
    }

    state = {
        index: 0
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.index >= nextProps.users.length) {
            this.setState({
                index: 0
            });
        }
    }

    onNextClick = () => {
        let nextIndex = this.state.index + PAGE_SIZE;

        if (nextIndex < this.props.users.length) {
            this.setState({
                index: nextIndex
            });
        }
    }

    onPrevClick = () => {
        if (this.state.index !== 0) {
            this.setState({
                index: this.state.index - PAGE_SIZE
            });
        }
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
                                        <th><span>Actions</span></th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        chain(this.props.users).slice(this.state.index, this.state.index + PAGE_SIZE)
                                                               .map(user => <UserRow key={user.id} user={user}
                                                                                     onUserCallClick={this.props.onUserCallClick} />)
                                                               .value()
                                    }
                                    </tbody>
                                </table>

                            </div>
                        </div>
                    </div>
                    <Pagination size="lg">
                        <PaginationItem style={{cursor: 'pointer'}} onClick={this.onPrevClick}>
                            <PaginationLink>
                                <i className="fa fa-chevron-left" style={{verticalAlign: 'middle', paddingRight: '10px'}} aria-hidden="true"></i>Previous
                            </PaginationLink>
                        </PaginationItem>
                        <PaginationItem style={{cursor: 'pointer'}} onClick={this.onNextClick}>
                            <PaginationLink>
                                Next<i className="fa fa-chevron-right" style={{verticalAlign: 'middle', paddingLeft: '10px'}} aria-hidden="true"></i>
                            </PaginationLink>
                        </PaginationItem>
                    </Pagination>
                </Col>
            </Row>
        );
    }
}

export default UsersList;
