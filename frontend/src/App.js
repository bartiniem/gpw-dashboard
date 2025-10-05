import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/index.css';
import Dashboard from './pages/Dashboard';
import StockDetail from './pages/StockDetail';
import Login from "./pages/Login";

function App() {
    return (
        <Router basename="/gpw-dashboard">
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/stock/:ticker" element={<StockDetail />} />
            </Routes>
        </Router>
    );
}

export default App;