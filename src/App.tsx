import React from 'react';
import './App.css';
import { BrowserRouter as Router} from 'react-router-dom'
import LayoutRender from './components/LayoutRender';

function App() {
  return (
    <Router>
      <LayoutRender></LayoutRender>
    </Router>
  );
}

export default App;
