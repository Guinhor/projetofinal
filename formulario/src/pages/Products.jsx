import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Products.css';

const Products = () => {
  // Estado para armazenar a lista de produtos
  const [products, setProducts] = useState([]);

  // Efeito de inicialização para buscar os produtos da API
  useEffect(() => {
    fetchProducts();
  }, []);

  // Função para buscar os produtos da API
  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:3000/products');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  // Função para lidar com a remoção de um produto
  const handleRemove = async (productId) => {
    try {
      await fetch(`http://localhost:3000/products/${productId}`, {
        method: 'DELETE',
      });
      // Atualiza a lista de produtos após a remoção
      setProducts(products.filter(product => product.id !== productId));
    } catch (error) {
      console.error('Error removing product:', error);
    }
  };

  return (
    <div className="products-container">
      <h2>Produtos</h2>
      {/* Link para a página de adição de produtos */}
      <Link to="/produtos/adicionar" className="btn">Adicionar Produto</Link>
      {/* Verifica se há produtos cadastrados */}
      {products.length === 0 ? (
        <p className="no-products">Não há nenhum produto cadastrado.</p>
      ) : (
        // Renderiza a lista de produtos
        <ul className="product-list">
          {products.map(product => (
            <li key={product.id} className="product-item">
              <div>
                <strong>{product.name}</strong> - {product.description}
                <br />
                <strong>Preço:</strong> R$ {product.price} <strong>Estoque:</strong> {product.stock}
              </div>
              <div className="product-buttons">
                {/* Botão para remover o produto */}
                <button onClick={() => handleRemove(product.id)} className="btn delete-btn">Remover</button>
                {/* Link para a página de edição do produto */}
                <Link to={`/produtos/editar/${product.id}`} className="btn edit-btn">Editar</Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Products;
