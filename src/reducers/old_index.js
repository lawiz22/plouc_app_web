
import { reducer as formReducer } from "redux-form";
import { createStore, applyMiddleware, combineReducers } from "redux";
import authenticate from "./authenticate";
import list_post from "./post";
import list_artist from "./artist";
import list_album from "./album";
import list_song from "./song";
import player_state from './player';
import list_user_song from "./song_user";
import users from './models/accounts/users';
import activeUser from './application/active-user';
import posts from './models/posts/post';
import postVotes from './models/votes/post-vote';
import postReplies from './models/replies/post-reply';
import artistVotes from './models/votes/artist-vote';
import artists from './models/artists/artist';
import albumVotes from './models/votes/album-vote';
import albums from './models/albums/album';
import albumReplies from './models/replies/album-reply';
import songs from './models/songs/song';


export { authenticate, 
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
         songs};
