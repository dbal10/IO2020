import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Link } from 'react-router-dom';
// import {toPng} from 'html-to-image';

import Grid from '../REusable/Grid/Grid';
import classes from './MapShow.module.css';
import ItemsList from '../REusable/ItemsList/ItemsList';
import Modal from '../../UI/Modal/Modal';

var htmlToImage = require('html-to-image');

class MapShow extends Component {
    state = {
        id: this.props.id,
        fields: this.props.fields,
        allItems: this.props.items,
        money: this.props.money,
        temperature: this.props.temperature,
        mapName: this.props.mapName,
    }

    //Metoda odpowiadajaca za pobieranie. Przeczytaj README, zeby dzialala u Ciebie Ancymonie Ty jeden Ty :* lofki
    saveToJpeg() {
        htmlToImage.toJpeg(document.getElementById('map'), { quality: 0.95 })
        .then(function (dataUrl) {
          var link = document.createElement('a');
          link.download = 'Mapa.jpeg';
          link.href = dataUrl;
          link.click();
        });
    }

    simulate = () => {}

    render() {
        return (
            <div className={classes.container}>
                <Modal show={this.state.modalShow} modalClosed={this.modalClosed}>
                    <p>Make map, fill name, money and temperature</p>
                </Modal>
                <div className={classes.map} id='map'>
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
                <button className={classes.symulation} onClick={ this.simulate }>Simulation</button>
                <Route path="/map/show" exact render={() => <button className={classes.ret}><Link to="/">Return</Link></button>} />

                <button className={classes.save_to_image} onClick={this.saveToJpeg}>Save as JPEG</button>
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