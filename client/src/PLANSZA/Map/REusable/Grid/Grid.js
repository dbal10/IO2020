import React from 'react';

import classes from './Grid.module.css';

const grid = (props) => {
    let transformedFields = Object.keys(props.fields)
    .map(fKey => {
        return [...Array(props.fields[fKey])].map((_, i) => {
            return <div key={fKey} item={props.fields[fKey]}>{props.fields[fKey].item}</div>;
        });
    })

    return (
    <div className={classes.Grid}>
        {transformedFields}
    </div>
    );
};

export default grid;
