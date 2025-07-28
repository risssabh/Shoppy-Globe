// src/components/Header.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

function Header() {
  const [searchInput, setSearchInput] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Handle search submit
  const handleSearchSubmit = e => {
    e.preventDefault();
    if (searchInput.trim() !== '') {
      navigate(`/?search=${encodeURIComponent(searchInput.trim())}`);
      setSearchInput('');
      setMenuOpen(false);
    }
  };

  // Handle category click
  const handleCategoryClick = category => {
    navigate(`/?category=${category}`);
    setSearchInput('');
    setMenuOpen(false);
  };

  // Handle home link click
  const handleHomeClick = () => {
    navigate('/');
    setSearchInput('');
    setMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="navbar">
        {/* Logo & Brand */}
        <div className="nav-left">
          <Link to="/" className="logo" onClick={handleHomeClick}>🛍️ ShoppyGlobe</Link>
        </div>

        {/* Center: Nav + Search */}
        <div className={`nav-center ${menuOpen ? 'open' : ''}`}>
          <button onClick={handleHomeClick} className="nav-link">Home</button>
          <button onClick={() => handleCategoryClick('beauty')} className="nav-link">Beauty</button>
          <button onClick={() => handleCategoryClick('furniture')} className="nav-link">Furniture</button>
          <button onClick={() => handleCategoryClick('fragrances')} className="nav-link">Fragrances</button>
          <button onClick={() => handleCategoryClick('groceries')} className="nav-link">Groceries</button>

          <form className="search-form" onSubmit={handleSearchSubmit}>
            <input
              type="text"
              placeholder="Search..."
              value={searchInput}
              onChange={e => setSearchInput(e.target.value)}
            />
          </form>
        </div>

        {/* Right: Cart + Hamburger */}
        <div className="nav-right">
          <Link to="/cart" className="cart-icon" onClick={() => setMenuOpen(false)}>🛒</Link>
          <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
            ☰
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
