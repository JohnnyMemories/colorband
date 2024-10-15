import React from 'react';

const profileImage = 'https://cdn.icon-icons.com/icons2/3106/PNG/512/person_avatar_account_user_icon_191606.png';

const QuienesSomos = () => {
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '2rem',
    maxWidth: '800px',
    margin: '0 auto',
  };

  const profilesContainerStyle = {
    display: 'flex',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: '2rem',
  };

  const profileStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
  };

  const imageStyle = {
    width: '150px',
    height: '150px',
    borderRadius: '50%',
    objectFit: 'cover',
    marginBottom: '1rem',
  };

  const nameStyle = {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    marginBottom: '0.5rem',
  };

  return (
    <div style={containerStyle}>
      <h1>Quiénes Somos</h1>
      <p>Somos un equipo dedicado a proporcionar soluciones innovadoras para Pronto Copec.</p>
      <div style={profilesContainerStyle}>
        <div style={profileStyle}>
          <img src={profileImage} alt="Juan Agüero" style={imageStyle} />
          <span style={nameStyle}>Juan Agüero</span>
        </div>
        <div style={profileStyle}>
          <img src={profileImage} alt="Paulina Campos" style={imageStyle} />
          <span style={nameStyle}>Paulina Campos</span>
        </div>
        <div style={profileStyle}>
          <img src={profileImage} alt="Joaquín Rivas" style={imageStyle} />
          <span style={nameStyle}>Joaquín Rivas</span>
        </div>
      </div>
    </div>
  );
};

export default QuienesSomos;