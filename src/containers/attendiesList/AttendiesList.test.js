import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import AttendiesList from './AttendiesList';
import configureStore from '../../configureStore';

const store = configureStore();

describe('AttendiesList', () => {
  it('renders AttendiesList container and shows "No Attendies!" when list is empty', () => {
    render(
      <Provider store={store}>
        <AttendiesList />
      </Provider>,
    );

    expect(screen.getByRole('heading', { name: /no attendies!/i })).toBeInTheDocument();
  });
});
