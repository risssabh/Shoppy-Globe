// src/components/ProductList.js
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ProductItem from './ProductItem';
import useFetchProducts from '../hooks/useFetchProducts';
import './ProductList.css';

function ProductList() {
  const { products, error } = useFetchProducts();
  const location = useLocation();

  const [filteredProducts, setFilteredProducts] = useState([]);

  // Get query parameters
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get('search')?.toLowerCase() || '';
  const category = queryParams.get('category')?.toLowerCase() || '';

  // Define new arrivals and hot selling logic
  const getNewArrivals = (all) => all.slice(-6);
  const getHotSelling = (all) => all.slice(0, 6);

  useEffect(() => {
    if (products.length === 0) return;

    let temp = [...products];

    if (category) {
      temp = temp.filter(p => p.category.toLowerCase().includes(category));
    }

    if (searchQuery) {
      temp = temp.filter(
        p =>
          p.title.toLowerCase().includes(searchQuery) ||
          p.description.toLowerCase().includes(searchQuery)
      );
    }

    setFilteredProducts(temp);
  }, [products, category, searchQuery]);

  const title = category
    ? category.charAt(0).toUpperCase() + category.slice(1)
    : searchQuery
    ? `Search results for "${searchQuery}"`
    : 'All Products';

  return (
    <div className="product-list">
      {/* Hero Section */}
      {!searchQuery && !category && (
        <div className="hero">
          <h1 className="hero-title">Welcome to ShoppyGlobe 🛍️</h1>
          <p className="hero-tagline">“Where shopping meets serenity – find your vibe, live your style.”</p>
        </div>
      )}

      {/* New Arrivals Section */}
      {!searchQuery && !category && (
        <section className="product-section">
          <h2 className="section-heading">🌟 New Arrivals</h2>
          <div className="product-grid">
            {getNewArrivals(products).map(product => (
              <ProductItem key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* Hot Selling Section */}
      {!searchQuery && !category && (
        <section className="product-section">
          <h2 className="section-heading">🔥 Hot Selling</h2>
          <div className="product-grid">
            {getHotSelling(products).map(product => (
              <ProductItem key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* Filtered Products Section */}
      <section className="product-section">
        <h2 className="section-heading">🛒 {title}</h2>

        {error && <p className="error">{error}</p>}

        {filteredProducts.length === 0 && (
          <p className="no-products">❌ The item you're looking for was not found.</p>
        )}

        <div className="product-grid">
          {filteredProducts.map(product => (
            <ProductItem key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default ProductList;
