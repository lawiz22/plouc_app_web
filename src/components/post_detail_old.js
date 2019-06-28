import React, { Component } from 'react';
import { Animated, View, Image, StyleSheet, TouchableWithoutFeedback, Text, ScrollView, FlatList } from 'react-native';
import { Avatar, Card, Paragraph, Badge, Appbar, Title, Button as ButPaper, List, IconButton} from 'react-native-paper';
// import { Avatar } from 'react-native-elements';

import Styles, { COLOR } from "../config/styles";
import { bindActionCreators } from "redux";
import * as authActions from "../actions/authenticate";
import * as postActions from "../actions/posts";
// import * as postActions from "../actions/posts";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import './PostAll.scss';
import settings from '../config/settings';

import {hashHistory} from 'react-router'
import HeaderPostDetail from '../components/HeaderPostDetail'
import {getFullName, getProfileImage} from '../utils/user';

class PostDetail extends Component {

  constructor(props) {
    super(props);
    
  }

  componentDidMount() {
    // console.log(this.props.state.authSession.data.id)
    // const post = this.props.posts.get_user_post();
     // console.log(this.props.state.authSession.data.id);
     // this.props.state.isAuth
     
     
     
    // setTimeout(() => {
        
    // }, 2000);
}


getPostreply(postId) {

  this.props.actionsposts.getPost(postId)
}
  
  getVoteTally(postId) {
    const {postVotes} = this.props;
    
   
    
    //console.log(postId)
    //console.log(postVotes)

    // console.log(Object.values(postVotes).filter(postVote => postVote.post === userposts.id))
    
    return Object.values(postVotes)
        .filter(postVote => postVote.post === postId)
        .reduce((acc, postVote) => acc + postVote.value, 0);
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

      getVoteScoreStyling(postId) {
        if(this.usersVoteValue(postId) === -1) return 'down-voted';
        if(this.usersVoteValue(postId) === 1) return 'up-voted';
    }
      usersVote(postId) {
        const {activeUser,  postVotes} = this.props;
        if(!activeUser) return null;
        const vote = Object.values(postVotes)
            .filter(postVote => postVote.post === postId)
            .filter(postVote => postVote.user === activeUser.id);
        if(vote.length) return vote[0];
        return null;
    }

      usersVoteValue(postId) {
        const {activeUser, postVotes} = this.props;
        if(!activeUser) return null;
        const vote = Object.values(postVotes)
            .filter(postVote => postVote.post === postId)
            .filter(postVote => postVote.user === activeUser.id);
        if(vote.filter(postVote => postVote.value === -1).length) return -1;
        if(vote.filter(postVote => postVote.value === 1).length) return 1;
        return null;
      }

      set_postDetail = (item) => {
        
        console.log(item)
        this.props.actionsposts.store_post_detail(item)
        this.set_postListview()

      }
      
      set_postListview = () => {
        
        this.page.postListview = !this.page.postListview
        
        this.props.actionsposts.set_post_list(this.page.postListview)
      }
    
      votepostDetail = () => {
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
                {(this.usersVoteValue(this.props.userposts_status.postDetail.id) === 1)? <IconButton
                                                      icon="arrow-upward"
                                                      color={COLOR.POST}
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
                    
                    <Text size={20} style={{ position: 'absolute', top: 33, left: 23, fontWeight: 'bold' }}> {this.getVoteTally(this.props.userposts_status.postDetail.id)} </Text>
                </div>
                <a className="down-arrow" >
                {(this.usersVoteValue(this.props.userposts_status.postDetail.id) === -1)? <IconButton
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


      renderPostReplySection(postId) {
        const {users} = this.props;
        if (this.props.postReplies !== null) {
        
        const postReply = Object.values(this.props.postReplies)
           .filter(postReply => postReply.post === postId)
       
        if (postReply.length !== 0) return (
          
            <View>
              <FlatList
              data={ postReply }       
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
    
    // if (postList.length === 0) return null;
    return null;
}     
        
    renderPostDetails() {
      console.log("YO ESTI")    
      return (
        
      // if (this.props.userposts_status.postDetail !== null) { //  <Text style={[styles.textViewPost, { padding: 0 }]}>{this.props.userposts_status.postDetail.title}</Text> //
        
        <Card style={[Styles.containerPostDetail, { padding: 10 }]}>
          <Card.Content>
              <Text style={[styles.textViewPostUser, { padding: 0 }]}>{this.props.userposts_status.postDetail.user.first_name} {this.props.userposts_status.postDetail.user.last_name}</Text>
             
              <Avatar.Image size={50} style={{ position: 'absolute', top: 5, left: 22, borderColor: COLOR.POST }} source={{ uri: `${settings.API_ROOT}${this.props.userposts_status.postDetail.user.profile.image}` }} />
          {this.votepostDetail()}
          
          <Text style={[styles.textViewPost, { padding: 0 }]}>{this.props.userposts_status.postDetail.title}</Text>
          <Image style={styles.logo}
                              source={require('../images/star.png')}
                            > 
          </Image>
          </Card.Content>
          
          <Card.Cover source={{ uri: `${settings.API_ROOT}${this.props.userposts_status.postDetail.image}` }} style={[styles.imageView2, { padding: 0 }]}/>      
          
          <Text style={styles.textViewPostUserDate}> {this.props.userposts_status.postDetail.created_date} </Text>
          
          
          <View style = {{ paddingRight : 12,paddingBottom : +10 , borderRadius : 6, borderColor : COLOR.GRAY , borderWidth : 2, backgroundColor : 'white'}}>
              <Text  style={[styles.textViewPostBody, { padding: 0 }]} >{this.props.userposts_status.postDetail.body}</Text>    
          </View>
          <View style = {{ borderRadius : 6, borderColor : 'white' , borderWidth : 2 }}>
              <Text style={styles.textViewPostreplyCount}> {`Comment(s) : ${this.props.userposts_status.postDetail.post_reply_count}`}</Text>
          </View>
          {this.renderPostReplySection(this.props.userposts_status.postDetail.id)}
        </Card>
      
      //} 

    // if (postList.length === 0) return null;
    )
    
    }  

  render() {
    const {activeUser} = this.props;
    return (
      
      <div className="PostAll">
    
       <HeaderPostDetail>

       </HeaderPostDetail>
    
                        
      <View style={{
                            
                            height: 700,
                            //width: 850,
                            borderRightColor:  COLOR.POST,
                            borderRightWidth: 4,
                            borderLeftColor:  COLOR.POST,
                            borderLeftWidth: 4,
                            borderTopColor:  COLOR.POST,
                            borderTopWidth: 20,
                            borderRadius: 25,
                            // position: 'absolute', 
                            marginTop: -18, 
                            //marginRight: 0,
                            borderBottomColor:  COLOR.POST,
                            borderBottomWidth: 40,
                            justifyContent: 'center',
                            alignItems: 'stretch',
                        }} >
            <ScrollView style={[Styles.container, { padding: 0 }]}>            
            
              {this.renderPostDetails()}
                                         
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
    borderBottomColor:  COLOR.POST,
    borderBottomWidth: 40,
  },
  image: {
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    width: 100,
    height: 100,
  },

  post: {
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    width: 100,
    height: 100,
  },
  logo: {
    width: 30,
    height: 30,
    opacity: 0.8,
    top: +60,
    marginLeft: -20,
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
      //backgroundColor: COLOR.POST,
      //borderRadius : 10

   
  },
  textViewPost: {
   
   width:'60%',
   // alignItems: 'flex-start',     
   textAlignVertical:'bottom',
   padding:5,
   fontSize: 22,
   marginTop: -63,
   marginLeft: +25,
   marginBottom: +5,
   fontWeight: 'bold',
   color: COLOR.POST,
   backgroundColor: '#000',
   borderRadius : 10


},
textViewPostUser: {
   
  width:'40%', 
 textAlignVertical:'bottom',
 padding:5,
 fontSize: 16,
 marginTop: +2,
 marginLeft: +58,
// marginBottom: +15,
 // fontWeight: 'bold',
 color: '#000',
 backgroundColor: COLOR.POST,
 borderRadius : 10


},

textViewPostUserDate: {
   
  width:450, 
 textAlignVertical:'bottom',
 padding:5,
 fontSize: 13,
 // marginTop: -20,
 //marginLeft: +35,
 // marginBottom: +15,
 // fontWeight: 'bold',
 color: '#555',
 //backgroundColor: COLOR.POST,
 //borderRadius : 10


},

textViewPostreplyCount: {
   
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

textViewPostBody: {
   
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
              userposts_status : state.list_post,
              userposts : state.list_post.postList,
              postVotes: state.postVotes.data,
              postReplies: state.postReplies.data,
              post: state.posts.data,
              users: state.users.data
           }),
  dispatch => ({
              actions: bindActionCreators(authActions, dispatch),
              actionsposts: bindActionCreators(postActions, dispatch)
              })
)(PostDetail);


