import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/AddProduct.css';

const AddProduct = () => {
  const navigate = useNavigate(); // Hook para navegação
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    stock: ''
  });

  // Função para atualizar o estado do produto conforme o usuário digita nos campos do formulário
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  // Função para lidar com o envio do formulário
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Verificar se algum campo está vazio
    if (!product.name || !product.description || !product.price || !product.stock) {
      alert('Por favor, preencha todos os campos.');
      return;
    }
    try {
      // Enviar uma requisição POST para adicionar o novo produto
      await fetch('http://localhost:3000/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      });
      // Redirecionar para a página de produtos após adicionar o produto com sucesso
      navigate('/produtos');
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <div className="add-product-container">
      <h2>Adicionar Produto</h2>
      <form onSubmit={handleSubmit} className="add-product-form">
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
        <button type="submit" className="btn">Adicionar</button>
        <button type="button" className="btn" onClick={() => navigate(-1)}>Voltar</button>
      </form>
    </div>
  );
};

export default AddProduct;
