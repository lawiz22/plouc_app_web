import * as types from "../config/action-types/post";

const initialState = {
  isListSuccess: false,
  requestingPost: false,
  postList: null,
  postError: "",
  showPostfront: true,
  showDetailview: false,
  postListview: true,
  postDetail: null
};

export default function list_post(state = initialState, action = {}) {
  switch (action.type) {
    case types.GET_USER_POSTS_REQUEST: // When a login request action has been dispatched
      return { // See more on actions/authenticate.js on line 19 - 38
        ...state,
        requestingPost: true,
        
        postError: ""
      };
    case types.GET_USER_POSTS_SUCCESS: // When a Login success action has been dispatched
      return { // See more on actions/authenticate.js on line 19 - 38
        ...state,
        isListSuccess: true,
        postList: action.data.response.data,
        requestingPost: false,
      };

    case types.SET_POSTS_VIEW_SUCCESS: // When a Login success action has been dispatched
      return { // See more on actions/authenticate.js on line 19 - 38
        ...state,
        showPostfront: action.data.showFront,
        
      };
      
    case types.SET_LISTVIEW_POST_SUCCESS: // When a Login success action has been dispatched
      return { // See more on actions/authenticate.js on line 19 - 38
        ...state,
        postListview: action.data.showList,
        
      };

    case types.SET_DETAILVIEW_POST_SUCCESS: // When a Login success action has been dispatched
      return { // See more on actions/authenticate.js on line 19 - 38
        ...state,
        showDetailview: action.data.showDetail,
        
      };  
    case types.SET_DETAIL_POST_SUCCESS: // When a Login success action has been dispatched
      return { // See more on actions/authenticate.js on line 19 - 38
        ...state,
        postDetail: action.data.postDetail,
        
      };     
    case types.GET_USER_POSTS_FAILED: // When a login failed action has been dispatched
      return { // See more on actions/authenticate.js on line 19 - 38
        ...state,
        requestingPost: false,
        postError: action.data.error
      };
    default:
      return state;
  }
}
