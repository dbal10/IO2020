import React from 'react';

const mapTemplateInputs = (props) => {
    return (
        // <div className={classes.Inputs}>
        <div style={{fontSize: 20, paddingTop: 2}}> 
            <div>
                <label>Name </label>
                <input 
                    type="text"
                    value={props.mapName} onChange={(event) => props.handleChange(event, "mapName")}
                    ></input>
            </div>
            
            <div>
                <label>Money </label>
                <input 
                    type="number"
                    value={props.money} onChange={(event) => props.handleChange(event, "money")}></input>
            </div>
            
            <div>
                <label>Temp </label>
                <input 
                    type="number"
                    value={props.temperature} onChange={(event) => props.handleChange(event, "temperature")}></input>
            </div>
    
        </div>
    );
};

export default mapTemplateInputs;