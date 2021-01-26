import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import auth from './state/auth'
import snackbars from './state/snackbars' 
import reducer from './store/reducer'

const reducers = combineReducers({
    auth,
    snackbars,
    reducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const store = createStore(
    reducers,
    composeEnhancers(
        applyMiddleware(thunk)
    )
)