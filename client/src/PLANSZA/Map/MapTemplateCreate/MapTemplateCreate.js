import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Link } from 'react-router-dom';

class MapTemplateCreate extends Component {

    render() {
        return (
            <div>
                <div>Map Template Create</div>
                <Route path="/map/template/create" exact render={() => <button><Link to="/">Return</Link></button>} />
            </div>
        );
    }
};

export default MapTemplateCreate;