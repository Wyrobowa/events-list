import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import App from './App';
import configureStore from './configureStore';

const store = configureStore();

describe('App', () => {
  it('renders Welcome message by default when not logged in', () => {
    window.history.pushState({}, 'Test page', '/events-list/');
    render(
      <Provider store={store}>
        <App />
      </Provider>,
    );

    expect(screen.getByText(/Welcome to Event Form/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Log in to Continue/i })).toBeInTheDocument();
  });
});
