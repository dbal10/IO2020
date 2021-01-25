import React, { Component } from 'react';

import classes from './Field.module.css';

class Field extends Component {
    /* <img src={URL.createObjectURL(this.props.item)} /> */  // to jest przstarzałe nie używać
    render() {
        
        let field = null;

        // if (this.props.partOfItem) {
        //     if (this.props.item !== null) {
        //         if (this.props.placable) {
        //             field = <div className={classes.placable} id={this.props.fieldKey} onClick={this.props.clicked} >{this.props.item.itemName}</div>
        //         } else {
        //             field = <div className={classes.unplacable} id={this.props.fieldKey} onClick={this.props.clicked} >{this.props.item.itemName}</div>
        //         }
        //     } else {
        //         if (this.props.placable) {
        //             field = <div className={classes.placable} id={this.props.fieldKey} onClick={this.props.clicked} ></div>
        //         } else {
        //             field = <div className={classes.unplacable} id={this.props.fieldKey} onClick={this.props.clicked} ></div>
        //         }
        //     }
        // } else {
        //     if (this.props.item !== null) {
        //         if (this.props.placable) {
        //             field = <button className={classes.placable} id={this.props.fieldKey} onClick={this.props.clicked} >{this.props.item.itemName}</button>
        //         } else {
        //             field = <button className={classes.unplacable} id={this.props.fieldKey} onClick={this.props.clicked} >{this.props.item.itemName}</button>
        //         }
        //     } else {
        //         if (this.props.placable) {
        //             field = <button className={classes.placable} id={this.props.fieldKey} onClick={this.props.clicked} ></button>
        //         } else {
        //             field = <button className={classes.unplacable} id={this.props.fieldKey} onClick={this.props.clicked} ></button>
        //         }
        //     }
        // }

        if (this.props.partOfItem) {
            // if (this.props.item !== null) {
            //     if (this.props.placable) {
            //         field = <div className={classes.placable} id={this.props.fieldKey} onClick={this.props.clicked} >{this.props.item.itemName}</div>
            //     } else {
            //         field = <div className={classes.unplacable} id={this.props.fieldKey} onClick={this.props.clicked} >{this.props.item.itemName}</div>
            //     }
            // } else {
                if (this.props.placable) {
                    field = <div id={this.props.fieldKey} onClick={this.props.clicked} ></div>
                } else {
                    field = <div id={this.props.fieldKey} onClick={this.props.clicked} ></div>
                }
            // }
        } else {
            if (this.props.item !== null) {
                if (this.props.placable) {
                    field = <img 
                        style={{maxWidth: 50*this.props.item.width, maxHeight: 50*this.props.item.length}}
                        src={`data:image/jpeg;base64,${this.props.item.file}`} 
                        className={classes.placable} 
                        id={this.props.fieldKey} 
                        onClick={this.props.clicked} />
                } else {
                    field = <img 
                        style={{maxWidth: 50*this.props.item.width, maxHeight: 50*this.props.item.length, opacity: 0.3}}
                        src={`data:image/jpeg;base64,${this.props.item.file}`} 
                        className={classes.unplacable} id={this.props.fieldKey} 
                        onClick={this.props.clicked} />
                }
            } else {
                if (this.props.placable) {
                    field = <div className={classes.placable} id={this.props.fieldKey} onClick={this.props.clicked} />
                } else {
                    field = <div className={classes.unplacable} id={this.props.fieldKey} onClick={this.props.clicked} />
                }
            }
        }
        return field;
    }
};

export default Field;