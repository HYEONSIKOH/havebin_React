import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { INTRO } from './JS/intro.js';
import { MAIN } from './JS/main.js';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<INTRO />} />
        <Route path="/main" element={<MAIN />} />
      </Routes>
    </Router>
  );
}

export default App;
