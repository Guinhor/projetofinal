import React from 'react';
import './ErrorPage.css'; 

const ErrorPage = () => {
  return (
    <div className="error-page">
      <div className="error-content">
        <h2 className="error-title">Erro 404</h2>
        <p className="error-message">Oops! A página que você está procurando não pôde ser encontrada.</p>
        <p className="error-help">Verifique o URL ou volte para a página inicial.</p>
      </div>
    </div>
  );
};

export default ErrorPage;
