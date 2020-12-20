import React from 'react';
import fire from "../../firebase";

export default function DeleteM() {

    //obiekt który będziemy chcieli usunąć
    let state = {
        data: {
            id: 'test',
            file: 'jan pawel 2',
            itemName: 'gmd2',
            width: 2137,
            length: 13,
            realHeight: 6.9,
            price: 96,
            itemType: 'no',
        },
    }

    function DeleteM(obj) {
        let name = obj.itemName.toString().valueOf();
        const ref = fire.database().ref(`database/${name}`);
        ref.remove();

    }

    return (
        <div id="del">
            <button id="del"
                    onClick={
                        () => DeleteM(state.data)
                    }
            >DelM
            </button>

        </div>
    )
}
