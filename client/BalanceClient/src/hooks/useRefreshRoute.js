import { axios } from '../api/axios';
import { useContext } from 'react';
import AuthContext from '../context/Auth';

const useRefreshToken = async () => {
  const { setAuth } = useContext(AuthContext);

  function refresh() {
    const response = axios.get('./refresh', { withCredentials: true });

    setAuth((prev) => {
      return { ...prev, accessToken: response?.data?.accessToken };
    });

    return response?.data?.accessToken;
  }

  return refresh();
};

export default useRefreshToken;
