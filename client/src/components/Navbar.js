import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="nav-links">Beranda</Link>
      <Link to="/add" className="nav-links">Tambah Resep</Link>
      <Link to="/login" className="nav-links">Login</Link>
    </nav>
  );
}

export default Navbar;