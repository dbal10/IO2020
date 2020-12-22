import React, {Component} from 'react'
import AccountInfo from './AccountInfo'
import './style.css'
import { Link } from 'react-router-dom';

class BrowseLibrariesView extends Component{
    render() {
        return (
            <div>
                <AccountInfo account='Dane Konta'/>
                <Link to="/MapList"><button type="button" className="libraryButton" style={{backgroundColor: "#8585ad"}} onClick={this.onMapTemplatesLibraryButtonCllick}>Maps library</button></Link>
                <Link to="/ObjectList"><button type="button" className="libraryButton" style={{backgroundColor: "#a3a3c2"}} onClick={this.onItemsLibraryButtonCllick}>Items library</button></Link>
                <Link to="/UserBrowseView"><button type="button" className="libraryButton" style={{backgroundColor: "#8585ad"}} onClick={this.onUsersMapsLibraryButtonCllick}>Users maps library</button></Link>
            </div>
        )
    }

    onMapTemplatesLibraryButtonCllick(){
        console.log("przycisk1")
         
    }

    onItemsLibraryButtonCllick(){
        console.log("przycisk2")
    }

    onUsersMapsLibraryButtonCllick(){
        console.log("przycisk3")
    }
}

export default BrowseLibrariesView