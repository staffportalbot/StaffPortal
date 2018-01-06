import React from 'react';
import { Link } from 'react-router';

export default class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        };
    }

    componentWillMount() {
        if (typeof window !== 'undefined') {
            this.mediaQuery = window.matchMedia('(min-width: 769px)');
            this.mediaQuery.addListener((mq) => {
                if (mq.matches)
                    this.setState({ open: false });
            });
        }
    }

    componentWillUnmount() {
        this.mediaQuery.removeListener();
    }

    handleClick() {
        this.setState({
            open: !this.state.open
        });
    };

    render() {
        const { nav } = this.props;
        return (
            <header className="header">
                <div className="logo" />
                <i className={`material-icons nav-icon ${this.state.open ? 'open' : ''}`}
                    onClick={this.handleClick.bind(this)}>&#xE313;</i>
                <nav className={`nav ${this.state.open ? 'open' : ''}`} role="navigation">
                    {nav.map((item, i) => (
                        <Link to={item.to}
                            className="link"
                            activeClassName="active"
                            onlyActiveOnIndex={true}
                            key={i}
                            onClick={this.handleClick.bind(this)}>{item.name}</Link>
                    ))}
                </nav>
            </header>
        )
    }
}