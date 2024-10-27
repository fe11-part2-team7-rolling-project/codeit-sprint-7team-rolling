import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PostIdPage from "./pages/PostIdPage";
import MessagePage from "./pages/messagePage";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/post/:Id" element={<PostIdPage />} />
          <Route path="/post/:Id/message" element={<MessagePage />} />
        </Routes>
        <MessagePage />
      </BrowserRouter>
    </div>
  );
}

export default App;
