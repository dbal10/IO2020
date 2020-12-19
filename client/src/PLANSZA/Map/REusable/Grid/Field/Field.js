import React, { Component } from 'react';

import classes from './Field.module.css';

class Field extends Component {
    /* <img src={URL.createObjectURL(this.props.item)} /> */  // to jest przstarzałe nie używać
    render() {
        
        let field = null;

        if (this.props.partOfItem) {
            if (this.props.item !== null) {
                if (this.props.placable) {
                    field = <div className={classes.placable} id={this.props.fieldKey} onClick={this.props.clicked} >{this.props.item.itemName}</div>
                } else {
                    field = <div className={classes.unplacable} id={this.props.fieldKey} onClick={this.props.clicked} >{this.props.item.itemName}</div>
                }
            } else {
                if (this.props.placable) {
                    field = <div className={classes.placable} id={this.props.fieldKey} onClick={this.props.clicked} ></div>
                } else {
                    field = <div className={classes.unplacable} id={this.props.fieldKey} onClick={this.props.clicked} ></div>
                }
            }
        } else {
            if (this.props.item !== null) {
                if (this.props.placable) {
                    field = <button className={classes.placable} id={this.props.fieldKey} onClick={this.props.clicked} >{this.props.item.itemName}</button>
                } else {
                    field = <button className={classes.unplacable} id={this.props.fieldKey} onClick={this.props.clicked} >{this.props.item.itemName}</button>
                }
            } else {
                if (this.props.placable) {
                    field = <button className={classes.placable} id={this.props.fieldKey} onClick={this.props.clicked} ></button>
                } else {
                    field = <button className={classes.unplacable} id={this.props.fieldKey} onClick={this.props.clicked} ></button>
                }
            }
        }


        return field;
    }
};

export default Field;