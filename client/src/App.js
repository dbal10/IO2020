import { BrowserRouter } from 'react-router-dom';
import Auth from './Auth'
import Snackbars from './components/Snackbars'

import './App.css';
import FirstConnect from './components/FirstConnect/FirstConnect';
import Firebase from "./components/Firebase/Firebase";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Auth>
        <FirstConnect />
        <Firebase/>
        </Auth>
        <Snackbars/>
      </div>
    </BrowserRouter>
  );
}

export default App;
