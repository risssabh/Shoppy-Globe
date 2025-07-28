// src/components/ProductDetail.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './ProductDetail.css';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartActions';

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch(`https://dummyjson.com/products/${id}`);
        if (!res.ok) throw new Error('Failed to fetch product');
        const data = await res.json();
        setProduct(data);
        setError('');
      } catch {
        setError('Error loading product details.');
      }
    }
    fetchProduct();
  }, [id]);

  if (error) return <div className="product-detail-error">{error}</div>;
  if (!product) return <div className="product-detail-loading">Loading...</div>;

  return (
    <div className="product-detail-container">
      <div className="product-detail-card">
        <div className="gallery">
          {product.images?.map((img, idx) => (
            <div key={idx} className="gallery-image-wrapper">
              <img src={img} alt={`${product.title} ${idx}`} className="gallery-img" />
            </div>
          ))}
        </div>

        <div className="product-detail-info">
          <h2 className="product-detail-title">{product.title}</h2>
          <p className="product-detail-brand">Brand: {product.brand}</p>
          <p className="product-detail-desc">{product.description}</p>
          <p className="product-detail-price">${product.price}</p>
          <p className="product-detail-rating">Rating: {product.rating} ⭐️</p>
          <p className="product-detail-stock">Stock: {product.stock}</p>

          <button
            className="product-detail-btn"
            onClick={() => dispatch(addToCart(product))}
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* Reviews */}
      {product.reviews && product.reviews.length > 0 && (
        <div className="reviews-section">
          <h3>Customer Reviews</h3>
          {product.reviews.map((r, i) => (
            <div key={i} className="review-item">
              <p className="review-rating">Rating: {r.rating} ⭐️</p>
              <p className="review-comment">"{r.comment}"</p>
              <p className="reviewer">— {r.reviewerName}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductDetail;
