import { BrowserRouter } from 'react-router-dom';

import './App.css';
import FirstConnect from './components/FirstConnect/FirstConnect';
import Firebase from "./components/Firebase/Firebase";
import View1 from "./Admin/View1";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <Router>

    <Switch>
      <Route path="/View1" component = {View1}/>
    </Switch>

    <BrowserRouter>
      <div className="App">
        <FirstConnect />
        <Firebase/>
      </div>
    </BrowserRouter>
    </Router>
  );
}

export default App;
