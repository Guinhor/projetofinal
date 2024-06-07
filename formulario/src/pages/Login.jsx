import React, { useState } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; // Importando hook para navegação
import '../styles/Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(false); // Estado para controlar o indicador de carregamento
  const [error, setError] = useState(''); // Estado para armazenar a mensagem de erro
  const navigate = useNavigate(); // Hook para navegação

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true); // Ativar o indicador de carregamento
    try {
      const response = await fetch('http://localhost:3001/users');
      if (!response.ok) {
        throw new Error('Usuário ou senha incorretos. Por favor, tente novamente.');
      }
      const users = await response.json();
      const user = users.find(user => user.username === username && user.password === password);
      if (user) {
        // Simular um pequeno atraso para analisar a resposta
        setTimeout(() => {
          setLoading(false); // Desativar o indicador de carregamento
          navigate('/produtos'); // Redirecionar para a página de produtos
        }, 1500);
      } else {
        // Simular um pequeno atraso antes de exibir a mensagem de erro
        setTimeout(() => {
          setLoading(false); // Desativar o indicador de carregamento
          setError('Usuário ou senha incorretos. Por favor, tente novamente.');
        }, 1500);
      }
    } catch (error) {
      setLoading(false); // Desativar o indicador de carregamento
      console.error('Login error:', error);
      // Simular um pequeno atraso antes de exibir a mensagem de erro
      setTimeout(() => {
        setError('Ocorreu um erro ao tentar fazer login. Por favor, tente novamente mais tarde.');
      }, 1500);
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark-mode');
  };

  return (
    <div className="login-container">
      <div className="dark-mode-toggle" onClick={toggleDarkMode}>
        {darkMode ? <FaSun /> : <FaMoon />}
      </div>
      <h2>Login</h2>
      {error && <p className="error-message smaller">{error}</p>}
      <form onSubmit={handleLogin} className="login-form">
        <div className="form-group">
          <label htmlFor="username">Usuário</label>
          <input
            type="text"
            id="username"
            placeholder="Digite o seu usuário"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Senha</label>
          <input
            type="password"
            id="password"
            placeholder="Digite a senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-control"
          />
        </div>
        <button type="submit" className="btn" disabled={loading}>
          {loading ? 'Carregando...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default Login;
