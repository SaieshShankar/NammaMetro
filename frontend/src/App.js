// frontend/src/App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';

// --- V V V ADD ALL THESE IMPORTS V V V ---
import HomePage from './components/HomePage';
import StationHub from './components/StationHub';
import Register from './components/Register';
import Login from './components/Login';
import Navbar from './components/Navbar';
import FareCalculator from './components/FareCalculator';
import ProtectedRoute from './components/ProtectedRoute';
import BookingPage from './components/BookingPage';
import LiveMapPage from './components/LiveMapPage';
import MetroMoneyPage from './components/MetroMoneyPage';
import SettingsPage from './components/SettingsPage';
import LostFoundPage from './components/LostFoundPage';
// --- ^ ^ ^ ADD ALL THESE IMPORTS ^ ^ ^ ---

import './App.css';

function App() {
  return (
    <div className="App">
      <Navbar />
      <main className="container">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/stations" element={<StationHub />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/farecalculator" element={<FareCalculator />} />
          <Route path="/lostfound" element={<LostFoundPage />} />

          {/* Protected Routes Wrapper */}
          <Route element={<ProtectedRoute />}>
            <Route path="/bookings" element={<BookingPage />} />
            <Route path="/map" element={<LiveMapPage />} />
            <Route path="/money" element={<MetroMoneyPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Route>
        </Routes>
      </main>
    </div>
  );
}

export default App;