import './SideSelector.css';
import { BsFilterLeft } from 'react-icons/bs';

function SideSelector() {
  return (
    <div className="container">
      <button
        className="btn btn-primary"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasScrolling"
        aria-controls="offcanvasScrolling"
      >
        <BsFilterLeft />
      </button>

      <div
        className="offcanvas offcanvas-start"
        data-bs-scroll="true"
        data-bs-backdrop="false"
        tabIndex="-1"
        id="offcanvasScrolling"
        aria-labelledby="offcanvasScrollingLabel"
      >
        <div className="offcanvas-header">
          <h5
            className="offcanvas-title"
            id="offcanvasScrollingLabel"
          >
            Offcanvas
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <p>PlaceHolder</p>
        </div>
      </div>
    </div>
  );
}

export default SideSelector;
