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



import { Card, Icon , Button as ButNew, Grid,Image as ImgNew, Label, Header, Modal, Statistic, Menu, Dropdown} from 'semantic-ui-react'

import moment from "moment";
import {hashHistory, Link} from 'react-router'



class Navigation extends Component {
  constructor(props) {
    super(props);
    let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    this.page = {
       shotProfileFront  : this.props.state.showProfilefront,
       shotPostFront : this.props.userposts_status.showPostfront,
       shotArtistFront : this.props.userartists_status.showArtistfront, 
       shotAlbumFront : this.props.useralbums_status.showAlbumfront, 
       shotSongFront : this.props.usersongs_status.showSongfront, 
    };
    

    console.log(this.props.userposts_status.showPostfront)
    console.log(this.page.shotPostFront)

    this.myLogo = [require('../../images/plouc_home_normal.png'),
                        require('../../images/plouc_home_normal_2.png'), 
                        require('../../images/plouc_home_normal_3.png'),
                        require('../../images/plouc_home_normal_4.png'),
                        require('../../images/plouc_home_normal_5.png'),
                      ];

    this.randLogo = this.myLogo[Math.floor(Math.random() * this.myLogo.length)]; 
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
    loop: false,
    currentDate: new Date(),
    markedDate: moment(new Date()).format("YYYY-MM-DD")
     
  }
  componentDidMount(){
    const today = this.state.currentDate;
    const day = moment(today).format("dddd");
    const date = moment(today).format('MMMM Do YYYY, h:mm:ss a');

    console.log(this.props.state.showProfileFront)
    //this.interval = setInterval(() => this.setState({ time: moment(Date()).format('MMMM Do YYYY, h:mm:ss a')}), 1000);
    this.page.shotProfileFront  = this.props.state.showProfileFront
    this.page.shotPostFront =  this.props.userposts_status.showPostfront,
    this.page.shotArtistFront = this.props.userartists_status.showArtistFront 
    this.page.shotAlbumFront = this.props.useralbums_status.showAlbumFront 
    this.page.shotSongFront = this.props.usersongs_status.showSongFront
}

componentWillUnMount(){
  clearInterval(this.interval);
    
}


   showProfilefront = () => {
    const {activeUser} = this.props;

        
    this.page.shotProfileFront = !this.page.shotProfileFront

   

    
    this.props.actions.show_profile_front(this.page.shotProfileFront)
  }


  crissTouteOff = () => {
    

        
    this.page.shotPostFront = true
    this.page.shotArtistFront = false
    this.page.shotAlbumFront = false
    this.page.shotSongFront = false
    this.page.shotProfileFront = true

    this.props.actions.show_profile_front(this.page.shotProfileFront)
    this.props.posts.show_post_front(this.page.shotPostFront)
    this.props.artists.show_artist_front(this.page.shotArtistFront)
    this.props.albums.show_album_front(this.page.shotAlbumFront)
    this.props.songs.show_song_front(this.page.shotSongFront)

  }


  showPostfront = () => {
        
    

    if(this.page.shotProfileFront){
        hashHistory.push('/')
        this.page.shotProfileFront = false
        this.props.actions.show_profile_front(this.page.shotProfileFront)
    }else{
      
      this.page.shotPostFront = !this.page.shotPostFront
      this.props.posts.show_post_front(this.page.shotPostFront)
    }
    
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
    

    const pasRandomLogo = require('../../images/plouc_home_normal_5.png')

    
    return (
      <View style={styles.container}>
            <Menu inverted style = {{ backgroundColor: COLOR.HOME }} attached='top'>
              {!this.props.activeUser? <Icon link size='large' inverted bordered circular  name='sign in' style ={{  marginLeft: + 3 ,marginTop: + 6 ,width:45 , height : 45  }} onClick={() => hashHistory.push('/login')} />: null }
              {this.props.activeUser?<Link className="nav-link" to="/"> <Icon link size='large' inverted bordered circular name='home' style ={{  marginLeft: + 3 ,marginTop: + 6 ,width:45 , height : 45, borderWidth: 4, borderColor: COLOR.PROFILE }} /> </Link>: null }
              

              
              {this.page.shotPostFront? <Icon link size='large' inverted color= 'olive' circular name='copy' style ={{  marginLeft: + 3 ,marginTop: + 6 ,width:45 , height : 45, borderWidth: 4, borderColor: COLOR.POST }}  onClick={() =>{ this.showPostfront()}} /> : <Icon size='large' link inverted bordered circular  name='copy' style ={{  marginLeft: + 3 ,marginTop: + 6 ,width:45 , height : 45  }} onClick={() =>{ this.showPostfront()}} /> }
              {this.page.shotArtistFront? <Icon link size='large' inverted color= 'teal' circular name='users' style ={{  marginLeft: + 3 ,marginTop: + 6 ,width:45 , height : 45, borderWidth: 4, borderColor: COLOR.POST }}  onClick={() =>{ this.showArtistfront()}} /> : <Icon size='large' link inverted bordered circular  name='users' style ={{  marginLeft: + 3 ,marginTop: + 6 ,width:45 , height : 45  }} onClick={() =>{ this.showArtistfront()}} /> }
              {this.page.shotAlbumFront? <Icon link size='large' inverted color= 'yellow' circular name='outdent' style ={{  marginLeft: + 3 ,marginTop: + 6 ,width:45 , height : 45, borderWidth: 4, borderColor: COLOR.POST }}  onClick={() =>{ this.showAlbumfront()}} /> : <Icon size='large' link inverted bordered circular  name='outdent' style ={{  marginLeft: + 3 ,marginTop: + 6 ,width:45 , height : 45  }} onClick={() =>{ this.showAlbumfront()}} /> }
              {this.page.shotSongFront? <Icon link size='large' inverted color= 'red' circular name='file audio' style ={{  marginLeft: + 3 ,marginTop: + 6 ,width:45 , height : 45, borderWidth: 4, borderColor: COLOR.POST }}  onClick={() =>{ this.showSongfront()}} /> : <Icon size='large' link inverted bordered circular  name='file audio' style ={{  marginLeft: + 3 ,marginTop: + 6 ,width:45 , height : 45  }} onClick={() =>{ this.showSongfront()}} /> }
              <Menu.Menu position='right'>
              
                <p style = {{ color : COLOR.POST , fontSize : 10, marginTop : + 35}}> { this.state.time } </p>
                <Image
                                      source={pasRandomLogo}
                                      style={{ width: 220, height: 50 }}
                                      onClick={() => hashHistory.push('/')}
                                    />
                {this.props.activeUser?<Link className="nav-link" to={`/profile/${activeUser.id}/`}> <Icon link size='large' inverted bordered circular name='user' style ={{  marginLeft: + 3 ,marginTop: + 6 ,width:45 , height : 45, borderWidth: 4, borderColor: COLOR.PROFILE }}  onClick={() =>{ this.crissTouteOff()}}  /> </Link>: null }
                {this.props.activeUser? <Icon link size='large' inverted color= 'brown' circular  name='log out' style ={{  marginLeft: + 3 ,marginTop: + 6 ,width:45 , height : 45  }} onClick={() => this.props.actions.logout() } />: null }                    
              </Menu.Menu>
            </Menu>      
                    
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
    //paddingBottom: 10,
 
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

