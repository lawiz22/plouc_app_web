import React, { Component } from 'react';
import { Animated, View, Image, StyleSheet, PanResponder, Text } from 'react-native';
import { DefaultTheme, Appbar, Title, Badge, Button as ButPaper } from 'react-native-paper';
// import { Avatar } from 'react-native-elements';
import { Input, Card, Icon , Button as ButNew, Grid,Image as ImgNew, Label, Header, Modal, Statistic, Menu, Dropdown} from 'semantic-ui-react'

import Styles, { COLOR } from "../../config/styles";
import { bindActionCreators } from "redux";
import * as authActions from "../../actions/authenticate";
import * as artistActions from "../../actions/artists";

import { connect } from "react-redux";

import {hashHistory} from 'react-router'




class HeaderArtistDetail extends Component {
  constructor(props) {
    super(props);
    this.page = {
        
     
      artistListview: this.props.userartists_status.artistListview
      
    };
  }
  
  componentDidMount() {
  
    this.page.showArtistDetailview = this.props.userartists_status.showArtistDetailview

  }
  showArtistfront = () => {
        
    this.page.shotArtistFront = !this.page.shotArtistFront
    
    this.props.artists.show_artist_front(this.page.shotArtistFront)
  }

  set_artistListview = () => {
        
    this.page.artistListview = !this.page.artistListview
    
    this.props.artists.set_artist_list(this.page.artistListview)
  }
  
  showArtistdetail = () => {
        
    this.page.showArtistDetailview = !this.props.userartists_status.showArtistDetailview
    
    this.props.artists.show_artist_detail(this.page.showArtistDetailview)
  }

  page = {
    shotArtistFront: true,
    
    
  };

  render() {
    const {activeUser} = this.props;
    const pasRandomLogo = require('../../images/ARTISTS_PETIT_5.png')
    return (
      <View style={styles.container}>
      
       
      <Menu inverted style = {{ backgroundColor: COLOR.ARTIST }} attached='top'>
              
            <Label  style = {{ width : 60, color : 'white', marginTop : 5 ,borderRadius: 5,backgroundColor: COLOR.ARTIST }} as='h2' size='huge'><Icon name='users'/> </Label>
              <Image
                                      source={pasRandomLogo}
                                      style={{ width: 211, height: 60 }}
                                      onClick={() => hashHistory.push('/')}
                                    />

              
              <Menu.Menu position='right'>
              
              <Icon link size='large'  color= 'red' circular name='close' style ={{  marginLeft: + 3 ,marginTop: + 8 ,width:45 , height : 45, borderWidth: 4, borderColor: COLOR.POST }}  onClick={() =>{ this.showArtistdetail()}} />
                                  
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
                userartists_status : state.list_artist,
                userartists : state.list_artist.artistList,
                
             }),
    dispatch => ({
                actions: bindActionCreators(authActions, dispatch),
                artists: bindActionCreators(artistActions, dispatch),
                
                })
)(HeaderArtistDetail);

