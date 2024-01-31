import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header>
      <h1>Selamat Datang di Nusantara Beraroma Sedap</h1>
      <nav>
        <Link to="/">Beranda</Link>
        <Link to="/add">Tambah Resep</Link>
        <Link to="/login">Login</Link>
        
      </nav>
    </header>
  );
}

export default Header;
