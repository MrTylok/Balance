import { axiosPrivate } from '../api/axios';
import useRefreshToken from './useRefreshRoute';
import { useContext, useEffect } from 'react';
import AuthContext from '../context/Auth';

function useAxiosPrivate() {
  const { auth } = useContext(AuthContext);
  const refresh = useRefreshToken();

  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers['Authorization']) {
          config.headers['Authorization'] = 'Bearer ' + auth?.accessToken;
        }
        return config;
      },
      (error) => {
        console.log('request Interceptor');
        Promise.reject(error);
      }
    );

    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => {
        response;
      },
      async (error) => {
        const prevRequest = error?.config;

        if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newAccessToken = refresh();
          prevRequest.headers['Authorization'] = 'Bearer ' + newAccessToken;
          axiosPrivate(prevRequest);
        }

        return Promise.reject(error);
      }
    );

    //clenup function
    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [auth, refresh]);
  return axiosPrivate;
}

export default useAxiosPrivate;
