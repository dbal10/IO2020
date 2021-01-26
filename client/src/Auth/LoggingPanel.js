import React from 'react'

import {Paper, TextField, Typography, Button} from '@material-ui/core'

import Image from '../resources/background.png'

const styles = {
    container: {background: `url(${Image})`, display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100vw', position: 'absolute', top: 0, left: 0},
    paper: {maxWidth: 280, padding: 20},
    buttonDiv: {display: 'flex', justifyContent: 'space-between', marginBottom: 10,  flexWrap: 'wrap'},
    textField: {marginTop: 10, marginBottom: 10}
}

const LoggingPanel = props => {
    const [email, setEmail] = React.useState('')
    const [emailError, setEmailError] = React.useState(false)
    const emailValidate = value => {
        const isError = !value.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
        setEmailError(isError)
        return isError
    }

    const [pwd, setPwd] = React.useState('')
    const [pwdError, setPwdError] = React.useState(false)
    const pwdValidate = value => {
        setPwdError(!value)
        return !value
    }

    const onSubmit = () => {
        const isEmailError = emailValidate(email)
        const isPwdError = pwdValidate(pwd)

        if(!isEmailError && !isPwdError) {
            props._logIn(email, pwd)
        }
    }

    const submitOnEnter = evt => {
        if(evt.key === 'Enter') {
            onSubmit()
        }
    }
    
    return (
        <div style={styles.container}>
            <Paper style={styles.paper} elevation={5}>
                <Typography
                align='center'
                variant='h5'
                color='primary'
                
                >
                    Sign in to baUHInia
                </Typography>
                <div style = {styles.textField}>
                <TextField
                value={email}
                onChange={evt => {
                    setEmail(evt.target.value)
                    if(emailError){
                        emailValidate(evt.target.value)
                    }
                }}
                onBlur={() => emailValidate(email)}
                fullWidth={true}
                onKeyPress={submitOnEnter}
                margin = 'dense'
                
                label = 'email address'
                variant = 'outlined'
                error = {emailError}
                helperText = {emailError && 'Incorrect email address!'}
                />
                <TextField
                value={pwd}
                onChange={evt => {
                    setPwd(evt.target.value)
                    if(pwdError){
                        pwdValidate(evt.target.value)
                    }
                }}
                onBlur={() => pwdValidate(pwd)}
                fullWidth={true}
                onKeyPress={submitOnEnter}
                margin = 'dense'
                label = 'password'
                variant = 'outlined'
                type='password'
                error = {pwdError}
                helperText = {pwdError && 'Enter password!'}
                />
                </div>
                <div style = {styles.buttonDiv}>
                    <Button
                    color='primary'
                    fullWidth={true}
                    variant='contained'
                    onClick={onSubmit}
                    >
                        Sign in
                    </Button>
                </div>
                <Typography
                variant='caption'
                color='primary'
                >
                New to baUHInia? Create an account.
                </Typography>
                
                <div style = {styles.buttonDiv}>
                    <Button
                    color='secondary'
                    fullWidth={true}
                    variant='contained'
                    onClick={props.toggleForm}
                    >
                        Sign up
                    </Button>
                </div>
            </Paper>
        </div>
    )
}

export default LoggingPanel