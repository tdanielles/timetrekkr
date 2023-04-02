//import './App.css';
import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Demo from './pages/Demo';
import Landing from './pages/Landing';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Landing/>}/>
        <Route path="/demo" element={<Demo/>}/>
      </Routes>
    </>
  )
}

export default App;
