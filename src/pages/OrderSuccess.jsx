import { Link, useLocation } from 'react-router-dom';

function OrderSuccess() {
  const { state } = useLocation();
  const orderId = state?.orderId;

  return (
    <section className="success-page">
      <div className="success-card large">
        <p className="section-kicker">Success</p>
        <h1>Your order has been submitted</h1>
        <p>
          The hotel team has received your room service request. Your order starts at Pending and will
          update as it moves through preparation and delivery.
        </p>

        <div className="success-details">
          <span>Order ID</span>
          <strong>{orderId || 'Provided by backend response'}</strong>
        </div>

        <div className="hero-actions">
          <Link to="/track-order" className="button primary">
            Track Order
          </Link>
          <Link to="/menu" className="button secondary">
            Back to Menu
          </Link>
        </div>
      </div>
    </section>
  );
}

export default OrderSuccess;
