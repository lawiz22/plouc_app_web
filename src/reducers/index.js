import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import actionTypes from '../config/action-types';


// Application
import activeUser from './application/active-user';




// Models
import authenticate from "./authenticate";
import list_post from "./post";
import list_artist from "./artist";
import list_album from "./album";
import list_song from "./song";
import player_state from './player';
import list_user_song from "./song_user";

import users from './models/accounts/users';

import posts from './models/posts/post';
import postVotes from './models/votes/post-vote';
import postReplies from './models/replies/post-reply';
import artistVotes from './models/votes/artist-vote';
import artists from './models/artists/artist';
import albumVotes from './models/votes/album-vote';
import albums from './models/albums/album';
import albumReplies from './models/replies/album-reply';
import songs from './models/songs/song';



const appReducer = combineReducers({
    form: formReducer,

    // Application
    activeUser,
   
 

    // Models
    authenticate, 
    list_post, 
    list_artist, 
    list_album, 
    list_song, 
    list_user_song,
    player_state, 
    activeUser, 
    postVotes, 
    posts,
    
    postReplies,
    users,
    artistVotes,
    artists,
    albumVotes,
    albums,
    albumReplies,
    songs,

});

const rootReducer = (state, action) => {
    if(action.type === actionTypes[`LOGOUT_SUCCESS`]){ // If the user have successfully signed out and ended his/her session
        state.authenticate = undefined // Reset all state to remove cached data of the previous session
        state.activeUser = undefined // Reset all state to remove cached data of the previous session
      }
    return appReducer(state, action);
};

export default rootReducer


