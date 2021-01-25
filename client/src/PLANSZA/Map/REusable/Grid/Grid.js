import React from 'react';

import classes from './Grid.module.css';
import Field from './Field/Field';

const grid = (props) => {
    let transformedFields = Object.keys(props.fields)
    .map(fKey => {
        return [...Array(props.fields[fKey])].map((_, i) => {
            return (
                <Field 
                    placable={props.fields[fKey].placable}
                    partOfItem={props.fields[fKey].partOfItem}
                    item={props.fields[fKey].item}
                    clicked={props.clicked}
                    fieldKey={fKey}
                    key={fKey}
                    id={fKey} />
                // <button
                //     clicked={props.clicked(fKey)}
                //     key={fKey} 
                //     item={props.fields[fKey]}
                // >{props.fields[fKey].item}
                // {/* <img src={URL.createObjectURL(props.fields[fKey].item)} /> */}
                // </button>

            );
        });
    })

    return (
    <div className={classes.Grid}>
        {transformedFields}
    </div>
    );
};

export default grid;
