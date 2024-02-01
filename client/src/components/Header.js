import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Header() {

  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      console.log('redirecting to the home page');
      setIsLogged(true);
    }
  }, []);


  function handleLogout() {
    localStorage.removeItem('token');
    setIsLogged(false);
    window.location.href = '/';
  }

  return (
    <header>
      <h1>Selamat Datang di Nusantara Beraroma Sedap</h1>
      <nav>
        <Link to="/">Beranda</Link>

        {
          isLogged ? (
            <Link to="/add">Tambah Resep</Link>
          ) : null
        }

        {
          isLogged ? (
            <a onClick={handleLogout}>Logout</a>
          ) : (
            <Link to="/login">Login</Link>
          )
        }

      </nav>
    </header>
  );
}

export default Header;
