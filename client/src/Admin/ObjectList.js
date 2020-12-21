import React from 'react'
import './css/ObjectList.css';

function ObjectList(props) {
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

const objects = [`1`, `2`, `3`, `4`, `5`, '6', '7', '8'];

function Menu(props){
    return (
        <React.Fragment>
        <div class="grid">
        <div class="objects">
        <ObjectList objects={objects} />
        </div>
        <div class="side-bar">
            <button>Konto</button>
            <p class="description">opis obiektu</p>
            <button>Edytuj</button>
            <button>Usuń</button>
            <button>Stwórz nową</button>
        </div>
        </div>
        </React.Fragment>
    )
}

class HelloWorld extends React.Component {
    render() {
        return <Menu />
    }
}

export default HelloWorld