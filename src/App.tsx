import { t } from "i18next";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  Routes,
  Route,
  Link,
  useNavigate,
  Outlet,
} from "react-router-dom";
import LanguageEnum from "./localization/enums/languageEnum";
import LanguageKeysEnum from "./localization/enums/languageKeysEnum";
import LocalizationProvider from "./localization/localizationProvider";
import AuthPage from "./pages/auth/authPage";
import UserPage from "./pages/user/userPage";
import { DI } from "./services/di";
import RoutingEnum from "./services/routing/enums/routingEnum";

export default function App() {
  const { t: translation } = useTranslation();
  let navigate = useNavigate();

  useEffect(() => {
    DI.init(navigate);
  }, []);

  const onChangeLanguage = async (lang: LanguageEnum) => {
    LocalizationProvider.changeLanguage(lang);
  }

  function Layout() {
    return (
      <div>
        <p>Select language</p>
        <button onClick={() => onChangeLanguage(LanguageEnum.en)}>
          En
        </button>
        <button onClick={() => onChangeLanguage(LanguageEnum.ru)}>
          Ru
        </button>
        <ul>
          <li>
            <Link to="/">{`${translation(LanguageKeysEnum.Home)}`}</Link>
          </li>
          <li>
            <Link to={RoutingEnum.auth}>Auth Page</Link>
          </li>
          <li>
            <Link to={RoutingEnum.user}>User Page</Link>
          </li>
        </ul>

        <Outlet />
      </div>
    );
  }

  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route path={RoutingEnum.auth} element={<AuthPage />} />
        <Route path={RoutingEnum.user} element={<UserPage />} />
      </Route>
    </Routes>
  );
}