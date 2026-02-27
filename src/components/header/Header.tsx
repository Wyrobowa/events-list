import { useNavigate, useLocation } from 'react-router-dom';
import { NavBar } from 'tharaday';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { id: '/', label: 'Attendees list', href: '/' },
    { id: '/add', label: 'Add attendee', href: '/add' },
  ];

  return (
    <NavBar
      items={navItems}
      activeId={location.pathname}
      onItemClick={(id) => navigate(id)}
      logo={<strong>Event Form</strong>}
    />
  );
};

export default Header;
