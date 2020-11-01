import {ADD_CONNECTED_APP, FETCH_CONNECTED_APPS} from './types.js';
import API from '../api'
import {REMOVE_CONNECTED_APP} from "./types";

export const addConnectedAppToStore = name => {
    return {
        type: ADD_CONNECTED_APP,
        payload: {
            name: name,
        }
    }
};

export const removeConnectedAppFromStore = name => ({
    type: REMOVE_CONNECTED_APP,
    payload: {name}
});

const fetchNamesSuccess = names => ({
    type: FETCH_CONNECTED_APPS,
    payload: {names}
});

export const fetchConnectionNames = () => {
    return async dispatch => {
        try {
            let names = await API.get("/rest/connections/names");
            dispatch(fetchNamesSuccess(names.data));
        } catch (e) {
            console.log(e);
        }
    };
};
