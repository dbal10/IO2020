import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Link } from 'react-router-dom';

import Grid from '../REusable/Grid/Grid';
import classes from './MapTemplateCreate.module.css';
import MapTemplateInputs from '../REusable/MapTemplateInputs/MapTemplateInputs';
import ItemsList from '../REusable/ItemsList/ItemsList';
import Modal from '../../UI/Modal/Modal';

import toast from 'toasted-notes' 
import 'toasted-notes/src/styles.css';


// jeśli chcecie zmienić rozmiar planszy z testowej na rzeczywisty to pamiętajcie o zmianie siatki w css kompontu grid
// const width = 100;
// const length = 100;
const width = 10;
const length = 10;

let activatePlacable = false;
let chosenItemKey = null;
let emptyFieldsPlacable = true;
let simulatingOn = false;


class MapTemplateCreate extends Component {

    state = {
        fields: [],
        allItems: this.props.items,
        money: 1000,
        temperature: 30,
        mapName: '',
        modalShow: false
    }

    createEmptyFields = () => {
        let newFields = [];
        for (let i = 0; i < length; i++) {
            for (let j = 0; j < width; j++) {
                newFields = [
                    ...newFields,
                    {
                        item: null,
                        image: null,
                        partOfItem: false,
                        placable: false,
                        temperature: null,
                    }
                ]
            }
        }
        let newItems = this.state.allItems.map(item => {
            let x = JSON.parse(JSON.stringify(item));
            x.avaliable = true;
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
        console.log("after removing item" + newFields[mainField].item)
    }

    placeItem = (newFields, mainField) => {
        for (let i = 0; i < this.state.allItems[chosenItemKey].width; i++) {
            for (let j = 0; j < this.state.allItems[chosenItemKey].length; j++) {
                const x = (j * length) + i + mainField;
                newFields[x].item = null;
                newFields[x].partOfItem = true;
                console.log("fields item after placing item: " + newFields[x].item)
            }
        }
        this.changePlacableMainField(newFields, mainField);
    }

    chcekFit = (mainFIled) => {
        // check if item fit in chosen place on width
        if ((width - this.state.allItems[chosenItemKey].width) >= (mainFIled % width)) {
            // check if item fit in chosen place on length
            if ((length - this.state.allItems[chosenItemKey].length) >= Math.floor(mainFIled / length)) {
                return true;
            }
        }
        return false;
    }

    checkItemsToRemove = (newFields, mainField) => {
        // check if, on some of fields, fillen by chosen item, are placed other items and remove them
        // (if they are multi fields, remove it's partOfItem feilds)
        for (let i = 0; i < this.state.allItems[chosenItemKey].width; i++) {
            for (let j = 0; j < this.state.allItems[chosenItemKey].length; j++) {
                const partialField = (j * length) + i + mainField;

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
            let ySearch = Math.floor(mainField / length);

            if (newFields[mainField + i].partOfItem) {
                for (let j = 1; j <= ySearch; j++) {
                    if (newFields[mainField + i - j * length].item !== null) {
                        if (newFields[mainField + i - j * length].item.width > i
                            && newFields[mainField + i - j * length].item.length > j) {
                            this.removeItem(newFields, mainField + i - j * length);
                        }
                    }
                }
            }
        }

        // check length left
        for (let j = 1; j < this.state.allItems[chosenItemKey].length; j++) {
            let xSearch = mainField % width;

            if (newFields[mainField + j * length].partOfItem) {
                for (let i = 1; i <= xSearch; i++) {
                    if (newFields[mainField + j * length - i].item !== null) {
                        if (newFields[mainField + j * length - i].item.width > i
                            && newFields[mainField + j * length - i].item.length > j) {
                            this.removeItem(newFields, mainField + j * length - i);
                        }
                    }
                }
            }
        }

        // check left top corner
        if (newFields[mainField].partOfItem) {
            let xSearch = mainField % width;
            let ySearch = Math.floor(mainField / length);

            for (let i = 0; i <= xSearch; i++) {
                for (let j = 0; j <= ySearch; j++) {
                    if (i !== 0 || j !== 0) {
                        const fieldToCheck = mainField - i - j * length;
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
    }

    // change placable for whole item if key is the main field
    changePlacableMainField = (newFields, key, mainplacable) => {
        if (newFields[key].item !== null) {
            for (let i = 0; i < newFields[key].item.width; i++) {
                for (let j = 0; j < newFields[key].item.length; j++) {
                    const changedItemsField = (j * length) + i + key;
                    newFields[changedItemsField].placable = mainplacable;
                }
            }
        }
    }

    // if key is a partOfItem find main field and change placable for whole item
    changePlacablePartOfItem = (newFields, key, mainplacable) => {
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
    }

    fieldClicked = (event) => {
            const newFields = [...this.state.fields];
            const key = parseInt(event.target.id);

            console.log("Event: " + event);
            console.log("Event taraget: " + event.target)

            // change the placability for user
            if (activatePlacable) {

                const mainplacable = !newFields[key].placable;

                // change placable for whole item if key is the main field
                this.changePlacableMainField(newFields, key, mainplacable);

                // if key is a partOfItem find main field and change placable for whole item
                this.changePlacablePartOfItem(newFields, key, mainplacable)

                newFields[key].placable = mainplacable;
            }
            else {
                console.log("Field to change: " + newFields[key]);
                console.log("Field index: " + key);

                if (newFields[key].item !== null) { this.removeItem(newFields, key) }
                else {

                    // place item if possible
                    // chcek if item to place is chosen
                    if (chosenItemKey != null) {

                        // check if item fit in chosen place on width
                        // check if item fit in chosen place on length
                        if (this.chcekFit(key)) {

                            // check if, on some of fields, fillen by chosen item, are placed other items and remove them
                            // (if they are multi fields, remove it's partOfItem feilds)
                            // if boundary field is a partOfItem, then this item, main field, is out of range, of item to place
                            // remove this item
                            this.checkItemsToRemove(newFields, key);

                            // place item
                            this.placeItem(newFields, key);

                            newFields[key].partOfItem = false;
                            newFields[key].item = JSON.parse(JSON.stringify(this.state.allItems[chosenItemKey]));
                            console.log("after setting item: " + newFields[key].item)
                        }
                    }
                }
            }

            this.setState({ fields: newFields });
            // if(simulatingOn){
            //     this.simulate();
            // }
    }

    itemClicked = (event) => {
        console.log("item clicked, activate placeable" + activatePlacable)
        if (activatePlacable) {
            const newItems = [...this.state.allItems];
            newItems[event.target.id].avaliable = !newItems[event.target.id].avaliable;
            this.setState({ allItems: newItems });
        } else {
            chosenItemKey = event.target.id;
        }
    }

    switchEmptyFieldsPlacable = () => {
        let newFields = [...this.state.fields];
        for (let i = 0; i < length; i++) {
            for (let j = 0; j < width; j++) {
                if (newFields[i * length + j].item === null && newFields[i * length + j].partOfItem === false) {
                    newFields[i * length + j].placable = emptyFieldsPlacable;
                }
            }
        }
        emptyFieldsPlacable = !emptyFieldsPlacable;
        this.setState({ fields: newFields });
    }

    switchToPlacable = () => {
        console.log("switching placable, before: " + activatePlacable);
        activatePlacable = !activatePlacable;
        console.log("switching placable, after: " + activatePlacable);
    }

    modalClosed = () => {
        this.setState({ modalShow: false })
    }

    addMapTemplate = () => {
        if(simulatingOn){
            simulatingOn = false;
            this.stopSimulation();
        }
        if (
            this.state.fields === []
            || this.state.money === null
            || this.state.money === 0
            || this.state.temperature === null
            || this.state.mapName === null
            || this.state.mapName === ''
        ) {
            this.setState({ modalShow: true })
        } else { this.props.addMapTemplate(this.state); }
    }

    simulate = () => {
        const newFields = [...this.state.fields];

        console.log(this.state.fields)

        if(!simulatingOn) {
            simulatingOn = true;
        }
            //konwertowanie fields na format zgodny z oczekiwaniami modulu
        let fieldsToPass = [];
        for(var i =0; i<this.state.fields.length; i++){
            if(this.state.fields[i].partOfItem == false && 
                this.state.fields[i].item != null){
                    fieldsToPass.push({
                        id: this.state.fields[i].item.id,
                        file: this.state.fields[i].item.file,
                        width: this.state.fields[i].item.width,
                        length: this.state.fields[i].item.length,
                        realHeight: this.state.fields[i].item.realHeight,
                        price: this.state.fields[i].item.price,
                        itemType: this.state.fields[i].item.itemType,
                        x: i % length,
                        y: Math.floor(i/width)
                    })
                }
        }

        let body = JSON.stringify(
            {
                items: fieldsToPass,
                initialTemperature: 20,
                mapX: length,
                mapY: width
            }
        )

        //sending request
        var http = new XMLHttpRequest();
        http.addEventListener('load', () => {
            // dealing with result of the request
        })
        const url='http://localhost:500/computedGrids';
        http.open("GET", url);
        http.send(body);

        toast.notify("Average temperature: " + 17);
    
        for(i in newFields){
            newFields[i].temperature= 2 * i
        }
        

        this.setState({ fields: newFields });
     }

    stopSimulation = () =>{
        simulatingOn = false
        let newFields = [...this.state.fields];

        for( var i in newFields){
            newFields[i].temperature = null;
        }

        this.setState({ fields: newFields });

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
                <button className={classes.createmap} onClick={this.createEmptyFields}>Make empty Map</button>
                <div className={classes.inputs}>
                    <MapTemplateInputs
                        money={this.state.money}
                        temperature={this.state.temperature}
                        mapName={this.state.mapName}
                        handleChange={this.addParam} />                    
                </div>

                <div className={classes.items}>
                    <ItemsList clicked={this.itemClicked} items={this.state.allItems} />
                </div>
                <button className={classes.placable} onClick={() => this.switchToPlacable()}>Chose placable fields and avaliable items</button>
                <button className={classes.placableForMany} onClick={this.switchEmptyFieldsPlacable}>Change placable for all empty fields</button>
                {/* TODO formularz do wprowadzania wartosci dla symulacji */}
                <button className={classes.symulation} onClick={this.simulate}>Start Simulation</button>
                <button className={classes.stopSimulation} onClick={this.stopSimulation}>Stop Simulation</button>
                <button className={classes.add} onClick={this.addMapTemplate}>Add</button>
                <Route path="/map/template/create" exact render={() => <button className={classes.ret}><Link to="/">Return</Link></button>} />
            </div>
        );
    }
};

const mapStateToProps = state => {
    return {
        items: state.items
    };
}

const mapDispatchToProps = dispatch => {
    return {
        addMapTemplate: (x) => dispatch({
            type: 'CREATEMAPTEMPLATE',
            mapName: x.mapName,
            money: x.money,
            temperature: x.temperature,
            fields: x.fields,
            userItems: x.allItems.filter(item => { return item.avaliable }),
            cokolwiek: x.mapName
        })
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MapTemplateCreate);