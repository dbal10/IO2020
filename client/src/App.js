import { BrowserRouter } from 'react-router-dom';

import './App.css';
import FirstConnect from './components/FirstConnect/FirstConnect';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <FirstConnect />
      </div>
    </BrowserRouter>
  );
}

export default App;
