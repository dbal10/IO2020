import React from 'react'
import './css/ObjectList.css';
import { Route, Link } from 'react-router-dom';

function List(props) {
    const templates = props.templates;
    const listItems = templates.map((object) =>
        <React.Fragment>
            <li class="listElement">{object}</li>
        </React.Fragment>
    );
    return (
        <ul class="list">{listItems}</ul>
    );
}

const templates = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k','l', 'm', 'n', 'o', 'p'];

function Menu(props){
    return (
        <React.Fragment>
        <div class="grid">
        <div class="templates">
        <List templates={templates} />
        </div>
        <div class="side-bar">
            <button className="btn btnObj">Konto</button>
            <p class="description">Informacja o mapie</p>
            <Link to='/map/template/modify'>
            <button className="btn btnObj">Edytuj</button>
            </Link>
            <button className="btn btnObj">Usuń</button>
            <Link to='/map/template/create'>
            <button className="btn btnObj">Stwórz nową</button>
            </Link>
        </div>
        </div>
        </React.Fragment>
    )
}

class MapTemplatesView extends React.Component {
    render() {
        return <Menu />
    }
}

export default MapTemplatesView