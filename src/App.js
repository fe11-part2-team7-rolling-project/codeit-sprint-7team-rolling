import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from './pages/MainPage/MainPage';
import PostIdPage from "./pages/PostIdPage";
import ListPage from "./pages/ListPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/post/:Id" element={<PostIdPage />} />
        <Route path="/list" element={<ListPage />} />
      </Routes>
    </Router>
  );
}

export default App;
