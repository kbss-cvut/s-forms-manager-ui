import {ADD_CONNECTION, FETCH_CONNECTIONS} from './types.js';
import API from '../api'
import {REMOVE_CONNECTION} from "./types";

export const addConnectionsToStore = name => {
    return {
        type: ADD_CONNECTION,
        payload: name
    }
};

export const removeConnectionsFromStore = name => {
    return {
        type: REMOVE_CONNECTION,
        payload: name
    }
};

const fetchNamesSuccess = names => ({
    type: FETCH_CONNECTIONS,
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
