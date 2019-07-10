import React, { Component } from 'react';
import { Animated, View, Image, StyleSheet, PanResponder, Text } from 'react-native';
import { DefaultTheme, Appbar, Title, Badge, Button as ButPaper } from 'react-native-paper';
// import { Avatar } from 'react-native-elements';
import { Input, Card, Icon , Button as ButNew, Grid,Image as ImgNew, Label, Header, Modal, Statistic, Menu, Dropdown} from 'semantic-ui-react'

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
  
  showSongdetail = (item) => {
        
   
    this.page.showSongDetailview = !this.props.usersongs_status.showSongDetailview
    
    this.props.songs.show_song_detail(this.page.showSongDetailview)
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
    const pasRandomLogo = require('../../images/SONGS_PETIT_3.png')
    return (
      <View style={styles.container}>
      

            <Menu inverted style = {{ backgroundColor: COLOR.SONG }} attached='top'>
              <Icon link size='large' inverted bordered circular  name='music' style ={{  marginLeft: + 3 ,marginTop: + 6 ,width:45 , height : 45  }} onClick={() =>{ this.resetSonglist()}}/>
              <Icon link size='large' inverted bordered circular  name='leaf' style ={{  marginLeft: + 3 ,marginTop: + 6 ,width:45 , height : 45  }} onClick={() =>{ this.handlePlusdeSong()}}/>
              
              {this.props.usersongs_status.setSongrandom? <Icon link size='large' inverted color= 'red' circular name='random' style ={{  marginLeft: + 3 ,marginTop: + 6 ,width:45 , height : 45, borderWidth: 4, borderColor: COLOR.POST }}  onClick={() =>{ this.setSongrandom()}} /> : <Icon size='large' link inverted bordered circular  name='random' style ={{  marginLeft: + 3 ,marginTop: + 6 ,width:45 , height : 45  }} onClick={() =>{ this.setSongrandom()}} /> }

              
              <Menu.Menu position='right'>
              <Menu.Item>
                 <Input className='icon' icon='search' placeholder='Search...' />
              </Menu.Item>
                
                <Image
                                      source={pasRandomLogo}
                                      style={{ width: 125, height: 60 }}
                                      onClick={() => hashHistory.push('/')}
                                    />
                {!this.props.usersongs_status.showSongDetailview&&this.props.usersongs_status.songDetail !== null? <Icon link size='large' inverted color= 'red' circular  name='arrow circle down' style ={{  marginLeft: + 3 ,marginTop: + 6 ,width:45 , height : 45  }} onClick={() =>{ this.showSongdetail()}} />: null }                    
                {this.props.usersongs_status.showSongDetailview? <Icon link size='large' inverted color= 'red' circular  name='arrow circle right' style ={{  marginLeft: + 3 ,marginTop: + 6 ,width:45 , height : 45  }} onClick={() =>{ this.showSongdetail()}} />: null }                    
              </Menu.Menu>
            </Menu>  
                    
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

