import {combineReducers} from 'redux';
import modelReducer from '../../higher-order-reducers/model';


const MODEL = 'ALBUMS';

export default combineReducers({
    data: modelReducer(MODEL)
});
