import { Outlet, useLocation, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../context/Auth';
import PropTypes from 'prop-types';

function RoleRestrinction({ allowedRoles }) {
  const location = useLocation();
  const auth = useContext(AuthContext);

  if (auth?.roles?.find((role) => allowedRoles.includes(role))) {
    <Outlet />;
  } else {
    auth?.email ? (
      <Navigate
        to={'/unauthorized'}
        state={{ from: location }}
        replace
      />
    ) : (
      <Navigate
        to={'/dashboard'}
        state={{ from: location }}
        replace
      />
    );
  }
}

RoleRestrinction.propTypes = {
  allowedRoles: PropTypes.arrayOf(PropTypes.string),
};

export default RoleRestrinction;
