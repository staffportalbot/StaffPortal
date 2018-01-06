import React from 'react';

import Header from '../Header';

const App = (props) => (
    <div>
        <Header nav={[
            {name: 'Home', to: '/'},
            {name: 'About', to: '/about'},
            {name: 'Login', to: '/login'},
            {name: 'List Demo', to: '/list'},
        ]}/>
        <main className="main">{props.children}</main>
    </div>
);

export default App;