import React from 'react';
import { useSettings } from '../context/SettingsContext';

const Footer: React.FC = () => {
  const { t } = useSettings();

  return (
    <footer style={{
      textAlign: 'center',
      padding: '1.5rem',
      borderTop: '1px solid var(--glass-border)',
      color: 'var(--text-secondary)',
      fontSize: '0.9rem'
    }}>
      <p>&copy; {new Date().getFullYear()} {t('footerText')}</p>
    </footer>
  );
};

export default Footer;