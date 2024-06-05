import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Users.css';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:3001/users');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Fetch users error:', error);
    }
  };

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
      const response = await fetch('http://localhost:3001/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });
      const data = await response.json();
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

  const handleRemove = async (userId) => {
    try {
      await fetch(`http://localhost:3001/users/${userId}`, {
        method: 'DELETE',
      });
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
          <input
            type="text"
            placeholder="Cargo"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          />
        </div>
        <button type="submit">Adicionar</button>
      </form>
      {users.length === 0 ? (
        <p className="no-users">Não há nenhum usuário cadastrado.</p>
      ) : (
        <ul className="user-list">
          {users.map(user => (
            <li key={user.id} className="user-item">
              <div>
                <strong>{user.username}</strong> - {user.email}
                <br />
                <strong>Cargo:</strong> {user.role} <strong>Status:</strong> {user.status}
              </div>
              <div className="user-buttons">
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
