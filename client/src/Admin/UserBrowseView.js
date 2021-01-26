import React, {Component} from 'react';
import UserListItem from './UserListItem'

class UserBrowseView extends Component{
    render(){
        return(
            <div class="top">
                <UserListItem name="user1"/>
                <UserListItem name="user2"/>
                <UserListItem name="user3"/>
                <UserListItem name="user4"/>
            </div>
        )
    }
}

export default UserBrowseView