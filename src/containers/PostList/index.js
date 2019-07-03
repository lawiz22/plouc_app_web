import React, {Component} from 'react';
import {connect} from 'react-redux';
import {hashHistory, Link} from 'react-router';
import * as postUserAction from '../../actions/posts/post/list';
import { Animated, View, Image as Img, StyleSheet, TouchableWithoutFeedback, Text, ScrollView, FlatList } from 'react-native';
import { DefaultTheme, Appbar, Title, Badge, Button as ButPaper } from 'react-native-paper';
import Styles, { COLOR } from "../../config/styles";
import { bindActionCreators } from "redux";
import PropTypes from 'prop-types';
import * as authActions from "../../actions/authenticate";
import * as postActions from "../../actions/posts";
import * as deletePostAction from '../../actions/posts/post/delete';
import * as voteCreate from '../../actions/votes/post-vote/create';
import * as voteDelete from '../../actions/votes/post-vote/delete';
import * as voteEdit from '../../actions/votes/post-vote/edit';
import {getFirstName, getFullName} from '../../utils/user';
import HeaderUserPostAll from '../../components/HeaderUserPostAll'
import { Button, Icon, Image, Item, Label, Modal , Header, Menu, Input} from 'semantic-ui-react'
import settings from '../../config/settings';
import moment from "moment";


class PostList extends Component {

    constructor(props) {
        super(props);
        
        this.page = {
          open: false,
          
        };

        this.state = {
           
            itemSelect: null,
          };
        
      }

    componentDidMount() {
        this.props.actionsposts.get_user_post()
        const { params: {userId}} = this.props;
        (this.props.postUserAction.getPostList({
            user: userId
        }));
        
       
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


    getVoteTally(postId) {
        const {postVotes} = this.props;
        
        // const postsObj = Object.assign({}, userposts);
        
        // console.log(postId)
        // console.log(postVotes)
    
        
        return Object.values(postVotes)
            .filter(postVote => postVote.post === postId)
            .reduce((acc, postVote) => acc + postVote.value, 0);
      }
    
    handleDelete (post) {
        console.log(post.id)
        this.props.actionDeletePost.deletePost(post);
        this.set_show_modal()
    };
    renderPostList(postList) {
        return postList
            .map(post =>
                <PostListItem
                    key={post.id}
                    post={post}
                />
            );
    }


    renderModalWarning  () 
    {
        
        const {users} = this.props;
        console.log(this.state.itemSelect)
        if(this.state.itemSelect == null) return null;
         return (
            <Modal dimmer='blurring' open={this.page.open} onClose={() => this.set_show_modal()}>
            <Header icon='delete' content='Etes vous ben ben ben certain??' />   
            <Modal.Content>
            <Item >
                <Item.Image size='tiny' src={(this.state.itemSelect.image !== null)?`${settings.API_ROOT}${this.state.itemSelect.image}`: require('../../images/post_no_image.png')} />
                    
                <Item.Content verticalAlign ='middle'>
                 
                   <Item.Header as='h2' onClick={() => hashHistory.push(`/profile/${this.state.itemSelect.user}/posts/${this.state.itemSelect.id}`)} >{this.state.itemSelect.title} </Item.Header>
               
                  <Item.Meta>
                    <span className='cinema'>Par : {getFullName(this.state.itemSelect.user, users)} </span>
                  </Item.Meta>
                  
                  <Item.Extra>
                    
                    <Label icon='globe' size='small' content={moment(this.state.itemSelect.created_date).format('YYYY-MM-DD hh:mm')} />
                    <Label icon='calendar alternate outline' size='small' content={moment(this.state.itemSelect.date_debut).format('YYYY-MM-DD hh:mm')} />
                  </Item.Extra>
                  <Item.Extra>
                    {(this.usersVoteValue(this.state.itemSelect.id) === 1)? <Icon color='green' name='arrow up' onClick={() => this.handleUpArrowClick(this.state.itemSelect.id)}/> :<Icon color='grey' name='arrow up' onClick={() => this.handleUpArrowClick(this.state.itemSelect.id)}/>}
                    <a>{this.getVoteTally(this.state.itemSelect.id)} </a>
                    {(this.usersVoteValue(this.state.itemSelect.id) === -1)? <Icon color='red' name='arrow down' onClick={() => this.handleDownArrowClick(this.state.itemSelect.id)}/> :<Icon color='grey' name='arrow down' onClick={() => this.handleDownArrowClick(this.state.itemSelect.id)}/>}
                  <Button size="mini" as='div' labelPosition='right'>
                        <Button icon>
                          <Icon name='comments' />
                          
                        </Button>
                        <Label size="mini" basic pointing='left'>
                        {`${this.state.itemSelect.post_reply_count}`}
                        </Label>
                    </Button>  
                    
                  </Item.Extra>
                  
                </Item.Content>
              </Item>
            </Modal.Content>
            <Modal.Actions>
              <Button color='red' onClick={() => this.set_show_modal()}>
                NON
              </Button>
              <Button
                color='green'
                icon='delete'
                labelPosition='right'
                content="OUI"
                onClick={() => this.handleDelete(this.state.itemSelect)}
              />
            </Modal.Actions>
          </Modal>
            );
    }

    set_show_modal = (item) => {
        
        this.page.open = !this.page.open
      
        this.setState({ itemSelect: item})
        this.setState({ open: true })
        console.log(item)
        console.log(this.page.open)
        console.log(this.page.itemSelect)

        
      }

    renderPostSection() {

        const {params: {userId}, posts, users,user} = this.props;
        const {post} = this.props;
        const {activeUser} = this.props;
   
        const userList = Object.values(this.props.users)
        if (this.props.userposts !== null) {
        // const posts = JSON.stringify( this.props.userposts );
        const postList = Object.values(this.props.posts)
            .filter(post => post.user === Number(userId));
         console.log(userId)
        //Count les vote par post pour le tri
        const postList2 = postList.map(obj=> ({ ...obj, countVote: obj.post_votes.length }))
         console.log(this.props.userposts)
        //Tri par nombre de vote
        var byVote = postList2.slice(0);
        byVote.sort(function(b,a) {
          return a.countVote - b.countVote;
          });
        
        
        // console.log(byVote);
        if (postList.length !== 0) return (
            <TouchableWithoutFeedback>
            <View>
              <FlatList
              data={ postList }       
              ItemSeparatorComponent = {this.FlatListItemSeparator}
              
              renderItem={({item}) =>
              
              <View style={{flex:1, flexDirection: 'row', padding : 5 ,
                 borderColor: 'white', borderWidth: 4 }}>
                 <div >
                 {this.props.activeUser !== null && this.props.activeUser.id===this.props.user.id?<Button icon size='mini' floated='left'  onClick={() => this.set_show_modal(item)}>
                            <Icon inverted color='red' name='delete' />
                                            
                </Button>:null}
                 </div>
                <Item.Group divided>
                  <Item >
                    <Item.Image size='tiny' src={(item.image !== null)?`${settings.API_ROOT}${item.image}`: require('../../images/post_no_image.png')} />
                        
                    <Item.Content verticalAlign ='middle'>
                     
                       <Item.Header as='h2' onClick={() => hashHistory.push(`/profile/${item.user}/posts/${item.id}`)} >{item.title} </Item.Header>
                   
                      <Item.Meta>
                        <span className='cinema'>Par : {getFullName(item.user, users)} </span>
                      </Item.Meta>
                      
                      <Item.Extra>
                        
                        <Label icon='globe' size='small' content={moment(item.created_date).format('YYYY-MM-DD hh:mm')} />
                        <Label icon='calendar alternate outline' size='small' content={moment(item.date_debut).format('YYYY-MM-DD hh:mm')} />
                      </Item.Extra>
                      <Item.Extra>
                        {(this.usersVoteValue(item.id) === 1)? <Icon color='green' name='arrow up' onClick={() => this.handleUpArrowClick(item.id)}/> :<Icon color='grey' name='arrow up' onClick={() => this.handleUpArrowClick(item.id)}/>}
                        <a>{this.getVoteTally(item.id)} </a>
                        {(this.usersVoteValue(item.id) === -1)? <Icon color='red' name='arrow down' onClick={() => this.handleDownArrowClick(item.id)}/> :<Icon color='grey' name='arrow down' onClick={() => this.handleDownArrowClick(item.id)}/>}
                      <Button size="mini" as='div' labelPosition='right'>
                            <Button icon>
                              <Icon name='comments' />
                              
                            </Button>
                            <Label size="mini" basic pointing='left'>
                            {`${item.post_reply_count}`}
                            </Label>
                        </Button>  
                        
                      </Item.Extra>
                      
                    </Item.Content>
                  </Item>
                </Item.Group>        
              
                </View>
               
                             } 
              keyExtractor={(item, index) => index.toString()}
              />{this.renderModalWarning()}
            </View></TouchableWithoutFeedback>
            
           );
        } 
    
    // if (postList.length === 0) return null;
    return null;
}    

    render() {
        const {params: {userId}, posts, users, user} = this.props;
        const {post} = this.props;
        const {activeUser} = this.props;
        const namePost = getFirstName(Number(userId), users) + ' post(s)'
        return (
            <div >
                <View >
      
        <Menu inverted style = {{ borderRadius: 5,backgroundColor: COLOR.POST }} attached='top'>

        {this.props.activeUser !== null && this.props.activeUser.id===this.props.user.id?<Icon link size='big' inverted color= 'olive' name='add square' style ={{  marginLeft: + 3 ,marginTop: + 10 ,width:45 , height : 45, borderWidth: 4, borderColor: COLOR.POST }}  onClick={() =>hashHistory.push(`/profile/${user.id}/createpost`)} />:null}

              <Label style = {{ marginTop : 5 ,borderRadius: 5,backgroundColor: COLOR.POST }} as='h2' size='huge'><Icon name='copy'/>{namePost}</Label>
              <Menu.Menu position='right'>

              <Menu.Item>
                 <Input className='icon' icon='search' placeholder='Search...' />
              </Menu.Item>
              <Icon link size='large'  color= 'red' circular name='close' style ={{  marginLeft: + 3 ,marginTop: + 8 ,width:45 , height : 45, borderWidth: 4, borderColor: COLOR.POST }}  onClick={() =>hashHistory.push(`/profile/${user.id}`)} />
                
              </Menu.Menu>
            </Menu>  
                    
      </View>
                <View style={{
                            
                            height: 700,
                            // width: 450,
                            borderRightColor:  COLOR.POST,
                            borderRightWidth: 4,
                            borderLeftColor:  COLOR.POST,
                            borderLeftWidth: 4,
                            borderTopColor:  COLOR.POST,
                            borderTopWidth: 12,
                            
                            borderRadius: 15,
                            // position: 'absolute', 
                            marginTop: 10, 
                            //marginRight: 0,
                            borderBottomColor:  COLOR.POST,
                            borderBottomWidth: 40,
                            //justifyContent: 'center',
                            alignItems: 'stretch',
                        }} >
            <ScrollView style={[Styles.container, { padding: 0 }]}>            
             {this.renderPostSection()}
                                          
            </ScrollView></View>

            
            </div>
        );
    }

}


export default connect(

    (state,props) => ({
            state: state.authenticate,
            userposts_status : state.list_post,
            userposts : state.list_post.postList,
            activeUser: state.activeUser,
            users: state.users.data,
            posts: state.posts.data,
            postVotes: state.postVotes.data,
            user: state.users.data[props.params.userId],
            
}),
dispatch => ({
            
            actionsposts: bindActionCreators(postActions, dispatch),
            createvotes: bindActionCreators(voteCreate, dispatch),
            deletevotes: bindActionCreators(voteDelete, dispatch),
            editvotes: bindActionCreators(voteEdit, dispatch),
            postUserAction : bindActionCreators(postUserAction, dispatch),
            actionDeletePost : bindActionCreators(deletePostAction, dispatch)
            })
            )(PostList);
