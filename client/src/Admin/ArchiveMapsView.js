import React from 'react'
import './css/ObjectList.css';
import './css/ArchiveMaps.css';
import CurrentEmail from '../state/CurrentEmail.js'

function List(props) {
    // const templates = props.templates;
    // const listItems = templates.map((object) =>
    //     <React.Fragment>
    //         <li class="listElement">{object}</li>
    //     </React.Fragment>
    // );
    return (
        <React.Fragment>
        <div className="oldMaps">moje stare mapy</div>
        <div className="adminMaps">mapy od admina</div>
        </React.Fragment>
    );
}

// const templates = ['a' 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k','l', 'm', 'n', 'o', 'p'];

function Menu(props){
    return (
        <React.Fragment>
        <div className="grid">
        <div className="templates">
        {/* <List templates={templates} /> */}
        <List />
        </div>
        <div className="side-bar">
        <button className="btn btnObj space">{CurrentEmail.value}</button>
            <p className="description space">Charakterystyka mapy</p>
            <button className="btn btnObj space">Usuń mapę</button>
            <button className="btn btnObj space">Wczytaj nową</button>
        </div>
        </div>
        </React.Fragment>
    )
}

class ArchiveMapsView extends React.Component {
    render() {
        return <Menu />
    }
}

export default ArchiveMapsView