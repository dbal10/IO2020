
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import FirstConnect from './components/FirstConnect/FirstConnect';
import Firebase from "./components/Firebase/Firebase";
import MapListView from "./Admin/MapListView";
import ObjectListView from "./Admin/ObjectListView";
import BrowseLibrariesView from "./Admin/BrowseLibrariesView";
import MainView from "./Admin/MainView";
import UserBrowseView from "./Admin/UserBrowseView";
import MapTemplatesView from "./Admin/MapTemplatesView";
import ArchiveMapsView from "./Admin/ArchiveMapsView";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ConnectionWithPlansza from './ConnectionWithPlansza';
import React from 'react'

//plansza
import ItemCreate from './PLANSZA/Item/ItemCreate/ItemCreate';
import ItemModify from './PLANSZA/Item/ItemModify/ItemModify';
import MapTemplateCreate from './PLANSZA/Map/MapTemplateCreate/MapTemplateCreate';
import MapTemplateModify from './PLANSZA/Map/MapTemplateModify/MapTemplateModify';
import MapModify from './PLANSZA/Map/MapModify/MapModify';
import MapShow from './PLANSZA/Map/MapShow/MapShow';

<<<<<<< HEAD
// import './App.css';
// import { BrowserRouter } from 'react-router-dom';
// import FirstConnect from './components/FirstConnect/FirstConnect';
// import Firebase from "./components/Firebase/Firebase";
// import MapListView from "./Admin/MapListView";
// import ObjectListView from "./Admin/ObjectListView";
// import BrowseLibrariesView from "./Admin/BrowseLibrariesView";
// import MainView from "./Admin/MainView";
// import UserBrowseView from "./Admin/UserBrowseView";
// import MapTemplatesView from "./Admin/MapTemplatesView";
// import ArchiveMapsView from "./Admin/ArchiveMapsView";
// import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// import ConnectionWithPlansza from './ConnectionWithPlansza';
// import React from 'react'

// //plansza
// import ItemCreate from './PLANSZA/Item/ItemCreate/ItemCreate';
// import ItemModify from './PLANSZA/Item/ItemModify/ItemModify';
// import MapTemplateCreate from './PLANSZA/Map/MapTemplateCreate/MapTemplateCreate';
// import MapTemplateModify from './PLANSZA/Map/MapTemplateModify/MapTemplateModify';
// import MapModify from './PLANSZA/Map/MapModify/MapModify';
// import MapShow from './PLANSZA/Map/MapShow/MapShow';
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <FirstConnect />
      </div>
    </BrowserRouter>

// {/* <React.Fragment>
// <Router>

// <Switch>
//   <Route path="/MapList" component = {MapListView}/>
//   <Route path="/ObjectList" component = {ObjectListView}/>
//   <Route path="/BrowseLibraries" component = {BrowseLibrariesView}/>
//   <Route path="/MainView" component = {MainView}/>
//   <Route path="/UserBrowse" component = {UserBrowseView}/>
//   <Route path="/MapTemplates" component = {MapTemplatesView}/>
//   <Route path="/ArchiveMaps" component = {ArchiveMapsView}/>
//   {/* <Route path="/" component = {Firebase}/>  */}
//   <ConnectionWithPlansza />
 

// </Switch>
// </Router>
// </React.Fragment> */}
=======

function App() {  
  return (
    // <BrowserRouter>
    //   <div className="App">
    //     <FirstConnect />
    //   </div>
    // </BrowserRouter>
    
    <React.Fragment>
    <Router>

    <Switch>
      <Route path="/MapList" component = {MapListView}/>
      <Route path="/ObjectList" component = {ObjectListView}/>
      <Route path="/BrowseLibraries" component = {BrowseLibrariesView}/>
      <Route path="/MainView" component = {MainView}/>
      <Route path="/UserBrowse" component = {UserBrowseView}/>
      <Route path="/MapTemplates" component = {MapTemplatesView}/>
      <Route path="/ArchiveMaps" component = {ArchiveMapsView}/>
      {/* <Route path="/" component = {Firebase}/>  */}
      <ConnectionWithPlansza />
     

    </Switch>
    </Router>
    </React.Fragment>
>>>>>>> c665019ed53fa406157e4c60b1fda65162aff768
  );
}

export default App;