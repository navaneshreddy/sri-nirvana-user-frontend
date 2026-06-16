import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ErrorMessage from '../components/ErrorMessage.jsx';
import FoodCard from '../components/FoodCard.jsx';
import Loading from '../components/Loading.jsx';
import { getMenuItems } from '../services/api.js';
import { menuItems as fallbackMenuItems, normalizeMenuItems } from './menuData.js';

function Menu() {
  const [menuItems, setMenuItems] = useState(fallbackMenuItems);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const categories = [...new Set(menuItems.map((item) => item.category))];

  useEffect(() => {
    let isActive = true;

    async function loadMenuItems() {
      try {
        const data = await getMenuItems();
        const backendItems = normalizeMenuItems(data);

        if (isActive && backendItems.length > 0) {
          setMenuItems(backendItems);
        }
      } catch {
        if (isActive) {
          setError('Menu is using sample items until the backend menu API is available.');
        }
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    }

    loadMenuItems();

    return () => {
      isActive = false;
    };
  }, []);

  return (
    <section className="page-section">
      <div className="page-heading">
        <p className="section-kicker">Guest Menu</p>
        <h1>Curated Room Service Selection</h1>
        <p>Browse hotel dining and service items, then place your order for room delivery.</p>
      </div>

      {isLoading && <Loading message="Loading menu items..." />}
      <ErrorMessage message={error} />

      {categories.map((category) => (
        <div className="menu-group" key={category}>
          <div className="group-heading">
            <h2>{category}</h2>
            <Link to="/place-order">Order now</Link>
          </div>
          <div className="card-grid">
            {menuItems
              .filter((item) => item.category === category)
              .map((item) => (
                <FoodCard key={item.name} item={item} />
              ))}
          </div>
        </div>
      ))}
    </section>
  );
}

export default Menu;
