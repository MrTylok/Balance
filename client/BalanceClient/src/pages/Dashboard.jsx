import { Link, Outlet } from 'react-router-dom';
import { useState } from 'react';

const handleLinks = (obj) => {
  let ownProperty = [];
  for (let entry in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, entry)) {
      ownProperty.push(entry);
    }
  }

  return ownProperty;
};

function Dashboard() {
  const [activeLink, setActiveLink] = useState(0);
  const links = { Images: './', Metrics: './metrics' };

  return (
    <div className="dashboard-main-div">
      <ul className="nav nav-tabs">
        {handleLinks(links).map((l, idx) => {
          return (
            <li
              className="nav-item mb-0 pb-0"
              key={idx}
            >
              <Link
                to={links[l]}
                className={idx === activeLink ? 'nav-link active' : 'nav-link'}
                onClick={() => {
                  setActiveLink(idx);
                }}
              >
                {l}
              </Link>
            </li>
          );
        })}
      </ul>

      <Outlet />
    </div>
  );
}

export default Dashboard;
