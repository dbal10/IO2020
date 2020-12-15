import uuid from 'react-uuid';

const initialState = {
    info: 'Redux and react-redux connected',
    items: [
        {
            id: 'b85a8e6b-348b-4011-a1ec-1e78e9620782',
            file: 'z',
            itemName: 'przyklad 1',
            width: 1,
            length: 1,
            realHeight: 1.22,
            price: 11,
            itemType: 'przyklad'
        }
    ],
    itemToModify: {
        id: 'b85a8e6b-348b-4011-a1ec-1e78e9620782',
        file: 'z',
        itemName: 'przyklad 1',
        width: 1,
        length: 1,
        realHeight: 1.22,
        price: 11,
        itemType: 'przyklad'
    }
}

const reducer = (state = initialState, action) => {
    console.log('Zawartosc state: ' + state.items.map(item => {
        return [item.id, item.file, item.itemName, item.width, item.length, item.realHeight, item.price, item.itemType];
    }));
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
        default:
            return state
    }
};

export default reducer;


// console.log('Zawartosc state: ' + state.items.map(item => {
//     return [item.id, item.file, item.itemName, item.width, item.length, item.realHeight, item.price, item.itemType];
// }));