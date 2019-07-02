import React, {Component} from 'react';
import {connect} from 'react-redux';
import {hashHistory, Link} from 'react-router';
import * as postUserAction from '../../actions/posts/post/list';
import { Animated, View, Image as Img, StyleSheet, TouchableWithoutFeedback, Text, ScrollView, FlatList } from 'react-native';
import { DefaultTheme, Appbar, Title, Badge, Button as ButPaper } from 'react-native-paper';
import Styles, { COLOR } from "../../config/styles";
import { bindActionCreators } from "redux";
import PropTypes from 'prop-types';
import * as authActions from "../../actions/authenticate";
import * as postActions from "../../actions/posts";
import * as artistActions from "../../actions/artists";
import * as albumActions from "../../actions/albums";
import * as songActions from "../../actions/songs";
import * as voteCreate from '../../actions/votes/post-vote/create';
import * as voteDelete from '../../actions/votes/post-vote/delete';
import * as voteEdit from '../../actions/votes/post-vote/edit';
import {getFirstName, getFullName, getPostUser, getArtistUser,getAlbumUser,getSongUser} from '../../utils/user';
import {getUser} from '../../actions/accounts/user/get';
import HeaderUserPostAll from '../../components/HeaderUserPostAll'
import { Button, Icon, Image, Item, Label } from 'semantic-ui-react'
import {
  Grid,
  Header,
  Rail,
  Ref,
  Segment,
  Sticky,
  } from 'semantic-ui-react'
import settings from '../../config/settings';
import moment from "moment";
import ReactLifeTimeline from '../../lib/ReactLifeTimeline';
import ReactDOM from 'react-dom';
import '../../lib/react-life-timeline.css'
import Navigation from '../../components/Navigation'


class UserTime extends Component {
  constructor(props) {
    super(props);
    
    this.page = {
      open: false
    };
    this.state = {
        events: [],
        lookup: {},
        loaded: false,
        today: new Date(),
        events_added: 0,
        timeout_id: null
    };
    this.EVENTS = [
        {date_start: new Date('1992-01-01'), date_end: new Date('2004-01-01'), title: 'Practices civil rights law and teaches constitutional law at the University of Chicago Law School.', color: '#FC004C'},
        {date_start: new Date('1995-01-01'), title: 'Publishes his autobiography "Dreams from my Father"'},
        {date_start: new Date('1997-01-01'), date_end: new Date('2005-01-01'), title: 'Illinois State Senator, representing the 13th District.', color: '#95F268'},
        {date_start: new Date('2004-07-27'), title: 'Delivers the keynote address at the Democratic National Convention.'},
        {date_start: new Date('2004-11-02'), title: 'Wins the US Senate race in Illinois, defeating Alan Keyes. It is the first time in history a Senate race is between two African-American candidates.'},
        {date_start: new Date('2006-08-20'), date_end: new Date('2006-09-03'), title: 'Tours five African countries, including a visit to Nyangoma-Kogelo, Kenya, his late father\'s hometown.', color: '#F500F7'},
        {date_start: new Date('2007-02-10'), title: 'Announces his candidacy for president at an event in Springfield, Illinois.'},
        {date_start: new Date('2008-11-04'), title: 'Is elected president of the United States with an estimated 66.7 million popular votes and 365 electoral votes.'},
        {date_start: new Date('2008-12-17'), title: 'Is named Time Magazine\'s "Person of the Year."'},
        {date_start: new Date('2009-01-20'), title: 'Is sworn in as the 44th president of the United States, becoming the first African-American to hold the position.'},
        {date_start: new Date('2009-01-20'), date_end: new Date('2017-01-20'), title: 'POTUS'},
        {date_start: new Date('2017-01-20'), title: 'Leaves the Oval Office after two terms as president.'},
    ];
    
    this.EVENTS_USER = [


    ]

    this.EVENTS_WITH_ONGOING = [
        {date_start: new Date('1995-01-01'), title: 'Publishes his autobiography "Dreams from my Father"'},
        {date_start: new Date('2017-02-01'), date_end: new Date('2017-02-20'), title: 'Sample prior event', color: '#FC004C'},
        {date_start: new Date('2017-04-01'), title: 'Sample ongoing event', color: '#2276FF', ongoing: true},
    ];
    let today = new Date();
    let future_start = new Date(today.getFullYear() + 1, today.getMonth(), today.getDate());
    let future_end = new Date(future_start.getTime());
    future_end.setDate(future_end.getDate() + 7);

    this.EVENTS_LAWIZ = [
      
      {date_start: new Date('1998-03-28'), title: 'Cosmik Debris',color: '#2276FF', ongoing: true},
      {date_start: new Date('1998-03-28'), title: 'Debut Cosmik Debris',color: COLOR.SONG},
      //{date_start: new Date('2009-03-12'), title: 'Videotron', ongoing: true, color: '#E4E4'},
      {date_start: new Date('2017-02-01'), date_end: new Date('2017-02-20'), title: 'Sample prior event', color: '#FD691C'},
      
      {date_start: future_start, date_end: future_end, title: 'Sample future event', color: COLOR.SONG},
  ];

    this.EVENTS_WITH_FUTURE = [
        {date_start: new Date('2017-02-01'), date_end: new Date('2017-02-20'), title: 'Sample prior event', color: '#FC004C'},
        {date_start: future_start, date_end: future_end, title: 'Sample future event', color: '#FD691C'},
    ];
  }
  generate_events() {
    console.log(this.EVENTS)
    return (this.EVENTS);
}

timePostList(postList) {
  return postList
      .map(post =>
        (this.EVENTS_USER[post.id] = ({
          date_start: new Date(`${post.date_debut}`) ,
         
          
          title: post.title,
          color: COLOR.POST 
      }))
      );
}

timeArtistList(artistList) {
  return artistList
      .map(artist =>
        (this.EVENTS_USER[artist.id] = ({
          date_start: new Date(`${artist.date_debut}`) ,
          date_end: new Date(`${artist.date_fin}`),
          title: artist.artist,
          ongoing: artist.is_active,
          color: '#2276FF'
      }))
      );
}

timeAlbumList(albumList) {
  return albumList
      .map(album =>
        (this.EVENTS_USER[album.id] = ({
          date_start: new Date(`${album.date_action}`) ,
          title: album.album_title,
          color: '#FD691C'
      }))
      );
}
timeSongList(songList) {
  return songList
      .map(song =>
        (this.EVENTS_USER[song.id] = ({
          date_start: new Date(`${song.date_action}`) ,
          title: song.song_title,
          color: COLOR.SONG
      }))
      );
}

 
    componentDidMount() {
        const {dispatch, params: {userId}} = this.props;
        dispatch(getUser(userId));
        this.props.actionsposts.get_user_post()
        this.props.actionsartists.get_artist_list()
        this.props.actionssongs.get_song_list()
        this.props.actionssongs.getSongList()
        this.props.actionsalbums.get_album_list()
        const {posts} = this.props;
        (this.props.postUserAction.getPostList({
            user: userId
        }));
        
       
    }

    componentWillMount() {
      const {posts} = this.props;
       
        // this.timePostList(userposts)
        
        
       

    }

    add_incremental_event(force_index) {
      let {events_added} = this.state;
      let next_index = force_index == null ? events_added+1 : force_index;
      if (next_index < this.EVENTS_USER.length) {
          this.setState({events_added: next_index}, () => {
              let timeout_id = window.setTimeout(this.add_incremental_event.bind(this), 100);
              this.setState({timeout_id: timeout_id});
          });
      }
  }
  getBirthDate = (userId, users) => {
    const {date_birth} = users[userId];
    
    return moment( `${date_birth}`).format('YYYY-MM-DD');
  };
  incremental_events(postsObj) {
      return postsObj.slice(0, this.state.events_added);
  }
  
  restart_incremental() {
      let {timeout_id} = this.state;
      if (timeout_id != null) window.clearInterval(timeout_id);
      this.add_incremental_event(0);
  }

    getVoteScoreStyling(postId) {
        if(this.usersVoteValue(postId) === -1) return 'down-voted';
        if(this.usersVoteValue(postId) === 1) return 'up-voted';
    }
      usersVote(postId) {
        const {activeUser,  postVotes} = this.props;
        if(!activeUser) return null;
        const vote = Object.values(postVotes)
            .filter(postVote => postVote.post === postId)
            .filter(postVote => postVote.user === activeUser.id);
        if(vote.length) return vote[0];
        return null;
    }

      usersVoteValue(postId) {
        const {activeUser, postVotes} = this.props;
        if(!activeUser) return null;
        const vote = Object.values(postVotes)
            .filter(postVote => postVote.post === postId)
            .filter(postVote => postVote.user === activeUser.id);
        if(vote.filter(postVote => postVote.value === -1).length) return -1;
        if(vote.filter(postVote => postVote.value === 1).length) return 1;
        return null;
      }

      handleDownArrowClick = (postId) => {
        const {activeUser, dispatch} = this.props;
        if(!activeUser) return null;
        if(this.usersVoteValue(postId) === null) {
          this.props.createvotes.createPostVote({
                post: postId,
                value: -1
            });
        }
        if(this.usersVoteValue(postId) === -1) {
          this.props.deletevotes.deletePostVote(this.usersVote(postId));
        }
        if(this.usersVoteValue(postId) === 1) {
          this.props.editvotes.editPostVote({
                ...this.usersVote(postId),
                value: -1
            });
        }
    };

    handleUpArrowClick = (postId) => {
      const {activeUser, dispatch} = this.props;
      if(!activeUser) return null;
      if(this.usersVoteValue(postId) === null) {
        this.props.createvotes.createPostVote({
              post: postId,
              value: 1
          });
      }
      if(this.usersVoteValue(postId) === -1) {
        this.props.editvotes.editPostVote({
              ...this.usersVote(postId),
              value: 1
          });
      }
      if(this.usersVoteValue(postId) === 1) {
        this.props.deletevotes.deletePostVote(this.usersVote(postId));
      }
    };

    getVoteTally(postId) {
        const {postVotes} = this.props;
        
        // const postsObj = Object.assign({}, userposts);
        
        // console.log(postId)
        // console.log(postVotes)
    
        
        return Object.values(postVotes)
            .filter(postVote => postVote.post === postId)
            .reduce((acc, postVote) => acc + postVote.value, 0);
      }
    

    renderPostList(postList) {
        return postList
            .map(post =>
                <PostListItem
                    key={post.id}
                    post={post}
                />
            );
    }

    

    renderPostSection() {

        
    // if (postList.length === 0) return null;
    return null;
}    
    concat(...args) {
        return args.reduce((acc, val) => [...acc, ...val]);
      }



    render() {
        const {params: {userId}, posts, users, artists,albums, songs} = this.props;
        const {post} = this.props;
        const {user} = this.props;
        if(!user) return null;
        const namePost = getFirstName(Number(userId), users) + ' Time'
        
        let constance =new Date( this.getBirthDate(Number(userId), users));

        //console.log ({posts})
        
       
        const postsObj = this.timePostList(getPostUser(Number(userId), posts))

        const artistsObj = this.timeArtistList(getArtistUser(Number(userId), artists))

        const albumsObj = this.timeAlbumList(getAlbumUser(Number(userId), albums))
        const songsObj = this.timeSongList(getSongUser(Number(userId), songs))
        
        const listAll = this.concat( artistsObj,postsObj,albumsObj,songsObj);
        console.log (listAll)

        return (

          <div className="Home">
      
      
          <Sticky context={this.contextRef}>      
              <Navigation/>
             
           </Sticky>
           
           
              <Ref innerRef={this.contextRef}> 
          
                
                  <View style={styles.container}> 
                 
                  <div >
            
                <View style ={{ backgroundColor: 'black' }}>
      
                <Appbar.Header theme={{ colors: { primary: COLOR.POST }}} >
               
               
               <Appbar.Action icon="content-copy" />
            
                <Appbar.Content
                title={namePost}
                subtitle=""
                style ={{ alignItems: 'center' }} 
                />
                <Appbar.Action icon="search"  />
        
                
            </Appbar.Header>  
                    
      
               
                   
            <div>   
            <h3 style={{ color: COLOR.POST }}>{getFirstName(Number(userId), users) + ' Time-week-line'}</h3>
            
					   <a href="javascript:void(0)" onClick={this.restart_incremental.bind(this)}>Play Incremental / Restart</a>
			     	
				<ReactLifeTimeline
						subject_name={getFirstName(Number(userId), users)}
            birthday={constance}
						// birthday={(getBirthDate(Number(userId), users)}
						// events={this.incremental_events()} />
            events={this.incremental_events(listAll)} onClick={console.log('Ca Clique en esti')}/>
            
				
           </div>
    
                       
            </View>

            </div>
          
                            
          
                 
                </View>   
                
                  
             </Ref>            
                      
                  
                  
             
          </div>




            
        );
    }

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
     //height : '100%',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    // alignItems: 'stretch',
    // justifyContent: 'flex-start',
    ////borderWidth: 5,
    ////borderColor: 'red',
    paddingTop: 0,
    // backgroundColor : this.state.time?'black':'white',
    paddingBottom: 10,
    borderBottomColor:  COLOR.CHOCO,
    borderBottomWidth: 40,
    
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

  (state,props) => ({
            state: state.authenticate,
            userposts_status : state.list_post,
            userposts : state.list_post.postList,
            activeUser: state.activeUser,
            users: state.users.data,
            posts: state.posts.data,
            artists: state.artists.data,
            albums: state.albums.data,
            songs: state.songs.data,
            postVotes: state.postVotes.data,
            user: state.users.data[props.params.userId],
            
}),
dispatch => ({
            
            actionsposts: bindActionCreators(postActions, dispatch),
            actionsartists: bindActionCreators(artistActions, dispatch),
            actionsalbums: bindActionCreators(albumActions, dispatch),
            actionssongs: bindActionCreators(songActions, dispatch),
            createvotes: bindActionCreators(voteCreate, dispatch),
            deletevotes: bindActionCreators(voteDelete, dispatch),
            editvotes: bindActionCreators(voteEdit, dispatch),
            postUserAction : bindActionCreators(postUserAction, dispatch)
            })
            )(UserTime);
