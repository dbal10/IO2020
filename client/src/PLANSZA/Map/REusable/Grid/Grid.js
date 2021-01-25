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
                    id={fKey}
                    temperature={props.fields[fKey].temperature} />

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

// const Child = forwardRef((props, ref) => {

//     // The component instance will be extended
//     // with whatever you return from the callback passed
//     // as the second argument
//     useImperativeHandle(ref, () => ({
  
//       getAlert() {
//         alert("getAlert from Child");
//       }
  
//     }));
  
//     return <h1>Hi</h1>;
//   });
