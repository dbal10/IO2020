import { BrowserRouter } from 'react-router-dom';

import './App.css';
import FirstConnect from './components/FirstConnect/FirstConnect';
import Firebase from "./components/Firebase/Firebase";
import MapList from "./Admin/MapList";
import ObjectList from "./Admin/ObjectList";
import AccountInfo from "./Admin/AccountInfo";
import BrowseLibrariesView from "./Admin/BrowseLibrariesView";
import MainView from "./Admin/MainView";
import UserBrowseView from "./Admin/UserBrowseView";
import UserListItem from "./Admin/UserListItem";
import MapTemplates from "./Admin/MapTemplates";
import ArchiveMaps from "./Admin/ArchiveMaps";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <Router>

    <Switch>
      <Route path="/maplist" component = {MapList}/>
      <Route path="/objectlist" component = {ObjectList}/>
      <Route path="/BrowseLibrariesView" component = {BrowseLibrariesView}/>
      <Route path="/MainView" component = {MainView}/>
      <Route path="/UserBrowseView" component = {UserBrowseView}/>
      <Route path="/MapTemplates" component = {MapTemplates}/>
      <Route path="/ArchiveMaps" component = {ArchiveMaps}/>
      <Route path="/" component = {Firebase}/>
    </Switch>
    </Router>
  );
}

export default App;
