import './css/Login.css';
import { useState, useContext } from 'react';
import axiosInstance from '../api/axios';
import AuthContext from '../context/Auth';
import { useLocation, Link, useNavigate } from 'react-router-dom';

const LOGIN_PATH = '/auth';

function Login() {
  const { setAuth } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [psw, setPsw] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from ? location.state.from.pathname : '/';

  /**
   * Retrieves data from backend to log in
   * email roles and accessToken will be saved in AuthContext
   * @param {*} e Submit event from form
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email_s = email;
    const psw_s = psw;

    try {
      const response = await axiosInstance.post(
        LOGIN_PATH,
        JSON.stringify({ email: email_s, psw: psw_s }),
        { withCredentials: true }
      );
      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.roles;
      const uuid = response?.data?.uuid;

      setAuth({ email, uuid, roles, accessToken });
      setEmail('');
      setPsw('');
    } catch (error) {
      console.log(error.message, error.code);
    }
    navigate(from, { replace: true });
  };

  return (
    <div className="row">
      <div className="col-lg-10 offset-lg-1 col-12">
        <div className="access-holder">
          <form
            onSubmit={(event) => {
              handleSubmit(event);
            }}
          >
            <div className="form-title">Sign In</div>
            <div className="mb-3 mx-3">
              <label
                htmlFor="emailForm"
                className="form-label"
              >
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="emailForm"
                placeholder="example@gmail.com"
                name="emailForm"
                aria-describedby="emailHelper"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <div
                id="emailHelper"
                className="form-text"
              >
                Enter your email
              </div>
            </div>
            <div className="mb-3 mx-3">
              <label
                htmlFor="pswForm"
                className="form-label"
              >
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="pswForm"
                placeholder="password"
                name="pswForm"
                aria-describedby="pswHelper"
                value={psw}
                onChange={(e) => {
                  setPsw(e.target.value);
                }}
              />
              <div
                id="pswHelper"
                className="form-text"
              >
                Enter your password
              </div>
              <div className="button-div my-3">
                <button
                  type="submit"
                  className="btn btn-secondary"
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
          <div className="reg-div">
            <p>Still not une of us?</p>
            <Link
              className="reg-link"
              to="/register"
            >
              Register now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
