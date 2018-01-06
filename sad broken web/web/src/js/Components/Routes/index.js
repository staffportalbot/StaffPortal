// React
import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './App';
import About from './About';
import Home from './Home';
import List from './List';
import Login from './Login';
import NotFound from './404';

const Routes = (
    <Route path="/" component={App}>
        <IndexRoute component={Home}/>
        <Route path="about" component={About}/>
        <Route path="login" component={Login}/>
        <Route path="list" component={List}>
            <Route path=":id" component={List}/>
        </Route>
        <Route path="*" component={NotFound}/>
    </Route>
);

export default Routes;