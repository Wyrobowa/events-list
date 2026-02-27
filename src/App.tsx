import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Text, Button } from 'tharaday';

// Components
import Header from './components/header/Header';

// Containers
import AttendeeList from './containers/attendeeList/AttendeeList';
import { RootState } from './types';
import { login } from './store/slices/authSlice';
import { AppDispatch } from './configureStore';

const App = () => {
  const { isLoggedIn, status } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();

  const handleLogin = () => {
    dispatch(login('admin'));
  };

  return (
    <Router basename="/events-list/">
      <>
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              isLoggedIn ? (
                <AttendeeList />
              ) : (
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  gap={4}
                  style={{ paddingTop: '5rem' }}
                >
                  <Text variant="h2">Welcome to Event Form</Text>
                  <Text variant="body-lg">Please log in to manage attendees.</Text>
                  <Button
                    size="lg"
                    intent="info"
                    variant="solid"
                    onClick={handleLogin}
                    disabled={status === 'loading'}
                  >
                    {status === 'loading' ? 'Logging in...' : 'Log in to Continue'}
                  </Button>
                </Box>
              )
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </>
    </Router>
  );
};

export default App;
