import React from 'react';
import { Link } from 'react-router-dom';
import { useSettings } from '../context/SettingsContext';

const Home = () => {
  // Destructure the translation function 't' from our context
  const { t } = useSettings();

  return (
    <div className="home-wrapper">
      <h1 className="hero-title">{t('heroTitle')}</h1>
      
      <p className="hero-subtitle">
        {t('heroSubtitle')}
      </p>
      
      <div className="button-group">
        <Link to="/login" className="btn-primary" style={{ fontSize: '1.1rem', padding: '1rem 2.5rem' }}>
          {t('login')}
        </Link>
        <Link to="/register" className="btn-secondary-large">
          {t('registerAccount')}
        </Link>
      </div>
    </div>
  );
};

export default Home;