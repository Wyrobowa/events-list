import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import AttendeeList from './AttendeeList';
import configureStore from '../../configureStore';

const store = configureStore();

describe('AttendeeList', () => {
  it('renders AttendeeList container and shows "No Attendees!" when list is empty', () => {
    render(
      <Provider store={store}>
        <AttendeeList />
      </Provider>,
    );

    expect(screen.getByRole('heading', { name: /no attendees!/i })).toBeInTheDocument();
  });
});
