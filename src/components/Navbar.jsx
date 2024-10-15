import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ onLoginClick, isLoggedIn }) => {
  const navigate = useNavigate();

  const navbarStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 rem',
    height: '60px',
    backgroundColor: 'white',
    color: 'red',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    position: 'fixed',
    top: 0,
    width: '100%',
    zIndex: 600,
    flexWrap: 'wrap',
  };

  const logoStyle = {
    height: '40px',
    cursor: 'pointer',
  };

  const linksStyle = {
    display: 'flex',
    listStyleType: 'none',
    alignItems: 'center',
    gap: '1.5rem', // Ajustamos el espacio entre enlaces
    flexWrap: 'wrap', // Permite que los enlaces se envuelvan
  };

  const linkItemStyle = {
    cursor: 'pointer',
    color: 'red',
    textDecoration: 'none',
    fontSize: '1rem',
    fontWeight: 'bold',
    transition: 'background-color 0.3s, color 0.3s', // Añadimos transición para suavizar el hover
    padding: '0.5rem 0.5rem',
    borderRadius: '5px',
  };

  const linkItemHoverStyle = {
    backgroundColor: '#FFE4E1',
    color: 'darkred',
  };

  const handleMouseOver = (e) => {
    e.currentTarget.style.backgroundColor = linkItemHoverStyle.backgroundColor;
    e.currentTarget.style.color = linkItemHoverStyle.color;
  };

  const handleMouseOut = (e) => {
    e.currentTarget.style.backgroundColor = 'transparent';
    e.currentTarget.style.color = 'red';
  };

  const handleLogout = () => {
    // Aquí se maneja el proceso de logout
    navigate('/');
  };

  return (
    <nav style={navbarStyle}>
      <Link to="/">
        <img
          src="https://www.prontocopec.cl/wp-content/themes/pronto-theme/img/LOGO-PRONTO-COPEC.png"
          alt="Pronto Copec Logo"
          style={logoStyle}
        />
      </Link>
      <ul style={linksStyle}>
        <li>
          <Link to="/quienes-somos" style={linkItemStyle}>Quiénes Somos</Link>
        </li>
        <li
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
        >
          <Link to="/services" style={linkItemStyle}>Nuestros Servicios</Link>
        </li>
        {isLoggedIn ? (
          <>
            <li
              onMouseOver={handleMouseOver}
              onMouseOut={handleMouseOut}
            >
              <Link to="/dashboard" style={linkItemStyle}>Acciones</Link>
            </li>
            <li
              onClick={handleLogout}
              onMouseOver={handleMouseOver}
              onMouseOut={handleMouseOut}
              style={linkItemStyle}
            >
              Cerrar Sesión
            </li>
          </>
        ) : (
          <li
            onClick={onLoginClick}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
            style={linkItemStyle}
          >
            Iniciar Sesión
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
