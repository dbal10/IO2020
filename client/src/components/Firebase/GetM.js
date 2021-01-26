import React from 'react';
import ItemManager from "../../Admin/ItemManager"
import MapManager from "../../Admin/MapManager"

export default function GetM() {
    let itemManager = new ItemManager;
    let mapManager = new MapManager;

    return (
        <div id="getm">
            <button id="getm" onClick={itemManager.getAllItems}>GetItems</button>
            <button id="getm" onClick={() => itemManager.getItemById("123")}>GetItem</button>
            <button id="getm" onClick={mapManager.getAllMaps}>GetMaps</button>
            <button id="getm" onClick={() => mapManager.getMapById("123")}>GetMap</button>
            <button id="getm" onClick={mapManager.getAllMapTemplates}>GetMapTemplates</button>
            <button id="getm" onClick={() => mapManager.getMapTemplateById("123")}>GetMapTemplate</button>
        </div>
    )
}
