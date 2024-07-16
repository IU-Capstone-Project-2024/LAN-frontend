// src/i18n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Языковые ресурсы
const resources = {
  en: {
    translation: {
      "language": "Language",
      "russian": "Russian",
      "english": "English",
      "appSettings": "App Settings",
      "themeSettings": "Theme Settings",
      "notificationSettings": "Notification Settings",
      "faq": "FAQ",
      "reportProblem": "Report a Problem",
      "logout": "Logout",
      // добавьте другие переводы
    }
  },
  ru: {
    translation: {
      "language": "Язык",
      "russian": "Русский",
      "english": "Английский",
      "appSettings": "Настройки приложения",
      "themeSettings": "Тема приложения",
      "notificationSettings": "Настройка уведомлений",
      "faq": "FAQ",
      "reportProblem": "Сообщить о проблеме",
      "logout": "Выйти",
      // добавьте другие переводы
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'ru', // начальный язык
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
