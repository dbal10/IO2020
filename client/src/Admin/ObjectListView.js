import React from 'react'
import './css/ObjectList.css';



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

const objects = [`1`, `2`, `3`, `4`, `5`, '6', '7', '8', '9', '10', '11','12', '13', '14', '15', '16'];

function Menu(props){
    return (
        <React.Fragment>
        <div class="grid">
        <div class="objects">
        <List objects={objects} />
        </div>
        <div class="side-bar">
            <button className="btn btnObj">Konto</button>
            <p className="description">opis obiektu</p>
            <button className="btn btnObj">Edytuj</button>
            <button className="btn btnObj">Usuń</button>
            <button className="btn btnObj">Stwórz nową</button>
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