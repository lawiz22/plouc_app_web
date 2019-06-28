import React, { Component } from 'react';
import { Animated, View, Image, StyleSheet, PanResponder, Text } from 'react-native';
import { DefaultTheme, Appbar, Title, Badge, Button as ButPaper } from 'react-native-paper';
// import { Avatar } from 'react-native-elements';


import Styles, { COLOR } from "../../config/styles";
import { bindActionCreators } from "redux";
import * as authActions from "../../actions/authenticate";
import * as postActions from "../../actions/posts";
import * as artistActions from "../../actions/artists";
import * as albumActions from "../../actions/albums";
import * as songActions from "../../actions/songs";
import { connect } from "react-redux";
import ReactPlayer from 'react-player';
import settings from '../../config/settings';


import {hashHistory} from 'react-router'



class Navigation extends Component {
  constructor(props) {
    super(props);

    this.page = {
       shotProfileFront  : this.props.state.showProfilefront,
       shotPostFront : this.props.userposts_status.showPostfront,
       shotArtistFront : this.props.userartists_status.showArtistfront, 
       shotAlbumFront : this.props.useralbums_status.showAlbumfront, 
       shotSongFront : this.props.usersongs_status.showSongfront, 
    };
    

    console.log(this.props.userposts_status.showPostfront)
    console.log(this.page.shotPostFront)

    
  }
  state = {
    url: null,
    pip: false,
    playing: true,
    controls: false,
    light: false,
    volume: 0.8,
    muted: false,
    played: 0,
    loaded: 0,
    duration: 0,
    playbackRate: 1.0,
    loop: false
  }
  componentDidMount(){
    console.log(this.props.userposts_status.showPostfront)

    // this.page.shotProfileFront  = this.props.state.showProfileFront
    // this.page.shotPostFront = this.props.userposts_status.showPostFront
    // this.page.shotArtistFront = this.props.userartists_status.showArtistFront 
    // this.page.shotAlbumFront = this.props.useralbums_status.showAlbumFront 
    // this.page.shotSongFront = this.props.usersongs_status.showSongFront
}

componentWillMount(){

    
}


   showProfilefront = () => {
        
    this.page.shotProfileFront = !this.page.shotProfileFront
    
    this.props.actions.show_profile_front(this.page.shotProfileFront)
  }

  showPostfront = () => {
        
    this.page.shotPostFront = !this.page.shotPostFront
    
    this.props.posts.show_post_front(this.page.shotPostFront)
  }
  
  showArtistfront = () => {
        
    this.page.shotArtistFront = !this.page.shotArtistFront
    
    this.props.artists.show_artist_front(this.page.shotArtistFront)
  }
  
  showAlbumfront = () => {
        
    this.page.shotAlbumFront = !this.page.shotAlbumFront
    
    this.props.albums.show_album_front(this.page.shotAlbumFront)
  }

  showSongfront = () => {
        
    this.page.shotSongFront = !this.page.shotSongFront
    
    this.props.songs.show_song_front(this.page.shotSongFront)
  }

  onPlay = () => {
    console.log('onPlay')
    this.setState({ playing: true })
  }

  onProgress = state => {
    console.log('onProgress', state)
    // We only want to update time slider if we are not currently seeking
    if (!this.state.seeking) {
      this.setState(state)
    }
  }

  render() {
    const {activeUser} = this.props;
    const myLogo = [require('../../images/plouc_home_normal.png'),
                        require('../../images/plouc_home_normal_2.png'), 
                        require('../../images/plouc_home_normal_3.png'),
                        require('../../images/plouc_home_normal_4.png'),
                        require('../../images/plouc_home_normal_5.png'),
                      ];

    const randLogo = myLogo[Math.floor(Math.random() * myLogo.length)]; 

    const pasRandomLogo = require('../../images/plouc_home_normal_5.png')

    
    return (
      <View style={styles.container}>
      <Appbar.Header theme={{ colors: { primary: COLOR.HOME } }} style = {{ }}>
               {!this.props.activeUser? <Appbar.Action icon="menu" onPress={() => hashHistory.push('/login')} />: null }
               {this.props.activeUser&&this.page.shotProfileFront? <Appbar.Action icon="face" style ={{ backgroundColor: COLOR.PROFILE , borderRadius: 10 }} onPress={() =>{ this.showProfilefront()}} />: null }
               {this.props.activeUser&&!this.page.shotProfileFront? <Appbar.Action icon="face" onPress={() =>{ this.showProfilefront()}} />: null }
               {this.page.shotPostFront? <Appbar.Action icon="content-copy" style ={{ backgroundColor: COLOR.POST , borderRadius: 10 }} onPress={() =>{ this.showPostfront()}} /> : <Appbar.Action icon="content-copy" onPress={() =>{ this.showPostfront()}} /> }
               {this.page.shotArtistFront? <Appbar.Action icon="people" style ={{ backgroundColor: COLOR.ARTIST , borderRadius: 10 }} onPress={() =>{ this.showArtistfront()}} /> : <Appbar.Action icon="people" onPress={() =>{ this.showArtistfront()}} /> }
               {this.page.shotAlbumFront? <Appbar.Action icon="library-music" style ={{ backgroundColor: COLOR.ALBUM , borderRadius: 10 }} onPress={() =>{ this.showAlbumfront()}} /> : <Appbar.Action icon="library-music" onPress={() =>{ this.showAlbumfront()}} /> }
               {this.page.shotSongFront? <Appbar.Action icon="music-note" style ={{ backgroundColor: COLOR.SONG , borderRadius: 10 }} onPress={() =>{ this.showSongfront()}} /> : <Appbar.Action icon="music-note" onPress={() =>{ this.showSongfront()}} /> }
               
                <Appbar.Content
                title="Home"
                subtitle="Home is where the heart is..."
                style ={{}} 
                />
                
                
                <Image
                                      source={pasRandomLogo}
                                      style={{ width: 220, height: 50 }}
                                    />
                
                {this.props.activeUser? <Appbar.Action icon="highlight-off" onPress={() => this.props.actions.logout() } />: null }
            </Appbar.Header>  
                    
      </View> 
    );
  }
}
//<Appbar.Action icon={({ size, color }) => (
                                    
//                                  )} style = {{ alignItems : 'stretch', marginEnd : 100, marginTop : 6}}  />
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // flexDirection: 'row',
     //alignItems: 'stretch',
    // justifyContent: 'center',
    //// borderWidth: 5,
    ////borderColor: 'blue',
    //width : '100%' ,
    //alignItems: 'flex-start',
    //justifyContent: 'flex-start',
    // paddingTop: 20,
    paddingBottom: 10,
 
    // borderBottomColor:  COLOR.HOME,
    // borderBottomWidth: 40,
    
  },
  image: {
    borderRadius: 50,
    borderWidth: 5,
    borderColor: '#ccc',
    width: 100,
    height: 100,
  },
});


  export default connect(
    state => ({ state: state.authenticate,
                activeUser: state.activeUser,
                userposts_status : state.list_post,
                userposts : state.list_post.postList,
                userartists_status : state.list_artist,
                useralbums_status : state.list_album,
                usersongs_status : state.list_song,
             }),
    dispatch => ({
                actions: bindActionCreators(authActions, dispatch),
                posts: bindActionCreators(postActions, dispatch),
                artists: bindActionCreators(artistActions, dispatch),
                albums: bindActionCreators(albumActions, dispatch),
                songs: bindActionCreators(songActions, dispatch)
                })
)(Navigation);

