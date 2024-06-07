import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/EditProduct.css';

const EditProduct = () => {
  const { id } = useParams(); // Obtém o parâmetro de rota `id`
  const navigate = useNavigate(); // Hook para navegação
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    stock: ''
  });

  // Efeito para buscar o produto a ser editado ao carregar o componente
  useEffect(() => {
    fetchProduct();
  }, []);

  // Função para buscar o produto a ser editado
  const fetchProduct = async () => {
    try {
      const response = await fetch(`http://localhost:3001/products/${id}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setProduct(data);
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  };

  // Função para atualizar o estado do produto conforme o usuário digita nos campos do formulário
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  // Função para lidar com o envio do formulário de edição
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Enviar uma requisição PUT para atualizar o produto
      await fetch(`http://localhost:3001/products/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      });
      // Redirecionar para a página de produtos após editar o produto com sucesso
      navigate('/produtos');
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  // Função para lidar com o cancelamento da edição e retornar para a página de produtos
  const handleCancel = () => {
    navigate('/produtos');
  };

  return (
    <div className="edit-product-container">
      <h2>Editar Produto</h2>
      <form onSubmit={handleSubmit} className="edit-product-form">
        <div className="form-group">
          <label htmlFor="name">Nome:</label>
          <input 
            type="text" 
            id="name" 
            name="name" 
            value={product.name} 
            onChange={handleInputChange} 
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Descrição:</label>
          <textarea 
            id="description" 
            name="description" 
            value={product.description} 
            onChange={handleInputChange} 
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Preço:</label>
          <input 
            type="number" 
            id="price" 
            name="price" 
            value={product.price} 
            onChange={handleInputChange} 
          />
        </div>
        <div className="form-group">
          <label htmlFor="stock">Estoque:</label>
          <input 
            type="number" 
            id="stock" 
            name="stock" 
            value={product.stock} 
            onChange={handleInputChange} 
          />
        </div>
        <button type="submit" className="btn">Salvar</button>
        <button type="button" className="cancel-btn" onClick={handleCancel}>Cancelar</button>
      </form>
    </div>
  );
};

export default EditProduct;
