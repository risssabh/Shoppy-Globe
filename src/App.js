// src/App.js
import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import NotFound from './components/NotFound';
import './App.css';

// Lazy loaded components for performance
const ProductList = lazy(() => import('./components/ProductList'));
const ProductDetail = lazy(() => import('./components/ProductDetail'));
const Cart = lazy(() => import('./components/Cart'));

function App() {
  return (
    <div>
      {/* Header displayed on all pages */}
      <Header />
      
      {/* Suspense wraps lazy components */}
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
