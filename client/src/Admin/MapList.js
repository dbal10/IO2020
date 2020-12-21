import React from 'react'

function MapsList(props) {
    const maps = props.maps;
    const listItems = maps.map((map) =>
        <React.Fragment>
            <div class="containerMaps">
            <li style={{display: 'inline-block'}}>{map}</li>
            <button type="button" class="btn">Podgląd mapy</button>
            </div>
        </React.Fragment>
    );
    return (
        <ul>{listItems}</ul>
    );
}

const maps = [`Pierwsza mapa`, `Druga mapa`, `Trzecia mapa`, `Czwarta mapa`, `Piata mapa`];

class HelloWorld extends React.Component {
    render() {
        return <MapsList maps={maps} />
    }
}

export default HelloWorld