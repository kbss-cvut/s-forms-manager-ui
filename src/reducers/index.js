import {combineReducers} from 'redux';
import connectionsReducer from "./connectionsReducer";

export default combineReducers({
    connections: connectionsReducer
});
