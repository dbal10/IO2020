import uuid from 'react-uuid';

const initialState = {
    info: 'Redux and react-redux connected',
    items : [],
    maps : []
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
            const newItems = state.items.filter(item => item.id === action.id);
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
        default:
            return state
    }
};

export default reducer;


// console.log('Zawartosc state: ' + state.items.map(item => {
//     return [item.id, item.file, item.itemName, item.width, item.length, item.realHeight, item.price, item.itemType];
// }));