import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Link } from 'react-router-dom';

import Grid from '../REusable/Grid/Grid';
import classes from './MapTemplateCreate.module.css';
import MapTemplateInputs from '../REusable/MapTemplateInputs/MapTemplateInputs';
import ItemsList from '../REusable/ItemsList/ItemsList';


// jeśli chcecie zmienić rozmiar planszy z testowej na rzeczywisty to pamiętajcie o zmianie siatki w css kompontu grid
// const width = 100;
// const length = 100;
const width = 10;
const length = 10;

let activatePlacable = false;
let chosenItemKey = null;

class MapTemplateCreate extends Component {
    state = {
        fields: [],
        allItems: this.props.items,
        money: null,
        temperature: null,
        mapName: null
    }

    createEmptyFields = () => {
        let newFields = [];
        for (let i = 0; i < length; i++) {
            for (let j = 0; j < width; j++) {
                newFields = [
                    ...newFields,
                    {
                        item: null,
                        partOfItem: false,
                        placable: false
                    }
                ]
            }
        }
        let newItems = this.state.allItems.map(item => {
            let x = JSON.parse(JSON.stringify(item));
            x.avaliable = false;
            return x;
        })
        this.setState({ fields: newFields });
        this.setState({ allItems: newItems });
    }

    addParam = (event, param) => {
        switch (param) {
            case "mapName":
                this.setState({
                    mapName: event.target.value
                })
                break;
            case "money":
                this.setState({
                    money: event.target.value
                })
                break;
            case "temperature":
                this.setState({
                    temperature: event.target.value
                })
                break;
            default:
        }
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

    fieldClicked = (event) => {

        const newFields = [...this.state.fields];
        const key = parseInt(event.target.id);

        // change the placability for user
        if (activatePlacable) {

            const mainplacable = !newFields[key].placable;

            // change placable for whole item if key is the main field
            if (newFields[key].item !== null) {
                for (let i = 0; i < newFields[key].item.width; i++) {
                    for (let j = 0; j < newFields[key].item.length; j++) {
                        const changedItemsField = (j * length) + i + key;
                        newFields[changedItemsField].placable = mainplacable;
                    }
                }
            }

            // if key is a partOfItem find main field and change placable for whole item
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
                                    for (let i2 = 0; i2 < newFields[fieldToCheck].item.width; i2++) {
                                        for (let j2 = 0; j2 < newFields[fieldToCheck].item.length; j2++) {
                                            const changedItemsField = (j2 * length) + i2 + fieldToCheck;
                                            newFields[changedItemsField].placable = mainplacable;
                                        }
                                    }
                                    i = xSearch + 1;
                                    j = ySearch + 1;
                                }
                            }
                        }
                    }
                }
            }

            newFields[key].placable = mainplacable;
        }
        else {

            if (newFields[key].item !== null) { this.removeItem(newFields, key) }
            else {

                // place item if possible
                // chcek if item to place is chosen
                if (chosenItemKey != null) {

                    // check if item fit in chosen place on width
                    if ((width - this.state.allItems[chosenItemKey].width) >= (key % width)) {
                        // check if item fit in chosen place on length
                        if ((length - this.state.allItems[chosenItemKey].length) >= Math.floor(key / length)) {

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

                            newFields[key].partOfItem = false;
                            newFields[key].item = JSON.parse(JSON.stringify(this.state.allItems[chosenItemKey]));
                        }
                    }
                }
            }
        }

        this.setState({ fields: newFields });
    }

    itemClicked = (event) => {
        if (activatePlacable) {
            const newItems = [...this.state.allItems];
            newItems[event.target.id].avaliable = !newItems[event.target.id].avaliable;
            this.setState({ allItems: newItems });
        } else {
            chosenItemKey = event.target.id;
        }
    }

    switchToPlacable = () => {
        activatePlacable = !activatePlacable;
    }

    render() {
        return (
            <div className={classes.container}>
                <div className={classes.map}>
                    <Grid clicked={this.fieldClicked} fields={this.state.fields} />
                </div>
                <button className={classes.createmap} onClick={this.createEmptyFields}>Make empty Map</button>
                <MapTemplateInputs
                    className={classes.inputs}
                    money={this.state.money}
                    temperature={this.state.temperature}
                    mapName={this.state.mapName}
                    handleChange={this.addParam} />
                <div className={classes.items}>
                    <ItemsList clicked={this.itemClicked} items={this.state.allItems} />
                </div>
                <button className={classes.placable} onClick={() => this.switchToPlacable()}>Chose placable fields and avaliable items</button>
                <button className={classes.symulation}>Symulation</button>
                <button className={classes.add}>Add</button>
                <Route className={classes.ret} path="/map/template/create" exact render={() => <button><Link to="/">Return</Link></button>} />
            </div>
        );
    }
};

const mapStateToProps = state => {
    return {
        items: state.items
    };
}

// const mapDispatchToProps = dispatch => {
//     return {
//         modifyItem: (x) => dispatch({
//             type: 'MODIFYITEM',
//             id: x.id,
//             file: x.file,
//             itemName: x.itemName,
//             width: x.width,
//             length: x.length,
//             realHeight: x.realHeight,
//             price: x.price,
//             itemType: x.type
//         })
//     };
// }

export default connect(mapStateToProps)(MapTemplateCreate);