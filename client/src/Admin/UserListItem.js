import React, {Component} from 'react';
import './style.css'
import { Link } from 'react-router-dom';

class UserListItem extends Component{
    render(){
        return(
            <div className='userListItem'>
                <p style={{display: 'inline-flex'}, {float: 'left'}}>{this.props.name}</p>
                <Link to="/MapList"><button className='showUserMapsButton' onClick={() => this.onShowUserMapsButtonClick(this.props.name)}>Show user's maps</button></Link>
            </div>
        )
    }
    onShowUserMapsButtonClick(user){
        console.log(user)
    }
}

export default UserListItem