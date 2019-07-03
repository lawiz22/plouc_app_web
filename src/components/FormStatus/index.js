import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { Label, Icon, Button } from 'semantic-ui-react'
import './FormStatus.scss';


class FormStatus extends Component {

    renderErrors = () => {
        const {formState: {error}} = this.props;
        if(!error) return;
        return Object.keys(error)
            .map(key => <div key={key}>{`${key} - ${error[key]}`}</div>);
    };

    renderSuccess = () => {
        const {formState: {success}} = this.props;
        if(!success) return;
        return console.log(success)
    };

    render() {
        const {formState: {success}} = this.props;
        console.log(this.formState)
        return (
            <div className="FormStatus">
                {this.renderErrors() != null?<Button as='div' labelPosition='right'>
                    <Button color='red'>
                    <Icon name='warning' />
                        Warning
                    </Button>
                    <Label as='a' basic color='red' pointing='left'>
                        {this.renderErrors()}
                    </Label>
                </Button>:null}
                {!success?<Button as='div' labelPosition='right'>
                    <Button color='olive'>
                    <Icon name='hand victory' />
                        
                    </Button>
                    
                </Button>:null}
                
                
            </div>
        );
    }

}

FormStatus.propTypes = {
    formState: PropTypes.object.isRequired,
};

export default connect(state => ({}))(FormStatus);
