import React, { Component } from 'react';
import { Animated, View, Image, StyleSheet, PanResponder, Text, ScrollView, FlatList, TouchableWithoutFeedback } from 'react-native';
import { Badge, Appbar, Title, Button as ButPaper, List } from 'react-native-paper';
// import { Avatar } from 'react-native-elements';
import PropTypes from 'prop-types';
import Styles, { COLOR } from "../config/styles";
import { bindActionCreators } from "redux";
import * as authActions from "../actions/authenticate";
import * as albumActions from "../actions/albums";
import * as songActions from "../actions/songs";
// import * as postActions from "../actions/posts";
import { connect } from "react-redux";

import settings from '../config/settings';

import {hashHistory} from 'react-router'
import HeaderSongAll from '../components/HeaderSongAll'
import {getAlbum} from '../utils/user';
import {getAlbumArtist} from '../utils/user';


class SongAll extends Component {
  constructor() {
    super();
     
    this.page = {
        
     
     
      songDetail: [
          {id: 0}
        ]
    };
    
}
  componentDidMount() {
    // console.log(this.props.state.authSession.data.id)
    // const post = this.props.posts.get_user_post();
     // console.log(this.props.state.authSession.data.id);
     // this.props.state.isAuth
    
     this.props.songs.reset_song_list(this.page.limit,this.page.offset)
     this.page.showSongDetailview = this.props.usersongs_status.showSongDetailview
     
     
     //   : 
    
}

componentWillMount(){

  this.props.songs.get_song_list()
  this.props.albumactions.get_album_list()
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

shuffle = (arr) => {
  for (let i = arr.length - 1; i > 0; i--) {
      let rnd = Math.floor(Math.random() * i);

      let temp = arr[i];
      arr[i] = arr[rnd];
      arr[rnd] = temp;
  }
  return arr;
}

set_songDetail = (item) => {
        
  console.log(item)
  this.props.songs.store_song_detail(item)
  this.props.songs.getSong(item.id)
  if (this.page.songDetail.id == item.id){
     this.page.songDetail.id = 0
     if (this.page.showSongDetailview){
      this.showSongdetail(item)
    }
    }
     
   else
     {
      this.page.songDetail.id = item.id
      if (!this.page.showSongDetailview){
         this.showSongdetail(item)}else {
          
       }
      }   

}

showSongdetail = (item) => {
        
        
  this.page.showSongDetailview = !this.props.usersongs_status.showSongDetailview
  
  this.props.songs.show_song_detail(this.page.showSongDetailview)
}


      FlatListItemSeparator = () => {
        return (
          <View
            style={{
              height: .5,
              width: "100%",
              // backgroundColor: "#000",
            }}
          />
        );
      }

      renderSongSection() {
        const {albums} = this.props;
        if (this.props.usersongs !== null) {
        // const posts = JSON.stringify( this.props.userposts );
        let songList = Object.values(this.props.usersongs);
        // console.log(songList)
        if (this.props.usersongs_status.setSongrandom)
            songList = this.shuffle(songList)
        songList = songList.slice(0,this.props.usersongs_status.songLimit)      

        if (songList.length !== 0) return (
            
            <View >

              <FlatList
              data={ songList }       
              ItemSeparatorComponent = {this.FlatListItemSeparator}
              renderItem={({item})  =>    ( 
                 <TouchableWithoutFeedback onPress={ () => this.set_songDetail(item)}>   
                <View style={{flex:1, flexDirection: 'row', borderColor: this.page.songDetail.id === item.id?COLOR.SONG:'white', borderWidth: 3 }}>
                    <Image source = {{ uri: `${settings.API_ROOT}${item.song_image}` }} style={styles.imageView} />
                    <Title style={styles.textView} >{item.song_title}</Title>
                    <Text style={styles.textViewArtist}> {getAlbumArtist(item.album, albums)}</Text>
                    <Text style={styles.textViewAlbum}> {getAlbum(item.album, albums)}</Text>
                  </View>
                  
                  
                  </TouchableWithoutFeedback>)
                        }
                  
              keyExtractor={(item, index) => index.toString()}
              />
            </View>
           );
        } 
    
    // if (postList.length === 0) return null;
    return null;
}    
  
page = {
  limit: 7,
  offset: 0,
  increase:7,
  random: false
  
  
};
  render() {
    const {activeUser} = this.props;
    return (
      
      
      <div className="SongAll">
    
      <HeaderSongAll></HeaderSongAll>
                    
      <View style={{
                            
                            height: 700,
                            width: 450,
                            borderRightColor:  COLOR.SONG,
                            borderRightWidth: 4,
                            borderLeftColor:  COLOR.SONG,
                            borderLeftWidth: 4,
                            borderTopColor:  COLOR.SONG,
                            borderTopWidth: 20,
                            borderRadius: 30,
                            // position: 'absolute', 
                            marginTop: -18, 
                            marginRight: 0,
                            borderBottomColor:  COLOR.SONG,
                            borderBottomWidth: 40,
                            justifyContent: 'center',
                            // alignItems: 'stretch',
                        }} >
            <Badge size={30} style={{ top: 1, left: -4, backgroundColor: COLOR.SONG }}> {this.props.usersongs_status.songTotal} </Badge>
            <Badge size={30} style={{ position: 'absolute', top: 1, left: 4, backgroundColor: COLOR.ARTIST }}> {this.props.usersongs_status.songLimit} </Badge>
            <ScrollView style={[Styles.container, { padding: 0 }]}>
                
                {this.renderSongSection()}
            </ScrollView>

                                                  
                        
      </View>
     
      </div>
 
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    
    //justifyContent: 'center',
    //margeRight: 20,
    paddingBottom: 20,
    borderBottomColor:  COLOR.SONG,
    borderBottomWidth: 40,
  },
  image: {
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    width: 80,
    height: 80,
  },
 
  imageView: {
   
      width: '18%',
      height: 70 ,
      margin: 4,
      borderRadius : 10
   
  },
   
  textView: {
   
      width:'50%',
      height : 30, 
      textAlignVertical:'center',
      //padding:5,
      fontSize: 15,
      fontWeight: 'bold',
      color: '#222',
      //borderColor:'blue', borderWidth: 3 
   
  },

  textViewAlbum: {
   
    width:'100%',
    height : 30, 
    textAlignVertical:'center',
    padding:5,
    position : 'absolute',
    left : 75,
    top : 50,
    fontSize: 16,
    //fontWeight: 'bold',
    color: '#222',
    //borderColor:'blue', borderWidth: 3 
 
},

textViewArtist: {
   
  width:'100%',
  height : 30, 
  textAlignVertical:'center',
  padding:5,
  position : 'absolute',
  left : 75,
  top : 24,
  fontSize: 16,
  color : COLOR.SONG,
  //fontWeight: 'bold',
  // color: '#222',
  //borderColor:'blue', borderWidth: 3 

},
  

});


export default connect(
  state => ({ state: state.authenticate,
              usersongs_status : state.list_song,
              usersongs : state.list_song.songList,
              albums: state.albums.data,
              song: state.albums.data,
           }),
  dispatch => ({
              actions: bindActionCreators(authActions, dispatch),
              albumactions: bindActionCreators(albumActions, dispatch),
              songs: bindActionCreators(songActions, dispatch)
              })
)(SongAll);


