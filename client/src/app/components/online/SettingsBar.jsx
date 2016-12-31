import React, { Component, PropTypes } from 'react';
import { Collapse, FormGroup, Label, Input } from 'reactstrap';
import { clone, debounce, set } from 'lodash';

import Gender from '../../common/Gender';
import UserActions from '../../actions/UserActions';
import UserStore from '../../stores/UserStore';

export default class SettingsBar extends Component {

    constructor(props) {
        super(props);

        this.onNameChange = debounce(this.onNameChange, 1000);
    }

    state = {
        collapse: true,
        user: clone(UserStore.getUser())
    }

    toggle = () => {
        this.setState({
            collapse: !this.state.collapse
        });
    }

    onNameChange = (e) => {
        let userName = e.target.value;

        this.setState({
            user: set(this.state.user, 'userName', userName)
        });
        UserActions.setUserName(userName);
    }

    onNameChangeDelayed = (e) => {
        e.persist();
        this.onNameChange(e);
    }

    onGenderChange = (e) => {
        let gender = e.target.value;

        this.setState({
            user: set(this.state.user, 'gender', gender)
        });
        UserActions.setUserGender(gender);
    }

    onLevelChange = (e) => {
        let level = e.target.value;

        this.setState({
            user: set(this.state.user, 'level', level)
        });
        UserActions.setUserLevel(level);
    }

    onCountryChange = (e) => {
        let countryCode = e.target.value;

        this.setState({
            user: set(this.state.user, 'countryCode', countryCode)
        });
        UserActions.setUserCountryCode(countryCode);
    }


    render() {
        return (
            <div>
                <div className="card card-group">
                    <div className="card-header" onClick={this.toggle}>
                        <span>You settings</span>
                        <i style={{float: 'right'}} className={`fa ${this.state.collapse ? 'fa-chevron-up' : 'fa-chevron-down'}`} aria-hidden="true"></i>
                    </div>
                    <Collapse isOpen={this.state.collapse}>
                        <div style={{padding: '20px'}}>
                            <FormGroup>
                                <Label>You name</Label>
                                <Input placeholder="You name" defaultValue={this.state.user.userName} onChange={this.onNameChangeDelayed} />
                            </FormGroup>
                            <FormGroup>
                                <Label>Gender</Label>
                                <Input type="select" onChange={this.onGenderChange} value={this.state.user.gender}>
                                    <option value=""></option>
                                    <option value={Gender.MALE}>Male</option>
                                    <option value={Gender.FEMALE}>Female</option>
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Label>Level</Label>
                                <Input type="select" onChange={this.onLevelChange} value={this.state.user.level}>
                                    <option>Beginner</option>
                                    <option>Pre-Intermediate</option>
                                    <option>Intermediate</option>
                                    <option>Upper-Intermediate</option>
                                    <option>Advanced</option>
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Label>Country</Label>
                                <Input type="select" onChange={this.onCountryChange} value={this.state.user.countryCode}>
                                    <option>us</option>
                                    <option>ru</option>
                                    <option>ch</option>
                                    <option>gb</option>
                                    <option>sp</option>
                                </Input>
                            </FormGroup>
                        </div>
                    </Collapse>
                </div>
            </div>
        );
    }
}
