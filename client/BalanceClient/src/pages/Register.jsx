import './css/Register.css';
import { useState } from 'react';
import axiosInstance from '../api/axios';

import { Navigate, useLocation } from 'react-router-dom';

const REGISTER_PATH = '/register';

function Register() {
  const [email, setEmail] = useState('');
  const [psw, setPsw] = useState('');
  const [registrationResult, setRegistrationResult] = useState(undefined);
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

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
        REGISTER_PATH,
        JSON.stringify({ email: email_s, psw: psw_s }),
        { headers: { 'Content-Type': 'application/json' } }
      );

      if (response.status === 201) {
        setEmail('');
        setPsw('');
        <Navigate
          to={from}
          replace
        />;
        setRegistrationResult(true);
      }
    } catch (error) {
      console.log(error.message, error.code);
      setRegistrationResult(false);
    }
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
            <div className="form-title">Sign Up</div>
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
            <div className="reg-result">
              {registrationResult === undefined ? (
                ''
              ) : registrationResult === true ? (
                <p className="success-message">
                  You have been correctly signed up!
                </p>
              ) : (
                <p className="fail-message">
                  Something went wrong please try again.
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
