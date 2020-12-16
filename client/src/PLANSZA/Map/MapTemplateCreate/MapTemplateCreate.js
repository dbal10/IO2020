import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Link } from 'react-router-dom';

import Grid from '../REusable/Grid/Grid';
import classes from './MapTemplateCreate.module.css';

const width = 50;
const length = 50;

class MapTemplateCreate extends Component {
    state = {
        fields: [],
        allItems: [],
        avaliableItems: [],
        money: null,
        temperature: null
    }

    createEmptyFields = () => {
        let newFields = [];
        for (let i = 0; i < length; i++) {
            for (let j = 0; j < width; j++) {
                newFields = [
                    ...newFields,
                    {
                        id: i * length + j,
                        item: 1,
                        partOfItem: false,
                        placable: false
                    }
                ]
            }
        }
        this.setState({ fields: newFields })
    }

    render() {
        return (
            <div style={{display: 'flex', justifyContent: 'space-evenly'}}>
                <div className={classes.Grid}>
                    <button onClick={this.createEmptyFields}>Make empty Map</button>
                    <Grid fields={this.state.fields} />
                </div>
                <div className={classes.Control}>
                    <div>x</div>
                    <Route path="/map/template/create" exact render={() => <button><Link to="/">Return</Link></button>} />
                </div>
            </div>
        );
    }
};

export default MapTemplateCreate;