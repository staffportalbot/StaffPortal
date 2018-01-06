import React from 'react';

import Input from '../Input';

const Login = (props) => (
    <div>
        <div className="heading">
            <span className="small-nonfix">Login</span>
        </div>
        <Input label="Username or Email"/>
        <Input label="Password" password={true}/>
        <button className="button">Login</button>
    </div>
);

export default Login;