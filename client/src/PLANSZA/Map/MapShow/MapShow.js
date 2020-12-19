import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Link } from 'react-router-dom';

import Grid from '../REusable/Grid/Grid';
import classes from './MapShow.module.css';
import ItemsList from '../REusable/ItemsList/ItemsList';
import Modal from '../../UI/Modal/Modal';


// jeśli chcecie zmienić rozmiar planszy z testowej na rzeczywisty to pamiętajcie o zmianie siatki w css kompontu grid
// const width = 100;
// const length = 100;
const width = 10;
const length = 10;

class MapShow extends Component {
    state = {
        id: this.props.id,
        fields: this.props.fields,
        allItems: this.props.items,
        money: this.props.money,
        temperature: this.props.temperature,
        mapName: this.props.mapName,
    }

    render() {
        return (
            <div className={classes.container}>
                <Modal show={this.state.modalShow} modalClosed={this.modalClosed}>
                    <p>Make map, fill name, money and temperature</p>
                </Modal>
                <div className={classes.map}>
                    <Grid clicked={this.fieldClicked} fields={this.state.fields} />
                </div>
                <div className={classes.inputs}>
                    <div>Map name: {this.state.mapName}</div>
                    <div>Avaliable money: {this.state.money}</div>
                    <div>Temperature: {this.state.temperature}</div>
                </div>
                <div className={classes.items}>
                    <ItemsList clicked={this.itemClicked} items={this.state.allItems} />
                </div>
                <button className={classes.symulation}>Symulation</button>
                <Route className={classes.ret} path="/map/show" exact render={() => <button><Link to="/">Return</Link></button>} />
            </div>
        );
    }
};

const mapStateToProps = state => {
    return {
        items: state.maps[0].userItems,
        id: state.maps[0].id,
        mapName: state.maps[0].mapName,
        money: state.maps[0].money,
        temperature: state.maps[0].temperature,
        fields: state.maps[0].fields,
    };
};

export default connect(mapStateToProps)(MapShow);