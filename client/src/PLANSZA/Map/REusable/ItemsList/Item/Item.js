import React, { Component } from 'react';

import classes from './Item.module.css';

class Item extends Component {
    /* <img src={URL.createObjectURL(this.props.item)} /> */
    render() {
        let field = null;

        if (this.props.item.avaliable) {
            field = <button className={classes.placable} id={this.props.itemKey} onClick={this.props.clicked} >
                <div id={this.props.itemKey} className={classes.row}>
                    <div id={this.props.itemKey} className={classes.col}>
                        <div id={this.props.itemKey} >Image</div>
                    </div>
                    <div id={this.props.itemKey} className={classes.col}>
                        <div id={this.props.itemKey}>Name: {this.props.item.itemName}</div>
                        <div id={this.props.itemKey}>Size: {this.props.item.width}x{this.props.item.length}</div>
                        <div id={this.props.itemKey}>Money: {this.props.item.price}</div>
                    </div>
                </div>
            </button>
        } else {
            field = <button className={classes.unplacable} id={this.props.itemKey} onClick={this.props.clicked} >
                <div id={this.props.itemKey} className={classes.row}>
                    <div id={this.props.itemKey} className={classes.col}>
                        <div id={this.props.itemKey} >Image</div>
                    </div>
                    <div id={this.props.itemKey} className={classes.col}>
                        <div id={this.props.itemKey}>Name: {this.props.item.itemName}</div>
                        <div id={this.props.itemKey}>Size: {this.props.item.width}x{this.props.item.length}</div>
                        <div id={this.props.itemKey}>Money: {this.props.item.price}</div>
                    </div>
                </div>
            </button>
        }

        return field;
    }
};


export default Item;