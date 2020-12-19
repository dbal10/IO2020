import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Link } from 'react-router-dom';

import ItemCreate from '../../PLANSZA/Item/ItemCreate/ItemCreate';
import ItemModify from '../../PLANSZA/Item/ItemModify/ItemModify';
import MapTemplateCreate from '../../PLANSZA/Map/MapTemplateCreate/MapTemplateCreate';
import MapTemplateModify from '../../PLANSZA/Map/MapTemplateModify/MapTemplateModify';
import MapModify from '../../PLANSZA/Map/MapModify/MapModify';
import MapShow from '../../PLANSZA/Map/MapShow/MapShow';

class FirstComponent extends Component {
    state = {
        info: ''
    }

    componentDidMount() {
        fetch('/connect')
            .then(res => res.json())
            .then(info => this.setState({info}));
    }

    render() {
        return (
            <div>
                <Route path="/" exact render={() => <h2>{this.state.info}</h2>} />
                <Route path="/" exact render={() => <h2>{this.props.information}</h2>} />
                <div>
                    <nav>
                        <Route path="/" exact render={() => <li><Link to="/item/create">Create Item</Link></li>}/>
                        <Route path="/" exact render={() => <li><Link to="/item/modify">Modify Item</Link></li>}/>
                        <Route path="/" exact render={() => <li><Link to="/map/template/create">Create Map Template</Link></li>}/>
                        <Route path="/" exact render={() => <li><Link to="/map/template/modify">Modify Map Template</Link></li>}/>
                        <Route path="/" exact render={() => <li><Link to="/map/modify">Modify Map</Link></li>}/>
                        <Route path="/" exact render={() => <li><Link to="/map/show">Show Map</Link></li>}/>
                    </nav>
                </div>
                <Route path='/item/create' exact component={ItemCreate} />
                <Route path='/item/modify' exact component={ItemModify} />
                <Route path='/map/template/create' exact component={MapTemplateCreate} />
                <Route path='/map/template/modify' exact component={MapTemplateModify} />
                <Route path='/map/modify' exact component={MapModify} />
                <Route path='/map/show' exact component={MapShow} />
            </div>
        );
    }
};

const mapStateToProps = state => {
    return {
        information: state.info
    };
}

export default connect(mapStateToProps)(FirstComponent);
