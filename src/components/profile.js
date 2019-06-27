import React, { Component } from 'react';
import { Animated, View, Image, StyleSheet, PanResponder, Text } from 'react-native';
import { DefaultTheme, Appbar, Title, Badge, Button as ButPaper } from 'react-native-paper';
// import { Avatar } from 'react-native-elements';
import 'semantic-ui-css/semantic.min.css'
import { Button as ButNEW, Segment } from 'semantic-ui-react'
import { Card, Icon } from 'semantic-ui-react'


import Styles, { COLOR } from "../config/styles";
import { bindActionCreators } from "redux";
import * as authActions from "../actions/authenticate";
// import * as postActions from "../actions/posts";
import { connect } from "react-redux";

import {hashHistory} from 'react-router'
import settings from '../config/settings';
import HeaderProfile from '../components/HeaderProfile'


class Profile extends Component {
  

  render() {
    const {activeUser} = this.props;
    const extra = (
      <a>
        <Icon name='user' />
        4 Friends
      </a>
    )
    return (
      

      <div className="PostAll">
      <HeaderProfile></HeaderProfile>  

      <View style={styles.container}>
      
                        
      <View style={{
                            
                           //  height: 122,
                            flexDirection : 'column',
                            width: 300,
                            borderRightColor:  COLOR.PROFILE,
                            borderRightWidth: 4,
                            borderLeftColor:  COLOR.PROFILE,
                            borderLeftWidth: 4,
                            borderTopColor:  COLOR.PROFILE,
                            borderTopWidth: 20,
                            borderRadius: 30,
                            marginTop: -18,
                            //marginRight: 0,

                            
                        }}>

                       {this.props.activeUser? <Card
                            image={`${settings.API_ROOT}${this.props.activeUser.profile.image}`}
                            header={`${this.props.activeUser.first_name} ${this.props.activeUser.last_name}`}
                            meta={`${this.props.activeUser.role || "Plouc"}` }
                            description='Description possible de la personne mentionné ci haut'
                            extra={extra}
                        /> : null } 
 
                          
      <View style={{
                            
                            // height: 122,
                            //marginTop: 5,
                            marginBottom: -1,
                            flexDirection : 'row',
                            // marginRight: 10,
                            //width: ,
                            alignItems : 'center',
                            justifyContent: 'center',
                            borderBottomColor:  COLOR.PROFILE,
                            borderBottomWidth: 20,
                            // borderTopColor:  COLOR.PROFILE,
                            //borderTopWidth: 8,
                            borderRadius: 30,

                            
                            
                        }}> 
                                      
                <ButNEW circular icon='copy' onClick={() => console.log('Pressed POSTS')}/>
                        <Text>{' '}</Text>
                        <ButNEW circular icon='users' onClick={() => console.log('Pressed ARTISTS')}/>    
                        <Text>{' '}</Text>                  
                        <ButNEW circular icon='outdent' onClick={() => console.log('Pressed ALBUMS')}/> 
                        <Text>{' '}</Text>                        
                        <ButNEW circular icon='file audio' onClick={() => console.log('Pressed SONGS')}/>         
                        <Text>{' '}</Text>
                
         </View>
        
        </View>
      
                                                  
                        
      </View>
      
      </div>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    // alignItems: 'stretch',
    //justifyContent: 'flex-start',
    // alignItems: 'center',
    //justifyContent: 'center',
    // paddingRight: 20,
    paddingBottom: 20,
    //borderBottomColor:  COLOR.HOME,
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
   })
)(Profile);


