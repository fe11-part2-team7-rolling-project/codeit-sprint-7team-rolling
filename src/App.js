import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import MainPage from './pages/MainPage';
import PostIdPage from './pages/PostIdPage';
import PostEditPage from './pages/PostEditPage';
import ListPage from './pages/ListPage';
import MessagePage from './pages/messagePage';
import PostPage from './pages/PostPage';
import { CardProvider } from './components/CardContext';

function App() {
  return (
    <CardProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/post" element={<PostPage />} />
          <Route path="/post/:id" element={<PostIdPage />} />
          <Route path="/post/:id/edit" element={<PostEditPage />} />
          <Route path="/list" element={<ListPage />} />
          <Route path="/post/:id/message" element={<MessagePage />} />
        </Routes>
      </BrowserRouter>
    </CardProvider>
  );
}

export default App;
