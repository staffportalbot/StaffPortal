import React from 'react';

export default class Input extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: ''
        }
    }

    handleInput(e) {
        this.setState({text: e.target.value});
    }

    render() {
        const {text} = this.state;
        return (
            <div className="text-input">
                <input type={this.props.password ? 'password' : 'text'} onChange={this.handleInput.bind(this)} />
                <span className="underline"/>
                <label className={text ? 'focus' : ''}>{this.props.label}</label>
            </div>
        )
    }
}