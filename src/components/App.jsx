import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './Navbar';
import Home from './Home';
import Dashboard from './Dashboard';
import StoreSelector from './StoreSelector';
import PriceUpdater from './PriceUpdater';
import LoginForm from './LoginForm';
import ModifyStrips from './ModifyStrips';
import QuienesSomos from './QuienesSomos';

// Importa las demás imágenes que tengas en la carpeta assets

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);

  const handleLoginClick = () => {
    setShowLoginForm(true);
  };

  const handleLoginFormClose = () => {
    setShowLoginForm(false);
  };

  const handleLogin = (email, password) => {
    // Aquí normalmente validarías las credenciales
    console.log('Login attempt with:', email, password);
    setIsLoggedIn(true);
    setShowLoginForm(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const appStyle = {
    minHeight: '100vh',
    backgroundImage: 'url(https://www.prontocopec.cl/wp-content/uploads/2023/04/header_tiendas.jpg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',
    position: 'relative',
    fontFamily: 'Flamante Roma, sans-serif',
  };

  const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    backdropFilter: 'blur(5px)',
    zIndex: 0,
  };

  const mainContentStyle = {
    position: 'relative',
    zIndex: 1,
    paddingTop: '60px',
    minHeight: 'calc(100vh - 60px)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const fontStyles = `
    @font-face {
      font-family: 'Flamante Roma';
      src: url('/fonts/FlamanteRoma-Light.woff2') format('woff2'),
           url('/fonts/FlamanteRoma-Light.woff') format('woff');
      font-weight: 300;
      font-style: normal;
    }
    @font-face {
      font-family: 'Flamante Roma';
      src: url('/fonts/FlamanteRoma-Regular.woff2') format('woff2'),
           url('/fonts/FlamanteRoma-Regular.woff') format('woff');
      font-weight: normal;
      font-style: normal;
    }
    @font-face {
      font-family: 'Flamante Roma';
      src: url('/fonts/FlamanteRoma-Medium.woff2') format('woff2'),
           url('/fonts/FlamanteRoma-Medium.woff') format('woff');
      font-weight: 500;
      font-style: normal;
    }
    @font-face {
      font-family: 'Flamante Roma';
      src: url('/fonts/FlamanteRoma-Bold.woff2') format('woff2'),
           url('/fonts/FlamanteRoma-Bold.woff') format('woff');
      font-weight: bold;
      font-style: normal;
    }
  `;

  return (
    <Router>
      <div style={appStyle}>
        <style>{fontStyles}</style>
        <div style={overlayStyle}></div>
        <Navbar onLoginClick={handleLoginClick} isLoggedIn={isLoggedIn} onLogout={handleLogout} />
        <div style={mainContentStyle}>
          <Routes>
            <Route path="/" element={<Home onLoginClick={handleLoginClick} />} />
            <Route 
              path="/dashboard" 
              element={isLoggedIn ? <Dashboard /> : <Navigate to="/" replace />} 
            />
            <Route 
              path="/store-selector" 
              element={isLoggedIn ? <StoreSelector /> : <Navigate to="/" />} 
            />
            <Route 
              path="/price-updater" 
              element={isLoggedIn ? <PriceUpdater /> : <Navigate to="/" replace />} 
            />
            <Route 
              path="/modify-strips" 
              element={isLoggedIn ? <ModifyStrips /> : <Navigate to="/" replace />} 
            />
            <Route path="/quienes-somos" element={<QuienesSomos />} />
          </Routes>
        </div>
        {showLoginForm && (
          <LoginForm onLogin={handleLogin} onClose={handleLoginFormClose} />
        )}
      </div>
    </Router>
  );
};

export default App;
