import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Link } from 'react-router-dom';

import Grid from '../REusable/Grid/Grid';
import classes from './MapModify.module.css';
import ItemsList from '../REusable/ItemsList/ItemsList';
import Modal from '../../UI/Modal/Modal';

import toast from 'toasted-notes' 
import 'toasted-notes/src/styles.css';
import Simulation from '../../../Model/simulation';


// jeśli chcecie zmienić rozmiar planszy z testowej na rzeczywisty to pamiętajcie o zmianie siatki w css kompontu grid
// const width = 100;
// const length = 100;
const width = 10;
const length = 10;
let simulatingOn = false;

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

    checkMoney = () => {
        if (this.state.allItems[chosenItemKey].price <= this.state.money) {
            return true;
        } else {
            return false;
        }
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
    
    placeItem = (newFields, mainField) => {
        for (let i = 0; i < this.state.allItems[chosenItemKey].width; i++) {
            for (let j = 0; j < this.state.allItems[chosenItemKey].length; j++) {
                const x = (j * length) + i + mainField;
                newFields[x].item = null;
                newFields[x].partOfItem = true;
            }
        }
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
                // check if item fit in chosen place on length
                if (this.chcekFit(key)) {

                    //check if there is enought money
                    if (this.checkMoney()) {

                        //chcek if all items future fields are placable
                        if (this.checkPlacable(key, chosenItemKey)) {

                            // check if, on some of fields, fillen by chosen item, are placed other items and remove them
                            // (if they are multi fields, remove it's partOfItem feilds)
                            // if boundary field is a partOfItem, then this item, main field, is out of range, of item to place
                            // remove this item
                            this.checkItemsToRemove(newFields, key);

                            // place item
                            this.placeItem(newFields, key);

                            newMoney -= this.state.allItems[chosenItemKey].price;
                            newFields[key].partOfItem = false;
                            newFields[key].item = JSON.parse(JSON.stringify(this.state.allItems[chosenItemKey]));

                        } else { this.setState({ modal2Show: true }) }
                    } else { this.setState({ modal1Show: true }) }
                } else { this.setState({ modal2Show: true }) }
            } else { this.setState({ modal2Show: true }) }
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

    simulate = () => {
        const newFields = [...this.state.fields];

        if(!simulatingOn){
            simulatingOn=true;
            //konwertowanie fields na format zgodny z oczekiwaniami modulu
            let fieldsToPass = [];
            for(var i =0; i<this.state.fields.length; i++){
                if(this.state.fields[i].partOfItem == false && 
                    this.state.fields[i].item != null){
                        fieldsToPass.push({
                            id: this.state.fields[i].item.id,
                            file: this.state.fields[i].item.file,
                            itemName: this.state.fields[i].itemName,
                            width: parseInt(this.state.fields[i].item.width),
                            length: parseInt(this.state.fields[i].item.length),
                            realHeight: parseInt(this.state.fields[i].item.realHeight),
                            price: parseFloat(this.state.fields[i].item.price),
                            itemType: this.state.fields[i].item.itemType,
                            x: i % length,
                            y: Math.floor(i/width)
                        })
                    }
            }

            let simulation = new Simulation(fieldsToPass, 19, 0.5, length, width, 7,0.0001);

            toast.notify("Average temperature: " + Math.round(simulation.computeTemperature() * 10 ) / 10);
            
            let temperature = simulation.simulate();
            
        
            for(var i in newFields){
                newFields[i].temperature= Math.round(temperature[i].temperature * 10) / 10;
            }
        }
        else{
            simulatingOn = false
            let newFields = [...this.state.fields];

            for( var i in newFields){
                newFields[i].temperature = null;
            }
        }
        
        

        this.setState({ fields: newFields });
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
                <button className={classes.symulation} onClick={this.simulate}>Simulation</button>
                <button className={classes.add} onClick={this.modifyMap}>Save</button>
                <Route path="/map/modify" exact render={() => <button className={classes.ret}><Link to="/">Return</Link></button>} />
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