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
        <div class="oldMaps">Stare mapy</div>
        <div class="adminMaps">Mapy od admina</div>
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
            <button className="btn btnObj space">Konto</button>
            <p class="description space">Charakterystyka mapy</p>
            <button className="btn btnObj space">Usuń mapę</button>
            <button className="btn btnObj space">Wczytaj nową</button>
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