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




class HeaderSongAll extends Component {
  constructor(props) {
    super(props);
    
  }

  handlePlusdeSong = () => {
    this.page.limit  = this.page.limit + this.page.increase
    this.props.songs.reset_song_list(this.page.limit,this.page.offset)
  }

  resetSonglist = () => {
  
    this.page.limit = 7
    this.page.offset = 0
    this.props.songs.reset_song_list(this.page.limit,this.page.offset)
  }
  showSongfront = () => {
        
    this.page.shotSongFront = !this.page.shotSongFront
    
    this.props.songs.show_song_front(this.page.shotSongFront)
  }
  setSongrandom = () => {
        
    this.page.songRandom = !this.page.songRandom
    
    this.props.songs.set_song_random(this.page.songRandom)
  }
  

  page = {
    shotSongFront: true,
    songRandom: false,
    limit: 7,
    offset: 0,
    increase:7,
    
  };

  render() {
    const {activeUser} = this.props;
    return (
      <View style={styles.container}>
      <Appbar.Header theme={{ colors: { primary: COLOR.SONG }}} >
               
               
               <Appbar.Action icon="music-note" />
               <Appbar.Action icon="more" onPress={() =>{ this.handlePlusdeSong()}}/>
               <Appbar.Action icon="cached" onPress={() =>{ this.resetSonglist()}}/>
               {this.props.usersongs_status.setSongrandom? <Appbar.Action icon={{ uri: 'https://static.thenounproject.com/png/14730-200.png' }} style ={{ backgroundColor: COLOR.ARTIST , borderRadius: 10 }} onPress={() =>{ this.setSongrandom()}} /> : <Appbar.Action icon={{ uri: 'https://static.thenounproject.com/png/14730-200.png' }} onPress={() =>{ this.setSongrandom()}} /> }
                <Appbar.Content
                title="SONGS"
                subtitle=""
                style ={{ alignItems: 'center' }} 
                />                
                <Appbar.Action icon="search"  />
                {this.props.activeUser? <Appbar.Action icon="face" />: null }
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
)(HeaderSongAll);

