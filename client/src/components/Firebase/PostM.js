import React, {useState} from 'react';
import fire from "../../firebase";

//post/update, jeśli podamy obiekt z takim samym
//itemName zostanie on nadpisany
//itemName można zmienić, np na id....
export default function PostM() {
    //dane testowe jakie wysyłamy
    let state = {
        data : {
            id: 'test',
            file: 'jan pawel 222222',
            itemName: 'gmd4',
            width: 2137,
            length: 13,
            realHeight: 6.9,
            price: 96,
            itemType: 'no',
        },
    }

    function postM(obj) { //.child bo bez tego by nadpisywało a tak to dodaje
        let name = obj.itemName.toString().valueOf();
        console.log(name);
        fire.database().ref('database').child(name).set(obj);
    }

    return(
        <div id="post">
            <button id="post"
                    onClick={
                        () => postM(state.data)
                    }
            >PostM
            </button>

        </div>
    )
}
