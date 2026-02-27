import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import AttendeeList from './AttendeeList';
import configureStore from '../../configureStore';
import * as actions from '../../actions/attendeeListActions';

const store = configureStore();

describe('AttendeeList', () => {
  it('renders AttendeeList container and shows "No Attendees!" when list is empty', () => {
    render(
      <Provider store={store}>
        <Router>
          <AttendeeList />
        </Router>
      </Provider>,
    );

    expect(screen.getByRole('heading', { name: /no attendees!/i })).toBeInTheDocument();
  });

  it('renders table with attendees and "Actions" column', () => {
    const attendees = [
      {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        eventDate: '2026-05-20',
        slug: 'attendee-1',
      },
    ];

    store.dispatch(actions.getAttendeeListSuccessful(attendees));

    render(
      <Provider store={store}>
        <Router>
          <AttendeeList />
        </Router>
      </Provider>,
    );

    expect(screen.getByText('John')).toBeInTheDocument();
    expect(screen.getByText('Actions')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /edit/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /delete/i })).toBeInTheDocument();
  });

  it('renders "Add Attendee" button', () => {
    render(
      <Provider store={store}>
        <Router>
          <AttendeeList />
        </Router>
      </Provider>,
    );

    expect(screen.getByRole('button', { name: /add attendee/i })).toBeInTheDocument();
  });
});
