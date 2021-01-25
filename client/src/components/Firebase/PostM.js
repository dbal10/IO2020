import React, {useState} from 'react';
import ItemManager from "../../Admin/ItemManager"
import MapManager from "../../Admin/MapManager"

//post/update, jeśli podamy obiekt z takim samym
//itemName zostanie on nadpisany
//itemName można zmienić, np na id....
export default function PostM() {
    //dane testowe jakie wysyłamy
    let state = {
        data : {
            id: '123',
            file: 'url',
            itemName: 'test',
            width: 100,
            length: 100,
            realHeight: 100,
            price: 100,
            itemType: 'no',
        },
    }

    let itemManager = new ItemManager;
    let mapManager = new MapManager;

    return(
        <div id="post">
            <button id="post" onClick={() => itemManager.saveItem(state.data) }>PostI</button>
            <button id="post" onClick={() => mapManager.saveMap(state.data) }>PostM</button>
            <button id="post" onClick={() => mapManager.saveMapTemplate(state.data) }>PostMT</button>
        </div>
    )
}
