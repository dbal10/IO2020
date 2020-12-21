import React from 'react';

import classes from './InputSection.module.css';


const inputSection = (props) => (
    <div className={classes.InputSection}>
        <label>Name</label>
        <input
            type="text"
            value={props.values.itemName} onChange={(event) => props.handleChange(event, "itemName")}>
        </input>
        <label>Width</label>
        <input
            type="number"
            min='1'
            value={props.values.width} onChange={(event) => props.handleChange(event, "width")}>
        </input>
        <label>Length</label>
        <input
            type="number"
            min='1'
            value={props.values.length} onChange={(event) => props.handleChange(event, "length")}>
        </input>
        <label>Real Height</label>
        <input
            type="number"
            step="0.01"
            min='0.01'
            value={props.values.realHeight} onChange={(event) => props.handleChange(event, "realHeight")}>
        </input>
        <label>Price</label>
        <input
            type="number"
            min='1'
            value={props.values.price} onChange={(event) => props.handleChange(event, "price")}>
        </input>
        <label >Type</label>
        <input
            list="types"
            id="myTypes"
            name="myTypes"
            onChange={(event) => props.handleChange(event, "type")}
        />
        <datalist id="types">
            <option value="building" />
            <option value="vegetation" />
            <option value="water" />
            <option value="accessory" />
            <option value="road" />
        </datalist>
    </div>
);

export default inputSection;