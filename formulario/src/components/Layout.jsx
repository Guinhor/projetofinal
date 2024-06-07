import React, { useState, useEffect } from 'react';
import Navbar from './Navbar'; 
import Footer from './Footer'; 
import { FaSun, FaMoon } from 'react-icons/fa'; // Importa ícones do React
import { FiLogOut } from 'react-icons/fi'; // Importa ícones do React
import { useNavigate } from 'react-router-dom'; // Importa o hook useNavigate do React Router
import '../index.css'; 

const Layout = ({ children }) => {
  // Estado para controlar o modo claro/escuro
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Recupera a preferência de tema do localStorage ou usa o tema claro por padrão
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? JSON.parse(savedMode) : false;
  });

  // Hook de navegação
  const navigate = useNavigate();

  // Função para alternar entre os modos claro/escuro
  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem('darkMode', JSON.stringify(newMode)); // Armazena a preferência no localStorage
      return newMode;
    });
  };

  // Efeito para aplicar o tema claro/escuro ao corpo do documento
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-mode'); // Adiciona a classe dark-mode ao corpo do documento
    } else {
      document.body.classList.remove('dark-mode'); // Remove a classe dark-mode do corpo do documento
    }
  }, [isDarkMode]);

  // Função para fazer logout
  const handleLogout = () => {
    navigate('/login'); // Navega de volta para a página inicial
  };

  // Renderização do componente
  return (
    <div>
      <Navbar /> {/* Renderiza o componente Navbar */}
      <div className="header-buttons">
        {/* Botão para alternar entre os modos claro/escuro */}
        <button className="dark-mode-toggle" onClick={toggleDarkMode}>
          {isDarkMode ? <FaSun /> : <FaMoon />} {/* Ícone do sol ou da lua, dependendo do modo */}
        </button>
      </div>
      {/* Botão para fazer logout */}
      <button className="logout-button" onClick={handleLogout}>
        <FiLogOut /> {/* Ícone de logout */}
      </button>
      <main>{children}</main> {/* Renderiza o conteúdo principal */}
      <Footer /> {/* Renderiza o componente Footer */}
    </div>
  );
};

export default Layout; // Exporta o componente Layout
