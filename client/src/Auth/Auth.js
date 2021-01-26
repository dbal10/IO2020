import React from 'react'
import {connect} from 'react-redux'
import {addEmailToGroupOfSu, registerAsyncActionCreator, logInAsyncActionCreator} from '../state/auth'

import LoggingPanel from './LoggingPanel'
import RegistrationPanel from './RegistrationPanel'

const Auth = props => {
    const [toggleForm, setToggleForm] = React.useState(true)

    return (
        props._isLogged ?
            props.children
            :
            toggleForm ?
                <LoggingPanel 
                toggleForm={() => setToggleForm(false)}
                _logIn={props._logIn}
                />
                :
                <RegistrationPanel 
                toggleForm={() => setToggleForm(true)}
                _register={props._register}
                _addSu={props._addSu}
                _checkSu={props._checkSu}
                />
    )
}

const mapStateToProps = state => ({
    _isLogged: state.auth.isLogged,
})

const mapDispatchToProps = dispatch => ({
    _register: (isSu, email, password) => dispatch(registerAsyncActionCreator(isSu, email, password)),
    _logIn: (email, password) => dispatch(logInAsyncActionCreator(email, password))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Auth)