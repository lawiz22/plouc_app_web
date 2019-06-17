import * as types from "../config/action-types/song_user";

const initialState_A = {
  isSongUserSuccess: false,
  requestingUserSong: false,
  usersongList: null,
  usersongError: "",
  usersongShow: 0,
  usersongTotal: 0,
  usersongLimit: 7,
  usersongOffset: 0
};

export default function list_user_song(state = initialState_A, action = {}) {
  switch (action.type) {
    case types.GET_USER_SONGS_REQUEST: // When a login request action has been dispatched
      return { // See more on actions/authenticate.js on line 19 - 38
        ...state,
        requestingUserSong: true,
        usersongError: ""
      };
    case types.GET_USER_SONGS_SUCCESS: // When a Login success action has been dispatched
      return { // See more on actions/authenticate.js on line 19 - 38
        ...state,
        isSongUserSuccess: true,
        usersongList: action.data.response.data,
        requestingUserSong: false,
        usersongLimit: action.data.limit,
        usersongOffset: action.data.offset,
      };
      case types.RESET_USER_SONGS_REQUEST: // When a Login success action has been dispatched
      return { // See more on actions/authenticate.js on line 19 - 38
        ...state,
        // requestingUserSong: true,
      };
      case types.RESET_USER_SONGS_SUCCESS: // When a Login success action has been dispatched
      return { // See more on actions/authenticate.js on line 19 - 38
        ...state,
        usersongLimit: action.data.limit,
        usersongOffset: action.data.offset,
        requestingUserSong: false,
      };
    case types.COUNT_USER_SONGS_TOTAL_SUCCESS: // When a Login success action has been dispatched
      return { // See more on actions/authenticate.js on line 19 - 38
        ...state,
        usersongTotal: action.data.response.length
      
      };    
    case types.GET_USER_SONGS_FAILED: // When a login failed action has been dispatched
      return { // See more on actions/authenticate.js on line 19 - 38
        ...state,
        requestingUserSong: false,
        usersongError: action.data.error
      };
    default:
      return state;
  }
}
