import {ADD_CONNECTED_APP, FETCH_CONNECTED_APPS} from "../actions/types";

export default function connectedAppsReducer(state = [], action) {

    switch (action.type) {
        case ADD_CONNECTED_APP: {
            return {
                ...state,
                connectedApps: [
                    ...state.connectedApps,
                    {
                        name: action.payload
                    }
                ]
            }
        }
        case FETCH_CONNECTED_APPS: {
            return action.payload.names
        }
        default:
            return state
    }
}
