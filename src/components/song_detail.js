import React, { Component } from 'react';
import { Animated, View, Image, StyleSheet, TouchableWithoutFeedback, Text, ScrollView, FlatList as FlatListSong } from 'react-native';
import { Avatar, Card, Paragraph, Badge, Appbar, Title, Button as ButPaper, List, IconButton} from 'react-native-paper';
// import { Avatar } from 'react-native-elements';

import Styles, { COLOR } from "../config/styles";
import { bindActionCreators } from "redux";
import * as authActions from "../actions/authenticate";
import * as songActions from "../actions/songs";
import * as albumActions from "../actions/albums";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import settings from '../config/settings';


import {hashHistory} from 'react-router'
import HeaderSongDetail from '../components/HeaderSongDetail'
import {getFullName, getProfileImage} from '../utils/user';

class SongDetail extends Component {

  constructor(props) {
    super(props);
    this.page = {
        
      albumDetail: [
          {id: 0}
        ]
    };
  }

  componentDidMount() {
    
}


getSongreply(songId) {

  this.props.actionssongs.getSong(songId)
}
  
  getVoteTally(songId) {
    const {songVotes} = this.props;
    
   
    
    //console.log(songId)
    //console.log(songVotes)

    // console.log(Object.values(songVotes).filter(songVote => songVote.song === usersongs.id))
    
    return Object.values(songVotes)
        .filter(songVote => songVote.song === songId)
        .reduce((acc, songVote) => acc + songVote.value, 0);
  }

  
  
     
      getVoteScoreStyling(songId) {
        if(this.usersVoteValue(songId) === -1) return 'down-voted';
        if(this.usersVoteValue(songId) === 1) return 'up-voted';
    }
      usersVote(songId) {
        const {activeUser,  songVotes} = this.props;
        if(!activeUser) return null;
        const vote = Object.values(songVotes)
            .filter(songVote => songVote.song === songId)
            .filter(songVote => songVote.user === activeUser.id);
        if(vote.length) return vote[0];
        return null;
    }

      usersVoteValue(songId) {
        const {activeUser, songVotes} = this.props;
        if(!activeUser) return null;
        const vote = Object.values(songVotes)
            .filter(songVote => songVote.song === songId)
            .filter(songVote => songVote.user === activeUser.id);
        if(vote.filter(songVote => songVote.value === -1).length) return -1;
        if(vote.filter(songVote => songVote.value === 1).length) return 1;
        return null;
      }

      set_songDetail = (item) => {
        
        console.log(item)
        this.props.actionssongs.store_song_detail(item)
        this.set_songListview()

      }
      set_albumDetail = (item) => {
        
        console.log(item)
        this.props.albums.store_album_detail(item)

        this.props.albums.getAlbum(item.id)
        this.props.albums.getAlbum_song_list(item.id)
        // this.props.songs.getSongList(item.id)
        if (this.page.albumDetail.id == item.id){
           this.page.albumDetail.id = 0
           if (this.page.showDetailview){
           this.showAlbumdetail(item)}
          }
           
         else
           {
            this.page.albumDetail.id = item.id
            if (!this.page.showDetailview){
              this.showAlbumdetail(item)}else {
                
             }
            }   

      }

      showAlbumdetail = (item) => {
        
        
        this.page.showDetailview = !this.props.useralbums_status.showDetailview
        
        this.props.albums.show_album_detail(this.page.showDetailview)
      }
      set_songListview = () => {
        
        this.page.songListview = !this.page.songListview
        
        this.props.actionssongs.set_song_list(this.page.songListview)
      }
    
      votesongDetail = () => {
        return (
          <View
            style={{
             
              //width: "100%",
              top: -50,
              left: -40,
              width: 45,
              paddingLeft: -10,

              // backgroundColor: "#777",
            }}
          >
                <div className="votes">
                <a className="up-arrow" >
                {(this.usersVoteValue(this.props.usersongs_status.songDetail.id) === 1)? <IconButton
                                                      icon="arrow-upward"
                                                      color={COLOR.SONG}
                                                      size={20}
                                                      onPress={() => console.log('Pressed')}
                                                    /> : 
                                                      <IconButton
                                                      icon="arrow-upward"
                                                      color={COLOR.GRAY}
                                                      size={20}
                                                      onPress={() => console.log('Pressed')}
                                                    />  }
                </a>
                <div className={`score `}>
                    
                    <Text size={20} style={{ position: 'absolute', top: 33, left: 23, fontWeight: 'bold' }}> {this.getVoteTally(this.props.usersongs_status.songDetail.id)} </Text>
                </div>
                <a className="down-arrow" >
                {(this.usersVoteValue(this.props.usersongs_status.songDetail.id) === -1)? <IconButton
                                                      icon="arrow-downward"
                                                      color={COLOR.SONG}
                                                      size={20}
                                                      onPress={() => console.log('Pressed')}
                                                    /> : 
                                                      <IconButton
                                                      icon="arrow-downward"
                                                      color={COLOR.GRAY}
                                                      size={20}
                                                      onPress={() => console.log('Pressed')}
                                                    />  }   
                </a>
                </div>
         </View>
        );
      }

     
      renderSongReplySection(songId) {
        const {users} = this.props;
        if (this.props.songReplies !== null) {
        
        const songReply = Object.values(this.props.songReplies)
           .filter(songReply => songReply.song === songId)
       
        if (songReply.length !== 0) return (
          
            <View>
              <FlatListSong
              data={ songReply }       
              ItemSeparatorComponent = {this.FlatListItemSeparator}
              
              renderItem={({item}) =>
              <TouchableWithoutFeedback onPress={ () => console.log("Press reply")}>        
                <View style={{flex:1, flexDirection: 'row',
                 borderColor:'white', borderWidth: 4 }}>
                
                    <Image source = {{ uri: `${settings.API_ROOT}${getProfileImage(item.user, users)}` }} style={styles.imageViewReply}  />
                    <View style={{flex:1, flexDirection: 'column'}}>
                      <Text style={styles.textView} >{item.body}</Text>
                      <Text>{' '}</Text>
                      
                      <Text style={styles.textView2}> {getFullName(item.user, users)}</Text>
                      <Text style={styles.textView2}> {item.modified_date} </Text>
                    </View>
                  </View>
                  </TouchableWithoutFeedback>
                             }
              keyExtractor={(item, index) => index.toString()}
              />
            </View>
            
           );
        } 
    
    // if (songList.length === 0) return null;
    return null;
}     
        
  donneMoileNbdAlbumMonEsti() {
      const {usersongs_status} = this.props;
      
      if(!usersongs_status.songAlbumsDetail) return null;
      const goEsti = Object.values(usersongs_status.songAlbumsDetail)
      return goEsti.length;
         
  }
  render() {
    const {activeUser} = this.props;
    return (
      
      <div className="SongAll">
    
       <HeaderSongDetail>

       </HeaderSongDetail>
    
                        
      <View style={{
                            
                            height: 700,
                            //width: 850,
                            borderRightColor:  COLOR.SONG,
                            borderRightWidth: 4,
                            borderLeftColor:  COLOR.SONG,
                            borderLeftWidth: 4,
                            borderTopColor:  COLOR.SONG,
                            borderTopWidth: 20,
                            borderRadius: 25,
                            // position: 'absolute', 
                            marginTop: -18, 
                            //marginRight: 0,
                            borderBottomColor:  COLOR.SONG,
                            borderBottomWidth: 40,
                            justifyContent: 'center',
                            alignItems: 'stretch',
                        }} >
            <ScrollView style={[Styles.container, { padding: 0 }]}>            
            
            
                                         
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
    //marginTop: -10,
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
    width: 100,
    height: 100,
  },

  
  

});


 

export default connect(
  state => ({ state: state.authenticate,
              activeUser: state.activeUser,
              usersongs_status : state.list_song,
              useralbums_status : state.list_album,
              usersongs : state.list_song.songList,
              // songVotes: state.songVotes.data,
              song: state.songs.data,
              users: state.users.data
           }),
  dispatch => ({
              actions: bindActionCreators(authActions, dispatch),
              actionssongs: bindActionCreators(songActions, dispatch),
              albums: bindActionCreators(albumActions, dispatch),
              })
)(SongDetail);


