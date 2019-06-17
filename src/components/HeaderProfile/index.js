import React, { Component } from 'react';
import { Animated, View, Image, StyleSheet, PanResponder, Text } from 'react-native';
import { DefaultTheme, Appbar, Title, Badge, Button as ButPaper } from 'react-native-paper';
// import { Avatar } from 'react-native-elements';

import Styles, { COLOR } from "../../config/styles";
import { bindActionCreators } from "redux";
import * as authActions from "../../actions/authenticate";


import { connect } from "react-redux";

import {hashHistory} from 'react-router'




class HeaderProfile extends Component {
  constructor(props) {
    super(props);
    
  }


  


  render() {
    const {activeUser} = this.props;
    return (
      <View style={styles.container}>
      
      <Appbar.Header theme={{ colors: { primary: COLOR.PROFILE }}} >
              
               {this.props.activeUser? <Appbar.Action icon="settings" />: null }
            
                <Appbar.Content
                title="PROFILE"
                subtitle=""
                style ={{ alignItems: 'center' }} 
                />                
                <Appbar.Action icon="mail"  />
            </Appbar.Header>  
                    
      </View> 
    );
  }
}

const styles = StyleSheet.create({
  container: {
     //flex: 1,
     //flexDirection: 'row',
     //alignItems: 'stretch',
     //justifyContent: 'center',
    // alignItems: 'stretch',
    //justifyContent: 'center',
    // paddingTop: 20,
    paddingBottom: 20,
    borderRadius: 25,
 
    // borderBottomColor:  COLOR.HOME,
    // borderBottomWidth: 40,
    
  },
  image: {
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    width: 100,
    height: 100,
  },
});


  export default connect(
    state => ({ state: state.authenticate,
                activeUser: state.activeUser,
                
                
             }),
    dispatch => ({
                actions: bindActionCreators(authActions, dispatch),
                
                
                })
)(HeaderProfile);

