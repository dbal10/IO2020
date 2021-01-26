import axios from 'axios'
import {SIGN_UP_URL, SIGN_IN_URL} from '../const/firebase'
import fire from "../firebase"
import {addSnackbar} from './snackbars'

const SAVE_USER = 'auth/SAVE_USER'
const LOG_OUT = 'auth/LOG_OUT'

const getSnackbarText = (string) => {
    switch (string) {
        case 'EMAIL_EXISTS':
            return 'Email already used'
        case 'EMAIL_NOT_FOUND':
            return 'Invalid email or password'
        case 'INVALID_PASSWORD':
            return 'Invalid email or password'
        default:
            return 'Something went wrong'
    }
}

export const registerAsyncActionCreator = (isSu, email, password) => (dispatch, getState)=> {
    axios.post(SIGN_UP_URL, {
        email,
        password
    })
    .then(response => {
        const {idToken, refreshToken, localId} = response.data
        dispatch(saveUserActionCreator(idToken, refreshToken, localId))
        if (isSu) { 
            fire.database().ref('SuperUsers').push().set(email)
        }
        fire.database().ref('Users').push().set(email)
        var currentMail = email
        console.log('%s', currentMail)
    })
    .catch(error => {
        const text = getSnackbarText(
            error.response.data&&
            error.response.data.error&&
            error.response.data.error.message)
        dispatch(addSnackbar(text, 'red'))
    })
}

export const logInAsyncActionCreator = (email, password) => (dispatch, getState) => {
    axios.post(SIGN_IN_URL, {
        email,
        password,
        returnSecureToken: true
    })
    .then(response => {
        const {idToken, refreshToken, localId} = response.data
        dispatch(saveUserActionCreator(idToken, refreshToken, localId))
        var currentMail = email
        console.log('%s', currentMail)
    })
    .catch(error => {
        const text = getSnackbarText(
            error.response.data&&
            error.response.data.error&&
            error.response.data.error.message)
        dispatch(addSnackbar(text, 'red'))
    })
}

export const saveUserActionCreator = (idToken, refreshToken, userId) => {
    localStorage.setItem('refreshToken', refreshToken)
    return {
        type: SAVE_USER,
        idToken,
        userId
    }
}

export const logOutActionCreator = () => {
    localStorage.removeItem('refreshToken')
    return {
        type:LOG_OUT
    }
}

const initialState = {
    isLogged: false,
    idToken: null,
    userId: null
}

export default (state = initialState, action) => {
    switch(action.type) {
        case SAVE_USER:
            return {
                ...state,
                isLogged: true,
                idToken: action.idToken,
                userId: action.userId
            }
        case LOG_OUT:
            return {
                ...state,
                isLogged: false,
                idToken: null,
                userId: null
            }
        default:
            return state
    }
}
