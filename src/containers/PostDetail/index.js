import React, { Component } from 'react';
import { Animated, View, Image as ImageOld, StyleSheet, TouchableWithoutFeedback, Text, ScrollView, FlatList } from 'react-native';
import { Avatar, Card as CardOld, Paragraph, Badge, Appbar, Title, Button as ButPaper, List, IconButton} from 'react-native-paper';
// import { Avatar } from 'react-native-elements';

import { Card, Icon , Image, Button, Label, Comment, Header, Modal} from 'semantic-ui-react'

import Styles, { COLOR } from "../../config/styles";
import { bindActionCreators } from "redux";
import * as authActions from "../../actions/authenticate";
import * as postActions from "../../actions/posts";
import * as voteCreate from '../../actions/votes/post-vote/create';
import * as voteDelete from '../../actions/votes/post-vote/delete';
import * as voteEdit from '../../actions/votes/post-vote/edit';
import * as postUserAction from '../../actions/posts/post/get';
// import * as postActions from "../actions/posts";
import PropTypes from 'prop-types';
import { connect } from "react-redux";

import settings from '../../config/settings';

import {hashHistory} from 'react-router'
import HeaderPostDetail from '../../components/HeaderPostDetail'
import {getFullName, getProfileImage, getFirstName} from '../../utils/user';

class PostDetail extends Component {

  constructor() {
    super();
    
    this.page = {
      open: false
    };
  }

  componentDidMount() {
    // console.log(this.props.state.authSession.data.id)
    // const post = this.props.posts.get_user_post();
     // console.log(this.props.state.authSession.data.id);
     // this.props.state.isAuth
     
        
        const { params: {postId}} = this.props;
        this.props.postUserAction.getPost(postId);

        
     this.page.open = false
     
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

      handleDownArrowClick = (postId) => {
        const {activeUser, dispatch} = this.props;
        if(!activeUser) return null;
        if(this.usersVoteValue(postId) === null) {
          this.props.createvotes.createPostVote({
                post: postId,
                value: -1
            });
        }
        if(this.usersVoteValue(postId) === -1) {
          this.props.deletevotes.deletePostVote(this.usersVote(postId));
        }
        if(this.usersVoteValue(postId) === 1) {
          this.props.editvotes.editPostVote({
                ...this.usersVote(postId),
                value: -1
            });
        }
    };

    handleUpArrowClick = (postId) => {
      const {activeUser, dispatch} = this.props;
      if(!activeUser) return null;
      if(this.usersVoteValue(postId) === null) {
        this.props.createvotes.createPostVote({
              post: postId,
              value: 1
          });
      }
      if(this.usersVoteValue(postId) === -1) {
        this.props.editvotes.editPostVote({
              ...this.usersVote(postId),
              value: 1
          });
      }
      if(this.usersVoteValue(postId) === 1) {
        this.props.deletevotes.deletePostVote(this.usersVote(postId));
      }
  };

      set_postDetail = (item) => {
        
        console.log(item)
        this.props.actionsposts.store_post_detail(item)
        this.set_postListview()

      }
      
      set_postListview = () => {
        
        this.page.postListview = !this.page.postListview
        
        this.props.actionsposts.set_post_list(this.page.postListview)
      }

      set_show_modal = () => {
        
        this.page.open = !this.page.open
        this.setState({ open: true })
        
      }
    
      
      download(url) {
        // fake server request, getting the file url as response
        setTimeout(() => {
          const response = {
            file: url,
          };
          // server sent the url to the file!
          // now, let's download:
          window.open(response.file);
          // you could also do:
          // window.location.href = response.file;
        }, 100);
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
                
                <Comment.Group size='large'>
                  
                    <Comment size='small'>
                      <Comment.Avatar  src={`${settings.API_ROOT}${getProfileImage(item.user, users)}`} />
                      <Comment.Content>
                        <Comment.Author as='a'>{getFullName(item.user, users)}</Comment.Author>
                        <Comment.Metadata>
                          <div>{item.modified_date}</div>
                        </Comment.Metadata>
                        <Comment.Text>{item.body}</Comment.Text>
                        <Comment.Actions>
                          <Comment.Action>Reply</Comment.Action>
                        </Comment.Actions>
                      </Comment.Content>
                    </Comment>
                  </Comment.Group>
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
      console.log("YO ESTI post de-trail")   
      const extra = (
        <a>
          <Icon name='user' />
          16 Friends
        </a>
      )
      const {post, users} = this.props;
      if (!post) return null;
      return (
        
        
        <View style={[Styles.containerPostDetail]}>
        
        <Card fluid>
          
            <Card.Content >
            <Card.Header as='h1' textAlign='center'>{this.props.post.title}</Card.Header>
                       
            <Image size='huge' src={(post.image !== null)?`${settings.API_ROOT}${post.image}`: require('../../images/post_no_image.png')} bordered  onClick={() => this.set_show_modal()} />
  
            <View style={{ flexDirection : 'row' , padding : 10, alignItems : 'stretch'}}>
              
                  <Card.Meta>{' Ajouté le :'} </Card.Meta>
                  <Label size='small' content={ post.created_date} />
                  <Card.Meta>{'  par : '} </Card.Meta>
                    <Label as='a' size='small' image>
                          <img src={`${settings.API_ROOT}${getProfileImage(post.user, users)}`} />
                          {getFullName(post.user, users)}
                  </Label> 
                 
             </View>   
             <Card.Description as='h3'>
                  {post.body}
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
            <Button.Group>
              <Button>
                {(this.usersVoteValue(post.id) === 1)? <Icon color='green' name='arrow up' onClick={() => this.handleUpArrowClick(post.id)}/> :<Icon color='grey' name='arrow up' onClick={() => this.handleUpArrowClick(post.id)}/>}
              </Button>
              <Button.Or as="a" text={`${this.getVoteTally(post.id)}`} />
              <Button>
              {(this.usersVoteValue(post.id) === -1)? <Icon color='red' name='arrow down' onClick={() => this.handleDownArrowClick(post.id)}/> :<Icon color='grey' name='arrow down' onClick={() => this.handleDownArrowClick(post.id)}/>}
              </Button>
            </Button.Group>
            </Card.Content>
        </Card>

          <View style = {{ marginLeft: 410 , borderRadius : 6, borderColor : 'white' , borderWidth : 2 }}>
          <Button size="mini" as='div' labelPosition='right'>
                            <Button icon>
                              <Icon name='comments' />
                            </Button>
                            <Label size="mini" as='a' basic pointing='left'>
                                {`${post.post_reply_count}`}
                            </Label>
                        </Button>  
          </View>
          {this.renderPostReplySection(post.id)}
        
        <Modal dimmer='blurring' open={this.page.open} onClose={() => this.set_show_modal()}>
                
                <Modal.Content image>
                  <Image wrapped size='huge' src={`${settings.API_ROOT}${post.image}`} />
                </Modal.Content>
                <Modal.Actions>
                  <Button color='black' onClick={() => this.set_show_modal()}>
                    DONE
                  </Button>
                  <Button
                    positive
                    icon='save'
                    labelPosition='right'
                    content="Sauvegarde"
                    onClick={() => this.download(`${settings.API_ROOT}${post.image}`)}
                  />
                </Modal.Actions>
              </Modal></View>
      //} 

    // if (postList.length === 0) return null;
    )
    
    }  

  render() {
    const {activeUser} = this.props;
    const {post, users} = this.props;
    if (!post) return null;
    return (
      
      <div className="PostAll">
    
    <View style ={{ height: 80 }}>
      
      <Appbar.Header theme={{ colors: { primary: COLOR.POST }}} >
               
               {this.props.activeUser? <Appbar.Action icon="edit" />: null }
               
            
                <Appbar.Content
                title={this.props.post.title}
                subtitle={getFirstName(Number(this.props.post.user), users)}
                style ={{ alignItems: 'center' }} 
                />
                <Appbar.Action icon="clear"/> 
                               
                
            </Appbar.Header>  
                    
      </View>
    
                        
      <View style={{
                            
                            // height: 700,
                            //width: 550,
                            borderRightColor:  COLOR.POST,
                            borderRightWidth: 4,
                            borderLeftColor:  COLOR.POST,
                            borderLeftWidth: 4,
                            borderTopColor:  COLOR.POST,
                            borderTopWidth: 20,
                            borderRadius: 25,
                            // position: 'absolute', 
                            marginTop: -18,
                            //padding : 2, 
                            //marginRight: 0,
                            borderBottomColor:  COLOR.POST,
                            borderBottomWidth: 40,
                            justifyContent: 'center',
                            //alignItems: 'flex-start',
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
 marginLeft: +300,
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
    (state, props) => ({ state: state.authenticate,
              activeUser: state.activeUser,
              userposts_status : state.list_post,
              userposts : state.list_post.postList,
              postVotes: state.postVotes.data,
              postReplies: state.postReplies.data,
              post: state.posts.data[props.params.postId],
              users: state.users.data
           }),
  dispatch => ({
              actions: bindActionCreators(authActions, dispatch),
              actionsposts: bindActionCreators(postActions, dispatch),
              createvotes: bindActionCreators(voteCreate, dispatch),
              deletevotes: bindActionCreators(voteDelete, dispatch),
              editvotes: bindActionCreators(voteEdit, dispatch),
              postUserAction : bindActionCreators(postUserAction, dispatch)
              })
)(PostDetail);


