import uuid from 'react-uuid';

const initialState = {
    info: 'Redux and react-redux connected',
    items: [],
    maps: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADDNEWITEM':
            return {
                ...state,
                items: state.items.concat(
                    {
                        id: uuid(),
                        file: action.file,
                        itemName: action.itemName,
                        width: action.width,
                        length: action.length,
                        realHeight: action.realHeight,
                        price: action.price,
                        itemType: action.itemType
                    }
                )
            }
        case 'MODIFYITEM':
            const newItems = state.items.filter(item => item.id !== action.id);
            return {
                ...state,
                items: newItems.concat(
                    {
                        id: action.id,
                        file: action.file,
                        itemName: action.itemName,
                        width: action.width,
                        length: action.length,
                        realHeight: action.realHeight,
                        price: action.price,
                        itemType: action.itemType
                    }
                )
            }
        case 'CREATEMAPTEMPLATE':
            return {
                ...state,
                maps: state.maps.concat(
                    {
                        id: uuid(),
                        mapName: action.mapName,
                        money: action.money,
                        temperature: action.temperature,
                        fields: action.fields,
                        userItems: action.userItems
                    }
                )
            }
        case 'MODIFYMAPTEMPLATE':
            const newMaps = state.maps.filter(map => map.id !== action.id);
            return {
                ...state,
                maps: newMaps.concat(
                    {
                        id: action.id,
                        mapName: action.mapName,
                        money: action.money,
                        temperature: action.temperature,
                        fields: action.fields,
                        userItems: action.userItems
                    }
                )
            }
        default:
            return state
    }
};

export default reducer;


// console.log('Zawartosc state: ' + state.items.map(item => {
//     return [item.id, item.file, item.itemName, item.width, item.length, item.realHeight, item.price, item.itemType];
// }));