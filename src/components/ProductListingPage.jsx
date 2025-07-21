import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductListingPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortOption, setSortOption] = useState('');

  useEffect(() => {
    // Fetch products
    axios.get('https://fakestoreapi.com/products')
      .then((res) => {
        setProducts(res.data);
        setFilteredProducts(res.data);
      });

    // Fetch categories
    axios.get('https://fakestoreapi.com/products/categories')
      .then((res) => {
        setCategories(res.data);
      });
  }, []);

  useEffect(() => {
    let updated = [...products];

    if (selectedCategory !== 'all') {
      updated = updated.filter((p) => p.category === selectedCategory);
    }

    if (sortOption === 'price-asc') {
      updated.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'price-desc') {
      updated.sort((a, b) => b.price - a.price);
    } else if (sortOption === 'name') {
      updated.sort((a, b) => a.title.localeCompare(b.title));
    }

    setFilteredProducts(updated);
  }, [selectedCategory, sortOption, products]);

  return (
    <div className="container my-4">
      <h2 className="mb-4">Product Listing</h2>

      <div className="row mb-4">
        <div className="col-md-4">
          <select
            className="form-select"
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="all">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        <div className="col-md-4">
          <select
            className="form-select"
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="">Sort By</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="name">Name</option>
          </select>
        </div>
      </div>

      <div className="row">
        {filteredProducts.map((product) => (
          <div className="col-sm-6 col-md-4 col-lg-3 mb-4" key={product.id}>
            <div className="card h-100">
              <img
                src={product.image}
                className="card-img-top p-3"
                alt={product.title}
                style={{ height: '200px', objectFit: 'contain' }}
              />
              <div className="card-body">
                <h6 className="card-title text-truncate">{product.title}</h6>
                <p className="card-text text-muted small">{product.category}</p>
                <p className="card-text fw-bold">₹{product.price}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductListingPage;
