import axios from "axios";
import qs from "qs";
import LocalStorageService from "./localStorageService";

class BaseHttpService {
    protected async GetFile(url: string, query?: any, isAuth?: boolean) {
      return await this.AxiosInstance(isAuth)
        .get<ArrayBuffer>(url + this.objectToQuery(query), {
          responseType: 'arraybuffer'
        })
        .then(x => {
          const buffer = Buffer.from(x.data);
          const base64String = buffer.toString('base64');
          return base64String;
        })
        .catch(err => {
        //   if (err.status !== HttpStatusCodeEnum.ClientErrorNotFound) {
        //     this.showException(err);
        //   }
          return null;
        });
    }
  
    protected async Get<T>(url: string, query?: any, isAuth?: boolean) {
      return await this.AxiosInstance(isAuth).get<T>(url + this.objectToQuery(query))
        .then(x => x.data)
        .catch((err) => this.showException(err));
    }
  
    protected async Post<T>(url: string, query?: any, body?: any, isAuth?: boolean) {
      return await this.AxiosInstance(isAuth).post<T>(url + this.objectToQuery(query), body)
        .then(x => x.data)
        .catch((err) => this.showException(err));
    }
  
    protected async Put<T>(url: string, query?: any, body?: any, isAuth?: boolean) {
      return await this.AxiosInstance(isAuth).put<T>(url + this.objectToQuery(query), body)
        .then(x => x.data)
        .catch((err) => this.showException(err));
    }
  
    protected async Delete<T>(url: string, query?: any, isAuth?: boolean) {
      return await this.AxiosInstance(isAuth).delete<T>(url + this.objectToQuery(query))
        .then(x => x.data)
        .catch((err) => this.showException(err));
    }
  
    protected showException = (result: any): null => {
      const obj = result.response;
      if (obj && obj.data && obj.data.errorMessage) {
        if (obj.data.isCriticalError)
          this.notify(obj.data.errorMessage);
        else
          this.notify(obj.data.errorMessage);
      } else if (obj && obj.status) {
        if (obj.status === 403) {
          this.notify(obj.statusText);
        }
      }
      return null;
    }
  
    private notify = (text: string, isError = true) => {
    //   if (!text)
    //     return;
    //   const notifyOptions: ToastOptions = {
    //     position: "bottom-right",
    //     autoClose: 3000,
    //     hideProgressBar: true,
    //     closeOnClick: true,
    //     pauseOnHover: false,
    //     draggable: true,
    //     progress: undefined,
    //   };
    //   if (isError)
    //     toast.error(text, notifyOptions);
    //   else
    //     toast.warning(text, notifyOptions);
    }
  
    private AxiosInstance = (isAuth?: boolean) => {
      let headers: any = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Accept-Language': LocalStorageService.getLang() || "ru",
      };
      const tokenData = LocalStorageService.getTokenData();
      if (isAuth && tokenData)
        headers.Authorization = `Bearer ${tokenData.refreshToken}`; //HACK we use 'refreshToken' field, because haven't 'refreshToken' request
      return axios.create({
        baseURL: process.env.REACT_APP_API_URL,
        headers: headers
      });
    }
  
    private objectToQuery = (obj: any) => {
      if (!obj)
        return "";
  
      return qs.stringify(obj, {
        addQueryPrefix: true,
        indices: true,
        allowDots: true,
        skipNulls: true,
      });
    }
  }
  
  export default BaseHttpService;