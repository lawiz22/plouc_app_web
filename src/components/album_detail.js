import React, { Component } from 'react';
import { Animated, View, Image, StyleSheet, TouchableWithoutFeedback, Text, ScrollView, FlatList } from 'react-native';
import { Avatar, Card, Paragraph, Badge, Appbar, Title, Button as ButPaper, List, IconButton} from 'react-native-paper';
// import { Avatar } from 'react-native-elements';

import Styles, { COLOR } from "../config/styles";
import { bindActionCreators } from "redux";
import * as authActions from "../actions/authenticate";
import {getSongList} from '../actions/songs';
import * as albumActions from "../actions/albums";
// import * as albumActions from "../actions/albums";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import './AlbumAll.scss';
import settings from '../config/settings';

import {hashHistory} from 'react-router'
import HeaderAlbumDetail from '../components/HeaderAlbumDetail'
import {getFullName, getProfileImage} from '../utils/user';

class AlbumDetail extends Component {

  constructor(props) {
    super(props);
    
  }

  componentDidMount() {
    // console.log(this.props.state.authSession.data.id)
    // const album = this.props.albums.get_user_album();
     // console.log(this.props.state.authSession.data.id);
     // this.props.state.isAuth
     
     
     
    // setTimeout(() => {
        
    // }, 2000);
}


getAlbumreply(albumId) {

  this.props.actionsalbums.getAlbum(albumId)
}
  
  getVoteTally(albumId) {
    const {albumVotes} = this.props;
    
   
    
    //console.log(albumId)
    //console.log(albumVotes)

    // console.log(Object.values(albumVotes).filter(albumVote => albumVote.album === useralbums.id))
    
    return Object.values(albumVotes)
        .filter(albumVote => albumVote.album === albumId)
        .reduce((acc, albumVote) => acc + albumVote.value, 0);
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

      getVoteScoreStyling(albumId) {
        if(this.usersVoteValue(albumId) === -1) return 'down-voted';
        if(this.usersVoteValue(albumId) === 1) return 'up-voted';
    }
      usersVote(albumId) {
        const {activeUser,  albumVotes} = this.props;
        if(!activeUser) return null;
        const vote = Object.values(albumVotes)
            .filter(albumVote => albumVote.album === albumId)
            .filter(albumVote => albumVote.user === activeUser.id);
        if(vote.length) return vote[0];
        return null;
    }

      usersVoteValue(albumId) {
        const {activeUser, albumVotes} = this.props;
        if(!activeUser) return null;
        const vote = Object.values(albumVotes)
            .filter(albumVote => albumVote.album === albumId)
            .filter(albumVote => albumVote.user === activeUser.id);
        if(vote.filter(albumVote => albumVote.value === -1).length) return -1;
        if(vote.filter(albumVote => albumVote.value === 1).length) return 1;
        return null;
      }

      set_albumDetail = (item) => {
        
        console.log(item)
        this.props.actionsalbums.store_album_detail(item)
        this.set_albumListview()

      }
      
      set_albumListview = () => {
        
        this.page.albumListview = !this.page.albumListview
        
        this.props.actionsalbums.set_album_list(this.page.albumListview)
      }
    
      votealbumDetail = () => {
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
                {(this.usersVoteValue(this.props.useralbums_status.albumDetail.id) === 1)? <IconButton
                                                      icon="arrow-upward"
                                                      color={COLOR.ALBUM}
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
                    
                    <Text size={20} style={{ position: 'absolute', top: 33, left: 23, fontWeight: 'bold' }}> {this.getVoteTally(this.props.useralbums_status.albumDetail.id)} </Text>
                </div>
                <a className="down-arrow" >
                {(this.usersVoteValue(this.props.useralbums_status.albumDetail.id) === -1)? <IconButton
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

      renderAlbumSongSection() {
        const {users} = this.props;
        if (this.props.useralbums_status.albumSongsDetail !== null) {
        
        const albumSongs = Object.values(this.props.useralbums_status.albumSongsDetail)
        
       
        if (albumSongs.length !== 0) return (
          
            <View>
              <FlatList
              data={ albumSongs }       
              ItemSeparatorComponent = {this.FlatListItemSeparator}
              
              renderItem={({item}) =>
              <TouchableWithoutFeedback onPress={ () => console.log("Press reply")}>        
                <View style={{flex:1, flexDirection: 'row',
                 borderColor:'white', borderWidth: 4 }}>
                
                    <Image source = {{ uri: `${settings.API_ROOT}${item.song_image}` }} style={styles.imageViewSong}  />
                    <View style={{flex:1, flexDirection: 'column'}}>
                      <Text style={styles.textView} >{item.song_title}</Text>
                      <Text>{' '}</Text>
                      
                      <Text style={styles.textView2}> {this.props.useralbums_status.albumDetail.artist}</Text>
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
    
    // if (albumList.length === 0) return null;
    return null;
}
      renderAlbumReplySection(albumId) {
        const {users} = this.props;
        if (this.props.albumReplies !== null) {
        
        const albumReply = Object.values(this.props.albumReplies)
           .filter(albumReply => albumReply.album === albumId)
       
        if (albumReply.length !== 0) return (
          
            <View>
              <FlatList
              data={ albumReply }       
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
    
    // if (albumList.length === 0) return null;
    return null;
}     
    

    renderAlbumDetails() {
      console.log("YO ESTI DETAIL ALBUM")    
      return (
        
      // if (this.props.useralbums_status.albumDetail !== null) { //  <Text style={[styles.textViewAlbum, { padding: 0 }]}>{this.props.useralbums_status.albumDetail.title}</Text> //
        
        <Card style={[Styles.containerAlbumDetail, { padding: 10 }]}>
          <Card.Content>
          <Text style={[styles.textViewAlbum, { padding: 0 }]}>{this.props.useralbums_status.albumDetail.album_title}</Text>
          
          <IconButton
                      icon={require('../images/star2.png')}
                      color={this.props.useralbums_status.albumDetail.is_favorite?COLOR.ALBUM:COLOR.GRAY}
                      style= {{ position : 'absolute', marginLeft : -12, marginTop : -12}}
                      size={40}
                      onPress={() => console.log('Pressed')}
                      />
                      
          </Card.Content>
          
          <Card.Cover source={{ uri: `${settings.API_ROOT}${this.props.useralbums_status.albumDetail.album_logo}` }} style={[styles.imageView2, { padding: 0 }]}/>      
          
          <Text style={styles.textViewAlbumUserDate}> Ajouté par : {this.props.useralbums_status.albumDetail.user.first_name} le {this.props.useralbums_status.albumDetail.created_date} </Text>
          
          
          <View style = {{ paddingRight : 12,paddingBottom : +10 , borderRadius : 6, borderColor : COLOR.GRAY , borderWidth : 2, backgroundColor : 'white'}}>
              <Text  style={[styles.textViewAlbumBody, { padding: 0 }]} >{this.props.useralbums_status.albumDetail.artist}</Text>    
          </View>
          <View style = {{ borderRadius : 6, borderColor : 'white' , borderWidth : 2 }}>
              <Text style={styles.textViewAlbumreplyCount}> {`Song(s) : ${this.donneMoileNbdeTounneMonEsti()}`}</Text>
          </View>
          {this.renderAlbumSongSection()}
          <View style = {{ borderRadius : 6, borderColor : 'white' , borderWidth : 2 }}>
              <Text style={styles.textViewAlbumreplyCount}> {`Comment(s) : ${this.props.useralbums_status.albumDetail.album_reply_count}`}</Text>
          </View>
          {this.renderAlbumReplySection(this.props.useralbums_status.albumDetail.id)}
        </Card>
      
      //} 

    // if (albumList.length === 0) return null;
    )
    
    }  

  donneMoileNbdeTounneMonEsti() {
      const {useralbums_status} = this.props;
      
      if(!useralbums_status.albumSongsDetail) return null;
      const goEsti = Object.values(useralbums_status.albumSongsDetail)
      return goEsti.length;
         
  }
  render() {
    const {activeUser} = this.props;
    return (
      
      <div className="AlbumAll">
    
       <HeaderAlbumDetail>

       </HeaderAlbumDetail>
    
                        
      <View style={{
                            
                            height: 700,
                            //width: 850,
                            borderRightColor:  COLOR.ALBUM,
                            borderRightWidth: 4,
                            borderLeftColor:  COLOR.ALBUM,
                            borderLeftWidth: 4,
                            borderTopColor:  COLOR.ALBUM,
                            borderTopWidth: 20,
                            borderRadius: 25,
                            // position: 'absolute', 
                            marginTop: -18, 
                            //marginRight: 0,
                            borderBottomColor:  COLOR.ALBUM,
                            borderBottomWidth: 40,
                            justifyContent: 'center',
                            alignItems: 'stretch',
                        }} >
            <ScrollView style={[Styles.container, { padding: 0 }]}>            
            
              {this.renderAlbumDetails()}
                                         
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
    borderBottomColor:  COLOR.ALBUM,
    borderBottomWidth: 40,
  },
  image: {
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    width: 100,
    height: 100,
  },

  album: {
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    width: 100,
    height: 100,
  },
  logo: {
    width: 40,
    height: 40,
    //opacity: 0.8,
    marginLeft: -20,
    marginTop: -20,
    //marginLeft: -20,
    position: 'absolute',
  },

  logoColor: {
    width: 40,
    height: 40,
    //opacity: 0.8,
    marginLeft: -20,
    marginTop: -20,
    //marginLeft: -20,
    position: 'absolute',
  },
  imageView: {
   
      width: '30%',
      height: 100 ,
      //margin: 7,
       borderRadius : 5
   
  },

  imageViewReply: {
   
    width: 70,
    height: 70 ,
    //margin: 7,
     borderRadius : 100
 
},

imageViewSong: {
   
  width: 80,
  height: 80 ,
  //margin: 7,
   borderRadius : 5

},

  imageView2: {
   
    width: 500,
    height: 500,
    // margingTop: -20,
    borderRadius : 5,
    borderWidth: 2,
    borderColor: '#000',
    backgroundColor: COLOR.SONG,
    //justifyContent: 'center',
    // alignItems: 'center',
 
},


   
  textView: {
   
       width:'90%', 
      // textAlignHorizontal:'left',
      padding:5,
      fontSize: 13,
      fontWeight: 'bold',
      color: '#000',
      //backgroundColor: COLOR.ALBUM,
      //borderRadius : 10

   
  },
  textViewAlbum: {
   
   width:'60%',
   // alignItems: 'flex-start',     
   textAlignVertical:'bottom',
   padding:5,
   fontSize: 22,
   marginTop: -10,
   marginLeft: +35,
   marginBottom: +5,
   fontWeight: 'bold',
   color: 'white',
   backgroundColor: COLOR.ALBUM,
   borderRadius : 10


},
textViewAlbumUser: {
   
  width:'40%', 
 textAlignVertical:'bottom',
 padding:5,
 fontSize: 16,
 marginTop: +2,
 marginLeft: +58,
// marginBottom: +15,
 // fontWeight: 'bold',
 color: '#000',
 backgroundColor: COLOR.ALBUM,
 borderRadius : 10


},

textViewAlbumUserDate: {
   
  width:450, 
 textAlignVertical:'bottom',
 padding:5,
 fontSize: 13,
 // marginTop: -20,
 //marginLeft: +35,
 // marginBottom: +15,
 // fontWeight: 'bold',
 color: '#555',
 //backgroundColor: COLOR.ALBUM,
 //borderRadius : 10


},

textViewAlbumreplyCount: {
   
 width:110, 
 textAlignVertical:'bottom',
 padding:2,
 fontSize: 13,
 //marginTop: -20,
 marginLeft: +390,
 // marginBottom: +15,
 // fontWeight: 'bold',
   fontWeight: 'bold',
   color: '#000',
   backgroundColor: COLOR.LIGHT_GRAY,
   borderRadius : 10


},

textViewAlbumBody: {
   
 width:'100%', 
 textAlignVertical:'bottom',
 padding:5,
 fontSize: 16,
 marginTop: +10 ,
 marginLeft: +15,
 // marginBottom: +15,
 fontWeight: 'bold',
 color: '#555',
 //borderColor : 'white',
 //borderWeight : 4 ,
 //backgroundColor: 'white',
 //borderRadius : 10


},
  textView2: {
   
    width:'90%', 
    // textAlignVertical:'bottom',
    //padding:10,
    fontSize: 13,
    color: '#333',
    // position: 'absolute', 
    // margeLeft: -5, 
    //paddingBottom: -50, 
    //backgroundColor: COLOR.ALBUM 
 
}
  

});


 

export default connect(
  state => ({ state: state.authenticate,
              activeUser: state.activeUser,
              useralbums_status : state.list_album,
              useralbums : state.list_album.albumList,
              albumVotes: state.albumVotes.data,
              albumReplies: state.albumReplies.data,
              album: state.albums.data,
              users: state.users.data
           }),
  dispatch => ({
              actions: bindActionCreators(authActions, dispatch),
              actionsalbums: bindActionCreators(albumActions, dispatch)
              })
)(AlbumDetail);


