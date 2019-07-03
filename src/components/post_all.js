import React, { Component } from 'react';
import { Animated, View, Image as Img, StyleSheet, TouchableWithoutFeedback, Text, ScrollView, FlatList } from 'react-native';
import { Avatar, Card, Paragraph, Badge, Appbar, Title, Button as ButPaper, List, IconButton} from 'react-native-paper';
// import { Avatar } from 'react-native-elements';

import { Button, Icon, Image, Item, Label } from 'semantic-ui-react'

import Styles, { COLOR } from "../config/styles";
import { bindActionCreators } from "redux";
import * as authActions from "../actions/authenticate";
import * as postActions from "../actions/posts";

import * as voteCreate from '../actions/votes/post-vote/create';
import * as voteDelete from '../actions/votes/post-vote/delete';
import * as voteEdit from '../actions/votes/post-vote/edit';
// import * as postActions from "../actions/posts";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import './PostAll.scss';
import settings from '../config/settings';
import moment from "moment";

import {hashHistory, Link} from 'react-router'
import HeaderPostAll from '../components/HeaderPostAll'

import {formatDate} from '../utils/general';


class PostAll extends Component {

  constructor(props) {
    super(props);
    this.page = {
        
     
      postListview: this.props.userposts_status.postListview,
      postDetail: [
          {id: 0}
        ]
    };
  }

  componentDidMount() {
    // console.log(this.props.state.authSession.data.id)
    // const post = this.props.posts.get_user_post();
     // console.log(this.props.state.authSession.data.id);
     // this.props.state.isAuth
     this.props.actionsposts.get_user_post()
     this.page.showDetailview = this.props.userposts_status.showDetailview
     
     //   : 
    //setTimeout(() => {
        
    // }, 2000);
}

  getVoteTally(postId) {
    const {postVotes} = this.props;
    
    // const postsObj = Object.assign({}, userposts);
    
    // console.log(postId)
    // console.log(postVotes)

    
    return Object.values(postVotes)
        .filter(postVote => postVote.post === postId)
        .reduce((acc, postVote) => acc + postVote.value, 0);
  }

  
  renderPostList(postList) {
          return postList
              .map(post =>
                  
                  <List.Item
                      key={post.id}
                      leftAvatar={{ source: { uri: `${settings.API_ROOT}${post.image}` } }}
                      title={post.title}
                      description={post.user.first_name}
                      left={props => <List.Icon {...props} icon="folder" />}
                    />
              );
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
        this.props.actionsposts.getPost(item.id)
        if (this.page.postDetail.id == item.id){
           this.page.postDetail.id = 0
           if (this.page.showDetailview){
           this.showPostdetail(item)}
          }
           
         else
           {
            this.page.postDetail.id = item.id
            if (!this.page.showDetailview){
              this.showPostdetail(item)}else {
                
             }
            }   

      }
      
      set_postListview = () => {
        

        this.page.postListview = !this.page.postListview
        
        this.props.actionsposts.set_post_list(this.page.postListview)
      }

      showPostdetail = (item) => {
        
        
        this.page.showDetailview = !this.props.userposts_status.showDetailview
        
        this.props.actionsposts.show_post_detail(this.page.showDetailview)
      }
      

      renderPostSection() {
        const {activeUser} = this.props;
        if (this.props.userposts !== null) {
        // const posts = JSON.stringify( this.props.userposts );
        const postList = Object.values(this.props.userposts)
        // console.log(postList)
        //Count les vote par post pour le tri
        const postList2 = postList.map(obj=> ({ ...obj, countVote: obj.post_votes.length }))
        // console.log(postList2)
        //Tri par nombre de vote
        var byVote = postList2.slice(0);
        byVote.sort(function(b,a) {
          return a.countVote - b.countVote;
          });
        
        
        // console.log(byVote);
        if (byVote.length !== 0) return (
          
            <View>
              <FlatList
              data={ byVote }       
              ItemSeparatorComponent = {this.FlatListItemSeparator}
              
              renderItem={({item}) =>
              <TouchableWithoutFeedback > 
              <View style={{flex:1, flexDirection: 'row', padding : 5 ,
                 borderColor: this.page.postDetail.id === item.id?COLOR.POST:'white', borderWidth: 4 }}>
                 
                <Item.Group divided>
                  <Item >
                    <Item.Image size='tiny' src={(item.image !== null)?`${settings.API_ROOT}${item.image}`: require('../images/post_no_image.png')} />

                    <Item.Content verticalAlign ='middle'>
                      <Item.Header as='h2' onClick={ () => this.set_postDetail(item)}>{item.title} </Item.Header>
                      <Link className="user"
                              to={`/profile/${item.user.id}/posts`}>
                      <Item.Meta >
                        <span className='cinema'>Par : {item.user.first_name} {item.user.last_name}</span>
                      </Item.Meta>
                      </Link>
                      <Item.Extra>
                        
                        <Label icon='globe' size='small' content={moment(item.created_date).format('YYYY-MM-DD hh:mm')} />
                        
                                {this.props.activeUser !== null && this.props.activeUser.id === item.user.id?
                                <Button icon size='mini' floated='left'>
                                      <Icon name='delete' />
                               </Button>:null}
                         
                      </Item.Extra>
                      <Item.Extra>
                        {(this.usersVoteValue(item.id) === 1)? <Icon color='green' name='arrow up' onClick={() => this.handleUpArrowClick(item.id)}/> :<Icon color='grey' name='arrow up' onClick={() => this.handleUpArrowClick(item.id)}/>}
                        <a>{this.getVoteTally(item.id)} </a>
                        {(this.usersVoteValue(item.id) === -1)? <Icon color='red' name='arrow down' onClick={() => this.handleDownArrowClick(item.id)}/> :<Icon color='grey' name='arrow down' onClick={() => this.handleDownArrowClick(item.id)}/>}
                        
                      <Button size="mini" as='div' labelPosition='right'>
                            <Button icon>
                              <Icon name='comments' />
                              
                            </Button>
                            <Label size="mini" as='a' basic pointing='left'>
                            {`${item.post_reply_count}`}
                            </Label>
                        </Button> 
                      </Item.Extra>
                      
                    </Item.Content>
                  </Item>
                </Item.Group>        
                
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
    

  render() {
    const {activeUser} = this.props;
    return (
      
      <div className="PostAll">
    
       <HeaderPostAll>

       </HeaderPostAll>
    
                        
      <View style={{
                            
                            height: 700,
                            // width: 450,
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
                            //justifyContent: 'center',
                            alignItems: 'stretch',
                        }} >
            <ScrollView style={[Styles.container, { padding: 0 }]}>            
            {this.props.userposts_status.postListview? 
                                          this.renderPostSection()
                                          : this.renderPostDetails(this.props.userposts_status.postDetail) }
            </ScrollView>

                                                  
                        
      </View>
     
      </div>
 
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
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
 
  imageView: {
   
      width: '30%',
      height: 100 ,
      borderWidth: 2,
     
      //margin: 7,
      borderRadius : 5,
   
  },

  imageView2: {
   
    width: 500,
    height: 500,
    //margin: 7,
     borderRadius : 5
 
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
              post: state.posts.data,
              
           }),
  dispatch => ({
              actions: bindActionCreators(authActions, dispatch),
              actionsposts: bindActionCreators(postActions, dispatch),
              createvotes: bindActionCreators(voteCreate, dispatch),
              deletevotes: bindActionCreators(voteDelete, dispatch),
              editvotes: bindActionCreators(voteEdit, dispatch)
              })
)(PostAll);


