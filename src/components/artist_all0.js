import React, { Component } from 'react';
import { Animated, View, Image, StyleSheet, PanResponder, Text, ScrollView, FlatList,TouchableWithoutFeedback } from 'react-native';
import { DefaultTheme, IconButton, Appbar, Title, Badge, Button as ButPaper } from 'react-native-paper';
// import { Avatar } from 'react-native-elements';

import Styles, { COLOR } from "../config/styles";
import { bindActionCreators } from "redux";
import * as authActions from "../actions/authenticate";
import * as postActions from "../actions/posts";
import * as artistActions from "../actions/artists";
import settings from '../config/settings';

import { Card, Icon , Image as ImgNew, Button, Label, Comment, Header, Modal} from 'semantic-ui-react'

import ArtistPreviewCard from '../components/artist/ArtistPreviewCard';
// import * as postActions from "../actions/posts";
import { connect } from "react-redux";

import {hashHistory} from 'react-router'
import HeaderArtistAll from '../components/HeaderArtistAll'
import './ArtistAll.scss';

class ArtistAll extends Component {

  constructor(props) {
    super(props);
    this.page = {
        
      artistDetail: [
          {id: 0}
        ]
    };
  }
  componentDidMount() {
    // console.log(this.props.state.authSession.data.id)
    // const post = this.props.posts.get_user_post();
     // console.log(this.props.state.authSession.data.id);
     // this.props.state.isAuth
     this.props.artists.get_artist_list()
     
     //   : 
    setTimeout(() => {
        
    }, 2000);
}

    getVoteTally(artistId) {
      const {artistVotes} = this.props;
      return Object.values(artistVotes)
          .filter(artistVote => artistVote.artist === artistId)
          .reduce((acc, artistVote) => acc + artistVote.value, 0);
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

      getVoteScoreStyling(artistId) {
        if(this.usersVoteValue(artistId) === -1) return 'down-voted';
        if(this.usersVoteValue(artistId) === 1) return 'up-voted';
      }

      usersVote(artistId) {
        const {activeUser, artistVotes} = this.props;
        if(!activeUser) return null;
        const vote = Object.values(artistVotes)
            .filter(artistVote => artistVote.artist === artistId)
            .filter(artistVote => artistVote.user === activeUser.id);
        if(vote.length) return vote[0];
        return null;
      }

  usersArtVoteValue(artistId) {
      const {activeUser, artistVotes} = this.props;
      
      if(!activeUser) return null;
      //console.log(artistId)
      const vote = Object.values(artistVotes)
        .filter(artistVote => artistVote.artist === artistId)
        .filter(artistVote => artistVote.user === activeUser.id);
          
      if(vote.filter(artistVote => artistVote.value === -1).length) return -1;
      if(vote.filter(artistVote => artistVote.value === 1).length) return 1;
      return null;
  }

      set_artistDetail = (item) => {
        
        console.log(item)
        this.props.artists.store_artist_detail(item)

        this.props.artists.getArtist(item.id)
        this.props.artists.get_artist_album_list_2(item.id)
        if (this.page.artistDetail.id == item.id){
           this.page.artistDetail.id = 0
           if (this.page.showArtistDetailview){
           this.showArtistdetail(item)}
          }
           
         else
           {
            this.page.artistDetail.id = item.id
            if (!this.page.showArtistDetailview){
              this.showArtistdetail(item)}else {
                
             }
            }   

      }

      showArtistdetail = (item) => {
        
        
        this.page.showArtistDetailview = !this.props.userartists_status.showArtistDetailview
        
        this.props.artists.show_artist_detail(this.page.showArtistDetailview)
      }
      

      renderArtistSection() {
            // console.log(this.props.userartists)
            if (this.props.userartists !== null) {
            // const posts = JSON.stringify( this.props.userposts );
            const artistList = Object.values(this.props.userartists)
            // console.log(artistList)
            if (artistList.length !== 0) return (
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
                data={artistList}
                renderItem={({ item }) => (
                  <TouchableWithoutFeedback onPress={ () => this.set_artistDetail(item)}> 
                <View
                    style={{
                    marginTop: 10,
                    width: 170,
                    height: 190,
                    //alignItems: 'stretch',
                    paddingRight : -10,
                    borderColor: this.page.artistDetail.id === item.id?COLOR.ARTIST:'white',
                    borderWidth: 4 ,
                    // borderRadius : 10
                    }}
                >
                   
                    <Card.Group itemsPerRow={3} >
                          <Card raised fluid image={ `${settings.API_ROOT}${item.artist_image}`  } />
    
                    </Card.Group>
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
      
      
    
      <div className="ArtistAll">
    
      <HeaderArtistAll></HeaderArtistAll>
    
                        
      <View style={{
                            
                            height: 700,
                            //width: 850,
                            borderRightColor:  COLOR.ARTIST,
                            borderRightWidth: 4,
                            borderLeftColor:  COLOR.ARTIST,
                            borderLeftWidth: 4,
                            borderTopColor:  COLOR.ARTIST,
                            borderTopWidth: 20,
                            borderRadius: 30,
                            // position: 'absolute', 
                            marginTop: -18, 
                            marginRight: 0,
                            borderBottomColor:  COLOR.ARTIST,
                            borderBottomWidth: 40,
                            justifyContent: 'space-between',
                            alignItems: 'flex-start',
                        }} >

            <ScrollView style={[Styles.container, { padding: 0 }]}>
            {this.renderArtistSection()}
                
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
              userartists_status : state.list_artist,
              useralbums_status : state.list_album,
              userartists : state.list_artist.artistList,
              artistVotes: state.artistVotes.data,
              artist: state.artists.data,
              
           }),
  dispatch => ({
              actions: bindActionCreators(authActions, dispatch),
              artists: bindActionCreators(artistActions, dispatch),
              
              })
)(ArtistAll);


