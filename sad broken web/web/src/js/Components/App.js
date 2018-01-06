import React from 'react';
import { Router, browserHistory } from 'react-router';
import Routes from './Routes/';

export default class App extends React.Component {
    render() {
        return (
            <Router history={browserHistory} routes={Routes} onUpdate={() => window.scrollTo(0, 0)}/>
        );
    }
}