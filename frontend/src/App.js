import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Admin from './Admin';
import LandingPage from './LandingPage';
import Login from './auth/Login'; 
import Register from './auth/Register'; 
// import Error from './Error';
import { AuthProvider } from './auth/AuthContext';
import Comment from './landing-page/Comment/Comment';
import Kategori from './landing-page/Kategori/Kategori';

function App() {
    
    return (
        <Router>
            <AuthProvider>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/admin/*" element={<Admin />} />
                    <Route path="/home/*" element={<LandingPage />} />
                    <Route path="/" element={<LandingPage />} />
                    <Route path="comment-gambar/:id" element={<Comment/>} />
                    <Route path="/kategori" element={<Kategori/>} />
                    <Route path="kategori/:id" element={<Kategori/>} />
                </Routes>
            </AuthProvider>
        </Router>
    );
}

export default App;
