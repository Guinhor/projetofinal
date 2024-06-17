import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Users.css';

const Users = () => {
  // Estado para armazenar a lista de usuários
  const [users, setUsers] = useState([]);
  // Estados para os campos do formulário de adição de usuário
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [status, setStatus] = useState('');


  // Efeito de inicialização para buscar os usuários da API
  useEffect(() => {
    fetchUsers();
  }, []);

  // Função para buscar os usuários da API
  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:3000/users');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Fetch users error:', error);
    }
  };


  // Função para adicionar um novo usuário
  const handleAddUser = async (e) => {
    e.preventDefault();
    // Verifica se algum campo está vazio
    if (!username || !password || !email || !role || !status) {
      alert('Por favor, preencha todos os campos.');
      return;
    }
    try {
      const newUser = {
        username,
        password,
        email,
        role,
        status,
      };
      const response = await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });
      const data = await response.json();
      // Adiciona o novo usuário à lista de usuários
      setUsers([...users, data]);
      // Limpa os campos de entrada após adicionar o usuário
      setUsername('');
      setPassword('');
      setEmail('');
      setRole('');
      setStatus('');
    } catch (error) {
      console.error('Add user error:', error);
    }
  };


  // Função para remover um usuário
  const handleRemove = async (userId) => {
    try {
      await fetch(`http://localhost:3000/users/${userId}`, {
        method: 'DELETE',
      });
      // Remove o usuário da lista de usuários após a remoção
      setUsers(users.filter(user => user.id !== userId));
    } catch (error) {
      console.error('Error removing user:', error);
    }
  };

  return (
    <div className="users-container">
      <h2>Usuários</h2>
      <form onSubmit={handleAddUser}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Usuário"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="">Selecione o cargo</option>
            <option value="Administrador">Administrador</option>
            <option value="Editor">Editor</option>
            <option value="Visualizador">Visualizador</option>
          </select>
        </div>
        <div className="form-group">
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="">Selecione o status</option>
            <option value="Ativo">Ativo</option>
            <option value="Inativo">Inativo</option>
          </select>
        </div>
        {/* Botão para adicionar usuário */}
        <button type="submit">Adicionar</button>
      </form>
      {/* Verifica se há usuários cadastrados */}
      {users.length === 0 ? (
        <p className="no-users">Não há nenhum usuário cadastrado.</p>
      ) : (
        // Renderiza a lista de usuários
        <ul className="user-list">
          {users.map(user => (
            <li key={user.id} className="user-item">
              <div>
                {/* Informações do usuário */}
                <strong>{user.username}</strong> - {user.email}
                <br />
                <strong>Cargo:</strong> {user.role} <strong>Status:</strong> {user.status}
              </div>
              <div className="user-buttons">
                {/* Botões de edição e remoção */}
                <button onClick={() => handleRemove(user.id)} className="btn delete-btn">Remover</button>
                <Link to={`/usuarios/editar/${user.id}`} className="btn edit-btn">Editar</Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Users;
