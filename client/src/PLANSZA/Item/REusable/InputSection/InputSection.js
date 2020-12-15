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
            value={props.values.width} onChange={(event) => props.handleChange(event, "width")}>
        </input>
        <label>Length</label>
        <input
            type="number"
            value={props.values.length} onChange={(event) => props.handleChange(event, "length")}>
        </input>
        <label>Real Height</label>
        <input
            type="number"
            value={props.values.realHeight} onChange={(event) => props.handleChange(event, "realHeight")}>
        </input>
        <label>Price</label>
        <input
            type="number"
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
            <option value="Building" />
            <option value="Plant" />
            <option value="Water" />
            <option value="Accesory" />
            <option value="Road" />
            <option value="Grass" />
        </datalist>
    </div>
);

export default inputSection;