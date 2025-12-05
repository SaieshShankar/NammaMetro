// frontend/src/components/Navbar.js
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { FaSun, FaMoon } from 'react-icons/fa'; // Import icons for the theme toggle
import './Navbar.css';

function Navbar() {
  const { user, token, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  // Define the function to style active NavLinks
  const getActiveStyle = ({ isActive }) => {
    return {
      fontWeight: isActive ? 'bold' : 'normal',
      color: isActive ? 'var(--color-primary)' : 'var(--text-primary)',
    };
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">Namma Metro Portal</Link>
      <div className="navbar-links">
        {/* --- Public Links --- */}
        <NavLink to="/stations" style={getActiveStyle}>Stations</NavLink>
        <NavLink to="/farecalculator" style={getActiveStyle}>Fare Calculator</NavLink>
        <NavLink to="/map" style={getActiveStyle}>Map</NavLink>
        <NavLink to="/lostfound" style={getActiveStyle}>Lost & Found</NavLink>

        {/* --- Conditional Links --- */}
        {token ? (
          <>
            {/* Logged In Links */}
            <NavLink to="/bookings" style={getActiveStyle}>My Bookings</NavLink>
            <NavLink to="/money" className="navbar-money-link" style={getActiveStyle}>
              ₹{user ? user.metroMoneyBalance.toFixed(0) : 0}
            </NavLink>
            <NavLink to="/settings" style={getActiveStyle}>Settings</NavLink>
            <button onClick={logout} className="nav-btn">Logout</button>
          </>
        ) : (
          <>
            {/* Logged Out Links (from the other version) */}
            <Link to="/login">Login</Link>
            <Link to="/register" className="nav-btn-primary">Register</Link>
          </>
        )}
        
        
      </div>
    </nav>
  );
}

export default Navbar;