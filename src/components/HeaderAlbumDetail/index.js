import React, { Component } from 'react';
import { Animated, View, Image, StyleSheet, PanResponder, Text } from 'react-native';
import { DefaultTheme, Appbar, Title, Badge, Button as ButPaper } from 'react-native-paper';
// import { Avatar } from 'react-native-elements';
import { Input, Card, Icon , Button as ButNew, Grid,Image as ImgNew, Label, Header, Modal, Statistic, Menu, Dropdown} from 'semantic-ui-react'

import Styles, { COLOR } from "../../config/styles";
import { bindActionCreators } from "redux";
import * as authActions from "../../actions/authenticate";
import * as albumActions from "../../actions/albums";

import { connect } from "react-redux";

import {hashHistory} from 'react-router'




class HeaderAlbumDetail extends Component {
  constructor(props) {
    super(props);
    this.page = {
        
     
      albumListview: this.props.useralbums_status.albumListview
      
    };
  }
  
  componentDidMount() {
  
    this.page.showDetailview = this.props.useralbums_status.showDetailview

  }
  showAlbumfront = () => {
        
    this.page.shotAlbumFront = !this.page.shotAlbumFront
    
    this.props.albums.show_album_front(this.page.shotAlbumFront)
  }

  set_albumListview = () => {
        
    this.page.albumListview = !this.page.albumListview
    
    this.props.albums.set_album_list(this.page.albumListview)
  }
  
  showAlbumdetail = () => {
        
    this.page.showDetailview = !this.props.useralbums_status.showDetailview
    
    this.props.albums.show_album_detail(this.page.showDetailview)
  }

  page = {
    shotAlbumFront: true,
    
    
  };

  render() {
    const {activeUser} = this.props;
    const pasRandomLogo = require('../../images/ALBUMS_PETIT_1.png')
    return (
      <View style={styles.container}>
      
      

            <Menu inverted style = {{ backgroundColor: COLOR.ALBUM }} attached='top'>
              
            <Label  style = {{ width : 60, color : 'white', marginTop : 5 ,borderRadius: 5,backgroundColor: COLOR.ALBUM }} as='h2' size='huge'><Icon name='outdent'/> </Label>
              <Image
                                      source={pasRandomLogo}
                                      style={{ width: 179, height: 60 }}
                                      onClick={() => hashHistory.push('/')}
                                    />

              
              <Menu.Menu position='right'>
              
              <Icon link size='large'  color= 'red' circular name='close' style ={{  marginLeft: + 3 ,marginTop: + 8 ,width:45 , height : 45, borderWidth: 4, borderColor: COLOR.POST }}  onClick={() =>{ this.showAlbumdetail()}} />
                                  
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
                useralbums_status : state.list_album,
                useralbums : state.list_album.albumList,
                
             }),
    dispatch => ({
                actions: bindActionCreators(authActions, dispatch),
                albums: bindActionCreators(albumActions, dispatch),
                
                })
)(HeaderAlbumDetail);

