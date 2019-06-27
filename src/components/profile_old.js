import React, { Component } from 'react';
import { Animated, View, Image, StyleSheet, PanResponder, Text } from 'react-native';
import { DefaultTheme, Appbar, Title, Badge, Button as ButPaper } from 'react-native-paper';
// import { Avatar } from 'react-native-elements';
import 'semantic-ui-css/semantic.min.css'
import { Button as ButNEW, Segment } from 'semantic-ui-react'


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
    return (
      

      <div className="PostAll">
      <HeaderProfile></HeaderProfile>  

      <View style={styles.container}>
      
                        
      <View style={{
                            
                           //  height: 122,
                            width: 250,
                            borderRightColor:  COLOR.PROFILE,
                            borderRightWidth: 4,
                            borderLeftColor:  COLOR.PROFILE,
                            borderLeftWidth: 4,
                            borderTopColor:  COLOR.PROFILE,
                            borderTopWidth: 20,
                            borderRadius: 30,
                            marginTop: -18,
                            marginRight: 0,

                            
                        }}>{this.props.activeUser? <Image
                        source={{ uri: `${settings.API_ROOT}${this.props.activeUser.profile.image}` }}
                        style={{
                            marginTop: 5,
                            height: 100,
                            width: 100,
                            left : 66,
                            borderRadius: 10,
                            alignItems : 'stretch',
                            justifyContent: 'center', 
                            borderColor:  COLOR.PROFILE,
                            borderWidth: 3,
                        }} /> : null } 
                        {this.props.activeUser? <Badge style={{ right : 40 , backgroundColor: "green" }} >{`${this.props.activeUser.role || "Plouc"}` }</Badge>: null}    
        {this.props.activeUser? <Title> {`Salut ${this.props.activeUser.first_name} ${this.props.activeUser.last_name}`}</Title>: null }   

      <View style={{
                            
                            // height: 122,
                            marginTop: 5,
                            marginBottom: -1,
                            
                            // marginRight: 10,
                            // width: 248,
                            alignItems : 'center',
                            justifyContent: 'center',
                            borderBottomColor:  COLOR.PROFILE,
                            borderBottomWidth: 20,
                            borderTopColor:  COLOR.PROFILE,
                            borderTopWidth: 8,
                            borderRadius: 30,

                            
                            
                        }}> 
                        <ButNEW color="blue">
                          Ca marche en esti
                        </ButNEW>
                 
            <Text>{' '}</Text>
      {this.props.activeUser?<ButPaper icon="content-copy" mode="outlined" raised theme={{ colors: {
                            ...DefaultTheme.colors,primary: COLOR.PROFILE } }} color = {COLOR.LIGHT_GRAY} style = {{backgroundColor : COLOR.PROFILE, borderRadius: 10 }} onPress={() => console.log('Pressed')}>
                            {`Posts ${this.props.activeUser.first_name} `}
                        </ButPaper>: null}
      <Text>{' '}</Text>
      {this.props.activeUser?<ButPaper icon="people" mode="outlined"  raised theme={{ colors: {
                            ...DefaultTheme.colors,primary: COLOR.PROFILE } }} color = {COLOR.LIGHT_GRAY} style = {{backgroundColor : COLOR.PROFILE,borderRadius: 10}} onPress={() => console.log('Pressed')}>
                            {`Artists ${this.props.activeUser.first_name} `}
                        </ButPaper>: null}      
      <Text>{' '}</Text>                  
      {this.props.activeUser?<ButPaper icon="library-music" mode="outlined" raised theme={{ colors: {
                            ...DefaultTheme.colors,primary: COLOR.PROFILE } }} color = {COLOR.LIGHT_GRAY} style = {{backgroundColor : COLOR.PROFILE,borderRadius: 10}} onPress={() => console.log('Pressed')}>
                            {`Albums ${this.props.activeUser.first_name} `}
                        </ButPaper>: null}
      <Text>{' '}</Text>                        
      {this.props.activeUser?<ButPaper icon="music-note" mode="outlined"  raised theme={{ colors: {
                            ...DefaultTheme.colors,primary: COLOR.PROFILE } }} color = {COLOR.LIGHT_GRAY} style = {{backgroundColor : COLOR.PROFILE,borderRadius: 10}} onPress={() => console.log('Pressed')}>
                            {`Songs ${this.props.activeUser.first_name} `}
                        </ButPaper>: null}        
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


