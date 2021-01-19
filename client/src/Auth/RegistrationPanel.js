import React from 'react'

import {Paper, TextField, Typography, Button, Collapse, Checkbox, FormControlLabel} from '@material-ui/core'

import Image from '../resources/background.png'

const styles = {
    container: {background: `url(${Image})`, display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100vw', position: 'absolute', top: 0, left: 0},
    paper: {maxWidth: 280, padding: 20},
    buttonDiv: {display: 'flex', justifyContent: 'space-between', marginBottom: 10,  flexWrap: 'wrap'},
    textField: {marginTop: 10, marginBottom: 10}
}

const RegistrationPanel = props => {
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
        const isError = !value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
        setPwdError(isError)
        return isError
    }

    const [pwd2, setPwd2] = React.useState('')
    const [pwd2Error, setPwd2Error] = React.useState(false)
    const pwd2Validate = value => {
        const isError = (pwd !== value)
        setPwd2Error(isError)
        return isError
    }

    const [pass, setPass] = React.useState('')
    const [passError, setPassError] = React.useState(false)
    const passValidate = value => {
        const isError = (value !== "x")
        setPassError(isError)
        return isError
    }

    const onSubmit = () => {
        const isEmailError = emailValidate(email)
        const isPwdError = pwdValidate(pwd)
        const isPwd2Error = pwd2Validate(pwd2)
        const isPassError = passValidate(pass)
        if(!su) {
            if(!isEmailError && !isPwdError && !isPwd2Error) {
                props._register(false, email, pwd)
            }
        }
        else {
            if(!isEmailError && !isPwdError && !isPwd2Error && !isPassError) {
                props._register(true, email, pwd)
            }
        }
    }
    

    const submitOnEnter = evt => {
        if(evt.key === 'Enter') {
            onSubmit()
        }
    }

    const [su, setSu] = React.useState(false)

    return (
        <div style={styles.container}>
            <Paper style={styles.paper} elevation={5}>
                <Typography
                align='center'
                variant='h5'
                color='primary'
                
                >
                    Sign up to baUHInia
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
                        if (pwd2Error) {
                            setPwd2Error(evt.target.value !== pwd2)
                        }
                    }
                }}
                onBlur={() => {
                    pwdValidate(pwd)
                    if(pwd2Error){
                        pwd2Validate(pwd2)}
                }
                }
                fullWidth={true}
                onKeyPress={submitOnEnter}
                margin = 'dense'
                label = 'password'
                variant = 'outlined'
                type='password'
                error = {pwdError}
                helperText = {pwdError && 'Password must contain at least 8 characters, one number, one upper case letter and one special character!'}
                />
                <TextField
                value={pwd2}
                onChange={evt => {
                    setPwd2(evt.target.value)
                    if(pwd2Error){
                        pwd2Validate(evt.target.value)
                    }
                }}
                onBlur={() => pwd2Validate(pwd2)}
                fullWidth={true}
                onKeyPress={submitOnEnter}
                margin = 'dense'
                label = 'repeat password'
                variant = 'outlined'
                type='password'
                error = {pwd2Error}
                helperText = {pwd2Error && 'Passwords are not the same!'}
                />
                <FormControlLabel
                control={<Checkbox color="primary" />}
                label="I am part of city government"
                onChange={() => setSu(!su)}
                labelPlacement="start"
                />
                <Collapse in={su}>
                    <TextField
                    value={pass}
                    onChange={evt => {
                        setPass(evt.target.value)
                        if(passError){
                            passValidate(evt.target.value)
                        }
                    }}
                    fullWidth={true}
                    onKeyPress={submitOnEnter}
                    margin = 'dense'
                    label = 'enter code'
                    variant = 'outlined'
                    error = {passError}
                    helperText = {passError && 'Code not right!'}
                    />
                </Collapse>
                </div>
                <div style = {styles.buttonDiv}>
                    <Button
                    color='primary'
                    fullWidth={true}
                    variant='contained'
                    onClick={onSubmit}
                    >
                        Sign up
                    </Button>
                </div>
                {/* <Typography
                variant='caption'
                color='primary'
                >
                New to baUHInia? Create an account.
                </Typography> */}
                
                <div style = {styles.buttonDiv}>
                    <Button
                    color='secondary'
                    fullWidth={true}
                    variant='contained'
                    onClick={props.toggleForm}
                    >
                        Go back
                    </Button>
                </div>
            </Paper>
        </div>
    )
}

export default RegistrationPanel