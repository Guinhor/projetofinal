import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Importando o arquivo CSS para estilização

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/users');
      if (!response.ok) {
        throw new Error('Usuário ou senha incorretos. Por favor, tente novamente.');

      }
      const users = await response.json();

      const user = users.find(user => user.username === username && user.password === password);

      if (user) {
        navigate('/produtos');
      } else {
        navigate('/error');
      }
    } catch (error) {
      console.error('Login error:', error);
      navigate('/error');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
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
        <button type="submit" className="btn">Login</button>
      </form>
    </div>
  );
};

export default Login;
