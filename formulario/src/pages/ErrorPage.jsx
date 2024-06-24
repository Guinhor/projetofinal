import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/ErrorPage.css'; 

const ErrorPage = () => {
  return (
    <div className="error-page">
      <div className="error-content">
        <h2 className="error-title">Erro 404</h2>
        <p className="error-message">Oops! A página que você está procurando não pôde ser encontrada.</p>
        <p className="error-help">Verifique o URL ou volte para a <Link to="/login">página inicial</Link>.</p>
      </div>
    </div>
  );
};

export default ErrorPage;
