import React, { Component } from 'react';
import { Animated, View, Image, StyleSheet, PanResponder, Text } from 'react-native';
import { DefaultTheme, Appbar, Title, Badge, Button as ButPaper } from 'react-native-paper';
// import { Avatar } from 'react-native-elements';

import Styles, { COLOR } from "../../config/styles";
import { bindActionCreators } from "redux";
import * as authActions from "../../actions/authenticate";
import * as postActions from "../../actions/posts";
import { Input, Card, Icon , Button as ButNew, Grid,Image as ImgNew, Label, Header, Modal, Statistic, Menu, Dropdown} from 'semantic-ui-react'
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
    const pasRandomLogo = require('../../images/POSTS_PETIT.png')
    return (
      <View style={styles.container}>
      
     

            <Menu inverted style = {{ backgroundColor: COLOR.POST }} attached='top'>
              <Icon link size='large' inverted bordered circular  name='copy' style ={{  marginLeft: + 3 ,marginTop: + 6 ,width:45 , height : 45  }} />
              
              

              
              <Menu.Menu position='right'>
              <Menu.Item>
                 <Input className='icon' icon='search' placeholder='Search...' />
              </Menu.Item>
                
                <Image
                                      source={pasRandomLogo}
                                      style={{ width: 121, height: 60 }}
                                      onClick={() => hashHistory.push('/')}
                                    />
                {!this.props.userposts_status.showDetailview&&this.props.userposts_status.postDetail !== null? <Icon link size='large' inverted color= 'olive' circular  name='arrow circle down' style ={{  marginLeft: + 3 ,marginTop: + 6 ,width:45 , height : 45  }} onClick={() =>{ this.showPostdetail()}} />: null }                    
                {this.props.userposts_status.showDetailview? <Icon link size='large' inverted color= 'olive' circular  name='arrow circle right' style ={{  marginLeft: + 3 ,marginTop: + 6 ,width:45 , height : 45  }} onClick={() =>{ this.showPostdetail()}} />: null }                    
              </Menu.Menu>
            </Menu>  
                    
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

