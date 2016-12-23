import React, {PropTypes} from 'react'
import { Tag } from 'reactstrap';
import Gender from '../../common/Gender';

class UserRow extends React.Component {

    static propTypes = {
        user: PropTypes.object.isRequired
    }

    render() {
        return (
            <tr>
                <td className="left">
                    {
                        this.props.user.gender === Gender.MALE ? <i className="icon fa fa-male" aria-hidden="true"></i>
                                                               : <i className="icon fa fa-female" aria-hidden="true"></i>
                    }
                    <a href="#" className="user-link">{this.props.user.userName}</a>
                </td>
                <td className="text-center">
                    <span className={`famfamfam-flags flag ${this.props.user.countryCode}`}></span>
                </td>
                <td className="text-center">
                    <span className="label label-default">{this.props.user.level}</span>
                </td>
                <td style={{maxWidth: '80px'}}>
                    <Tag style={{marginRight: '7px'}}>Sport</Tag>
                    <Tag style={{marginRight: '7px'}}>IT</Tag>
                    <Tag style={{marginRight: '7px'}}>Box</Tag>
                    <Tag style={{marginRight: '7px'}}>Misic</Tag>
                    <Tag style={{marginRight: '7px'}}>TV</Tag>
                    <Tag style={{marginRight: '7px'}}>Sport</Tag>
                    <Tag style={{marginRight: '7px'}}>IT</Tag>
                    <Tag style={{marginRight: '7px'}}>Box</Tag>
                    <Tag style={{marginRight: '7px'}}>Misic</Tag>
                    <Tag style={{marginRight: '7px'}}>TV</Tag>
                </td>
                <td>
                    <span>Skype</span>
                </td>
                <td style={{width: '20%'}}>
                    <a href="#" className="table-link">
                        <i className="fa fa-phone"></i>
                    </a>
                    <a href="#" className="table-link">
                        <i className="fa fa-comments"></i>
                    </a>
                    <a href="#" className="table-link">
                        <i className="fa fa-address-book"></i>
                    </a>
                </td>
            </tr>
    );
    }
    }

    export default UserRow;
