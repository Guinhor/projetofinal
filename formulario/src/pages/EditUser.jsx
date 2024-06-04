import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './EditUser.css';

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // Usando useNavigate para navegação
  const [user, setUser] = useState({
    username: '',
    password: '',
    email: '',
    role: '',
    status: '',
  });

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const response = await fetch(`http://localhost:3001/users/${id}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setUser(data);
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch(`http://localhost:3001/users/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });
      navigate('/usuarios'); // Redirecionando de volta para a página de usuários após a edição
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <div className="edit-user-container">
      <h2>Editar Usuário</h2>
      <form onSubmit={handleSubmit} className="edit-user-form">
        <div className="form-group">
          <label htmlFor="username">Usuário:</label>
          <input 
            type="text" 
            id="username" 
            name="username" 
            value={user.username} 
            onChange={handleInputChange} 
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Senha:</label>
          <input 
            type="password" 
            id="password" 
            name="password" 
            value={user.password} 
            onChange={handleInputChange} 
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">E-mail:</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            value={user.email} 
            onChange={handleInputChange} 
          />
        </div>
        <div className="form-group">
          <label htmlFor="role">Cargo:</label>
          <input 
            type="text" 
            id="role" 
            name="role" 
            value={user.role} 
            onChange={handleInputChange} 
          />
        </div>
        <div className="form-group">
          <label htmlFor="status">Status:</label>
          <input 
            type="text" 
            id="status" 
            name="status" 
            value={user.status} 
            onChange={handleInputChange} 
          />
        </div>
        <button type="submit" className="btn">Salvar</button>
      </form>
    </div>
  );
};

export default EditUser;
