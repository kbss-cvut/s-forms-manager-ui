import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

import {applyMiddleware, createStore} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';

import rootReducer from './reducers';

import 's-forms/css/s-forms.min.css'
import 'bootstrap/dist/css/bootstrap.css';
import {fetchConnectionNames} from "./actions";


const saveState = (state) => {
    if (state.connectedApps.length !== 0) {
        localStorage.setItem("state", JSON.stringify(state));
    }
};

const getState = () => {
    try {
        const s = localStorage.getItem("state");

        if (s === null) return undefined;
        return JSON.parse(s);
    } catch (e) {
        return undefined;
    }
};

const initialState = getState();
const store = createStore(rootReducer, initialState, applyMiddleware(thunk));
store.dispatch(fetchConnectionNames());

store.subscribe(() => {
    saveState({
        connectedApps: store.getState().connectedApps
    })
})

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root'));

serviceWorker.unregister();
