import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { FaSun, FaMoon } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import '../index.css';

const Layout = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Recuperar a preferência de tema do localStorage ou usar o tema claro por padrão
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? JSON.parse(savedMode) : false;
  });

  const navigate = useNavigate();

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem('darkMode', JSON.stringify(newMode));
      return newMode;
    });
  };

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [isDarkMode]);

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div>
      <Navbar />
      <div className="header-buttons">
        <button className="dark-mode-toggle" onClick={toggleDarkMode}>
          {isDarkMode ? <FaSun /> : <FaMoon />}
        </button>
      </div>
      <button className="logout-button" onClick={handleLogout}>
        <FiLogOut />
      </button>
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
