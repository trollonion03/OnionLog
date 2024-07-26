import logo from './logo.svg';
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import MainPage from './Routes/MainPage';
import BlogPage from './Routes/BlogPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />}></Route>
        <Route path="/blog" element={<BlogPage />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
