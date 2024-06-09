import PropTypes from 'prop-types';
import './Navbar.css';
import { Link } from 'react-router-dom';

function Navbar(props) {
  let navbarLinks = props.links;
  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid container-style">
        <Link
          className="navbar-brand"
          to="/"
          replace={true}
        >
          Balance
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarTogglerDemo01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div
          className="collapse navbar-collapse "
          id="navbarNav"
        >
          <ul className="navbar-nav">
            {navbarLinks.map((l, idx) => {
              return (
                <li
                  key={idx}
                  className="nav-item"
                >
                  <Link
                    className="nav-link"
                    to={'./' + l.toLowerCase()}
                  >
                    {l}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </nav>
  );
}

Navbar.propTypes = {
  links: PropTypes.arrayOf(PropTypes.string),
};

export default Navbar;
