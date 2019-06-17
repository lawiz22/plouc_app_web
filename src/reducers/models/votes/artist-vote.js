import {combineReducers} from 'redux';
import modelReducer from '../../higher-order-reducers/model';


const MODEL = 'ARTIST_VOTES';

export default combineReducers({
    data: modelReducer(MODEL)
});
