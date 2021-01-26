import React from 'react'
import './css/MapList.css';
import { Route, Link } from 'react-router-dom';
// import getAllMaps from "./MapManager";

function List(props) {
    const maps = props.maps;
    const listItems = maps.map((map) =>
        <React.Fragment>
            <div class="containerMaps">
            {/* style={{display: 'inline-block'}} */}
            <li className="listElem">{map}</li>
            <Link to="/map/show">
            <button type="button" class="btn">Podgląd mapy</button>
            </Link>
            </div>
        </React.Fragment>
    );
    return (
        <ul>{listItems}</ul>
    );
}

const maps = [`Pierwsza mapa`, `Druga mapa`, `Trzecia mapa`, `Czwarta mapa`, `Piata mapa`, `Szósta mapa`, `Siódma mapa`];

class MapListView extends React.Component {
    render() {
        return (
        <React.Fragment>
        <List maps={maps} />
        </React.Fragment>
        )
    }
}

export default MapListView