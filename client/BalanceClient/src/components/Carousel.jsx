import PropTypes from 'prop-types';
import './Carousel.css';

function Carousel(props) {
  return (
    <div
      id="carouselExample"
      className="carousel slide"
    >
      <div className="carousel-inner">
        {props.images.map((img, idx) => {
          return (
            <div
              key={idx}
              className={idx === 0 ? 'carousel-item active' : 'carousel-item'}
            >
              <img
                src={img}
                className="img-carousel d-block w-100"
                alt="https://placehold.co/600x400/gray/black"
              />
            </div>
          );
        })}
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExample"
        data-bs-slide="prev"
      >
        <span
          className="carousel-control-prev-icon"
          aria-hidden="true"
        ></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExample"
        data-bs-slide="next"
      >
        <span
          className="carousel-control-next-icon"
          aria-hidden="true"
        ></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}

Carousel.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string),
};

export default Carousel;
