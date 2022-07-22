import { NavigateFunction } from "react-router-dom";

class NavigateService {
    private navigator: NavigateFunction;
    constructor(navigator: NavigateFunction) {
        this.navigator = navigator;
    }

    toUserPage = () => { //функция навигации
        this.navigator('user');
    }
}

export default NavigateService;