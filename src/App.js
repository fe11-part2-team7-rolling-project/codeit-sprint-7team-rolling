import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PostIdPage from "./pages/PostIdPage";
import ListPage from "./pages/ListPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/post/:Id" element={<PostIdPage />} />
        <Route path="/list" element={<ListPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
