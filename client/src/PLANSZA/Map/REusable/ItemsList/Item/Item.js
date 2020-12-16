import React, { Component } from 'react';

import classes from './Item.module.css';

class Item extends Component {
    /* <img src={URL.createObjectURL(this.props.item)} /> */
    render() {
        let field = null;

        if (this.props.item.avaliable) {
            field = <button className={classes.placable} id={this.props.itemKey} onClick={this.props.clicked} >{this.props.item.itemName}</button>
        } else {
            field = <button className={classes.unplacable} id={this.props.itemKey} onClick={this.props.clicked} >{this.props.item.itemName}</button>
        }

        return field;
    }
};

export default Item;