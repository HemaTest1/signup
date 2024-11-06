import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [expandedProduct, setExpandedProduct] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://fakestoreapi.com/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;

    return (
      <div className="star-rating">
        {'★'.repeat(fullStars).split('').map((star, index) => (
          <span key={index} className="text-warning">{star}</span>
        ))}
        {halfStar ? <span className="text-warning">☆</span> : ''}
        {'☆'.repeat(emptyStars).split('').map((star, index) => (
          <span key={index + fullStars + halfStar} className="text-muted">{star}</span>
        ))}
      </div>
    );
  };

  const toggleDetails = (productId) => {
    setExpandedProduct(expandedProduct === productId ? null : productId);
  };

  return (
    
    <div className="container my-4">
        
      <h1 className="text-center mb-4">Product List</h1>
      <div className="row">
        {products.map((product) => (
          <div className="col-md-4 mb-4" key={product.id}>
            <div className="card h-100 d-flex flex-column">
              <img 
                src={product.image} 
                className="card-img-top" 
                alt={product.title} 
                style={{ height: '200px', objectFit: 'contain' }} 
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{product.title}</h5>
                <p className="card-text text-danger">${product.price}</p>
                <div className="card-text">{renderStars(product.rating.rate)}</div>
                <button 
                  className="btn btn-primary mt-auto" 
                  onClick={() => toggleDetails(product.id)}
                >
                  {expandedProduct === product.id ? 'Hide Details' : 'View Details'}
                </button>
                {expandedProduct === product.id && (
                  <div className="mt-3">
                    <p><strong>Description:</strong> {product.description}</p>
                    <p><strong>Category:</strong> {product.category}</p>
                    <p><strong>Rating:</strong> {product.rating.rate} ({product.rating.count} reviews)</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
