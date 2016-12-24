import React, { Component, PropTypes } from 'react';
import { Collapse, Button, CardBlock, Card, FormGroup, Label, Input } from 'reactstrap';
import { cloneDeep, extend, debounce } from 'lodash';
import Gender from '../../common/Gender';

import OnlineUserSettingsActions from '../../actions/OnlineUserSettingsActions';
import OnlineUserSettingsStore from '../../stores/OnlineUserSettingsStore';

export default class SettingsBar extends Component {

    static propTypes = {
    }

    constructor(props) {
        super(props);

        this.onNameChange = debounce(this.onNameChange, 1000);
    }

    state = {
        collapse: true,
        settings: cloneDeep(OnlineUserSettingsStore.getSettings()),
        timeout: undefined
    }

    componentWillMount() {
        OnlineUserSettingsStore.on('settings.setUserId', () => {
            this.setState({
                settings: cloneDeep(OnlineUserSettingsStore.getSettings())
            })
        })
    }


    toggle = () => {
        this.setState({
            collapse: !this.state.collapse
        });
    }

    onNameChange = (e) => {
        debugger;
        let settings = extend({}, this.state.settings, {userName: e.target.value});
        this.setState({
            settings: settings
        });
        OnlineUserSettingsActions.setSettings(settings);
    }

    onNameChangeDelayed = (e) => {
        e.persist();
        this.onNameChange(e);
    }

    onGenderChange = (e) => {
        let settings = extend({}, this.state.settings, {gender: e.target.value});
        this.setState({
            settings: settings
        });
        OnlineUserSettingsActions.setSettings(settings);
    }


    render() {
        return (
            <div>
                <div className="card card-group">
                    <div className="card-header" onClick={this.toggle}>You settings</div>
                    <Collapse isOpen={this.state.collapse} style={{padding: '20px'}}>
                        <FormGroup>
                            <Label>You name</Label>
                            <Input placeholder="You name" defaultValue={this.state.settings.userName} onChange={this.onNameChangeDelayed} />
                        </FormGroup>
                        <FormGroup>
                            <Label>Gender</Label>
                            <Input type="select" onChange={this.onGenderChange} value={this.state.settings.gender}>
                                <option value={Gender.MALE}>Male</option>
                                <option value={Gender.FEMALE}>Female</option>
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label>Level</Label>
                            <Input type="select">
                                <option>Beginner</option>
                                <option>Pre-Intermediate</option>
                                <option>Intermediate</option>
                                <option>Upper-Intermediate</option>
                                <option>Advanced</option>
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label>Country</Label>
                            <Input type="select">
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label>Favorite Topics</Label>
                        </FormGroup>
                        <FormGroup>
                            <Label>Skype</Label>
                            <Input placeholder="Skype" />
                            <Label>ICQ</Label>
                            <Input placeholder="ICQ" />
                        </FormGroup>
                    </Collapse>
                </div>
            </div>
        );
    }
}
