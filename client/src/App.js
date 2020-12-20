import { BrowserRouter } from 'react-router-dom';

import './App.css';
import FirstConnect from './components/FirstConnect/FirstConnect';
import Firebase from "./components/Firebase/Firebase";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <FirstConnect />
        <Firebase/>
      </div>
    </BrowserRouter>
  );
}

export default App;
