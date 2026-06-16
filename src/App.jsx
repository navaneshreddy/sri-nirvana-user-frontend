import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Home from './pages/Home.jsx';
import Menu from './pages/Menu.jsx';
import PlaceOrder from './pages/PlaceOrder.jsx';
import TrackOrder from './pages/TrackOrder.jsx';
import OrderSuccess from './pages/OrderSuccess.jsx';

function App() {
  return (
    <div className="app-shell">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/place-order" element={<PlaceOrder />} />
          <Route path="/track-order" element={<TrackOrder />} />
          <Route path="/order-success" element={<OrderSuccess />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
