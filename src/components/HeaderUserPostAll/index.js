import React, { Component } from 'react';
import { Animated, View, Image, StyleSheet, PanResponder, Text } from 'react-native';
import { DefaultTheme, Appbar, Title, Badge, Button as ButPaper } from 'react-native-paper';
// import { Avatar } from 'react-native-elements';

import Styles, { COLOR } from "../../config/styles";
import { bindActionCreators } from "redux";
import * as authActions from "../../actions/authenticate";
import * as postActions from "../../actions/posts";
import * as postUserAction from '../../actions/posts/post/list';
import {getFullName} from '../../utils/user';

import { connect } from "react-redux";

import {hashHistory} from 'react-router'




class HeaderUserPostAll extends Component {
  constructor() {
    super();
    
  }

  componentDidMount() {
    const { params: {userId}} = this.props;
     

}
  showPostfront = () => {
        
   
  }

  showPostdetail = () => {
        
    
  }
  
  

  page = {
    // shotPostFront: true,
    
    
  };

  render() {
    const {activeUser} = this.props;
    const {params: userId, posts, users} = this.props;
    if (userId === null) return null;
    console.log('PATATE')
    return (
      <View style={styles.container}>
      
      <Appbar.Header theme={{ colors: { primary: COLOR.POST }}} >
               
               
               <Appbar.Action icon="content-copy" />
            
                <Appbar.Content
                title={getFullName(Number(userId), users)}
                subtitle=""
                style ={{ alignItems: 'center' }} 
                />
                <Appbar.Action icon="search"  />
                {this.props.activeUser? <Appbar.Action icon="face" />: null }
                
                
                               
                
            </Appbar.Header>  
                    
      </View> 
    );
  }
}

const styles = StyleSheet.create({
  container: {
     //flex: 1,
     //flexDirection: 'row',
     //alignItems: 'stretch',
     //justifyContent: 'center',
    // alignItems: 'stretch',
    //justifyContent: 'center',
    // paddingTop: 20,
    //paddingBottom: 20,
    //borderRadius: 25,
 
    //borderColor:  COLOR.HOME,
     //borderWidth: 4,
    
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
                userposts_status : state.list_post,
                userposts : state.list_post.postList,
                users: state.users.data,
                
             }),
    dispatch => ({
                actions: bindActionCreators(authActions, dispatch),
                posts: bindActionCreators(postActions, dispatch),
                postUserAction : bindActionCreators(postUserAction, dispatch),
                })
)(HeaderUserPostAll);

