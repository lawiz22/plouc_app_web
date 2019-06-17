import React, { Component } from 'react';
import { Animated, View, Image, StyleSheet, PanResponder, Text, ScrollView, FlatList,TouchableWithoutFeedback } from 'react-native';
import { DefaultTheme, IconButton, Appbar, Title, Badge, Button as ButPaper } from 'react-native-paper';
// import { Avatar } from 'react-native-elements';

import Styles, { COLOR } from "../config/styles";
import { bindActionCreators } from "redux";
import * as authActions from "../actions/authenticate";

import * as albumActions from "../actions/albums";
import AlbumPreviewCard from '../components/album/AlbumPreviewCard';
// import * as postActions from "../actions/posts";
import { connect } from "react-redux";

import {hashHistory} from 'react-router'
import HeaderAlbumAll from '../components/HeaderAlbumAll'
import './AlbumAll.scss';
import settings from '../config/settings';

class AlbumAll extends Component {

  constructor(props) {
    super(props);
    this.page = {
        
      albumDetail: [
          {id: 0}
        ]
    };
  }
  componentDidMount() {
    // console.log(this.props.state.authSession.data.id)
    // const post = this.props.posts.get_user_post();
     // console.log(this.props.state.authSession.data.id);
     // this.props.state.isAuth
     this.props.albums.get_album_list()
     
     //   : 
    setTimeout(() => {
        
    }, 2000);
}

    getVoteTally(albumId) {
      const {albumVotes} = this.props;
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
              backgroundColor: "#000",
            }}
          />
        );
      }

      getVoteScoreStyling(albumId) {
        if(this.usersVoteValue(albumId) === -1) return 'down-voted';
        if(this.usersVoteValue(albumId) === 1) return 'up-voted';
      }

      usersVote(albumId) {
        const {activeUser, albumVotes} = this.props;
        if(!activeUser) return null;
        const vote = Object.values(albumVotes)
            .filter(albumVote => albumVote.album === albumId)
            .filter(albumVote => albumVote.user === activeUser.id);
        if(vote.length) return vote[0];
        return null;
      }

  usersArtVoteValue(albumId) {
      const {activeUser, albumVotes} = this.props;
      
      if(!activeUser) return null;
      console.log(albumId)
      const vote = Object.values(albumVotes)
        .filter(albumVote => albumVote.album === albumId)
        .filter(albumVote => albumVote.user === activeUser.id);
          
      if(vote.filter(albumVote => albumVote.value === -1).length) return -1;
      if(vote.filter(albumVote => albumVote.value === 1).length) return 1;
      return null;
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
      
      
      renderAlbumSection() {
            // console.log(this.props.useralbums)
            if (this.props.useralbums !== null) {
            // const posts = JSON.stringify( this.props.userposts );
            const albumList = Object.values(this.props.useralbums)
            // console.log(albumList)
            if (albumList.length !== 0) return (
                <FlatList
                contentContainerStyle={{
                flex: 1,
                flexDirection: 'column',
                // justifyContent: 'center',
                // alignItems: 'center',
                //height: '100%',
                width: '100%',
                borderColor : 'white', 
                borderWidth : 4
                }}
                numColumns={3}
                data={albumList}
                renderItem={({ item }) => (
                  <TouchableWithoutFeedback onPress={ () => this.set_albumDetail(item)}> 
                <View
                    style={{
                    marginTop: 10,
                    width: 170,
                    height: 190,
                    alignItems: 'stretch',
                    borderColor: this.page.albumDetail.id === item.id?COLOR.ALBUM:'white',
                    borderWidth: 4 ,
                    //paddingRight : 10,
                    //borderColor : 'black', 
                    //borderWidth : 3
                    }}
                >
                    <AlbumPreviewCard name={item.album_title.substring(0, 20)} imageUrl={ `${settings.API_ROOT}${item.album_logo}`  } />
                    
                     <IconButton
                      icon={require('../images/star2.png')}
                      color={item.is_favorite?COLOR.ALBUM:COLOR.GRAY}
                      style= {{ borderRadius: 60, position : 'absolute', right : 30, top : -20}}
                      size={40}
                      onPress={() => console.log('Pressed')}
                      />
                      <View style={{
                              //marginTop: 10,
                              left: 110,
                              // marginTop : -110,
                              bottom : 140,
                              width: 47,
                              height: '60%',
                              //paddingRight : 10,
                              //borderColor : 'blue', 
                              //borderWidth : 3,
                              alignItems: 'center',
                              justifyContent: 'flex-start'
                              }} >
                      <div className="votes">
                          <a className="up-arrow" >
                          {(this.usersArtVoteValue(item.id) === 1)? <IconButton
                                                                icon="arrow-upward"
                                                                color={COLOR.POST}
                                                                size={25}
                                                                onPress={() => console.log(this.usersArtVoteValue(item.id))}
                                                              /> : 
                                                                <IconButton
                                                                icon="arrow-upward"
                                                                color={COLOR.GRAY}
                                                                size={25}
                                                                onPress={() => console.log(this.usersArtVoteValue(item.id))}
                                                              />  }
                          </a>
                          <div className={`score `}>
                              
                              <Text size={25} style={{ marginLeft: 15, fontWeight: 'bold' }}> {this.getVoteTally(item.id)} </Text>
                          </div>
                          <a className="down-arrow" >
                          {(this.usersArtVoteValue(item.id) === -1)? <IconButton
                                                                icon="arrow-downward"
                                                                color={COLOR.SONG}
                                                                size={25}
                                                                onPress={() => console.log('Pressed')}
                                                              /> : 
                                                                <IconButton
                                                                icon="arrow-downward"
                                                                color={COLOR.GRAY}
                                                                size={25}
                                                                onPress={() => console.log('Pressed')}
                                                              />  }   
                          </a>
                          </div></View>
                </View>
                </TouchableWithoutFeedback>
                )}
                keyExtractor={item => item.id.toString()}
                // ListHeaderComponent={this._renderHeader}
                //ListFooterComponent={this._renderFooter}
                // onRefresh={this._handleRefresh}
                // refreshing={this.state.refreshing}
                // onEndReached={this._handleLoadMore}
                // onEndReachedThreshold={0.5}
                // initialNumToRender={10}
            />
               );
            } 
        
        // if (postList.length === 0) return null;
        return null;
    }
  

  render() {
    const {activeUser} = this.props;
    return (
      
      
    
      <div className="AlbumAll">
    
      <HeaderAlbumAll></HeaderAlbumAll>
    
                        
      <View style={{
                            
                            height: 700,
                            //width: 850,
                            borderRightColor:  COLOR.ALBUM,
                            borderRightWidth: 4,
                            borderLeftColor:  COLOR.ALBUM,
                            borderLeftWidth: 4,
                            borderTopColor:  COLOR.ALBUM,
                            borderTopWidth: 20,
                            borderRadius: 30,
                            // position: 'absolute', 
                            marginTop: -18, 
                            marginRight: 0,
                            borderBottomColor:  COLOR.ALBUM,
                            borderBottomWidth: 40,
                            justifyContent: 'space-between',
                            alignItems: 'flex-start',
                        }} >

            <ScrollView style={[Styles.container, { padding: 0 }]}>
            {this.renderAlbumSection()}
                
            </ScrollView>

                                                  
                        
      </View>
     
      </div>
 
    );
  }
}

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    //alignItems: 'flex-start',
    //width: 850,
    //justifyContent: 'center',
    //margeRight: 20,
    paddingBottom: 20,
    borderBottomColor:  COLOR.ARTIST,
    borderBottomWidth: 40,
  },
  image: {
    borderRadius: 50,
    borderWidth: 2,
    borderColor: COLOR.ARTIST,
    width: 100,
    height: 100,
  },
 
  imageView: {
   
      width: '100%',
      height: 80 ,
      margin: 7,
      borderRadius : 10
   
  },
   
  textView: {
   
      width:'30%', 
      textAlignVertical:'center',
      padding:5,
      color: '#000'
   
  }
  

});


export default connect(
  state => ({ state: state.authenticate,
              activeUser: state.activeUser,
              useralbums_status : state.list_album,
              useralbums : state.list_album.albumList,
              albumVotes: state.albumVotes.data,
              album: state.albums.data,
              
           }),
  dispatch => ({
              actions: bindActionCreators(authActions, dispatch),
              albums: bindActionCreators(albumActions, dispatch),
              
              
              })
)(AlbumAll);


