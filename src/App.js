import React from 'react';
import PolygonMap from './components/Polygon-map';
import {
  BrowserRouter as Router, 
  Routes,
  Route,
  } from 'react-router-dom';


function App() {

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/map" 
            element={<PolygonMap/>} 
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
