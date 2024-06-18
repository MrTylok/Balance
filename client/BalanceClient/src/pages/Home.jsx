import Carousel from '../components/Carousel';
import './css/Home.css';

function Home() {
  return (
    <div className="home">
      <p>Suggested yoga for today</p>
      <Carousel
        images={[
          'https://placehold.co/600x400/gray/black',
          'https://placehold.co/600x400/gray/black',
          'https://placehold.co/600x400/gray/black',
        ]}
      />
    </div>
  );
}

export default Home;
