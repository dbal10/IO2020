import React, { Component } from 'react';

import classes from './Field.module.css';

class Field extends Component {
    /* <img src={URL.createObjectURL(this.props.item)} /> */  // to jest przstarzałe nie używać

    render() {
        
        let field = null;

        if(this.props.temperature==null){
            if (this.props.partOfItem) {

                if (this.props.placable) {
                    field =(
                    <div>
                        <div id={this.props.fieldKey} onClick={this.props.clicked} />
                        <div id={this.props.fieldKey}>{this.props.temperature}</div>
                    </div>
                    )
                } else {
                    field = (
                        <div>
                            <div id={this.props.fieldKey} onClick={this.props.clicked} />
                            <div id={this.props.fieldKey}>{this.props.temperature}</div>
                        </div>
                    )
                }
        } else {
            if (this.props.item !== null) {
                if (this.props.placable) {
                    field = (
                        <div>
                            <img 
                                style={{maxWidth: 50*this.props.item.width, maxHeight: 50*this.props.item.length}}
                                src={`data:image/jpeg;base64,${this.props.item.file}`} 
                                className={classes.placable} 
                                id={this.props.fieldKey} 
                                onClick={this.props.clicked} />
                            <div className={classes.centered} 
                                 id={this.props.fieldKey}>{this.props.temperature}</div>
                        </div>
                    )
                } else {
                    field = (
                        <div>
                            <img 
                                style={{maxWidth: 50*this.props.item.width, maxHeight: 50*this.props.item.length, opacity: 0.3}}
                                src={`data:image/jpeg;base64,${this.props.item.file}`} 
                                className={classes.unplacable} id={this.props.fieldKey} 
                                onClick={this.props.clicked} />
                            <div className={classes.centered}
                                 id={this.props.fieldKey}> {this.props.temperature} </div>
                        </div>
                    )
                }
            } else {
                if (this.props.placable) {
                    // <div>
                    //      <div className={classes.placable} id={this.props.fieldKey} onClick={this.props.clicked}/>
                    //      <div id="temperatura" class="invisible"/> 
                    //      
                    // </div>
                    field = (
                        <div className={classes.placable} id={this.props.fieldKey} onClick={this.props.clicked}> 
                            <div id={this.props.fieldKey}>{this.props.temperature}</div>
                        </div>
                    )
                } else {
                    field = (
                    
                    <div className={classes.unplacable} onClick={this.props.clicked} id={this.props.fieldKey} >
                        <div id={this.props.fieldKey}>{this.props.temperature}</div>
                    </div>
                    )
                }
            }
            }
        }
        // jesli symulacja jest wlaczona
        else {
            if (this.props.partOfItem) {

                if (this.props.placable) {
                    field =(
                    <div>
                        <div id={this.props.fieldKey} onClick={this.props.clicked} />
                        <div id={this.props.fieldKey}>{this.props.temperature}</div>
                    </div>
                    )
                } else {
                    field = (
                        <div>
                            <div id={this.props.fieldKey} onClick={this.props.clicked} />
                            <div id={this.props.fieldKey}>{this.props.temperature}</div>
                        </div>
                    )
                }
        } else {
            if (this.props.item !== null) {
                if (this.props.placable) {
                    field = (
                        <div>
                            <img 
                                style={{maxWidth: 50*this.props.item.width, maxHeight: 50*this.props.item.length, opacity:0.5}}
                                src={`data:image/jpeg;base64,${this.props.item.file}`} 
                                className={classes.placable} 
                                id={this.props.fieldKey} 
                                onClick={this.props.clicked} />
                        
                            
                        </div>
                    )
                } else {
                    field = (
                        <div>
                            <img 
                                style={{maxWidth: 50*this.props.item.width, maxHeight: 50*this.props.item.length, opacity: 0.3}}
                                src={`data:image/jpeg;base64,${this.props.item.file}`} 
                                className={classes.unplacable} id={this.props.fieldKey} 
                                onClick={this.props.clicked} />
                            <div className={classes.centered}
                                 id={this.props.fieldKey}> {this.props.temperature} </div>
                        </div>
                    )
                }
            } else {
                if (this.props.placable) {
                    // <div>
                    //      <div className={classes.placable} id={this.props.fieldKey} onClick={this.props.clicked}/>
                    //      <div id="temperatura" class="invisible"/> 
                    //      
                    // </div>
                    field = (
                        <div 
                            className={classes.placable} id={this.props.fieldKey} onClick={this.props.clicked}> 
                            <div id={this.props.fieldKey}>{this.props.temperature}</div>
                        </div>
                    )
                } else {
                    field = (
                    
                    <div className={classes.unplacable} onClick={this.props.clicked} id={this.props.fieldKey} >
                        <div id={this.props.fieldKey}>{this.props.temperature}</div>
                    </div>
                    )
                }
            }
        }
        }
        
        return field;
    }
};

export default Field;