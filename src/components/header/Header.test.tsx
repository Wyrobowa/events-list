import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import Header from './Header';
import configureStore from '../../configureStore';

const store = configureStore();

describe('Header', () => {
  it('renders Header with logo and login button when not logged in', () => {
    render(
      <Provider store={store}>
        <Router>
          <Header />
        </Router>
      </Provider>,
    );

    expect(screen.getByText(/Event Form/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Log in/i })).toBeInTheDocument();
  });
});
