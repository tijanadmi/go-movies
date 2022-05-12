import React, { Component, Fragment } from 'react';

export default class Categories extends Component {
    render() {
        
        return (
            <Fragment>
             <h2>Category: {this.props.title}</h2>
            
            </Fragment>
        )
    }
}