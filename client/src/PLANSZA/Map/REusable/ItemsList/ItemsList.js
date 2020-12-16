import React from 'react';

import Item from './Item/Item';

const itemsList = (props) => {
    let item = Object.keys(props.items)
        .map(iKey => {
            return [...Array(props.items[iKey])].map((_, i) => {
                return (
                    <Item key={iKey} clicked={props.clicked} itemKey={iKey} item={props.items[iKey]} />
                );
            })
        })

    return item
};

export default itemsList;