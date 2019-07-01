import React, { Component } from 'react';
import { Animated, View, Image, StyleSheet, PanResponder, Text } from 'react-native';
import { DefaultTheme, Appbar, Title, Badge, Button as ButPaper } from 'react-native-paper';
// import { Avatar } from 'react-native-elements';

import Styles, { COLOR } from "../../config/styles";
import { bindActionCreators } from "redux";
import * as authActions from "../../actions/authenticate";
import { Card, Icon } from 'semantic-ui-react'
import { Button as ButNEW, Segment } from 'semantic-ui-react'
import { Header } from 'semantic-ui-react'


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
      
      <Appbar.Header theme={{ colors: { primary: COLOR.PROFILE }}} style = {{ width : 295 , justifyContent : 'space-evenly'}} >
              
               {this.props.activeUser? <ButNEW circular icon='settings' />: null }

               
               <Segment color='grey' textAlign='center' tertiary>
               <Header as='h3' textAlign='center'>
                   <Header.Content>PROFILE</Header.Content>
               </Header>
               </Segment>
                               
                <Appbar.Action icon="mail"  />
            </Appbar.Header>  
                    
      </View> 
    );
  }
}

const styles = StyleSheet.create({
  container: {
     //flex: 1,
     
     flexDirection: 'row',
     alignItems: 'stretch',
     justifyContent: 'center',
     //width : 290 ,

    // alignItems: 'stretch',
    //justifyContent: 'center',
    // paddingTop: 20,
    //paddingBottom: 20,
    //borderRadius: 25,
    //borderColor:  COLOR.SONG,
     //borderWidth: 4,
    // borderBottomColor:  COLOR.HOME,
    // borderBottomWidth: 40,
    
  },
  image: {
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    width: 100,
    height: 100,
  }
});


  export default connect(
    state => ({ state: state.authenticate,
                activeUser: state.activeUser,
                
                
             }),
    dispatch => ({
                actions: bindActionCreators(authActions, dispatch),
                
                
                })
)(HeaderProfile);

