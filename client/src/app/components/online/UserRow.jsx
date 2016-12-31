import React, {PropTypes} from 'react'
import Gender from '../../common/Gender';

class UserRow extends React.Component {

    static propTypes = {
        user: PropTypes.object.isRequired,
        onUserCallClick: PropTypes.func.isRequired
    }

    onUserCallClick = (e) => {
        e.preventDefault();
        this.props.onUserCallClick(this.props.user);
    }

    renderGenderIcon = () => {
        if (this.props.user.gender) {
            if (this.props.user.gender === Gender.MALE) {
                return <i className="icon fa fa-male" aria-hidden="true"></i>
            } else {
                return <i className="icon fa fa-female" aria-hidden="true"></i>
            }
        } else {
            return <i className="icon fa fa-reddit-alien" aria-hidden="true"></i>
        }
    }

    render() {
        return (
            <tr>
                <td className="left">
                    {
                        this.renderGenderIcon()
                    }
                    <a href="#" className="user-link">{this.props.user.userName}</a>
                </td>
                <td className="text-center">
                    <span className={`famfamfam-flags flag ${this.props.user.countryCode}`}></span>
                </td>
                <td className="text-center">
                    <span className="label label-default">{this.props.user.level}</span>
                </td>
                <td style={{width: '20%'}}>
                    <a href="#" className="table-link">
                        <i className="fa fa-phone" onClick={this.onUserCallClick}></i>
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
