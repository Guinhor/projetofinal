import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/EditUser.css';

const EditUser = () => {
  const { id } = useParams(); // Obtém o parâmetro de rota 'id'
  const navigate = useNavigate(); // Hook para navegação programática

  // Estado para armazenar os dados do usuário a serem editados
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    role: '',
    status: ''
  });

  // Efeito de inicialização para buscar os dados do usuário
  useEffect(() => {
    fetchUser();
  }, []);

  // Função para buscar os dados do usuário da API
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

  // Função para lidar com a alteração nos campos de entrada do formulário
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  // Função para lidar com o envio do formulário de edição do usuário
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
      navigate('/usuarios'); // Navega de volta para a lista de usuários após a edição
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  // Função para lidar com o botão "Cancelar"
  const handleGoBack = () => {
    navigate(-1); // Volta para a página anterior na pilha de histórico
  };

  return (
    <div className="edit-user-container">
      <h2>Editar Usuário</h2>
      <form onSubmit={handleSubmit} className="edit-user-form">
        <div className="form-group">
          <label htmlFor="name">Nome:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={user.name}
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
          <label htmlFor="role">Cargo:</label>
          <select
            id="role"
            name="role"
            value={user.role}
            onChange={handleInputChange}
          >
            <option value="">Selecione o cargo</option>
            <option value="Administrador">Administrador</option>
            <option value="Editor">Editor</option>
            <option value="Visualizador">Visualizador</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="status">Status:</label>
          <select
            id="status"
            name="status"
            value={user.status}
            onChange={handleInputChange}
          >
            <option value="">Selecione o status</option>
            <option value="Ativo">Ativo</option>
            <option value="Inativo">Inativo</option>
          </select>
        </div>
        <button type="submit" className="btn">Salvar</button>
        <button type="button" className="cancel-btn" onClick={handleGoBack}>Cancelar</button>
      </form>
    </div>
  );
};

export default EditUser;
