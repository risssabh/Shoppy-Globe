// src/components/ProductItem.js
import React from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartActions';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import './ProductItem.css';

function ProductItem({ product }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  const goToDetail = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <div className="product-item">
      <img
        src={product.thumbnail}
        alt={product.title}
        className="product-img"
        onClick={goToDetail}
      />
      <h3 className="product-title" onClick={goToDetail}>{product.title}</h3>
      <p className="product-brand">{product.brand}</p>
      <p className="product-price">${product.price}</p>
      <button onClick={handleAddToCart} className="add-btn">
        Add to Cart
      </button>
    </div>
  );
}

ProductItem.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    brand: PropTypes.string,
    price: PropTypes.number,
    thumbnail: PropTypes.string,
  }).isRequired,
};

export default ProductItem;
