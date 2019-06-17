import {combineReducers} from 'redux';
import modelReducer from '../../higher-order-reducers/model';


const MODEL = 'SONGS';

export default combineReducers({
    data: modelReducer(MODEL)
});
