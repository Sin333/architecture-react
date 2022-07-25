import { DI } from '../di';
import BaseHttpService from './../baseHttpService';
class UserApiService extends BaseHttpService {
    logIn = async (model: any) => {
        const result = await this.Put<any>("Auth/Login", null, model, false);

        if (result && result.tokenResult) {
            DI.localStorageService.saveTokenData(result.tokenResult);
            await  this.runRefreshTokenTimer();
        }

        return result;
    }

    private runRefreshTokenTimer = async () => {
        return null;
    }
}

export default UserApiService;