import logo from './logo.svg';
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import MainPage from './Routes/MainPage';
import BlogPage from './Routes/BlogPage';
import EditorPage from './Routes/EditorPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />}></Route>
        <Route path="/blog" element={<BlogPage />}></Route>
        <Route path="/blog/editor" element={<EditorPage />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
