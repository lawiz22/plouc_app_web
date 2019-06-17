import React, { Component } from 'react';
import { Animated, View, Image, StyleSheet, PanResponder, Text } from 'react-native';
import { DefaultTheme, Appbar, Title, Badge, Button as ButPaper } from 'react-native-paper';
// import { Avatar } from 'react-native-elements';

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
    return (
      <View style={styles.container}>
      
      <Appbar.Header theme={{ colors: { primary: COLOR.ARTIST }}} >
               
               {this.props.activeUser? <Appbar.Action icon="edit" />: null }
               
            
                <Appbar.Content
                title={this.props.userartists_status.artistDetail.artist}
                subtitle=""
                style ={{ alignItems: 'center' }} 
                />
                <Appbar.Action icon="clear" onPress={() =>{ this.showArtistdetail()}} /> 
                               
                
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
                userartists_status : state.list_artist,
                userartists : state.list_artist.artistList,
                
             }),
    dispatch => ({
                actions: bindActionCreators(authActions, dispatch),
                artists: bindActionCreators(artistActions, dispatch),
                
                })
)(HeaderArtistDetail);

