import React, { Component } from 'react';
import { Animated, View, Image, StyleSheet, TouchableWithoutFeedback, Text, ScrollView, FlatList as FlatListArtist } from 'react-native';
import { Avatar, Card as CardOld, Paragraph, Badge, Appbar, Title, Button as ButPaper, List, IconButton} from 'react-native-paper';
// import { Avatar } from 'react-native-elements';

import { Card, Icon , Image as ImgNew, Button, Label, Comment, Header, Modal, Statistic} from 'semantic-ui-react';

import Styles, { COLOR } from "../config/styles";
import { bindActionCreators } from "redux";
import * as authActions from "../actions/authenticate";
import * as artistActions from "../actions/artists";
import * as albumActions from "../actions/albums";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import './ArtistAll.scss';
import settings from '../config/settings';

import {hashHistory} from 'react-router'
import HeaderArtistDetail from '../components/HeaderArtistDetail'
import {getFullName, getProfileImage} from '../utils/user';

class ArtistDetail extends Component {

  constructor(props) {
    super(props);
    this.page = {
     
      open: false,
      albumDetail: [
          {id: 0}
        ]
    };
  }

  componentDidMount() {
    // console.log(this.props.state.authSession.data.id)
    // const artist = this.props.artists.get_user_artist();
     // console.log(this.props.state.authSession.data.id);
     // this.props.state.isAuth
     
     this.page.open = false
     
    // setTimeout(() => {
        
    // }, 2000);
}


getArtistreply(artistId) {

  this.props.actionsartists.getArtist(artistId)
}
  
  getVoteTally(artistId) {
    const {artistVotes} = this.props;
    
   
    
    //console.log(artistId)
    //console.log(artistVotes)

    // console.log(Object.values(artistVotes).filter(artistVote => artistVote.artist === userartists.id))
    
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
              // backgroundColor: "#000",
            }}
          />
        );
      }

      getVoteScoreStyling(artistId) {
        if(this.usersVoteValue(artistId) === -1) return 'down-voted';
        if(this.usersVoteValue(artistId) === 1) return 'up-voted';
    }
      usersVote(artistId) {
        const {activeUser,  artistVotes} = this.props;
        if(!activeUser) return null;
        const vote = Object.values(artistVotes)
            .filter(artistVote => artistVote.artist === artistId)
            .filter(artistVote => artistVote.user === activeUser.id);
        if(vote.length) return vote[0];
        return null;
    }

      usersVoteValue(artistId) {
        const {activeUser, artistVotes} = this.props;
        if(!activeUser) return null;
        const vote = Object.values(artistVotes)
            .filter(artistVote => artistVote.artist === artistId)
            .filter(artistVote => artistVote.user === activeUser.id);
        if(vote.filter(artistVote => artistVote.value === -1).length) return -1;
        if(vote.filter(artistVote => artistVote.value === 1).length) return 1;
        return null;
      }

      set_artistDetail = (item) => {
        
        console.log(item)
        this.props.actionsartists.store_artist_detail(item)
        this.set_artistListview()

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
      set_artistListview = () => {
        
        this.page.artistListview = !this.page.artistListview
        
        this.props.actionsartists.set_artist_list(this.page.artistListview)
      }

      set_show_modal = () => {
        
        this.page.open = !this.page.open
        this.setState({ open: true })
        
      }
    
      voteartistDetail = () => {
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
                {(this.usersVoteValue(this.props.userartists_status.artistDetail.id) === 1)? <IconButton
                                                      icon="arrow-upward"
                                                      color={COLOR.ARTIST}
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
                    
                    <Text size={20} style={{ position: 'absolute', top: 33, left: 23, fontWeight: 'bold' }}> {this.getVoteTally(this.props.userartists_status.artistDetail.id)} </Text>
                </div>
                <a className="down-arrow" >
                {(this.usersVoteValue(this.props.userartists_status.artistDetail.id) === -1)? <IconButton
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

      renderArtistAlbumSection() {
        const {users} = this.props;
        if (this.props.userartists_status.artistAlbumsDetail !== null) {
        
        const artistAlbum = Object.values(this.props.userartists_status.artistAlbumsDetail)
        
       
        if (artistAlbum.length !== 0) return (
          
            <View>
              <FlatListArtist
              data={ artistAlbum }       
              ItemSeparatorComponent = {this.FlatListItemSeparator}
              
              renderItem={({item}) =>(
              <TouchableWithoutFeedback onPress={ () => this.set_albumDetail(item)}>        
                <View style={{flex:1, flexDirection: 'row',
                 borderColor:'white', borderWidth: 4 }}>
                
                    <Image source = {{ uri: `${settings.API_ROOT}${item.album_logo}` }} style={styles.imageViewAlbum}  />
                    <View style={{flex:1, flexDirection: 'column'}}>
                      <Text style={styles.textView} >{item.album_title}</Text>
                      <Text>{' '}</Text>
                      
                      <Text style={styles.textView2}> {this.props.userartists_status.artistDetail.artist}</Text>
                      <Text style={styles.textView2}> {item.modified_date} </Text>
                    </View>
                  </View>
                  </TouchableWithoutFeedback>
              )}
              keyExtractor={(item, index) => index.toString()}
              />
            </View>
            
           );
        } 
    
    // if (albumList.length === 0) return null;
    return null;
}
      renderArtistReplySection(artistId) {
        const {users} = this.props;
        if (this.props.artistReplies !== null) {
        
        const artistReply = Object.values(this.props.artistReplies)
           .filter(artistReply => artistReply.artist === artistId)
       
        if (artistReply.length !== 0) return (
          
            <View>
              <FlatListArtist
              data={ artistReply }       
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
    
    // if (artistList.length === 0) return null;
    return null;
}     
        
    renderArtistDetails() {
      console.log("YO ESTI DETAIL ARTIST")    
      return (
        
      // if (this.props.userartists_status.artistDetail !== null) { //  <Text style={[styles.textViewArtist, { padding: 0 }]}>{this.props.userartists_status.artistDetail.title}</Text> //
      <Card fluid>
          
            <Card.Content >
            <Card.Header as='h1' textAlign='center'>{this.props.userartists_status.artistDetail.artist}</Card.Header>
                      
            <ImgNew size='huge' src={(this.props.userartists_status.artistDetail.artist_image !== null)?`${settings.API_ROOT}${this.props.userartists_status.artistDetail.artist_image}`: require('../images/post_no_image.png')} bordered  onClick={() => this.set_show_modal()} />

            <View style={{ flexDirection : 'row' , padding : 10, alignItems : 'stretch'}}>
              
                  <Card.Meta>{' Ajouté le :'} </Card.Meta>
                  <Label size='small' content={ this.props.userartists_status.artistDetail.created_date} />
                  <Card.Meta>{'  par : '} </Card.Meta>
                    <Label as='a' size='small' image>
                          <img src={`${settings.API_ROOT}${this.props.userartists_status.artistDetail.user.profile.image}`} />
                          {this.props.userartists_status.artistDetail.user.first_name} {this.props.userartists_status.artistDetail.user.last_name}
                  </Label> 
                
            </View>   
            <Card.Description style={{ paddingTop : -20 }} textAlign='center'>
                    
                    <Statistic size='mini' >
                        <Statistic.Label size='mini'>
                           Albums
                        </Statistic.Label>
                        <Statistic.Value>
                        <Icon name='selected radio' />
                           {this.props.userartists_status.artistDetail.artist_album_count}
                        </Statistic.Value>
                      </Statistic>

                      <Statistic size='mini'>
                        <Statistic.Label size='mini'>
                           Songs
                        </Statistic.Label>
                        <Statistic.Value>
                        <Icon name='music' />
                           {this.props.userartists_status.artistDetail.artist_song_count}
                        </Statistic.Value>
                      </Statistic>
                      
                    </Card.Description>
            <Card.Description as='h3'>
                  {this.props.userartists_status.artistDetail.artist_desc}
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
            <Button style={{}} size="small" as='div' labelPosition='right' >
                            <Button icon >
                              <Icon name='comments' />
                              
                            </Button>
                            <Label size="small" as='a' basic pointing='left'>
                                {`${this.props.userartists_status.artistDetail.artist_reply_count}`}
                            </Label>
            </Button>  
            </Card.Content>
            {this.renderArtistAlbumSection()}
    </Card>
        
      
      //} {this.renderArtistReplySection(this.props.userartists_status.artistDetail.id)} ${this.donneMoileNbdAlbumMonEsti()}

    // if (artistList.length === 0) return null;
    )
    
    }  
  donneMoileNbdAlbumMonEsti() {
      const {userartists_status} = this.props;
      
      if(!userartists_status.artistAlbumsDetail) return null;
      const goEsti = Object.values(userartists_status.artistAlbumsDetail)
      return goEsti.length;
         
  }
  render() {
    const {activeUser} = this.props;
    return (
      
      <div className="ArtistAll">
    
       <HeaderArtistDetail>

       </HeaderArtistDetail>
    
                        
      <View style={{
                            
                            height: 700,
                            width: 500,
                            borderRightColor:  COLOR.ARTIST,
                            borderRightWidth: 4,
                            borderLeftColor:  COLOR.ARTIST,
                            borderLeftWidth: 4,
                            borderTopColor:  COLOR.ARTIST,
                            borderTopWidth: 20,
                            borderRadius: 25,
                            // position: 'absolute', 
                            marginTop: -18, 
                            //marginRight: 0,
                            borderBottomColor:  COLOR.ARTIST,
                            borderBottomWidth: 40,
                            justifyContent: 'center',
                            alignItems: 'stretch',
                        }} >
            <ScrollView style={[Styles.container, { padding: 0 }]}>            
            
              {this.renderArtistDetails()}
                                         
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
    borderBottomColor:  COLOR.ARTIST,
    borderBottomWidth: 40,
  },
  image: {
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    width: 100,
    height: 100,
  },

  imageViewAlbum: {
   
    width: 80,
    height: 80 ,
    //margin: 7,
     borderRadius : 5
  
  },

  artist: {
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
   
    width: 80,
    height: 80 ,
    //margin: 7,
     borderRadius : 100
 
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
      //backgroundColor: COLOR.ARTIST,
      //borderRadius : 10

   
  },
  textViewArtist: {
   
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
   backgroundColor: COLOR.ARTIST,
   borderRadius : 10


},
textViewArtistUser: {
   
  width:'40%', 
 textAlignVertical:'bottom',
 padding:5,
 fontSize: 16,
 marginTop: +2,
 marginLeft: +58,
// marginBottom: +15,
 // fontWeight: 'bold',
 color: '#000',
 backgroundColor: COLOR.ARTIST,
 borderRadius : 10


},

textViewArtistUserDate: {
   
  width:450, 
 textAlignVertical:'bottom',
 padding:5,
 fontSize: 13,
 // marginTop: -20,
 //marginLeft: +35,
 // marginBottom: +15,
 // fontWeight: 'bold',
 color: '#555',
 //backgroundColor: COLOR.ARTIST,
 //borderRadius : 10


},

textViewArtistreplyCount: {
   
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

textViewArtistBody: {
   
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
    //backgroundColor: COLOR.ARTIST 
 
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
              users: state.users.data
           }),
  dispatch => ({
              actions: bindActionCreators(authActions, dispatch),
              actionsartists: bindActionCreators(artistActions, dispatch),
              albums: bindActionCreators(albumActions, dispatch),
              })
)(ArtistDetail);


