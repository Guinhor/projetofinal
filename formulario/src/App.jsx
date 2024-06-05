import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Products from './pages/Products';
import Services from './pages/Services';
import Users from './pages/Users';
import Layout from './components/Layout';
import AddProduct from './pages/AddProduct';
import EditProduct from './pages/EditProduct';
import ErrorPage from './pages/ErrorPage';
import EditUser from './pages/EditUser';
import './styles/App.css';

const App = () => (
  <Router>
    <div className="app">
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/error" element={<h2>Erro ao realizar Login. Verique o nome de usuário e/ou senha.</h2>} />
      <Route path="/produtos" element={<Layout><Products /></Layout>} />
      <Route path="/servicos" element={<Layout><Services /></Layout>} />
      <Route path="/usuarios" element={<Layout><Users /></Layout>} />
      <Route path="/produtos/adicionar" element={<AddProduct />} />
      <Route path="/produtos/editar/:id" element={<EditProduct />} />
      <Route path="/usuarios/editar/:id" element={<EditUser />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
   </div> 
  </Router>
);

export default App;
