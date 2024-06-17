import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Services.css';

const Services = () => {
  // Estado para armazenar a lista de serviços
  const [services, setServices] = useState([]);
  // Estado para armazenar o serviço em edição
  const [editingService, setEditingService] = useState(null);
  // Estados para os campos do formulário de adição/atualização de serviço
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [duration, setDuration] = useState('');
  const navigate = useNavigate();

  // Efeito de inicialização para buscar os serviços da API
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch('http://localhost:3000/services');
        const data = await response.json();
        setServices(data);
      } catch (error) {
        console.error('Fetch services error:', error);
      }
    };
    fetchServices();
  }, []);

  // Função para adicionar um novo serviço
  const handleAddService = async (e) => {
    e.preventDefault();
    try {
      const newService = { name, description, price, category, duration };
      const response = await fetch('http://localhost:3000/services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newService),
      });
      const data = await response.json();
      setServices([...services, data]);
      // Limpa os campos do formulário após adicionar o serviço
      setName('');
      setDescription('');
      setPrice('');
      setCategory('');
      setDuration('');
    } catch (error) {
      console.error('Add service error:', error);
    }
  };

  // Função para definir o serviço em edição e preencher o formulário com seus dados
  const handleEditService = (service) => {
    setEditingService(service);
    setName(service.name);
    setDescription(service.description);
    setPrice(service.price);
    setCategory(service.category);
    setDuration(service.duration);
  };

  // Função para atualizar um serviço
  const handleUpdateService = async (e) => {
    e.preventDefault();
    try {
      const updatedService = { ...editingService, name, description, price, category, duration };
      const response = await fetch(`http://localhost:3000/services/${editingService.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedService),
      });
      const data = await response.json();
      // Atualiza a lista de serviços com o serviço atualizado
      setServices(services.map((service) => (service.id === data.id ? data : service)));
      // Limpa os campos do formulário após atualizar o serviço
      setEditingService(null);
      setName('');
      setDescription('');
      setPrice('');
      setCategory('');
      setDuration('');
    } catch (error) {
      console.error('Update service error:', error);
    }
  };

  // Função para remover um serviço
  const handleRemoveService = async (serviceId) => {
    try {
      await fetch(`http://localhost:3000/services/${serviceId}`, {
        method: 'DELETE',
      });
      // Atualiza a lista de serviços após a remoção
      setServices(services.filter((service) => service.id !== serviceId));
    } catch (error) {
      console.error('Remove service error:', error);
    }
  };

  return (
    <div className="services-container">
      <h2>Serviços</h2>
      <form onSubmit={editingService ? handleUpdateService : handleAddService} className="service-form">
        {/* Campos do formulário */}
        <input
          type="text"
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Descrição"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Preço"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Categoria"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Duração"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          required
        />
        {/* Botão para adicionar/atualizar serviço */}
        <button type="submit" className="btn">{editingService ? 'Atualizar' : 'Adicionar'}</button>
        {/* Botão para cancelar a edição */}
        {editingService && <button onClick={() => setEditingService(null)} className="btn cancel-btn">Cancelar</button>}
      </form>
      {/* Verifica se há serviços cadastrados */}
      {services.length === 0 ? (
        <p className="no-services">Não há nenhum serviço cadastrado.</p>
      ) : (
        // Renderiza a lista de serviços
        <ul className="service-list">
          {services.map((service) => (
            <li key={service.id} className="service-item">
              <div>
                {/* Informações do serviço */}
                <strong>{service.name}</strong> - {service.description}
                <br />
                <strong>Preço:</strong> R$ {service.price} <strong>Categoria:</strong> {service.category} <strong>Duração:</strong> {service.duration} horas
              </div>
              <div className="service-buttons">
                {/* Botões de edição e remoção */}
                <button onClick={() => handleEditService(service)} className="btn edit-btn">Editar</button>
                <button onClick={() => handleRemoveService(service.id)} className="btn delete-btn">Remover</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Services;
