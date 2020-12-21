import React, {useState} from 'react';
import fire from "../../firebase";
import ItemManager from "../../Admin/ItemManager"
import MapManager from "../../Admin/MapManager"

export default function GetM() {
    let itemManager = new ItemManager;
    let mapManager = new MapManager;

    return (
        <div id="getm">
            <button id="getm" onClick={itemManager.getAllItems}>GetItems</button>
            <button id="getm" onClick={() => itemManager.getItemById("lol123")}>GetItem</button>
            <button id="getm" onClick={mapManager.getAllMaps}>GetMaps</button>
            <button id="getm" onClick={() => itemManager.getMapById("lol123")}>GetMap</button>
        </div>
    )
}
