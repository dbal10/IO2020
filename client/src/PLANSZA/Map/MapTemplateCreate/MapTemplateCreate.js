import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Link } from 'react-router-dom';

import Grid from '../REusable/Grid/Grid';
import classes from './MapTemplateCreate.module.css';
import MapTemplateInputs from '../REusable/MapTemplateInputs/MapTemplateInputs';
import ItemsList from '../REusable/ItemsList/ItemsList';

// const width = 50;
// const length = 50;
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
        // change the placability for user
        if (activatePlacable) {

            const newFields = [...this.state.fields];
            newFields[event.target.id].placable = !newFields[event.target.id].placable;
            this.setState({ fields: newFields });

        } else {
            // place item if possible
            // chcek if item to place is chosen
            if (chosenItemKey != null) {

                const key = parseInt(event.target.id);

                // check if item fit in chosen place on width
                if ((width - this.state.allItems[chosenItemKey].width) >= (key % width)) {
                    // check if item fit in chosen place on length
                    if ((length - this.state.allItems[chosenItemKey].length) >= Math.floor(key / length)) {

                        const newFields = [...this.state.fields];

                        // check if, on all fields, fillen by chosen item, are placed other items and remove them
                        // (if they are multi fields, remove it's partOfItem feilds)
                        // check if, on all fields, fillen by chosen item, are other items partOfItem fields adn remove this item
                        for (let i = 0; i < this.state.allItems[chosenItemKey].width; i++) {
                            for (let j = 0; j < this.state.allItems[chosenItemKey].length; j++) {
                                const partialField = (j * length) + i + key;

                                // if field is not a partOfItem, possibly an item
                                if (!newFields[partialField].partOfItem) {

                                    // if field is not empty = is an item
                                    if (newFields[partialField].item != null) {
                                        this.removeItem(newFields, partialField);
                                    }
                                }
                                // if field si a partOfItem, then this item, main field, is out of range, of item to place
                                // remove this item
                                else {
                                    let xSearch = key % width;
                                    let ySearch = Math.floor(key / length);
                                    // if i = 0 then look for item main field on the left
                                    if (i === 0) {
                                        for (let j2 = 1; j2 <= xSearch; j2++) {
                                            const fieldToCheck = partialField - j2;
                                            // if we it found an item, remove it and it's partOfItem fields
                                            if (newFields[fieldToCheck].item !== null) {
                                                this.removeItem(newFields, fieldToCheck);
                                            }
                                        }
                                    }
                                    // if j = 0 then look for item main field above
                                    if (j === 0) {
                                        for (let i2 = 1; i2 <= ySearch; i2++) {
                                            const fieldToCheck = partialField - i2 * length;
                                            // if we it found an item, remove it and it's partOfItem fields
                                            if (newFields[fieldToCheck].item !== null) {
                                                this.removeItem(newFields, fieldToCheck);
                                            }
                                        }

                                    }
                                }
                            }
                        }

                        // check if field is partOfItem, find this item, remove it and it's partOfItem-fields
                        if (newFields[key].partOfItem) {
                            let xSearch = Math.floor(key / length);;
                            let ySearch = key % width;

                            for (let i = 0; i < ySearch; i++) {
                                for (let j = 0; j < xSearch; j++) {
                                    if ((i !== 0) || (j !== 0)) {
                                        const fieldToCheck = key - i - length * j;
                                        // check if field have an item
                                        if (newFields[fieldToCheck].item != null) {
                                            // check if items width or length is reaching the field where we want to plce new item
                                            if (newFields[fieldToCheck].item.length - j >= 1
                                                || newFields[fieldToCheck].item.width - i >= 1) {
                                                this.removeItem(newFields, fieldToCheck);
                                                i = ySearch;
                                                j = xSearch;
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
                        this.setState({ fields: newFields });
                    }
                }

            }
        }
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
                <button className={classes.rotate}>Rotate</button>
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