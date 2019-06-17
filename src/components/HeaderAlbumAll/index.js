import React, { Component } from 'react';
import { Animated, View, Image, StyleSheet, PanResponder, Text } from 'react-native';
import { DefaultTheme, Appbar, Title, Badge, Button as ButPaper } from 'react-native-paper';
// import { Avatar } from 'react-native-elements';

import Styles, { COLOR } from "../../config/styles";
import { bindActionCreators } from "redux";
import * as authActions from "../../actions/authenticate";
import * as albumActions from "../../actions/albums";

import { connect } from "react-redux";

import {hashHistory} from 'react-router'




class HeaderAlbumAll extends Component {
  constructor(props) {
    super(props);
    
  }
  componentDidMount() {
  
    this.page.showDetailview = this.props.useralbums_status.showDetailview

  }
  showAlbumfront = () => {
        
    this.page.shotAlbumFront = !this.page.shotAlbumFront
    
    this.props.albums.show_album_front(this.page.shotAlbumFront)
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
    return (
      <View style={styles.container}>
      
      <Appbar.Header theme={{ colors: { primary: COLOR.ALBUM }}} >
               
               
               <Appbar.Action icon="library-music" />
            
                <Appbar.Content
                title="ALBUMS"
                subtitle=""
                style ={{ alignItems: 'center' }} 
                />                
                <Appbar.Action icon="search"  />
                {this.props.activeUser? <Appbar.Action icon="face" />: null }
                {!this.props.useralbums_status.showDetailview&&this.props.useralbums_status.albumDetail !== null? <Appbar.Action icon="arrow-downward" onPress={() =>{ this.showAlbumdetail()}} />: null }
                {this.props.useralbums_status.showDetailview? <Appbar.Action icon="arrow-forward"  onPress={() =>{ this.showAlbumdetail()}} /> : null }
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
                useralbums_status : state.list_album,
                useralbums : state.list_album.albumList,
                
             }),
    dispatch => ({
                actions: bindActionCreators(authActions, dispatch),
                albums: bindActionCreators(albumActions, dispatch),
                
                })
)(HeaderAlbumAll);

