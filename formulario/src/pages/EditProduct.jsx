import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './EditProduct.css'

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    stock: ''
  });

  useEffect(() => {
    fetchProduct();
  }, []);

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch(`http://localhost:3001/products/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      });
      navigate('/produtos');
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  return (
    <div className="edit-product-container">
      <h2>Editar Produto</h2>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Salvar</button>
      </form>
    </div>
  );
};

export default EditProduct;
