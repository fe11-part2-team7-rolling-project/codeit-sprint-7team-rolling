import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PostIdPage from './pages/PostIdPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/post/:Id" element={<PostIdPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
