import SideSelector from './SideSelector';
import './Layout.css';
import { Outlet } from 'react-router-dom';

function Layout() {
  return (
    <div className="row ">
      <div className="col-lg-1 col-sm-1 col-1 selector">
        <SideSelector />
      </div>
      <div className="col-lg-9 col-sm-11 col-11 page">
        <div className="holder">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Layout;
