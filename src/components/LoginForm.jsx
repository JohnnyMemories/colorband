import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginForm = ({ onLogin, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(email, password);
    navigate('/dashboard');
  };

  const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center', // Centra horizontalmente
    alignItems: 'center', // Centra verticalmente
    zIndex: 1000,
  };

  const formContainerStyle = {
    backgroundColor: 'white',
    padding: '2.5rem',
    borderRadius: '10px',
    width: '350px',
    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.3)',
    position: 'relative',
    textAlign: 'center', // Centra el texto dentro del contenedor
  };

  const closeButtonStyle = {
    position: 'absolute',
    top: '10px',
    right: '10px',
    background: 'none',
    border: 'none',
    fontSize: '1.5rem',
    color: '#333',
    cursor: 'pointer',
  };

  const inputStyle = {
    width: '100%',
    padding: '0.75rem',
    marginBottom: '1rem',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '1rem',
    boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.1)',
    outline: 'none',
    transition: 'border-color 0.3s ease',
  };

  const inputFocusStyle = {
    borderColor: 'red', // Cambié el color del borde a rojo cuando está enfocado
  };

  const submitButtonStyle = {
    width: '100%',
    padding: '0.75rem',
    backgroundColor: 'red', // Cambié el color del botón a rojo
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    fontSize: '1.2rem',
    cursor: 'pointer',
    transition: 'background-color 0.3s, transform 0.2s',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.15)',
    fontFamily: 'Flamante Roma, sans-serif'
  };

  const submitButtonHoverStyle = {
    backgroundColor: 'darkred', // Rojo oscuro en hover
    transform: 'scale(1.05)',
  };

  return (
    <div style={overlayStyle}>
      <div style={formContainerStyle}>
        <button style={closeButtonStyle} onClick={onClose}>×</button>
        <h2>Iniciar Sesión</h2>
        <form onSubmit={handleSubmit}>
          <input
            style={inputStyle}
            type="email"
            placeholder="Correo Electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            onFocus={(e) => e.target.style.borderColor = inputFocusStyle.borderColor}
            onBlur={(e) => e.target.style.borderColor = '#ccc'}
          />
          <input
            style={inputStyle}
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            onFocus={(e) => e.target.style.borderColor = inputFocusStyle.borderColor}
            onBlur={(e) => e.target.style.borderColor = '#ccc'}
          />
          <button
            style={submitButtonStyle}
            type="submit"
            onMouseOver={(e) => {
              e.target.style.backgroundColor = submitButtonHoverStyle.backgroundColor;
              e.target.style.transform = submitButtonHoverStyle.transform;
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = 'red'; // Rojo normal al salir del hover
              e.target.style.transform = 'scale(1)';
            }}
          >
            Ingresar
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
