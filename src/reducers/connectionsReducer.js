import {ADD_CONNECTION, FETCH_CONNECTIONS, REMOVE_CONNECTION} from "../actions/types";

export default function connectionsReducer(state = [], action) {

    switch (action.type) {
        case ADD_CONNECTION: {
            return state.concat(action.payload);
        }
        case REMOVE_CONNECTION: {
            return state.filter((data) => data !== action.payload);
        }
        case FETCH_CONNECTIONS: {
            return action.payload.names
        }
        default:
            return state
    }
}
