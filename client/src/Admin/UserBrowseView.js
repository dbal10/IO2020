import React, {Component} from 'react';
import UserListItem from './UserListItem'

class UserBrowseView extends Component{
    render(){
        return(
            <div>
                <UserListItem name="pierwszy"/>
                <UserListItem name="drugi"/>
                <UserListItem name="trzeci"/>
                <UserListItem name="czwarty"/>
            </div>
        )
    }
}

export default UserBrowseView