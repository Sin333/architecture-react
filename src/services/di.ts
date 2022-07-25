import { NavigateFunction } from "react-router-dom";
import UserApiService from "./api/userApiService";
import LocalStorageProvider from "./localStorageProvider";
import UserLogicService from "./logic/user/userLogicService";
import NavigateService from "./routing/navigateService";

export class DI {
    static isInit = false;
    static localStorageService = LocalStorageProvider;
    static userApiService: UserApiService;
    static userLogicService: UserLogicService;
    static navigateService: NavigateService;
    static init(navigator: NavigateFunction) {
        if (DI.isInit) return;
        DI.navigateService = new NavigateService(navigator);
        DI.userApiService = new UserApiService();
        DI.userLogicService = new UserLogicService();

        DI.isInit = true;
    }
}