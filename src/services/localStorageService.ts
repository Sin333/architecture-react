import EventEmitter from 'eventemitter3';

const eventChangeIsAuth = new EventEmitter();
const getTokenData = (): any | null => {
  const tokenData = localStorage.getItem('tokenData');
  return tokenData ? JSON.parse(tokenData) : null;
}
const checkIsAuth = (): boolean => {
  const tokenData = getTokenData();
  if (tokenData && new Date(tokenData.expiresRefresh) > new Date()) {
    return true;
  }
  return false;
}
const getUserId = (): string => {
  const isAuth = checkIsAuth();
  if (!isAuth) {
    const errorMessage = 'User is unauthorize';
    throw errorMessage;
  }

  return getTokenData()!.userId;
};

const eventChangeLang = new EventEmitter<string>();
const getLang = (): string | null => {
  return localStorage.getItem("lang");
}
const setLang = (lang: string) => {
  localStorage.setItem("lang", lang);
  eventChangeLang.emit(lang);
}

const LocalStorageService = {
  getUserId: (): string => getUserId(),
  isAuth: (): boolean => checkIsAuth(),
  getTokenData: (): any | null => getTokenData(),
  saveTokenData: (data: any) => {
    localStorage.setItem('tokenData', JSON.stringify(data));
    eventChangeIsAuth.emit('isAuth', true);
  },
  removeTokenData: () => {
    localStorage.removeItem('tokenData');
    eventChangeIsAuth.emit('isAuth', false);
  },
  eventIsAuth: eventChangeIsAuth,

  getLang: (): string | null => getLang(),
  setLang: (lang: string) => setLang(lang),
  eventChangeLang: eventChangeLang
};

export default LocalStorageService;
