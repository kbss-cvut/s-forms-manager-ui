import {ADD_PROJECT, FETCH_PROJECTS, REMOVE_PROJECT} from "../actions/types";

export default function projectsReducer(state = [], action) {

    switch (action.type) {
        case ADD_PROJECT: {
            return state.concat(action.payload);
        }
        case REMOVE_PROJECT: {
            return state.filter((data) => data !== action.payload);
        }
        case FETCH_PROJECTS: {
            return action.payload.names
        }
        default:
            return state
    }
}
