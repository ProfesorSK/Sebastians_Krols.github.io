// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home.jsx';
import ModelPage from './components/ModelPage.jsx';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/viewer" element={<ModelPage />} />
    </Routes>
  );
}

export default App;
