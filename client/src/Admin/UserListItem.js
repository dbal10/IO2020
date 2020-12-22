import React, {Component} from 'react';
import './style.css'
import { Link } from 'react-router-dom';

class UserListItem extends Component{
    render(){
        return(
            <div className='userListItem'>
                <p style={{display: 'inline-flex'}}>{this.props.name}</p>
                <div class="right">
                <Link to="/MapList"><button className='showUserMapsButton' onClick={() => this.onShowUserMapsButtonClick(this.props.name)}>Show users maps</button></Link>
                </div>
            </div>
        )
    }
    onShowUserMapsButtonClick(user){
        console.log(user)
    }
}

export default UserListItem