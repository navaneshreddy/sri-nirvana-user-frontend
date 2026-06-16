import { useState } from 'react';
import ErrorMessage from '../components/ErrorMessage.jsx';
import Loading from '../components/Loading.jsx';
import OrderTimeline from '../components/OrderTimeline.jsx';
import { getOrderById } from '../services/api.js';

function TrackOrder() {
  const [orderId, setOrderId] = useState('');
  const [order, setOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');
    setOrder(null);

    if (!orderId.trim()) {
      setError('Please enter a valid order ID.');
      return;
    }

    try {
      setIsLoading(true);
      const response = await getOrderById(orderId.trim());
      setOrder(response?.order || response);
    } catch (err) {
      setError(err.message || 'Unable to find this order.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="page-section">
      <div className="page-heading">
        <p className="section-kicker">Track Order</p>
        <h1>Check Room Service Status</h1>
        <p>Enter your order ID to see the latest status and delivery progress.</p>
      </div>

      <div className="track-layout">
        <form className="track-form" onSubmit={handleSubmit}>
          <ErrorMessage message={error} />
          <label>
            Order ID
            <input
              type="text"
              value={orderId}
              onChange={(event) => setOrderId(event.target.value)}
              placeholder="Enter order ID"
            />
          </label>
          <button type="submit" className="button primary full-width">
            Track Order
          </button>
        </form>

        {isLoading && <Loading message="Fetching order status..." />}

        {order && (
          <div className="tracked-order">
            <div className="order-info-card success-card">
              <p className="section-kicker">Order Found</p>
              <h2>{order.guest_name || 'Guest Order'}</h2>
              <p>Room {order.room_number || 'N/A'}</p>
              <p className="status-pill">{order.status || 'Pending'}</p>
            </div>
            <OrderTimeline currentStatus={order.status || 'Pending'} />
          </div>
        )}
      </div>
    </section>
  );
}

export default TrackOrder;
