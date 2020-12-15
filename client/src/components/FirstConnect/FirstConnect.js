import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Link } from 'react-router-dom';


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
