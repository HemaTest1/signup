import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const SearchingProduct = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
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

  const filteredProducts = products.filter(product => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    return (
      product.title.toLowerCase().includes(lowerCaseQuery) ||
      product.price.toString().includes(lowerCaseQuery) ||
      product.id.toString().includes(lowerCaseQuery) ||
      product.rating.rate.toString().includes(lowerCaseQuery)||
      product.category.toString().includes(lowerCaseQuery)
    );
  });

  return (
    <div className="container my-4">
      <h1 className="text-center mb-4">Product List</h1>

      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search for products by title, price, rating, or ID..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="row">
        {filteredProducts.length === 0 ? (
          <div className="col-12 text-center">
            <p className="text-danger">Results not found</p>
          </div>
        ) : (
          filteredProducts.map((product) => (
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
                  <p className="card-text text-primary">${product.price.toFixed(2)}</p>
                  <div className="card-text">{renderStars(product.rating.rate)}</div>
                  <button 
                    className="btn btn-primary mt-auto" 
                    onClick={() => toggleDetails(product.id)}
                  >
                    {expandedProduct === product.id ? 'Hide Details' : 'View Details'}
                  </button>
                  {expandedProduct === product.id && (
                    <div className="mt-3  ">
                     
                      <p className="text-left"><strong className="id1">Description:</strong> {product.description}</p>
                      <p ><strong className="id1" >Category:</strong> {product.category}</p>
                      <p  ><strong className="id1">Id :</strong>{product.id}</p>
                      <p ><strong className="id1">Title :</strong>{product.title}</p>
                      <p ><strong className="id1" >Rating:</strong> {product.rating.rate} ({product.rating.count} reviews)</p>
                    </div>
                   
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SearchingProduct;
