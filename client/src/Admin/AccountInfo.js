import React, {Component} from 'react'
import "./style.css"

class AccountInfo extends Component{
    render() {
        return (
            <div className="accountInfoBox">{this.props.account}</div>
        )
    }
}

export default AccountInfo