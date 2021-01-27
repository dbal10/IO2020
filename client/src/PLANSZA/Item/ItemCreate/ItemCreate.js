import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import InputSection from '../REusable/InputSection/InputSection';
import ImageSection from '../REusable/ImageSection/ImageSection';
import classes from './ItemCreate.module.css';
import Modal from '../../UI/Modal/Modal';
import ItemManager from '../../../Admin/ItemManager';

class ItemCreate extends Component {
    state = {
        id: null,
        file: null,
        fileToShow: null,
        itemName: '',
        width: 0,
        length: 0,
        realHeight: 0,
        price: 0,
        type: null,
        modalShow: false
    }

    addItemImage = (event) => {
        const file = event.target.files[0];
        console.log(file);

        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                this.setState({
                    file: btoa(reader.result)
                })                
            }
        } 

        reader.readAsBinaryString(file);
    }

    addParam = (event, param) => {
        this.setState({
            id: uuidv4()
        })
        switch (param) {
            case "itemName":
                this.setState({
                    itemName: event.target.value
                })
                break;
            case "width":
                this.setState({
                    width: event.target.value
                })
                break;
            case "length":
                this.setState({
                    length: event.target.value
                })
                break;
            case "realHeight":
                this.setState({
                    realHeight: event.target.value
                })
                break;
            case "price":
                this.setState({
                    price: event.target.value
                })
                break;
            case "type":
                this.setState({
                    type: event.target.value
                })
                break;
            default:
        }
    }

    addItem = () => {
        if (
            this.state.file === null
            || this.state.itemName === ''
            || this.state.width === 0
            || this.state.length === 0
            || this.state.realHeight === 0
            || this.state.price === 0
            || this.state.type === null
        ) {
            this.setState({ modalShow: true })
        } else { this.props.addNewItem(this.state);
                 console.log(this.state)
                 let im = new ItemManager();
                 im.saveItem(this.state);}
    }

    modalClosed = () => {
        this.setState({ modalShow: false })
    }

    render() {
        return (
                <div>
                <Modal show={this.state.modalShow} modalClosed={this.modalClosed}>
                    <div className={classes.Alert}>Fill all fields and chose image!</div>
                </Modal>
                
                <ImageSection file={this.state.file} handleChange={this.addItemImage} onFIleSubmit={this.onFIleSubmit} />
                <InputSection style = {classes.InputSection} values={this.state} handleChange={this.addParam} />
                <div className={classes.ButtonsPosition}>
                    <button onClick={this.addItem} class = "button">Create</button>
                    {/* <button onClick={() => this.props.addNewItem(this.state)}>Create</button> */}
                    <button><Link to="/">Cancel</Link></button>
                </div>
                </div>
        );
    }
};

const mapDispatchToProps = dispatch => {
    return {
        addNewItem: (x) => dispatch({
            type: 'ADDNEWITEM',
            file: x.file,
            itemName: x.itemName,
            width: x.width,
            length: x.length,
            realHeight: x.realHeight,
            price: x.price,
            itemType: x.type
        })
    };
}

export default connect(null, mapDispatchToProps)(ItemCreate);