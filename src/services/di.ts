import { NavigateFunction } from "react-router-dom";
import UserApiService from "./api/userApiService";
import LocalStorageService from "./localStorageService";
import UserLogicService from "./logic/user/userLogicService";
import NavigateService from "./navigateService";

export class DI {
    static isInit = false;
    static localStorageService = LocalStorageService;
    static userApiService: UserApiService;
    static userLogicService: UserLogicService;
    static navigateService: NavigateService;
    static init(navigator: NavigateFunction) {
        if (DI.isInit) return;
        DI.navigateService = new NavigateService(navigator); // вот тут сам сервис навигации
        DI.userApiService = new UserApiService();
        DI.userLogicService = new UserLogicService();

        DI.isInit = true;
    }
}