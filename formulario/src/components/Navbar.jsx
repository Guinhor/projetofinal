import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Importando o arquivo CSS para estilização

const Navbar = () => (
  <nav className="navbar">
    <ul className="navbar-nav">
      <li className="nav-item">
        <Link to="/produtos" className="nav-link">Produtos</Link>
      </li>
      <li className="nav-item">
        <Link to="/servicos" className="nav-link">Serviços</Link>
      </li>
      <li className="nav-item">
        <Link to="/usuarios" className="nav-link">Usuários</Link>
      </li>
    </ul>
  </nav>
);

export default Navbar;
