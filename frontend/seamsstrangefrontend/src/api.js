import axios from "axios";
import Cookies from "js-cookie";

const instance = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:8000'
});

instance.interceptors.request.use(
    (config) =>{
        const csrf = Cookies.get('csrftoken');
        if (csrf){
            config.headers['X-CSRFToken'] = csrf;
        }
        return config;
    },
    (error) =>{
        return Promise.reject(error);
    }
)

instance.interceptors.response.use(
    (response) =>{
        return response;
    },
    async (error) =>{
        if (error.response && error.response.status === 401){
            // 1: check if there is a config and if the config has already been retried
            if (error.config && error.config.attemptedRefresh){
                // case when we have already tried to refresh the token, time to fail
                return Promise.reject(error);
            }
            // Safety check, if no error.config just fail
            if (!error.config) return Promise.reject(error);

            //2: first retry, attempt to gain a refresh token.
            error.config.attemptedRefresh = true;
            try{
                await instance.post('/api/refresh/');
                return instance(error.config);
            }catch (invalidRefresh){
                // refresh token also expires, must relogin
                return Promise.reject(invalidRefresh);
            }

        }
        return Promise.reject(error);
    }
);
export default instance;