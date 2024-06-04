import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Services.css';

const Services = () => {
  const [services, setServices] = useState([]);
  const [editingService, setEditingService] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [duration, setDuration] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch('http://localhost:3001/services');
        const data = await response.json();
        setServices(data);
      } catch (error) {
        console.error('Fetch services error:', error);
      }
    };
    fetchServices();
  }, []);

  const handleAddService = async (e) => {
    e.preventDefault();
    try {
      const newService = { name, description, price, category, duration };
      const response = await fetch('http://localhost:3001/services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newService),
      });
      const data = await response.json();
      setServices([...services, data]);
      setName('');
      setDescription('');
      setPrice('');
      setCategory('');
      setDuration('');
    } catch (error) {
      console.error('Add service error:', error);
    }
  };

  const handleEditService = (service) => {
    setEditingService(service);
    setName(service.name);
    setDescription(service.description);
    setPrice(service.price);
    setCategory(service.category);
    setDuration(service.duration);
  };

  const handleUpdateService = async (e) => {
    e.preventDefault();
    try {
      const updatedService = { ...editingService, name, description, price, category, duration };
      const response = await fetch(`http://localhost:3001/services/${editingService.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedService),
      });
      const data = await response.json();
      setServices(services.map((service) => (service.id === data.id ? data : service)));
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

  const handleRemoveService = async (serviceId) => {
    try {
      await fetch(`http://localhost:3001/services/${serviceId}`, {
        method: 'DELETE',
      });
      setServices(services.filter((service) => service.id !== serviceId));
    } catch (error) {
      console.error('Remove service error:', error);
    }
  };

  return (
    <div className="services-container">
      <h2>Serviços</h2>
      <form onSubmit={editingService ? handleUpdateService : handleAddService} className="service-form">
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
        <button type="submit" className="btn">{editingService ? 'Atualizar' : 'Adicionar'}</button>
        {editingService && <button onClick={() => setEditingService(null)} className="btn cancel-btn">Cancelar</button>}
      </form>
      {services.length === 0 ? (
        <p className="no-services">Não há nenhum serviço cadastrado</p>
      ) : (
        <ul className="service-list">
          {services.map((service) => (
            <li key={service.id} className="service-item">
              <div>
                <strong>{service.name}</strong> - {service.description}
                <br />
                <strong>Preço:</strong> R$ {service.price} <strong>Categoria:</strong> {service.category} <strong>Duração:</strong> {service.duration} horas
</div>
<div className="service-buttons">
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
