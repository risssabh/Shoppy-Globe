// src/hooks/useFetchProducts.js
import { useEffect, useState } from 'react';

const useFetchProducts = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch products when component mounts
    const fetchData = async () => {
      try {
        const response = await fetch('https://dummyjson.com/products');
        if (!response.ok) throw new Error('Failed to fetch products');
        const data = await response.json();
        setProducts(data.products); // products is an array
      } catch (err) {
        setError(err.message);
      }
    };

    fetchData();
  }, []);

  return { products, error };
};

export default useFetchProducts;
