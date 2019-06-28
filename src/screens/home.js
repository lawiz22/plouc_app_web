import React, { Component } from 'react';
import { Animated, View, Image, StyleSheet, ScrollView, Text } from 'react-native';
import { DefaultTheme, Appbar, Title, Badge, Button as ButPaper } from 'react-native-paper';
// import { Avatar } from 'react-native-elements';

import Styles, { COLOR } from "../config/styles";
import { bindActionCreators } from "redux";
import * as authActions from "../actions/authenticate";
import * as postActions from "../actions/posts";
import * as artistActions from "../actions/artists";
import * as albumActions from "../actions/albums";
import * as songActions from "../actions/songs";
import { connect } from "react-redux";

import {hashHistory} from 'react-router'
import  Profile  from '../components/profile'
import  PostAll  from '../components/post_all'
import  PostDetail  from '../components/post_detail'
import  ArtistAll  from '../components/artist_all'
import  ArtistDetail  from '../components/artist_detail'
import  AlbumAll  from '../components/album_all'
import  AlbumDetail  from '../components/album_detail'
import  SongAll  from '../components/song_all'
import  SongDetail  from '../components/song_detail'
import ReactPlayer from 'react-player';
import 'semantic-ui-css/semantic.min.css'

import Navigation from '../components/Navigation'



class Home extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    const {activeUser} = this.props;
    return (
      <div className="Home">
      <Navigation/>

        
       
           
            
            <View style={styles.container}> 
             
              {this.props.activeUser&&this.props.state.showProfilefront? <Profile/> : null }
              {this.props.userposts_status.showPostfront? <PostAll/> : null }
              {this.props.userposts_status.showDetailview? <PostDetail/> : null }  
              {this.props.userartists_status.showArtistfront? <ArtistAll/> : null }
              {this.props.userartists_status.showArtistDetailview? <ArtistDetail/> : null }
              {this.props.useralbums_status.showAlbumfront? <AlbumAll/> : null }  
              {this.props.useralbums_status.showDetailview? <AlbumDetail/> : null }
              {this.props.usersongs_status.showSongfront? <SongAll/> : null }
              {this.props.usersongs_status.showSongDetailview? <SongDetail/> : null }  
              
            </View>   
              
              
                     
                  
              
              
         
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
  state => ({ state: state.authenticate,
              activeUser: state.activeUser,
              userposts_status : state.list_post,
              userartists_status : state.list_artist,
              useralbums_status : state.list_album,
              usersongs_status : state.list_song,
              userposts : state.list_post.postList
   }),
  dispatch => ({
      actions: bindActionCreators(authActions, dispatch),
      posts: bindActionCreators(postActions, dispatch),
      artists: bindActionCreators(artistActions, dispatch),
      albums: bindActionCreators(albumActions, dispatch),
      songs: bindActionCreators(songActions, dispatch)
  })
)(Home);

