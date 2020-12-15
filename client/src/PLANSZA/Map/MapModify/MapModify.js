import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Link } from 'react-router-dom';

class MapModify extends Component {

    render() {
        return (
            <div>
                <div>Map Modify</div>
                <Route path="/map/modify" exact render={() => <button><Link to="/">Return</Link></button>} />
            </div>
        );
    }
};

export default MapModify;