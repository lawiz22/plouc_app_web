import React, { Component } from 'react';
import { Animated, View, Image, StyleSheet, PanResponder, Text } from 'react-native';
import { DefaultTheme, Appbar, Title, Badge, Button as ButPaper } from 'react-native-paper';
// import { Avatar } from 'react-native-elements';

import Styles, { COLOR } from "../../config/styles";
import { bindActionCreators } from "redux";
import * as authActions from "../../actions/authenticate";
import * as artistActions from "../../actions/artists";
import { Input, Card, Icon , Button as ButNew, Grid,Image as ImgNew, Label, Header, Modal, Statistic, Menu, Dropdown} from 'semantic-ui-react'

import { connect } from "react-redux";

import {hashHistory} from 'react-router'




class HeaderArtistAll extends Component {
  constructor(props) {
    super(props);
    
  }

  componentDidMount() {
  
    this.page.showArtistDetailview = this.props.userartists_status.showArtistDetailview
    

}

  showArtistfront = () => {
        
    this.page.shotArtistFront = !this.page.shotArtistFront
    
    this.props.artists.show_artist_front(this.page.shotArtistFront)
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
              <Icon link size='large' inverted bordered circular  name='users' style ={{  marginLeft: + 3 ,marginTop: + 6 ,width:45 , height : 45  }} />
              
              

              
              <Menu.Menu position='right'>
              <Menu.Item>
                 <Input className='icon' icon='search' placeholder='Search...' />
              </Menu.Item>
                
                <Image
                                      source={pasRandomLogo}
                                      style={{ width: 211, height: 60 }}
                                      onClick={() => hashHistory.push('/')}
                                    />
                {!this.props.userartists_status.showArtistDetailview&&this.props.userartists_status.artistDetail !== null? <Icon link size='large' inverted color= 'teal' circular  name='arrow circle down' style ={{  marginLeft: + 3 ,marginTop: + 6 ,width:45 , height : 45  }} onClick={() =>{ this.showArtistdetail()}} />: null }                    
                {this.props.userartists_status.showArtistDetailview? <Icon link size='large' inverted color= 'teal' circular  name='arrow circle right' style ={{  marginLeft: + 3 ,marginTop: + 6 ,width:45 , height : 45  }} onClick={() =>{ this.showArtistdetail()}} />: null }                    
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
)(HeaderArtistAll);

