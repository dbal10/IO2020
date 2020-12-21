import { BrowserRouter } from 'react-router-dom';

import './App.css';
import FirstConnect from './components/FirstConnect/FirstConnect';
import Firebase from "./components/Firebase/Firebase";
import MapList from "./Admin/MapList";
import ObjectList from "./Admin/ObjectList";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <Router>

    <Switch>
      <Route path="/maplist" component = {MapList}/>
      <Route path="/objectlist" component = {ObjectList}/>
    </Switch>

    <BrowserRouter>
      <div className="App">
        <FirstConnect />
      </div>
    </BrowserRouter>
    </Router>
  );
}

export default App;
