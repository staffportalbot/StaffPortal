// Express
import express from 'express';

// React & Redux
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import {match, RouterContext} from 'react-router';
import {Provider} from 'react-redux';
import {createStore} from 'redux';

// Components
import routes from '../../../StaffPortal/web/src/js/Components/Routes/';
import NotFound from '../../../StaffPortal/web/src/js/Components/Routes/404';

import * as fs from 'fs';
import * as path from 'path';

const router = express.Router();

// Redux Reducer
function reducer(state) {
    return state;
}

// Match all incoming get requests, React does the rest.
router.get('*', (req, res) => {
    // Setup Redux initial state & store.
    let initialState = {
        title: 'test'
    };
    let store = createStore(reducer, initialState);

    // Matching using React Router's match function.
    match({
        routes,
        location: req.url
    }, (err, redirectLocation, renderProps) => {
        let markup;
        if (err) {
            // Emulate native Express handling, but with React error stack trace.
            return res.status(500).send(err.message);
        }
        if (redirectLocation) {
            // Do redirects even if the bundle hasn't loaded.
            return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
        }
        if (renderProps) {
            // Render the React routes and send the props down & Redux store.
            markup = ReactDOMServer.renderToString(
                <Provider store={store}>
                    <RouterContext {...renderProps}/>
                </Provider>
            );
        } else {
            // Render the not found React route & Redux store
            markup = ReactDOMServer.renderToString(
                <Provider store={store}>
                    <NotFound/>
                </Provider>
            );
            res.status(404);
        }
        // Send over the markup as a value to be inserted into the template along with the CSS.
        return res.render('index', {
            markup,
            css: fs.readFileSync(path.join(__dirname, '..', '..', 'web', 'static', 'css', 'styles.css')),
            initialState
        });
    });
});

module.exports = router;