import React from 'react';
import ItemManager from "../../Admin/ItemManager"
import MapManager from "../../Admin/MapManager"

export default function DeleteM() {

    let itemManager = new ItemManager;
    let mapManager = new MapManager;

    return (
        <div id="del">
            <button id="del" onClick={() => itemManager.deleteItem("123")}>DelI</button>
            <button id="del" onClick={() => mapManager.deleteMap("123")}>DelM</button>
            <button id="del" onClick={() => mapManager.deleteMapTemplate("123")}>DelMT</button>
        </div>
    )
}
