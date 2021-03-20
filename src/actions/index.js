import {ADD_PROJECT, FETCH_PROJECTS} from './types.js';
import API from '../api'
import {REMOVE_PROJECT} from "./types";

export const addProjectsToStore = name => {
    return {
        type: ADD_PROJECT,
        payload: name
    }
};

export const removeProjectsFromStore = name => {
    return {
        type: REMOVE_PROJECT,
        payload: name
    }
};

const fetchNamesSuccess = names => ({
    type: FETCH_PROJECTS,
    payload: {names}
});

export const fetchProjectNames = () => {
    return async dispatch => {
        try {
            let names = await API.get("/rest/projects/names");
            dispatch(fetchNamesSuccess(names.data));
        } catch (e) {
            console.log(e);
        }
    };
};
