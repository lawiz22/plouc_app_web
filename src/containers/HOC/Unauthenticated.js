import React, {Component} from 'react';
import {connect} from 'react-redux';
import {hashHistory} from 'react-router';


export default function(InnerComponent) {

    class Unauthenticated extends Component {

        componentDidMount() {
            const {activeUser} = this.props;
            const {userposts_status} = this.props;
            if(activeUser) hashHistory.push('/');
        }

        render() {
            return <InnerComponent {...this.props} />;
        }

    }

    return connect(state => ({
        activeUser: state.activeUser,
        userposts_status : state.list_post,
    }))(Unauthenticated);

}
