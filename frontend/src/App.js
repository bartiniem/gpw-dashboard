import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './styles/index.css';
import Dashboard from './pages/Dashboard';
import StockDetail from './pages/StockDetail';
import Login from "./pages/Login";
import Register from "./pages/RegisterForm.jsx"
import Main from "./pages/Main.jsx"

function App() {
    return (
        <Router basename="/gpw-dashboard">
            <Routes>
                <Route path="/" element={<Main/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/dashboard" element={<Dashboard/>}/>
                <Route path="/stock/:ticker" element={<StockDetail/>}/>
            </Routes>
        </Router>
    );
}

export default App;