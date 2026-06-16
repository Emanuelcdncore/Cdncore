import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationBG from '@/locales/bg/translation.json';
import translationDE from '@/locales/de/translation.json';
import translationEN from '@/locales/en/translation.json';
import translationES from '@/locales/es/translation.json';
import translationFR from '@/locales/fr/translation.json';
import translationHR from '@/locales/hr/translation.json';
import translationCS from '@/locales/cs/translation.json';
import translationDA from '@/locales/da/translation.json';
import translationNL from '@/locales/nl/translation.json';
import translationET from '@/locales/et/translation.json';
import translationFI from '@/locales/fi/translation.json';
import translationEL from '@/locales/el/translation.json';
import translationHU from '@/locales/hu/translation.json';
import translationGA from '@/locales/ga/translation.json';
import translationIT from '@/locales/it/translation.json';
import translationLV from '@/locales/lv/translation.json';
import translationLT from '@/locales/lt/translation.json';
import translationMT from '@/locales/mt/translation.json';
import translationPL from '@/locales/pl/translation.json';
import translationPT from '@/locales/pt/translation.json';
import translationRO from '@/locales/ro/translation.json';
import translationRU from '@/locales/ru/translation.json';
import translationSK from '@/locales/sk/translation.json';
import translationSL from '@/locales/sl/translation.json';
import translationSV from '@/locales/sv/translation.json';
import translationZH from '@/locales/zh/translation.json';

const resources = {
  bg: { translation: translationBG },
  de: { translation: translationDE },
  en: { translation: translationEN },
  es: { translation: translationES },
  fr: { translation: translationFR },
  hr: { translation: translationHR },
  cs: { translation: translationCS },
  da: { translation: translationDA },
  nl: { translation: translationNL },
  et: { translation: translationET },
  fi: { translation: translationFI },
  el: { translation: translationEL },
  hu: { translation: translationHU },
  ga: { translation: translationGA },
  it: { translation: translationIT },
  lv: { translation: translationLV },
  lt: { translation: translationLT },
  mt: { translation: translationMT },
  pl: { translation: translationPL },
  pt: { translation: translationPT },
  ro: { translation: translationRO },
  ru: { translation: translationRU },
  sk: { translation: translationSK },
  sl: { translation: translationSL },
  sv: { translation: translationSV },
  zh: { translation: translationZH },
};

export const SUPPORTED_LANGUAGES = [
  { code: 'en', name: 'English', countryCode: 'GB' },
  { code: 'pt', name: 'Português', countryCode: 'PT' },
  { code: 'de', name: 'Deutsch', countryCode: 'DE' },
  { code: 'fr', name: 'Français', countryCode: 'FR' },
  { code: 'es', name: 'Español', countryCode: 'ES' },
  { code: 'it', name: 'Italiano', countryCode: 'IT' },
  { code: 'ru', name: 'Русский', countryCode: 'RU' },
  { code: 'bg', name: 'Български', countryCode: 'BG' },
  { code: 'hr', name: 'Hrvatski', countryCode: 'HR' },
  { code: 'cs', name: 'Čeština', countryCode: 'CZ' },
  { code: 'da', name: 'Dansk', countryCode: 'DK' },
  { code: 'nl', name: 'Nederlands', countryCode: 'NL' },
  { code: 'et', name: 'Eesti', countryCode: 'EE' },
  { code: 'fi', name: 'Suomi', countryCode: 'FI' },
  { code: 'el', name: 'Ελληνικά', countryCode: 'GR' },
  { code: 'hu', name: 'Magyar', countryCode: 'HU' },
  { code: 'ga', name: 'Gaeilge', countryCode: 'IE' },
  { code: 'lv', name: 'Latviešu', countryCode: 'LV' },
  { code: 'lt', name: 'Lietuvių', countryCode: 'LT' },
  { code: 'mt', name: 'Malti', countryCode: 'MT' },
  { code: 'pl', name: 'Polski', countryCode: 'PL' },
  { code: 'ro', name: 'Română', countryCode: 'RO' },
  { code: 'sk', name: 'Slovenčina', countryCode: 'SK' },
  { code: 'sl', name: 'Slovenščina', countryCode: 'SI' },
  { code: 'sv', name: 'Svenska', countryCode: 'SE' },
  { code: 'zh', name: '中文', countryCode: 'CN' },
] as const;

export const STORAGE_KEY = 'cdncore-language';

// No LanguageDetector — always start in English so SSR and initial client render match.
// I18nProvider applies the user's stored language after mount.
i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    debug: false,
    interpolation: { escapeValue: false },
    load: 'languageOnly',
    supportedLngs: ['bg', 'de', 'en', 'es', 'fr', 'hr', 'cs', 'da', 'nl', 'et', 'fi', 'el', 'hu', 'ga', 'it', 'lv', 'lt', 'mt', 'pl', 'pt', 'ro', 'ru', 'sk', 'sl', 'sv', 'zh'],
  });

export default i18n;
