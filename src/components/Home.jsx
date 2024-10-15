import React from 'react';

const Home = ({ onLoginClick }) => {
  const pageStyle = {
    width: '100%',
    height: '100vh', // Asegura que ocupe toda la altura de la pantalla
    display: 'flex',
    justifyContent: 'center', // Centra horizontalmente
    alignItems: 'center', // Centra verticalmente
    position: 'relative', // Necesario para el overlay
    margin: '0', // Elimina cualquier margen
  };

  const overlayStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  };

  const contentStyle = {
    position: 'relative',
    zIndex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: '2.5rem',
    borderRadius: '20px',
    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.3)',
    maxWidth: '450px',
    textAlign: 'center', // Centra el texto dentro del contenedor
  };

  const h1Style = {
    fontSize: '3rem',
    marginBottom: '1.5rem',
    color: 'red', // Cambié el color a rojo
    fontWeight: 'bold',
    textShadow: '2px 2px 5px rgba(0, 0, 0, 0.2)',
  };

  const loginButtonStyle = {
    padding: '15px 40px',
    fontSize: '1.2rem',
    backgroundColor: 'red', // Cambié el color del botón a rojo
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.3s, transform 0.2s',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    fontFamily: 'Flamante Roma, sans-serif'
  };

  const loginButtonHoverStyle = {
    backgroundColor: '#cc0000', // Rojo oscuro en hover
    transform: 'scale(1.05)',
  };

  return (
    <div style={pageStyle}>
      <div style={overlayStyle}></div>
      <div style={contentStyle}>
        <h1 style={h1Style}>¡Bienvenido a ColorBand!</h1>
        <button
          style={loginButtonStyle}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = loginButtonHoverStyle.backgroundColor;
            e.target.style.transform = loginButtonHoverStyle.transform;
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = 'red'; // Rojo normal al salir del hover
            e.target.style.transform = 'scale(1)';
          }}
          onClick={onLoginClick}
        >
          Iniciar Sesión
        </button>
      </div>
    </div>
  );
};

export default Home;
