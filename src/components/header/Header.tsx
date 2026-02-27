import { Link } from 'react-router-dom';

const Header = () => (
  <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
    <div className="navbar-nav">
      <Link to="/" className="nav-item nav-link">Attendees list</Link>
      <Link to="/add" className="nav-item nav-link">Add attendee</Link>
    </div>
  </nav>
);

export default Header;
