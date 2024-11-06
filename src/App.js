import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ToastContainer } from 'react-toastify';
import MainPage from './pages/MainPage';
import PostIdPage from './pages/PostIdPage';
import PostEditPage from './pages/PostEditPage';
import ListPage from './pages/ListPage';
import MessagePage from './pages/messagePage';
import PostPage from './pages/PostPage';

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <ToastContainer
          position="bottom-center"
          autoClose={5000}
          hideProgressBar={false}
          closeOnClick
          draggable
          className="p-4"
        />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/post" element={<PostPage />} />
          <Route path="/post/:id" element={<PostIdPage />} />
          <Route path="/post/:id/edit" element={<PostEditPage />} />
          <Route path="/list" element={<ListPage />} />
          <Route path="/post/:Id/message" element={<MessagePage />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
