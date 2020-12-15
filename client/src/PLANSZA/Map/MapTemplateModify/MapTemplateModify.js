import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Link } from 'react-router-dom';

class MapTemplateModify extends Component {

    render() {
        return (
            <div>
                <div>Map Template Modify</div>
                <Route path="/map/template/modify" exact render={() => <button><Link to="/">Return</Link></button>} />
            </div>
        );
    }
};

export default MapTemplateModify;