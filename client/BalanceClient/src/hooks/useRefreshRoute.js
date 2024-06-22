import axiosInstance from '../api/axios';
import { useContext } from 'react';
import AuthContext from '../context/Auth';

const REFRESH_URL = '/refresh';

const useRefreshToken = () => {
  const { auth, setAuth } = useContext(AuthContext);

  const refresh = async () => {
    const response = await axiosInstance.post(
      REFRESH_URL,
      JSON.stringify({ uuid: auth?.uuid, id: 'refresh' }),
      { withCredentials: true }
    );

    setAuth((prev) => {
      return { ...prev, accessToken: response?.data?.accessToken };
    });

    return response?.data?.accessToken;
  };

  return refresh;
};

export default useRefreshToken;
