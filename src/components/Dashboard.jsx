import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  const dashboardContainerStyle = {
    width: '100%',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '2rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const optionsContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    gap: '2rem',
    marginTop: '2rem',
    width: '100%',
    maxWidth: '1200px',
  };

  const optionButtonStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1.5rem',
    fontSize: '1.2rem',
    backgroundColor: 'white', // Botón blanco
    color: 'red', // Letras rojas
    border: 'white', // Borde rojo
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.3s, color 0.3s, transform 0.2s',
    width: '200px',
    textAlign: 'center',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    fontFamily: 'Flamante Roma, sans-serif'
  };

  const optionButtonHoverStyle = {
    backgroundColor: 'red', // Fondo rojo en hover
    color: 'white', // Letras blancas en hover
  };

  const optionImageStyle = {
    width: '60px',
    height: '60px',
    objectFit: 'cover',
    borderRadius: '5px',
    marginBottom: '1rem',
  };

  const handleMouseOver = (e) => {
    const button = e.currentTarget;
    button.style.backgroundColor = optionButtonHoverStyle.backgroundColor;
    button.style.color = optionButtonHoverStyle.color;
    button.style.transform = 'scale(1.05)';
  };

  const handleMouseOut = (e) => {
    const button = e.currentTarget;
    button.style.backgroundColor = 'white'; // Volver al fondo blanco
    button.style.color = 'red'; // Letras rojas
    button.style.transform = 'scale(1)';
  };

  const options = [
    {
      name: 'Actualizar precios',
      action: () => navigate('/store-selector'),
      image: 'https://play-lh.googleusercontent.com/QzJM-JULtutSqefQu5TNr_HEG7zvZJbRfe61ZqdmpVzNRCfE2B0nRWvNgcH7eAiMrP0',
      description: 'Actualizar los precios en la tienda seleccionada', // Descripción emergente
    },
    {
      name: 'Cargar publicidad',
      action: () => console.log('Cargar publicidad'),
      image: 'https://www.cocacolaep.com/assets/Uploads/resources/Coca-Cola-1210.jpg',
      description: 'Cargar y gestionar publicidad', // Descripción emergente
    },
    {
      name: 'Modificar flejes de tienda',
      action: () => navigate('/modify-strips'),
      image: 'https://tagsprinter.com/es/forms/cenniki/api/screenshots/price-tag-60276_es_ES.png',
      description: 'Modificar los flejes de las tiendas', // Descripción emergente
    },
  ];

  return (
    <div style={dashboardContainerStyle}>
      <h2>¿Qué deseas hacer?</h2>
      <div style={optionsContainerStyle}>
        {options.map((option, index) => (
          <button
            key={index}
            style={optionButtonStyle}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
            onClick={option.action}
            title={option.description} // Descripción emergente en tooltip
          >
            <img src={option.image} alt={option.name} style={optionImageStyle} />
            {option.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
