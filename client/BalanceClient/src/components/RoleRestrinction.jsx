import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../context/Auth';
import PropTypes from 'prop-types';

function RoleRestrinction({ allowedRoles }) {
  const location = useLocation();

  const { auth } = useContext(AuthContext);

  if (auth?.roles?.find((role) => allowedRoles.includes(role + ''))) {
    return <Outlet />;
  } else {
    if (auth?.email !== undefined) {
      return (
        <Navigate
          to={'/unauthorized'}
          state={{ from: location }}
          replace
        />
      );
    } else
      return (
        <Navigate
          to={'/login'}
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
