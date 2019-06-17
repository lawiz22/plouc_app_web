import React, { Component } from 'react';
import { Animated, View, Image, StyleSheet, PanResponder, Text } from 'react-native';
import { DefaultTheme, Appbar, Title, Badge, Button as ButPaper } from 'react-native-paper';
// import { Avatar } from 'react-native-elements';

import Styles, { COLOR } from "../../config/styles";
import { bindActionCreators } from "redux";
import * as authActions from "../../actions/authenticate";
import * as postActions from "../../actions/posts";

import { connect } from "react-redux";

import {hashHistory} from 'react-router'




class HeaderPostAll extends Component {
  constructor(props) {
    super(props);
    
  }

  componentDidMount() {
  
     this.page.showDetailview = this.props.userposts_status.showDetailview
     this.page.shotPostFront = this.props.userposts_status.shotPostFront

}
  showPostfront = () => {
        
    this.page.shotPostFront = !this.page.shotPostFront
    
    this.props.posts.show_post_front(this.page.shotPostFront)
  }

  showPostdetail = () => {
        
    this.page.showDetailview = !this.props.userposts_status.showDetailview
    
    this.props.posts.show_post_detail(this.page.showDetailview)
  }
  
  

  page = {
    // shotPostFront: true,
    
    
  };

  render() {
    const {activeUser} = this.props;
    return (
      <View style={styles.container}>
      
      <Appbar.Header theme={{ colors: { primary: COLOR.POST }}} >
               
               
               <Appbar.Action icon="content-copy" />
            
                <Appbar.Content
                title="POSTS"
                subtitle=""
                style ={{ alignItems: 'center' }} 
                />
                <Appbar.Action icon="search"  />
                {this.props.activeUser? <Appbar.Action icon="face" />: null }
                {!this.props.userposts_status.showDetailview&&this.props.userposts_status.postDetail !== null? <Appbar.Action icon="arrow-downward" onPress={() =>{ this.showPostdetail()}} />: null }
                {this.props.userposts_status.showDetailview? <Appbar.Action icon="arrow-forward"  onPress={() =>{ this.showPostdetail()}} /> : null }
                               
                
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
    paddingBottom: 20,
    borderRadius: 25,
 
    // borderBottomColor:  COLOR.HOME,
    // borderBottomWidth: 40,
    
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
                
             }),
    dispatch => ({
                actions: bindActionCreators(authActions, dispatch),
                posts: bindActionCreators(postActions, dispatch),
                
                })
)(HeaderPostAll);

