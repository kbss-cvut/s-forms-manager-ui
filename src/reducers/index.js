import {combineReducers} from 'redux';
import connectedAppsReducer from "./connectedAppsReducer";

export default combineReducers({
    connectedApps: connectedAppsReducer
});
