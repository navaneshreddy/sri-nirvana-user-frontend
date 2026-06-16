import { NavLink } from 'react-router-dom';

function Navbar() {
  const navItems = [
    { to: '/', label: 'Home' },
    { to: '/menu', label: 'Menu' },
    { to: '/place-order', label: 'Place Order' },
    { to: '/track-order', label: 'Track Order' }
  ];

  return (
    <header className="navbar">
      <NavLink to="/" className="brand" aria-label="SRI NIRVANA PLAZA home">
        <span className="brand-mark">SNP</span>
        <span>
          <strong>SRI NIRVANA PLAZA</strong>
          <small>Room Service</small>
        </span>
      </NavLink>

      <nav className="nav-links" aria-label="Main navigation">
        {navItems.map((item) => (
          <NavLink key={item.to} to={item.to} className={({ isActive }) => (isActive ? 'active' : '')}>
            {item.label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}

export default Navbar;
