import React, { Component, PropTypes } from 'react';
import { Collapse, Button, CardBlock, Card, FormGroup, Label, Input } from 'reactstrap';
import { cloneDeep, extend } from 'lodash';
import Gender from '../../common/Gender';

export default class SettingsBar extends Component {

    static propTypes = {
        settings: PropTypes.object.isRequired,
        onChange: PropTypes.func.isRequired
    }

    state = {
        collapse: true,
        settings: cloneDeep(this.props.settings)
    }

    toggle = () => {
        this.setState({
            collapse: !this.state.collapse
        });
    }

    onGenderChange = (e) => {
        let settings = extend({}, this.state.settings, {gender: e.target.value});
        this.props.onChange(settings);
        this.setState({
            settings: settings
        });
    }


    render() {
        return (
            <div>
                <div className="card card-group">
                    <div className="card-header" onClick={this.toggle}>You settings</div>
                    <Collapse isOpen={this.state.collapse} style={{padding: '20px'}}>
                        <FormGroup>
                            <Label>You name</Label>
                            <Input placeholder="You name" />
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
