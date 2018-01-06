import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import Input from '../Input';

class ListItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        }
        this.handleClick = this.handleClick.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleDocumentClick = this.handleDocumentClick.bind(this);
    }

    componentDidMount() {
        document.addEventListener('click', this.handleDocumentClick, false);
        document.addEventListener('touchend', this.handleDocumentClick, false);
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handleDocumentClick, false);
        document.removeEventListener('touchend', this.handleDocumentClick, false);
    }

    handleDocumentClick(e) {
        if (!ReactDOM.findDOMNode(this.area).contains(e.target)) {
            this.handleClose();
        }
    }

    handleClick() {
        if(this.state.open == true) return;
        this.setState({
            open: true
        });
    }

    handleClose() {
        this.setState({
            open: false
        });
    }

    render() {
        return (
            <div ref={(area) => this.area = area}>
                <h1 onClick={this.handleClick.bind(this)}>{this.props.title}</h1>
                <div style={{display: this.state.open ? 'block' : 'none'}}>
                    <i className="material-icons" onClick={this.handleClose.bind(this)}>close</i>
                </div>
            </div>
        )
    }
}

const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

class List extends React.Component { 
    constructor(props) {
        super(props);
        console.log(this.props.router.params)
    }
    render() {
        return (
            <div>
                <div className="heading">
                    <span className="small-nonfix">List Demo</span>
                </div>
                {data.map((item, i) => (
                    <ListItem key={i} id={i} title={`List Item: ${item}`}/>
                ))}
            </div>
        );
    }
}

export default List;