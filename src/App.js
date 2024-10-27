import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage/MainPage';
import PostIdPage from './pages/PostIdPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/post" element={<PostIdPage />} />
      </Routes>
    </Router>
  );
}

export default App;
