import {combineReducers} from 'redux';
import modelReducer from '../../higher-order-reducers/model';


const MODEL = 'ALBUM_REPLIES';

export default combineReducers({
    data: modelReducer(MODEL)
});
