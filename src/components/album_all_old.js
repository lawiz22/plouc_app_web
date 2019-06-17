import React, { Component } from 'react';
import { Animated, View, Image, StyleSheet, PanResponder, Text, ScrollView, FlatList } from 'react-native';
import { DefaultTheme, Appbar, Title, Badge, Button as ButPaper } from 'react-native-paper';
// import { Avatar } from 'react-native-elements';

import Styles, { COLOR } from "../config/styles";
import { bindActionCreators } from "redux";
import * as authActions from "../actions/authenticate";
import * as postActions from "../actions/posts";
import * as albumActions from "../actions/albums";
import AlbumPreviewCard from "../components/album/AlbumPreviewCard";
// import * as postActions from "../actions/posts";
import { connect } from "react-redux";

import {hashHistory} from 'react-router'
import HeaderAlbumAll from '../components/HeaderAlbumAll'

class AlbumAll extends Component {

  componentDidMount() {
    // console.log(this.props.state.authSession.data.id)
    // const post = this.props.posts.get_user_post();
     // console.log(this.props.state.authSession.data.id);
     // this.props.state.isAuth
     this.props.albums.get_album_list()
     
     //   : 
    setTimeout(() => {
        
    }, 2000);
}


  
      FlatListItemSeparator = () => {
        return (
          <View
            style={{
              height: .5,
              width: "100%",
              // backgroundColor: "#000",
            }}
          />
        );
      }

      renderAlbumSection() {
            // console.log(this.props.useralbums)
            if (this.props.useralbums !== null) {
            const albumList = Object.values(this.props.useralbums)
            // console.log(albumList)
            if (albumList.length !== 0) return (
                <FlatList
                contentContainerStyle={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'space-evenly',
                // alignItems: 'center',
                height: '100%',
                width: '100%'
                }}
                numColumns={3}
                data={albumList}
                renderItem={({ item }) => (
                <View
                    style={{
                    marginTop: 10,
                    width: '36%'
                    
                    }}
                >
                    <AlbumPreviewCard name={item.album_title} imageUrl={ `${settings.API_ROOT}${item.album_logo}`  } />
                </View>
                )}
                keyExtractor={item => item.id.toString()}
                // ListHeaderComponent={this._renderHeader}
                //ListFooterComponent={this._renderFooter}
                // onRefresh={this._handleRefresh}
                // refreshing={this.state.refreshing}
                // onEndReached={this._handleLoadMore}
                // onEndReachedThreshold={0.5}
                // initialNumToRender={10}
            />
               );
            } 
        
        // if (postList.length === 0) return null;
        return null;
    }
  

  render() {
    const {activeUser} = this.props;
    return (
      
     
      <div className="ArtistAll">
    
     <HeaderAlbumAll></HeaderAlbumAll>
                        
      <View style={{
                            
                            //height: 775,
                            width: 350,
                            borderRightColor:  COLOR.ALBUM,
                            borderRightWidth: 4,
                            borderLeftColor:  COLOR.ALBUM,
                            borderLeftWidth: 4,
                            borderTopColor:  COLOR.ALBUM,
                            borderTopWidth: 20,
                            borderRadius: 30,
                            // position: 'absolute', 
                            marginTop: -18, 
                            marginRight: 0,
                            borderBottomColor:  COLOR.ALBUM,
                            borderBottomWidth: 40,
                            // justifyContent: 'space-evenly',
                            // alignItems: 'flex-start',
                        }} >

            <ScrollView style={[Styles.container, { padding: 0 }]}>
            {this.renderAlbumSection()}
                
            </ScrollView>

                                                  
                        
      </View>
      </div>
      
 
    );
  }
}

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    //alignItems: 'flex-start',
    //width: 850,
    //justifyContent: 'center',
    //margeRight: 20,
    paddingBottom: 20,
    borderBottomColor:  COLOR.ALBUM,
    borderBottomWidth: 40,
  },
  image: {
    borderRadius: 50,
    borderWidth: 2,
    borderColor: COLOR.ALBUM,
    width: 100,
    height: 100,
  },
 
  imageView: {
   
      width: '100%',
      height: 80 ,
      margin: 7,
      borderRadius : 10
   
  },
   
  textView: {
   
      // width:'30%', 
      // textAlignVertical:'center',
      padding:5,
      color: '#000'
   
  }
  

});


export default connect(
  state => ({ state: state.authenticate,
              
              useralbums : state.list_album.albumList
           }),
  dispatch => ({
              actions: bindActionCreators(authActions, dispatch),
              albums: bindActionCreators(albumActions, dispatch),
              
              })
)(AlbumAll);


