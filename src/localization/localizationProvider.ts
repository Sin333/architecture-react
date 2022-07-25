import i18next from './i18nConfig';
import LanguageEnum from './enums/languageEnum';
import LanguageKeysEnum from './enums/languageKeysEnum';
import LocalStorageProvider from '../services/localStorageProvider';

const LocalizationProvider = {
    changeLanguage: async (lang: LanguageEnum) => {
        await i18next.changeLanguage(lang);
        LocalStorageProvider.setLang(lang);
    },
    getValue: (key: LanguageKeysEnum) => i18next.t(key),
    getCurrentLanguage: () => i18next.language,

}

export default LocalizationProvider;