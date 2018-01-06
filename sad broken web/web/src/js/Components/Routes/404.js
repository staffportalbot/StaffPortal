import React from 'react';
import {Link} from 'react-router'

const Login = (props) => (
    <div>
        <div className="heading">
            <span className="small-nonfix">Page Not Found.</span>
        </div>
        <Link to="/" className="link">Go Home</Link>
    </div>
);

export default Login;