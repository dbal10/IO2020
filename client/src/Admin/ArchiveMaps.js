import React from 'react'
import './css/ObjectList.css';
import './css/ArchiveMaps.css';

function List(props) {
    // const templates = props.templates;
    // const listItems = templates.map((object) =>
    //     <React.Fragment>
    //         <li class="listElement">{object}</li>
    //     </React.Fragment>
    // );
    return (
        <React.Fragment>
        <div class="oldMaps">moje stare mapy</div>
        <div class="adminMaps">mapy od admina</div>
        </React.Fragment>
    );
}

// const templates = [`a`, `b`, `c`, `d`, `e`, 'f', 'g', 'h', 'i', 'j', 'k','l', 'm', 'n', 'o', 'p'];

function Menu(props){
    return (
        <React.Fragment>
        <div class="grid">
        <div class="templates">
        {/* <List templates={templates} /> */}
        <List />
        </div>
        <div class="side-bar">
            <button className="btn btnObj">Konto</button>
            <p class="description">charakterystyka mapy</p>
            <button className="btn btnObj">Usuń mapę</button>
            <button className="btn btnObj">Wczytaj nową</button>
        </div>
        </div>
        </React.Fragment>
    )
}

class ArchiveMaps extends React.Component {
    render() {
        return <Menu />
    }
}

export default ArchiveMaps