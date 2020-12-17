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
let chosenItem = null;

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

    fieldClicked = (i) => {
        if (activatePlacable) {
            const newFields = [...this.state.fields];
            console.log(i.target.id)
            newFields[i.target.id].placable = !newFields[i.target.id].placable;
            this.setState({ fields: newFields });
        } else {
            if (chosenItem != null) {
                console.log(i.target.id);
                const newFields = [...this.state.fields];
                console.log(newFields);
                console.log(newFields[i.target.id]);
                newFields[i.target.id].item = JSON.parse(JSON.stringify(this.state.allItems[chosenItem]));
                this.setState({ fields: newFields });
            }
        }
    }

    itemClicked = (i) => {
        if (activatePlacable) {
            const newItems = [...this.state.allItems];
            newItems[i.target.id].avaliable = !newItems[i.target.id].avaliable;
            this.setState({ allItems: newItems });
        } else {
            chosenItem = i.target.id;
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