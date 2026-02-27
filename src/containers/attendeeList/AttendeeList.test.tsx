import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { vi, beforeEach } from 'vitest';
import AttendeeList from './AttendeeList';
import configureStore from '../../configureStore';
import { addAttendee } from '../../store/slices/attendeeListSlice';

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

    store.dispatch(addAttendee(attendees[0]));

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

  it('shows confirmation modal when delete button is clicked', () => {
    const attendees = [
      {
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'jane@example.com',
        eventDate: '2026-05-20',
        slug: 'attendee-2',
      },
    ];

    store.dispatch(addAttendee(attendees[0]));

    render(
      <Provider store={store}>
        <Router>
          <AttendeeList />
        </Router>
      </Provider>,
    );

    const deleteButton = screen.getAllByRole('button', { name: /delete/i })[0];
    fireEvent.click(deleteButton);

    expect(screen.getByText(/Confirm Deletion/i)).toBeInTheDocument();
    expect(screen.getByText(/Are you sure you want to delete this attendee\?/i)).toBeInTheDocument();
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
