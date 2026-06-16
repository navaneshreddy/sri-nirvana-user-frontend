import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ErrorMessage from '../components/ErrorMessage.jsx';
import Loading from '../components/Loading.jsx';
import OrderSummary from '../components/OrderSummary.jsx';
import { createOrder, getMenuItems } from '../services/api.js';
import { menuItems as fallbackMenuItems, normalizeMenuItems } from './menuData.js';

const initialForm = {
  guest_name: '',
  room_number: '',
  phone: '',
  itemId: fallbackMenuItems[0].id || fallbackMenuItems[0].name,
  quantity: 1,
  special_request: ''
};

function PlaceOrder() {
  const [form, setForm] = useState(initialForm);
  const [menuItems, setMenuItems] = useState(fallbackMenuItems);
  const [isMenuLoading, setIsMenuLoading] = useState(true);
  const [menuNotice, setMenuNotice] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const selectedItem = useMemo(
    () => menuItems.find((item) => String(item.id || item.name) === String(form.itemId)) || menuItems[0],
    [form.itemId, menuItems]
  );
  const quantity = Number(form.quantity);
  const totalAmount = selectedItem.price * quantity;

  useEffect(() => {
    let isActive = true;

    async function loadMenuItems() {
      try {
        const data = await getMenuItems();
        const backendItems = normalizeMenuItems(data);

        if (isActive && backendItems.length > 0) {
          setMenuItems(backendItems);
          setForm((current) => ({
            ...current,
            itemId: backendItems[0].id || backendItems[0].name
          }));
        }
      } catch {
        if (isActive) {
          setMenuNotice('Food and service items are using sample data until the backend menu API is available.');
        }
      } finally {
        if (isActive) {
          setIsMenuLoading(false);
        }
      }
    }

    loadMenuItems();

    return () => {
      isActive = false;
    };
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');

    const orderData = {
      guest_name: form.guest_name.trim(),
      room_number: form.room_number.trim(),
      phone: form.phone.trim(),
      items: [
        {
          name: selectedItem.name,
          category: selectedItem.category,
          price: selectedItem.price,
          quantity
        }
      ],
      total_amount: totalAmount,
      special_request: form.special_request.trim(),
      status: 'Pending'
    };

    if (!orderData.guest_name || !orderData.room_number || !orderData.phone) {
      setError('Please enter guest name, room number, and phone number.');
      return;
    }

    try {
      setIsLoading(true);
      const response = await createOrder(orderData);
      const orderId = response?.order_id || response?.id || response?._id || '';
      navigate('/order-success', { state: { orderId, order: response || orderData } });
    } catch (err) {
      setError(err.message || 'Unable to submit order right now.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="page-section">
      <div className="page-heading">
        <p className="section-kicker">Place Order</p>
        <h1>Send a Room Service Request</h1>
        <p>Fill in your room details and select an item. Your request will be sent to the hotel backend API.</p>
      </div>

      <div className="order-layout">
        <form className="order-form" onSubmit={handleSubmit}>
          <ErrorMessage message={error} />
          <ErrorMessage message={menuNotice} />

          <div className="form-grid">
            <label>
              Guest Name
              <input
                type="text"
                name="guest_name"
                value={form.guest_name}
                onChange={handleChange}
                placeholder="Enter guest name"
                required
              />
            </label>
            <label>
              Room Number
              <input
                type="text"
                name="room_number"
                value={form.room_number}
                onChange={handleChange}
                placeholder="Example: 204"
                required
              />
            </label>
            <label>
              Phone Number
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Enter phone number"
                required
              />
            </label>
            <label>
              Food / Service Item
              <select name="itemId" value={form.itemId} onChange={handleChange} disabled={isMenuLoading}>
                {menuItems.map((item) => (
                  <option key={item.id || item.name} value={item.id || item.name}>
                    {item.name} - Rs. {item.price}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Quantity
              <select name="quantity" value={form.quantity} onChange={handleChange}>
                {[1, 2, 3, 4, 5, 6].map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <label>
            Special Request
            <textarea
              name="special_request"
              value={form.special_request}
              onChange={handleChange}
              placeholder="Any dietary needs, spice level, delivery note, or service instruction"
              rows="5"
            />
          </label>

          {isMenuLoading && <Loading message="Loading food and service items..." />}

          {isLoading ? (
            <Loading message="Submitting your order..." />
          ) : (
            <button type="submit" className="button primary full-width">
              Submit Order
            </button>
          )}
        </form>

        <OrderSummary selectedItem={selectedItem} quantity={quantity} totalAmount={totalAmount} />
      </div>
    </section>
  );
}

export default PlaceOrder;
