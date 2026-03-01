import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Header as DSHeader } from 'tharaday';
import { logout, login } from '../../store/slices/authSlice';
import { RootState } from '../../types';
import { AppDispatch } from '../../configureStore';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { user, isLoggedIn } = useSelector((state: RootState) => state.auth);

  const handleLogout = async () => {
    await dispatch(logout());
    navigate('/');
  };

  const handleLogin = async () => {
    await dispatch(login('admin'));
  };

  return (
    <DSHeader
      logo={<strong>Event Form</strong>}
      user={isLoggedIn && user ? { name: user } : undefined}
      maxWidth="90%"
      onLogin={handleLogin}
      onLogout={handleLogout}
    />
  );
};

export default Header;
