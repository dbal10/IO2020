import React from 'react';
import fire from "../../firebase";
import ItemManager from "../../Admin/ItemManager"
import MapManager from "../../Admin/MapManager"

export default function DeleteM() {

    let itemManager = new ItemManager;
    let mapManager = new MapManager;

    return (
        <div id="del">
            <button id="del" onClick={() => itemManager.deleteItem("a")}>DelI</button>
            <button id="del" onClick={() => mapManager.deleteMap("a")}>DelM</button>
            <button id="del" onClick={() => mapManager.deleteMapTemplate("a")}>DelMT</button>
        </div>
    )
}
