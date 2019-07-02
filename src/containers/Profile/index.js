import React, { Component, createRef } from 'react';
import { Animated, View,  StyleSheet, ScrollView, Text } from 'react-native';
import { DefaultTheme, Appbar, Title, Badge, Button as ButPaper } from 'react-native-paper';
// import { Avatar } from 'react-native-elements';
import {Link} from 'react-router';
import Styles, { COLOR } from "../../config/styles";
import { bindActionCreators } from "redux";
import * as authActions from "../../actions/authenticate";
import * as postActions from "../../actions/posts";
import * as artistActions from "../../actions/artists";
import * as albumActions from "../../actions/albums";
import * as songActions from "../../actions/songs";
import {getUser} from '../../actions/accounts/user/get';

import HeaderProfile from '../../components/HeaderProfile'

import ProfileComp from '../../components/profile';
import settings from '../../config/settings';

import { connect } from "react-redux";

import {hashHistory} from 'react-router'

import 'semantic-ui-css/semantic.min.css'
import {
Grid,
Header,
Image,
Rail,
Ref,
Segment,
Sticky,
} from 'semantic-ui-react'

import { Button as ButNEW } from 'semantic-ui-react'
import { Card, Icon } from 'semantic-ui-react'

import Navigation from '../../components/Navigation'



class Profile extends Component {
  constructor() {
    super();

  }

  componentDidMount() {
    const {dispatch, params: {userId}} = this.props;
    dispatch(getUser(userId));
}
  contextRef = createRef()
  render() {
    const {activeUser} = this.props;
    const {user, users} = this.props;
    if(!user) return null;
    
    const extra = (
      <a>
        <Icon name='user' />
        Moi meme (ActiveUser)
      </a>
    )
    return (
      <div className="Home">
      
      
      <Sticky context={this.contextRef}>      
          <Navigation/>
         
       </Sticky>
       
       
          <Ref innerRef={this.contextRef}> 
      
            <View style={styles.container}> 
              
             
              
      
                        
      <View style={{
                            
                           //  height: 122,
                            flexDirection : 'column',
                            width: 300,
                            //borderRightColor:  COLOR.PROFILE,
                            //borderRightWidth: 4,
                            //borderLeftColor:  COLOR.PROFILE,
                            //borderLeftWidth: 4,
                            //borderTopColor:  COLOR.PROFILE,
                            //borderTopWidth: 20,
                            //borderRadius: 30,
                            //marginTop: -18,
                            //marginRight: 0,

                            
                        }}>
                        <Sticky context={this.contextRef}> 
                        <Card
                            image={`${settings.API_ROOT}${this.props.user.profile.image}`}
                            header={`${this.props.user.first_name} ${this.props.user.last_name}`}
                            meta={`${this.props.user.role || "Plouc"}` }
                            description='Description possible de la personne mentionné ci haut'
                            extra={this.props.activeUser.id===this.props.user.id?extra:null}
                        /> </Sticky>
 
                          
      <View style={{
                            
                            // height: 122,
                            //marginTop: 5,
                            marginBottom: -1,
                            flexDirection : 'row',
                            // marginRight: 10,
                            //width: ,
                            alignItems : 'center',
                            justifyContent: 'center',
                            //borderBottomColor:  COLOR.PROFILE,
                            //borderBottomWidth: 20,
                            // borderTopColor:  COLOR.PROFILE,
                            //borderTopWidth: 8,
                            //borderRadius: 30,

                            
                            
                        }}> 
                                      
                        <ButNEW circular icon='copy' onClick={() => hashHistory.push(`/profile/${user.id}/posts`)}/>
                        <Text>{' '}</Text>
                        <ButNEW circular icon='users' onClick={() => console.log('Pressed ARTISTS')}/>    
                        <Text>{' '}</Text>                  
                        <ButNEW circular icon='outdent' onClick={() => console.log('Pressed ALBUMS')}/> 
                        <Text>{' '}</Text>                        
                        <ButNEW circular icon='file audio' onClick={() => console.log('Pressed SONGS')}/>         
                        <Text>{' '}</Text>
                        <ButNEW circular icon='time' onClick={() => hashHistory.push(`/profile/${user.id}/time`)}/>         
                        <Text>{' '}</Text>
                
         </View>
        
        
      
                                                  
                        
      </View>
              {this.props.children}
            </View>   
            
              
         </Ref>            
                  
              
              
         
      </div>
      
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
     //height : '100%',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    // alignItems: 'stretch',
    // justifyContent: 'flex-start',
    ////borderWidth: 5,
    ////borderColor: 'red',
    paddingTop: 0,
    paddingBottom: 10,
    borderBottomColor:  COLOR.CHOCO,
    borderBottomWidth: 40,
    
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
  (state,props) => ({ state: state.authenticate,
              activeUser: state.activeUser,
              userposts_status : state.list_post,
              userartists_status : state.list_artist,
              useralbums_status : state.list_album,
              usersongs_status : state.list_song,
              userposts : state.list_post.postList,
              user: state.users.data[props.params.userId],
              users: state.users.data
   }),
  dispatch => ({
      actions: bindActionCreators(authActions, dispatch),
      posts: bindActionCreators(postActions, dispatch),
      artists: bindActionCreators(artistActions, dispatch),
      albums: bindActionCreators(albumActions, dispatch),
      songs: bindActionCreators(songActions, dispatch)
  })
)(Profile);

