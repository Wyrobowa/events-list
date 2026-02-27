import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import App from './App';
import configureStore from './configureStore';

const store = configureStore();

describe('App', () => {
  it('renders App with Header', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>,
    );

    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });
});
