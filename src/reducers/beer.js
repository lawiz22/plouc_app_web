import * as types from "../config/action-types/beer";

const initialState = {
    data: [],
    page: 1,
    loading: false,
    loadingMore: false,
    filtering: false,
    refreshing: false,
    error: null
};

export default function list_beer(state = initialState, action = {}) {
  switch (action.type) {
    case types.GET_BEER_REQUEST: 
      return { 
        ...state,
        loading: true,
        error: null
      };
    case types.GET_BEER_REFRESH: 
      return { 
        ...state,
        page: 1,
        refreshing: true
      };
    case types.GET_BEER_LOADMORE: 
      return { 
        ...state,
        page: prevState.page + 1,
        loadingMore: true
      };   
    case types.GET_BEER_SUCCESS:
      return { 
        ...state,
        data:
            page === 1
              ? Array.from(response.data)
              : [...this.state.data, ...response.data],
        Loading: false,
        loadingMore: false,
        refreshing: false      

      };
    case types.GET_BEER_FAILED: 
      return { 
        ...state,
        loading: false,
        postError: action.data.error
      };
    default:
      return state;
  }
}
