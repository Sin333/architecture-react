import { NavigateFunction } from "react-router-dom";
import RoutingEnum from "./enums/routingEnum";

class NavigateService {
    private navigator: NavigateFunction;
    constructor(navigator: NavigateFunction) {
        this.navigator = navigator;
    }

    toAuthPage = () => {
        this.navigator(RoutingEnum.auth, { replace: true });
    }

    toUserPage = () => {
        this.navigator(RoutingEnum.user, { replace: true });
    }
}

export default NavigateService;