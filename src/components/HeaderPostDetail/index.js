import React, { Component } from 'react';
import { Animated, View, Image, StyleSheet, PanResponder, Text } from 'react-native';
import { DefaultTheme, Appbar, Title, Badge, Button as ButPaper } from 'react-native-paper';
import { Input, Card, Icon , Button as ButNew, Grid,Image as ImgNew, Label, Header, Modal, Statistic, Menu, Dropdown} from 'semantic-ui-react'
// import { Avatar } from 'react-native-elements';

import Styles, { COLOR } from "../../config/styles";
import { bindActionCreators } from "redux";
import * as authActions from "../../actions/authenticate";
import * as postActions from "../../actions/posts";

import { connect } from "react-redux";

import {hashHistory} from 'react-router'




class HeaderPostDetail extends Component {
  constructor(props) {
    super(props);
    this.page = {
        
     
      postListview: this.props.userposts_status.postListview
      
    };
  }
  
  componentDidMount() {
  
    this.page.showDetailview = this.props.userposts_status.showDetailview

  }
  showPostfront = () => {
        
    this.page.shotPostFront = !this.page.shotPostFront
    
    this.props.posts.show_post_front(this.page.shotPostFront)
  }

  set_postListview = () => {
        
    this.page.postListview = !this.page.postListview
    
    this.props.posts.set_post_list(this.page.postListview)
  }
  
  showPostdetail = () => {
        
    this.page.showDetailview = !this.props.userposts_status.showDetailview
    
    this.props.posts.show_post_detail(this.page.showDetailview)
  }

  page = {
    shotPostFront: true,
    
    
  };

  render() {
    const {activeUser} = this.props;
    const pasRandomLogo = require('../../images/POSTS_PETIT.png')
    return (
      <View style={styles.container}>
      
      
            <Menu inverted style = {{ backgroundColor: COLOR.POST }} attached='top'>
              
            <Label style = {{ marginTop : 5 ,borderRadius: 5,backgroundColor: COLOR.POST }} as='h2' size='huge'><Icon name='copy'/> </Label>
              

              
              <Menu.Menu position='right'>
              <Image
                                      source={pasRandomLogo}
                                      style={{ width: 121, height: 60 }}
                                      
                                    />
              <Icon link size='large'  color= 'red' circular name='close' style ={{  marginLeft: + 3 ,marginTop: + 8 ,width:45 , height : 45, borderWidth: 4, borderColor: COLOR.POST }}  onClick={() =>{ this.showPostdetail()}} />
                                  
              </Menu.Menu>
            </Menu>       
                    
      </View> 
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: 600,
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
)(HeaderPostDetail);

