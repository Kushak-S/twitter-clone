import React, { useState } from 'react';
import logo from '../logo.svg';
import pic from '../pic.png';

const AppBar = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle search when the user submits the form
    alert(`Search: ${searchTerm}`);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light p-0">
      <img src={logo} className="navbar-brand ml-2" alt="Logo" />

      <div className="mx-auto">
        <form className="form-inline" onSubmit={handleSearch}>
          <input
            className="form-control rounded-pill mr-sm-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
            value={searchTerm}
            onChange={handleInputChange}
          />
        </form>
      </div>

      <div className="nav-item dropdown">
        <img
          src={pic}
          alt="User"
          className="nav-link btn"
          id="navbarDropdown"
          onClick={toggleDropdown}
          style={{ height:'4rem', borderRadius: '50%' }}
        />
        <div
          className={`dropdown-menu dropdown-menu-right${
            isDropdownOpen ? ' show' : ''
          }`}
          aria-labelledby="navbarDropdown"
        >
          <a className="dropdown-item" href="/profile">
            Profile
          </a>
          <div className="dropdown-divider"></div>
          <a className="dropdown-item" href="/login">
            Logout
          </a>
        </div>
      </div>
    </nav>
  );
};

export default AppBar;
