import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import LocalStorageProvider from '../services/localStorageProvider';
import LanguageEnum from './enums/languageEnum';
import languageEN from './resources/en.json'
import languageRU from './resources/ru.json'

i18n
    .use(LanguageDetector) // select language from Accept-Language (browser settings)
    .use(initReactI18next) // bind react-i18next to the instance
    .init({
        resources: {
            en: {
                translation: languageEN
            },
            ru: {
                translation: languageRU
            }
        },
        lng: (LocalStorageProvider.getLang() ?? undefined), // reselect language by site settings
        fallbackLng: LanguageEnum.en, //set default language if current language not (en/ru)
        debug: false, //for development need set true
        // returnObjects: true,
        interpolation: {
            escapeValue: false, // not needed for react!!
        },

        // react i18next special options (optional)
        // override if needed - omit if ok with defaults
        /*
        react: {
          bindI18n: 'languageChanged',
          bindI18nStore: '',
          transEmptyNodeValue: '',
          transSupportBasicHtmlNodes: true,
          transKeepBasicHtmlNodesFor: ['br', 'strong', 'i'],
          useSuspense: true,
        }
        */
    });

export default i18n;