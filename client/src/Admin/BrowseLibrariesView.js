import React, {Component} from 'react'
import AccountInfo from './AccountInfo'
import './style.css'

class BrowseLibrariesView extends Component{
    render() {
        return (
            <div>
                <AccountInfo account='Dane Konta'/>
                <button type="button" className="libraryButton" style={{backgroundColor: "#4CAF50"}} onClick={this.onMapTemplatesLibraryButtonCllick}></button>
                <button type="button" className="libraryButton" style={{backgroundColor: "#008CBA"}} onClick={this.onItemsLibraryButtonCllick}>Items library</button>
                <button type="button" className="libraryButton" style={{backgroundColor: "#F44336"}} onClick={this.onUsersMapsLibraryButtonCllick}>Users' maps library</button>
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