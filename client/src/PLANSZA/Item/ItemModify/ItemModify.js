import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import InputSection from '../REusable/InputSection/InputSection';
import ImageSection from '../REusable/ImageSection/ImageSection';
import classes from '../ItemModify/ItemModify.module.css';
import Modal from '../../UI/Modal/Modal';

class ItemModify extends Component {
    state = {
        id: this.props.id,
        file: this.props.file,
        fileToShow: null,
        itemName: this.props.itemName,
        width: this.props.width,
        length: this.props.length,
        realHeight: this.props.realHeight,
        price: this.props.price,
        type: this.props.type,
        modalShow: false
    }

    addItemImage = (event) => {
        this.setState({
            fileToShow: URL.createObjectURL(event.target.files[0]),
            file: event.target.files[0]
        })
    }

    addParam = (event, param) => {
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
            || this.state.itemName === null
            || this.state.itemName === ''
            || this.state.width === null
            || this.state.length === null
            || this.state.realHeight === null
            || this.state.price === null
            || this.state.type === null
        ) {
            this.setState({ modalShow: true })
        } else { this.props.modifyItem(this.state); }
    }

    modalClosed = () => {
        this.setState({ modalShow: false })
    }

    render() {
        return (
            <div>
                <Modal show={this.state.modalShow} modalClosed={this.modalClosed}>
                    <p>Fill all fields and chose image</p>
                </Modal>
                <ImageSection file={this.state.fileToShow} handleChange={this.addItemImage} />
                <InputSection values={this.state} handleChange={this.addParam} ></InputSection>
                <div className={classes.ButtonsPosition}>
                    <button onClick={this.addItem}>Create</button>
                    {/* <button onClick={() => this.props.addNewItem(this.state)}>Create</button> */}
                    <button><Link to="/">Cancel</Link></button>                    
                </div>
            </div>
        );
    }
};

const mapStateToProps = state => {
    return {
        id: state.items[0].id,
        file: state.items[0].file,
        itemName: state.items[0].itemName,
        width: state.items[0].width,
        length: state.items[0].length,
        realHeight: state.items[0].realHeight,
        price: state.items[0].price,
        type: state.items[0].type
    };
}

const mapDispatchToProps = dispatch => {
    return {
        modifyItem: (x) => dispatch({
            type: 'MODIFYITEM',
            id: x.id,
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

export default connect(mapStateToProps, mapDispatchToProps)(ItemModify);