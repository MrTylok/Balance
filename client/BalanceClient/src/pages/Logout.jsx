import axiosInstance from '../api/axios';
import { useState, useContext } from 'react';
import AuthContext from '../context/Auth';

import './css/Logout.css';

const LOGOUT_URL = '/logout';
function Logout() {
  const { auth, setAuth } = useContext(AuthContext);
  const [logoutResult, setLogoutResult] = useState(
    auth.accessToken !== undefined ? true : false
  );
  const [showInfoState, setShowInfoState] = useState(false);

  const handleLogout = async () => {
    if (auth.accessToken === undefined) {
      setShowInfoState(true);
    }
    try {
      await axiosInstance.post(
        LOGOUT_URL,
        { uuid: auth.uuid },
        {
          withCredentials: true,
        }
      );
      setAuth({});
      setLogoutResult(false);
    } catch (err) {
      setLogoutResult(true);
    }
  };

  return (
    <div
      className="container-fluid"
      style={{ textAlign: 'center' }}
    >
      <div className="online-state">
        <h1>{logoutResult ? 'Connected' : 'Disconnected'}</h1>
      </div>
      <p>Click here to logout</p>
      <button
        className="btn btn-primary"
        onClick={handleLogout}
      >
        Logout
      </button>
      <div className="alert-state">
        {showInfoState && <p>Already logged out</p>}
      </div>
    </div>
  );
}

export default Logout;
