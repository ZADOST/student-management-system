import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from './i18n/locales/en.json';
import ku from './i18n/locales/ku.json';
import ar from './i18n/locales/ar.json';

const resources = {
  en: { translation: en },
  ku: { translation: ku },
  ar: { translation: ar }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

// Setup RTL automatically
i18n.on('languageChanged', (lng) => {
  const dir = ['ar', 'ku'].includes(lng.split('-')[0]) ? 'rtl' : 'ltr';
  document.documentElement.dir = dir;
  document.documentElement.lang = lng;
});

// Run once on init
const initialLng = i18n.language || window.localStorage.i18nextLng || 'en';
const initialDir = ['ar', 'ku'].includes(initialLng.split('-')[0]) ? 'rtl' : 'ltr';
document.documentElement.dir = initialDir;

export default i18n;
