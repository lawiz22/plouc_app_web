import React, { Component } from 'react';
import { Dimensions, View, Image, StyleSheet, TouchableWithoutFeedback, Text, ScrollView, FlatList as FlatListSong } from 'react-native';
import { Avatar, Card, Paragraph, Badge, Appbar, Title, Button as ButPaper, List, IconButton} from 'react-native-paper';
// import { Avatar } from 'react-native-elements';

import Styles, { COLOR } from "../config/styles";
import { bindActionCreators } from "redux";
import * as authActions from "../actions/authenticate";
import * as songActions from "../actions/songs";
import * as albumActions from "../actions/albums";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import settings from '../config/settings';

import {getAlbumArtist, getAudioBuffer, getContext } from '../utils/user';




import {hashHistory} from 'react-router'
import HeaderSongDetail from '../components/HeaderSongDetail'
import {getFullName, getProfileImage} from '../utils/user';
import AlbumArt from '../components/player/AlbumArt';
import TrackDetails from '../components/player/TrackDetails';
import ReactPlayer from 'react-player';
import SeekBar from '../components/player/SeekBar';
import Controls from '../components/player/Controls';
import Waveform from '../lib';


class SongDetail extends Component {

  constructor(props) {
    super(props);
    this.page = {
        
      albumDetail: [
          {id: 0}
        ]
    };
    this.state = {
          url: null,
          pip: false,
          playing: false,
          controls: false,
          light: false,
          volume: 0.8,
          muted: false,
          played: 0,
          playedSeconds: 0,
          loaded: 0,
          duration: 0,
          playbackRate: 1.0,
          loop: false,
          paused: true,
          progress: 0,
          totalLength: 1,
          currentPosition: 0,
          buffer: null,
          context: null,
        }
  }

  componentWillMount() {
    
     
  }
  componentWillReceiveProps() {
    
  }
  componentDidMount() {
    //const buffer = this.props.player_state.audioBuffer
    //console.log(buffer)
    //this.setState({
    //  buffer
    // });
     
  }


_shouldUpdateProgressBar() {
  // Debounce progress bar update by 200 ms
  return Date.now() - this.lastSeek > 200;
}

getSongreply(songId) {

  this.props.actionssongs.getSong(songId)
}
  
  getVoteTally(songId) {
    const {songVotes} = this.props;
    
   
    
    //console.log(songId)
    //console.log(songVotes)

    // console.log(Object.values(songVotes).filter(songVote => songVote.song === usersongs.id))
    
    return Object.values(songVotes)
        .filter(songVote => songVote.song === songId)
        .reduce((acc, songVote) => acc + songVote.value, 0);
  }

  
  
     
      getVoteScoreStyling(songId) {
        if(this.usersVoteValue(songId) === -1) return 'down-voted';
        if(this.usersVoteValue(songId) === 1) return 'up-voted';
    }
      usersVote(songId) {
        const {activeUser,  songVotes} = this.props;
        if(!activeUser) return null;
        const vote = Object.values(songVotes)
            .filter(songVote => songVote.song === songId)
            .filter(songVote => songVote.user === activeUser.id);
        if(vote.length) return vote[0];
        return null;
    }

      usersVoteValue(songId) {
        const {activeUser, songVotes} = this.props;
        if(!activeUser) return null;
        const vote = Object.values(songVotes)
            .filter(songVote => songVote.song === songId)
            .filter(songVote => songVote.user === activeUser.id);
        if(vote.filter(songVote => songVote.value === -1).length) return -1;
        if(vote.filter(songVote => songVote.value === 1).length) return 1;
        return null;
      }

      set_songDetail = (item) => {
        
        console.log(item)
        this.props.actionssongs.store_song_detail(item)
        this.set_songListview()

      }
      set_albumDetail = (item) => {
        
        console.log(item)
        this.props.albums.store_album_detail(item)

        this.props.albums.getAlbum(item.id)
        this.props.albums.getAlbum_song_list(item.id)
        // this.props.songs.getSongList(item.id)
        if (this.page.albumDetail.id == item.id){
           this.page.albumDetail.id = 0
           if (this.page.showDetailview){
           this.showAlbumdetail(item)}
          }
           
         else
           {
            this.page.albumDetail.id = item.id
            if (!this.page.showDetailview){
              this.showAlbumdetail(item)}else {
                
             }
            }   

      }

      showAlbumdetail = (item) => {
        
        
        this.page.showDetailview = !this.props.useralbums_status.showDetailview
        
        this.props.albums.show_album_detail(this.page.showDetailview)
      }
      set_songListview = () => {
        
        this.page.songListview = !this.page.songListview
        
        this.props.actionssongs.set_song_list(this.page.songListview)
      }
    
      votesongDetail = () => {
        return (
          <View
            style={{
             
              //width: "100%",
              top: -50,
              left: -40,
              width: 45,
              paddingLeft: -10,

              // backgroundColor: "#777",
            }}
          >
                <div className="votes">
                <a className="up-arrow" >
                {(this.usersVoteValue(this.props.usersongs_status.songDetail.id) === 1)? <IconButton
                                                      icon="arrow-upward"
                                                      color={COLOR.SONG}
                                                      size={20}
                                                      onPress={() => console.log('Pressed')}
                                                    /> : 
                                                      <IconButton
                                                      icon="arrow-upward"
                                                      color={COLOR.GRAY}
                                                      size={20}
                                                      onPress={() => console.log('Pressed')}
                                                    />  }
                </a>
                <div className={`score `}>
                    
                    <Text size={20} style={{ position: 'absolute', top: 33, left: 23, fontWeight: 'bold' }}> {this.getVoteTally(this.props.usersongs_status.songDetail.id)} </Text>
                </div>
                <a className="down-arrow" >
                {(this.usersVoteValue(this.props.usersongs_status.songDetail.id) === -1)? <IconButton
                                                      icon="arrow-downward"
                                                      color={COLOR.SONG}
                                                      size={20}
                                                      onPress={() => console.log('Pressed')}
                                                    /> : 
                                                      <IconButton
                                                      icon="arrow-downward"
                                                      color={COLOR.GRAY}
                                                      size={20}
                                                      onPress={() => console.log('Pressed')}
                                                    />  }   
                </a>
                </div>
         </View>
        );
      }

     
      renderSongReplySection(songId) {
        const {users} = this.props;
        if (this.props.songReplies !== null) {
        
        const songReply = Object.values(this.props.songReplies)
           .filter(songReply => songReply.song === songId)
       
        if (songReply.length !== 0) return (
          
            <View>
              <FlatListSong
              data={ songReply }       
              ItemSeparatorComponent = {this.FlatListItemSeparator}
              
              renderItem={({item}) =>
              <TouchableWithoutFeedback onPress={ () => console.log("Press reply")}>        
                <View style={{flex:1, flexDirection: 'row',
                 borderColor:'white', borderWidth: 4 }}>
                
                    <Image source = {{ uri: `${settings.API_ROOT}${getProfileImage(item.user, users)}` }} style={styles.imageViewReply}  />
                    <View style={{flex:1, flexDirection: 'column'}}>
                      <Text style={styles.textView} >{item.body}</Text>
                      <Text>{' '}</Text>
                      
                      <Text style={styles.textView2}> {getFullName(item.user, users)}</Text>
                      <Text style={styles.textView2}> {item.modified_date} </Text>
                    </View>
                  </View>
                  </TouchableWithoutFeedback>
                             }
              keyExtractor={(item, index) => index.toString()}
              />
            </View>
            
           );
        } 
    
    // if (songList.length === 0) return null;
    return null;
}     
        
  donneMoileNbdAlbumMonEsti() {
      const {usersongs_status} = this.props;
      
      if(!usersongs_status.songAlbumsDetail) return null;
      const goEsti = Object.values(usersongs_status.songAlbumsDetail)
      return goEsti.length;
         
  }

  onPlay = () => {
    console.log('onPlay')
    this.setState({ playing: true })
  }

  onEnded = () => {
    console.log('onEnded')
    this.setState({ playing: this.state.loop })
  }

  onProgress = state => {
    console.log('onProgress', state)
    // We only want to update time slider if we are not currently seeking
    if (!this.state.seeking) {
      this.setState(state)
    }
  }

  playPause = () => {
    this.setState({ playing: !this.state.playing })
  }
  onSeekMouseDown = e => {
    this.setState({ seeking: true })
  }
  onSeekChange = e => {
    this.setState({ played: parseFloat(e.target.value) })
  }
  onSeekMouseUp = e => {
    this.setState({ seeking: false })
    this.player.seekTo(parseFloat(e.target.value))
  }
  ref = player => {
    this.player = player
  }

  onPause = () => {
    console.log('onPause')
    this.setState({ playing: false })
  }
  onDuration = (duration) => {
    console.log('onDuration', duration)
    this.setState({ totalLength: Math.floor(duration) });
    this.setState({ duration })
    console.log('totalLength', this.state.totalLength)
  }

  getFile = async (path = `${settings.API_ROOT}${this.props.usersongs_status.songDetail.audio_file}`) => {
    const buffer = await getAudioBuffer(path, this.state.context);
    console.log ( buffer )
    console.log (this.state.context)
    this.setState({ buffer });
  };

  seek(time) {
    
    //time = Math.floor(time);

    this.player.seekTo(time, () => {
        this.setState({
          currentPosition: time,
        
      });
      
    });
    this.setState({
      currentPosition: time,
     
    });
    this.setState({ seeking: false })
  }

  renderWaveform = () => {
    const { url, playing, controls, light, volume, muted, loop, played, playedSeconds, loaded, duration, playbackRate, pip } = this.state
    
    return (
         <View style={{  marginTop: 8 , padding : 2, marginLeft : +18}} >
                             
                                  <Waveform
                                    // Audio buffer
                                    buffer={this.props.player_state.audioBuffer}
                                    // waveform height
                                    height={65}
                                    animate= {false}
                                    markerStyle={{
                                      // Position marker color
                                      color: COLOR.SONG,
                                      // Position marker width (in pixels)
                                      width: 3
                                    }}
                                    // Optionally handle user manually changing position (0 - 1)
                                    onPositionChange={pos => console.log(pos)}
                                    // Wave plot type (line or bar)
                                    plot='line'
                                    // Marker position on waveform (0 - 1)
                                    position={played}
                                    // redraw waveform on window size change (default: true)
                                    responsive={false}
                                    // Show position marker
                                    showPosition={true}
                                    waveStyle={{
                                      // animate waveform on draw (default: true)
                                      animate: false,
                                      // waveform color
                                      color: COLOR.POST,
                                      plot: 'line',
                                      // width of each rendered point (min: 1, max: 10)
                                      pointWidth: 3
                                    }}
                                    // waveform width
                                    width={315}
                                    
                                  />
                                  {this.props.player_state.requestingAudioBuffer? <Image 
                                      style={{ borderRadius: 100 ,backgroundColor: '#333' , opacity : 0.8, position:'absolute', left : + 127 ,top: + 2, padding : 2, height: 60, width : 60, tintColor : COLOR.ALBUM }}
                                      source={require('../images/live.svg')}> 
                                  </Image>  : null}
                                  
                                    </View>
      );
    }

  render() {
    const {activeUser} = this.props;
    const {albums} = this.props;
    const { url, playing, controls, light, volume, muted, loop, played, playedSeconds, loaded, duration, playbackRate, pip } = this.state
    
    return (
      
      <div className="SongAll">
    
       <HeaderSongDetail>

       </HeaderSongDetail>
    
                        
      <View style={{
                            
                            height: 675,
                            //width: 850,
                            borderRightColor:  COLOR.SONG,
                            borderRightWidth: 4,
                            borderLeftColor:  COLOR.SONG,
                            borderLeftWidth: 4,
                            borderTopColor:  COLOR.SONG,
                            borderTopWidth: 20,
                            borderRadius: 25,
                            // position: 'absolute', 
                            marginTop: -18, 
                            //marginRight: 0,
                            borderBottomColor:  COLOR.SONG,
                            borderBottomWidth: 40,
                            justifyContent: 'center',
                            alignItems: 'flex-start', backgroundColor: 'rgb(4,4,4)'
                        }} >
                  
                  <ScrollView style={ { padding: 5 }}>
                        <View style={styles.container} >
                              <Image source = {{ uri: `${settings.API_ROOT}${this.props.usersongs_status.songDetail.song_image}`}} style={styles.image}  />          
                              <TrackDetails title={ this.props.usersongs_status.songDetail.song_title } artist={ getAlbumArtist(this.props.usersongs_status.songDetail.album, albums) } />
                              
                               <SeekBar
                                
                                onSeek={this.seek.bind(this)}
                                
                                trackLength={ this.state.totalLength } 
                                onSlidingStart={() => this.setState({ seeking: true })}
                                currentPosition={playedSeconds}
                                
                                />
                               <Controls  
                                    onPressPlay={() => {this.playPause()}}
                                    onPressPause={() =>{this.playPause()}}
                                    paused={playing}  
                                />
                               {this.props.player_state.showWaveform? this.renderWaveform() : null }
                               <ReactPlayer
                                    ref={this.ref} 
                                    url={`${settings.API_ROOT}${(this.props.usersongs_status.songDetail != null)?this.props.usersongs_status.songDetail.audio_file:'/media/Bombe_au_clock.mp3'}`} 
                                    playing={playing} 
                                    controls={controls} 
                                    className='react-player'
                                    height={0}
                                    width={350}
                                    onPause={this.onPause}
                                    onEnded={this.onEnded}
                                    onPlay={this.onPlay}
                                    onBuffer={() => console.log('onBuffer')}
                                    onReady={() => console.log('onReady')}
                                    onStart={() => console.log('onStart')}
                                    onSeek={e => console.log('onSeek', e)}
                                    onProgress={this.onProgress}
                                    onError={e => console.log('onError', e)}
                                    onDuration={this.onDuration}
                    
                                />
                                
                                
                                </View>
                                                 
                        </ScrollView>
                             </View>
     
      </div>
 
    );
  }
}
//<input
//                                    type='range' min={0} max={1} step='any'
//                                   value={played}
//                                    width={450}
//                                    onMouseDown={this.onSeekMouseDown}
//                                    onChange={this.onSeekChange}
//                                    onMouseUp={this.onSeekMouseUp}
//                                    
//                               />


const { width, height } = Dimensions.get('window');
const imageSizeH = height ;
const imageSizeW = width ;
const styles = StyleSheet.create({
  container: {
    flex : 1,
    justifyContent: 'space-between',

  },
  image: {
    borderRadius: 5,
    borderWidth: 4,
    borderColor: COLOR.SONG,
    alignItems: 'center',
    justifyContent : 'space-evenly',
    // marginLeft : imageSize-620,
    width: imageSizeW-815,
    height: imageSizeW-815,
  },
  logo: {
    //width: 480,
    //height: 115,
    opacity: 0.8,
    position : 'absolute',
    top : +10
   },

  
  

});


 

export default connect(
  state => ({ state: state.authenticate,
              activeUser: state.activeUser,
              usersongs_status : state.list_song,
              useralbums_status : state.list_album,
              usersongs : state.list_song.songList,
              player_state : state.player_state,
              // songVotes: state.songVotes.data,
              albums: state.albums.data,
              song: state.songs.data,
              users: state.users.data
           }),
  dispatch => ({
              actions: bindActionCreators(authActions, dispatch),
              actionssongs: bindActionCreators(songActions, dispatch),
              albumactions: bindActionCreators(albumActions, dispatch),
              })
)(SongDetail);


