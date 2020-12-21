import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Link } from 'react-router-dom';

import Grid from '../REusable/Grid/Grid';
import classes from './MapModify.module.css';
import ItemsList from '../REusable/ItemsList/ItemsList';
import Modal from '../../UI/Modal/Modal';


// jeśli chcecie zmienić rozmiar planszy z testowej na rzeczywisty to pamiętajcie o zmianie siatki w css kompontu grid
// const width = 100;
// const length = 100;
const width = 10;
const length = 10;

let chosenItemKey = null;

class MapModify extends Component {
    state = {
        id: this.props.id,
        fields: this.props.fields,
        allItems: this.props.items,
        money: this.props.money,
        temperature: this.props.temperature,
        mapName: this.props.mapName,
        modal1Show: false,
        modal2Show: false
    }

    removeItem = (newFields, mainField) => {
        for (let i = 0; i < newFields[mainField].item.width; i++) {
            for (let j = 0; j < newFields[mainField].item.length; j++) {
                const removedItemsField = (j * length) + i + mainField;
                newFields[removedItemsField].partOfItem = false;
            }
        }
        newFields[mainField].item = null;
    }

    checkPlacable = (fKey, iKey) => {
        let placable = true;
        for (let i = 0; i < this.state.allItems[iKey].width; i++) {
            for (let j = 0; j < this.state.allItems[iKey].length; j++) {
                const x = (j * length) + i + fKey;
                if (!this.state.fields[x].placable) {
                    placable = false;
                }
            }
        }
        return placable;
    }

    fieldClicked = (event) => {

        let newFields = [...this.state.fields];
        let newMoney = this.state.money;
        const key = parseInt(event.target.id);

        if (newFields[key].item !== null) {

            if (this.checkPlacable(key, chosenItemKey)) { this.removeItem(newFields, key) }

        }
        else {

            // place item if possible
            // chcek if item to place is chosen
            if (chosenItemKey != null) {

                // check if item fit in chosen place on width
                if ((width - this.state.allItems[chosenItemKey].width) >= (key % width)) {
                    // check if item fit in chosen place on length
                    if ((length - this.state.allItems[chosenItemKey].length) >= Math.floor(key / length)) {
                        //check if there is enought money
                        if (this.state.allItems[chosenItemKey].price <= this.state.money) {
                            //chcek if all items future fields are placable
                            if (this.checkPlacable(key, chosenItemKey)) {

                                // check if, on some of fields, fillen by chosen item, are placed other items and remove them
                                // (if they are multi fields, remove it's partOfItem feilds)
                                for (let i = 0; i < this.state.allItems[chosenItemKey].width; i++) {
                                    for (let j = 0; j < this.state.allItems[chosenItemKey].length; j++) {
                                        const partialField = (j * length) + i + key;

                                        // // if field is not a partOfItem, possibly an item
                                        // if (!newFields[partialField].partOfItem) {
                                        if (newFields[partialField].item != null) {
                                            this.removeItem(newFields, partialField);
                                        }

                                    }
                                }

                                // if boundary field is a partOfItem, then this item, main field, is out of range, of item to place
                                // remove this item
                                // chcek width above
                                for (let i = 1; i < this.state.allItems[chosenItemKey].width; i++) {
                                    let ySearch = Math.floor(key / length);

                                    if (newFields[key + i].partOfItem) {
                                        for (let j = 1; j <= ySearch; j++) {
                                            if (newFields[key + i - j * length].item !== null) {
                                                if (newFields[key + i - j * length].item.width > i
                                                    && newFields[key + i - j * length].item.length > j) {
                                                    this.removeItem(newFields, key + i - j * length);
                                                }
                                            }
                                        }
                                    }
                                }

                                // check length left
                                for (let j = 1; j < this.state.allItems[chosenItemKey].length; j++) {
                                    let xSearch = key % width;

                                    if (newFields[key + j * length].partOfItem) {
                                        for (let i = 1; i <= xSearch; i++) {
                                            if (newFields[key + j * length - i].item !== null) {
                                                if (newFields[key + j * length - i].item.width > i
                                                    && newFields[key + j * length - i].item.length > j) {
                                                    this.removeItem(newFields, key + j * length - i);
                                                }
                                            }
                                        }
                                    }
                                }

                                // check left top corner
                                if (newFields[key].partOfItem) {
                                    let xSearch = key % width;
                                    let ySearch = Math.floor(key / length);

                                    for (let i = 0; i <= xSearch; i++) {
                                        for (let j = 0; j <= ySearch; j++) {
                                            if (i !== 0 || j !== 0) {
                                                const fieldToCheck = key - i - j * length;
                                                if (newFields[fieldToCheck].item !== null) {
                                                    if (newFields[fieldToCheck].item.width > i
                                                        && newFields[fieldToCheck].item.length > j) {
                                                        this.removeItem(newFields, fieldToCheck);
                                                        i = xSearch + 1;
                                                        j = ySearch + 1;
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }

                                // place item
                                for (let i = 0; i < this.state.allItems[chosenItemKey].width; i++) {
                                    for (let j = 0; j < this.state.allItems[chosenItemKey].length; j++) {
                                        const x = (j * length) + i + key;
                                        newFields[x].item = null;
                                        newFields[x].partOfItem = true;
                                    }
                                }

                                newMoney -= this.state.allItems[chosenItemKey].price;
                                newFields[key].partOfItem = false;
                                newFields[key].item = JSON.parse(JSON.stringify(this.state.allItems[chosenItemKey]));

                            } else { this.setState({ modal2Show: true })}
                        } else { this.setState({ modal1Show: true })}
                    } else { this.setState({ modal2Show: true })}
                } else { this.setState({ modal2Show: true })}
            }
        }

        this.setState({ money: newMoney });
        this.setState({ fields: newFields });
    }

    itemClicked = (event) => {
        chosenItemKey = event.target.id;
    }

    modal1Closed = () => {
        this.setState({ modal1Show: false })
    }
    
    modal2Closed = () => {
        this.setState({ modal2Show: false })
    }

    modifyMap = () => {
        if (
            this.state.fields === []
            || this.state.money === null
            || this.state.temperature === null
            || this.state.mapName === null
            || this.state.mapName === ''
        ) {
            this.setState({ modalShow: true })
        } else { this.props.modifyMap(this.state); }
    }

    render() {
        return (
            <div className={classes.container}>
                <Modal show={this.state.modal1Show} modalClosed={this.modal1Closed}>
                    <p>You don't have enought money</p>
                </Modal>
                <Modal show={this.state.modal2Show} modalClosed={this.modal2Closed}>
                    <p>Item don't fit in placable fields</p>
                </Modal>
                <div className={classes.map}>
                    <Grid clicked={this.fieldClicked} fields={this.state.fields} />
                </div>
                {/* <button className={classes.createmap} onClick={this.createEmptyFields}>Make empty Map</button> */}
                <div className={classes.inputs}>
                    <div>Map name: {this.state.mapName}</div>
                    <div>Avaliable money: {this.state.money}</div>
                    <div>Temperature: {this.state.temperature}</div>
                </div>
                <div className={classes.items}>
                    <ItemsList clicked={this.itemClicked} items={this.state.allItems} />
                </div>
                <button className={classes.placable} onClick={() => this.switchToPlacable()}>Chose placable fields and avaliable items</button>
                <button className={classes.symulation}>Symulation</button>
                <button className={classes.add} onClick={this.modifyMap}>Save</button>
                <Route className={classes.ret} path="/map/modify" exact render={() => <button><Link to="/">Return</Link></button>} />
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

const mapDispatchToProps = dispatch => {
    return {
        modifyMap: (x) => dispatch({
            type: 'MODIFYMAP',
            id: x.id,
            mapName: x.mapName,
            money: x.money,
            temperature: x.temperature,
            fields: x.fields,
            userItems: x.allItems
        })
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MapModify);