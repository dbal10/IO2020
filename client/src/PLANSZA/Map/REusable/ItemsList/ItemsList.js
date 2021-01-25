import React from 'react';

import Item from './Item/Item';
import classes from './ItemsList.module.css';

const itemsList = (props) => {
    if (props.item!=null){
        let items = Object.keys(props.items)
        .map(iKey => {
            return [...Array(props.items[iKey])].map((_, i) => {
                return (
                    <Item key={iKey} clicked={props.clicked} itemKey={iKey} item={props.items[iKey]} />
                );
            })
        })

    return (
    <div className={classes.items}>
        {items}
    </div>       
    )
    }
    return (
        <div className={classes.items}>
        </div>  
    )

};

export default itemsList;