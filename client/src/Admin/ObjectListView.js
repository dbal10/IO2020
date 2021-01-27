import React from 'react'
import './css/ObjectList.css';
import { Route, Link } from 'react-router-dom';
import CurrentEmail from '../state/CurrentEmail.js'


function List(props) {
    const objects = props.objects;
    const listItems = objects.map((object) =>
        <React.Fragment>
            <li class="listElement">{object}</li>
        </React.Fragment>
    );
    return (
        <ul class="list">{listItems}</ul>
    );
}

const objects = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11','12', '13', '14', '15', '16'];

function Menu(props){
    return (
        <React.Fragment>
        <div class="grid">
        <div class="objects">
        <List objects={objects} />
        </div>
        <div class="side-bar">
            <button className="btn btnObj">{CurrentEmail.value}</button>
            <p className="description">opis obiektu</p>

            <Link to='/item/modify'>
            <button className="btn btnObj">Edytuj</button>
            </Link>
            
            <button className="btn btnObj">Usuń</button>

            <Link to='/item/create'>
            <button className="btn btnObj">Stwórz nowy</button>
            </Link>

        </div>
        </div>
        </React.Fragment>
    )
}

class ObjectListView extends React.Component {
    render() {
        return <Menu />
    }
}

export default ObjectListView