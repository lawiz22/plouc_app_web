import React, { Component } from 'react';
import { Animated, View, Image, StyleSheet, PanResponder, Text } from 'react-native';
import { DefaultTheme, Appbar, Title, Badge, Button as ButPaper } from 'react-native-paper';
// import { Avatar } from 'react-native-elements';

import Styles, { COLOR } from "../../config/styles";
import { bindActionCreators } from "redux";
import * as authActions from "../../actions/authenticate";
import * as songActions from "../../actions/songs";

import { connect } from "react-redux";

import {hashHistory} from 'react-router'




class HeaderSongDetail extends Component {
  constructor(props) {
    super(props);
    this.page = {
        
     
      songListview: this.props.usersongs_status.songListview
      
    };
  }
  
  componentDidMount() {
  
    this.page.showSongDetailview = this.props.usersongs_status.showSongDetailview

  }
  showSongfront = () => {
        
    this.page.shotSongFront = !this.page.shotSongFront
    
    this.props.songs.show_song_front(this.page.shotSongFront)
  }

  set_songListview = () => {
        
    this.page.songListview = !this.page.songListview
    
    this.props.songs.set_song_list(this.page.songListview)
  }
  
  showSongdetail = () => {
        
    this.page.showSongDetailview = !this.props.usersongs_status.showSongDetailview
    
    this.props.songs.show_song_detail(this.page.showSongDetailview)
  }

  page = {
    shotSongFront: true,
    
    
  };

  render() {
    const {activeUser} = this.props;
    return (
      <View style={styles.container}>
      
      <Appbar.Header theme={{ colors: { primary: COLOR.ARTIST }}} >
               
               {this.props.activeUser? <Appbar.Action icon="edit" />: null }
               
            
                <Appbar.Content
                title={this.props.usersongs_status.songDetail.song}
                subtitle=""
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
                
             }),
    dispatch => ({
                actions: bindActionCreators(authActions, dispatch),
                songs: bindActionCreators(songActions, dispatch),
                
                })
)(HeaderSongDetail);

