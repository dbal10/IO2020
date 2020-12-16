import React, { Component } from 'react';

import classes from './Field.module.css';

class Field extends Component {
    /* <img src={URL.createObjectURL(this.props.item)} /> */
    render() {
        let field = null;

        if (this.props.placable) {
            field = <button className={classes.placable} id={this.props.fieldKey} onClick={this.props.clicked} >{this.props.item.itemName}</button>
        } else {
            field = <button className={classes.unplacable} id={this.props.fieldKey} onClick={this.props.clicked} >{this.props.item.itemName}</button>
        }

        return field;
    }
};

export default Field;