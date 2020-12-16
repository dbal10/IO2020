import React from 'react';

import classes from './MapTemplateInputs.module.css';

const mapTemplateInputs = (props) => {
    return (
        // <div className={classes.Inputs}>
        <div> 
            <label>Map name</label>
            <input 
                type="text"
                value={props.mapName} onChange={(event) => props.handleChange(event, "mapName")}
                ></input>
            <label>Avaliable money</label>
            <input 
                type="number"
                value={props.money} onChange={(event) => props.handleChange(event, "money")}></input>
            <label>Temperature</label>
            <input 
                type="number"
                value={props.temperature} onChange={(event) => props.handleChange(event, "temperature")}></input>
        </div>
    );
};

export default mapTemplateInputs;