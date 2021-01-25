
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

//plansza
import ItemCreate from './PLANSZA/Item/ItemCreate/ItemCreate';
import ItemModify from './PLANSZA/Item/ItemModify/ItemModify';
import MapTemplateCreate from './PLANSZA/Map/MapTemplateCreate/MapTemplateCreate';
import MapTemplateModify from './PLANSZA/Map/MapTemplateModify/MapTemplateModify';
import MapModify from './PLANSZA/Map/MapModify/MapModify';
import MapShow from './PLANSZA/Map/MapShow/MapShow';

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
      
      <Route path='/item/create' exact component={ItemCreate} />
      <Route path='/item/modify' exact component={ItemModify} />
      <Route path='/map/template/create' exact component={MapTemplateCreate} />
      <Route path='/map/template/modify' exact component={MapTemplateModify} />
      <Route path='/map/modify' exact component={MapModify} />
      <Route path='/map/show' exact component={MapShow} />

    </Switch>
    </Router>
  );
}

export default App;
