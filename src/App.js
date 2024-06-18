import logo from './logo.svg';
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import MainPage from './Routes/MainPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
