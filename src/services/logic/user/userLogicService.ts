import { DI } from "../../di";

class UserLogicService {
    logOut = async () => {
        DI.localStorageService.removeTokenData();
    }
}

export default UserLogicService;