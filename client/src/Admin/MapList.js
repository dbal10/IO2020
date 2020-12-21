import React from 'react'
import './css/MapList.css';
import GetM from "../components/Firebase/GetM";
// import getAllMaps from "./MapManager";

function List(props) {
    const maps = props.maps;
    const listItems = maps.map((map) =>
        <React.Fragment>
            <div class="containerMaps">
            {/* style={{display: 'inline-block'}} */}
            <li className="listElem">{map}</li>
            <button type="button" class="btn">Podgląd mapy</button>
            </div>
        </React.Fragment>
    );
    return (
        <ul>{listItems}</ul>
    );
}

const maps = [`Pierwsza mapa`, `Druga mapa`, `Trzecia mapa`, `Czwarta mapa`, `Piata mapa`];

class MapList extends React.Component {
    render() {
        return (
        <React.Fragment>
        <List maps={maps} />
        <GetM/>
        </React.Fragment>
        )
    }
}

export default MapList