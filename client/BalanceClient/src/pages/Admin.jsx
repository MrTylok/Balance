import './Admin.css';
import { useState, useContext } from 'react';
import { axiosPrivate } from '../api/axios';
import AuthContext from '../context/Auth';

const ADMIN_PATH = '/admin';

function Admin() {
  const { setAuth } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [psw, setPsw] = useState('');

  /**
   * Retrieves data from backend to log in
   * email roles and accessToken will be saved in AuthContext
   * @param {*} e Submit event from form
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email_s = email;
    const psw_s = psw;

    const response = await axiosPrivate.post(
      ADMIN_PATH,
      JSON.stringify(email_s, psw_s)
    );

    const accessToken = response?.data?.accessToken;
    const roles = response?.data?.roles;

    setAuth({ email, roles, accessToken });
    setEmail('');
    setPsw('');
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
            <div className="form-title">Admin Login</div>
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
        </div>
      </div>
    </div>
  );
}

export default Admin;
