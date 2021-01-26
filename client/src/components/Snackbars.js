import { Snackbar, SnackbarContent } from '@material-ui/core'
import React from 'react'
import {connect} from 'react-redux'

const Snackbars = props => {
    return(
        <div>
            {props._bars.map((el, index) => (
            <Snackbar
            style={{position: 'fixed', top: (30 + 70*index) }}
            key={el.key}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right'
            }}
            open ={true}
            >
                <SnackbarContent 
                style={{backgroundColor: el.color}}
                message={el.text}
                />
            </Snackbar>
            ))}
        </div>
    )
}

const mapStateToProps = state => ({
    _bars: state.snackbars.bars
})

export default connect(
    mapStateToProps
)(Snackbars)