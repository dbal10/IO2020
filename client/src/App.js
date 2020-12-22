
import './App.css';
import Firebase from "./components/Firebase/Firebase";
import MapListView from "./Admin/MapListView";
import ObjectListView from "./Admin/ObjectListView";
import BrowseLibrariesView from "./Admin/BrowseLibrariesView";
import MainView from "./Admin/MainView";
import UserBrowseView from "./Admin/UserBrowseView";
import MapTemplatesView from "./Admin/MapTemplatesView";
import ArchiveMapsView from "./Admin/ArchiveMapsView";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <Router>

    <Switch>
      <Route path="/MapList" component = {MapListView}/>
      <Route path="/ObjectList" component = {ObjectListView}/>
      <Route path="/BrowseLibraries" component = {BrowseLibrariesView}/>
      <Route path="/MainView" component = {MainView}/>
      <Route path="/UserBrowse" component = {UserBrowseView}/>
      <Route path="/MapTemplates" component = {MapTemplatesView}/>
      <Route path="/ArchiveMaps" component = {ArchiveMapsView}/>
      <Route path="/" component = {Firebase}/>
    </Switch>
    </Router>
  );
}

export default App;
