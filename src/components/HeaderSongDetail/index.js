import React, { Component } from 'react';
import { Animated, View, Image, StyleSheet, PanResponder, Text } from 'react-native';
import { DefaultTheme, Appbar, Title, Badge, Button as ButPaper } from 'react-native-paper';
// import { Avatar } from 'react-native-elements';

import Styles, { COLOR } from "../../config/styles";
import { bindActionCreators } from "redux";
import * as authActions from "../../actions/authenticate";
import * as albumActions from "../../actions/albums";
import * as songActions from "../../actions/songs";

import settings from '../../config/settings';

import {getAlbum} from '../../utils/user';

import { connect } from "react-redux";

import {hashHistory} from 'react-router'
import { getAudioBuffer, getContext } from '../../utils/user';



class HeaderSongDetail extends Component {
  constructor(props) {
    super(props);
    this.page = {
        
     
      songListview: this.props.usersongs_status.songListview
      
    };
  }
  
  componentDidMount() {
  
    this.page.showSongDetailview = this.props.usersongs_status.showSongDetailview
    this.page.showWaveform = this.props.player_state.showWaveform

  }
  showSongfront = () => {
        
    this.page.shotSongFront = !this.page.shotSongFront
    
    this.props.songs.show_song_front(this.page.shotSongFront)
  }

  getFile = async (audio_file, path = `${settings.API_ROOT}${audio_file}`) => {
    console.log(path)
    this.props.songs.set_Audio_bufferRequest()
    const buffer = await getAudioBuffer(path, this.props.player_state.audioContext);
  
    this.props.songs.store_audio_buffer({ buffer })
    
  };

  set_songListview = () => {
        
    this.page.songListview = !this.page.songListview
    
    this.props.songs.set_song_list(this.page.songListview)
  }
  
  showSongdetail = () => {
        
    this.page.showSongDetailview = !this.props.usersongs_status.showSongDetailview
    
    this.props.songs.show_song_detail(this.page.showSongDetailview)
  }

  showAudioWaveform = () => {

    this.props.songs.flush_Audio_bufferSuccess()
    console.log(this.props.player_state.showWaveform)
    if (this.props.player_state.showWaveform == false) {
      
      this.getFile(this.props.usersongs_status.songDetail.audio_file)
    }

    this.page.showWaveform = !this.props.player_state.showWaveform
    
    this.props.songs.show_audio_waveform(this.page.showWaveform)
       

  }

  page = {
    shotSongFront: true,
    
    
  };

  render() {
    const {activeUser} = this.props;
    const {albums} = this.props;
    return (
      <View style={styles.container}>
      
      <Appbar.Header theme={{ colors: { primary: COLOR.SONG }}} >
               
               {this.props.activeUser? <Appbar.Action icon="edit" />: null }
               {(this.props.activeUser && !this.props.player_state.showWaveform)? <Appbar.Action icon="blur-on" onPress={() =>{ this.showAudioWaveform()}}/>: null }
               {(this.props.activeUser && this.props.player_state.showWaveform)? <Appbar.Action icon="blur-on" style={{ backgroundColor : COLOR.ARTIST }} onPress={() =>{ this.showAudioWaveform()}}/>: null }
            
                <Appbar.Content
                title={this.props.usersongs_status.songDetail.song_title}
                subtitle={getAlbum(this.props.usersongs_status.songDetail.album, albums)}
                style ={{ alignItems: 'center' }} 
                />
                <Appbar.Action icon="clear" onPress={() =>{ this.showSongdetail()}} /> 
                               
                
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
                usersongs_status : state.list_song,
                usersongs : state.list_song.songList,
                albums: state.albums.data,
                player_state : state.player_state,
                
             }),
    dispatch => ({
                actions: bindActionCreators(authActions, dispatch),
                songs: bindActionCreators(songActions, dispatch),
                albumactions: bindActionCreators(albumActions, dispatch),
                })
)(HeaderSongDetail);

