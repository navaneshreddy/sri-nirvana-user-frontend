import { Link } from 'react-router-dom';

function Home() {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <p className="section-kicker">In-room dining and guest services</p>
        <h1>SRI NIRVANA PLAZA Room Service</h1>
        <p>
          Order premium meals, refreshments, and guest essentials from the comfort of your room.
          Track every request from confirmation to delivery.
        </p>
        <div className="hero-actions">
          <Link to="/place-order" className="button primary">
            Place Order
          </Link>
          <Link to="/track-order" className="button secondary">
            Track Order
          </Link>
        </div>
      </div>

      <div className="hero-panel" aria-label="Room service highlights">
        <div>
          <span>24/7</span>
          <p>Guest service support</p>
        </div>
        <div>
          <span>Fresh</span>
          <p>Chef-curated meals</p>
        </div>
        <div>
          <span>Fast</span>
          <p>Room delivery updates</p>
        </div>
      </div>
    </section>
  );
}

export default Home;
