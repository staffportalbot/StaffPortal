// React and Redux
import React from 'react'
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore} from 'redux';

// Polyfills
import '../inert';
import 'web-animations-js/web-animations-next.min';

// SASS
// (Seems, ridiculous but don't remove this. Webpack builds, then spits the css file out into the static dir)
import '../../css/styles.sass'

import App from './App';

function reducer(state) {
    return state;
}

let state = window.__INITIAL_APP_STATE;
delete window.__INITIAL_APP_STATE;

let store = createStore(reducer, state, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

const mount = document.getElementById('app-mount');

ReactDOM.render((
    <Provider store={store}>
        <App/>
    </Provider>
), mount);