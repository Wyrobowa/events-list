import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { vi, beforeEach } from 'vitest';
import AttendeeList from './AttendeeList';
import configureStore from '../../configureStore';
import { addAttendee, clearAllAttendees } from '../../store/slices/attendeeListSlice';
import { Attendee } from '../../types';

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
    const attendees: Attendee[] = [
      {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        eventDate: '2026-05-20',
        ticketType: 'standard',
        eventTitle: 'Test Event',
        eventDescription: 'Test Description',
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
  });

  it('opens edit modal when row is clicked', () => {
    const attendees: Attendee[] = [
      {
        firstName: 'Click',
        lastName: 'Me',
        email: 'click@example.com',
        eventDate: '2026-05-20',
        ticketType: 'standard',
        eventTitle: 'Click Event',
        eventDescription: 'Click Description',
        slug: 'click-me',
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

    const row = screen.getByText('Click').closest('tr');
    if (!row) throw new Error('Row not found');
    fireEvent.click(row);

    expect(screen.getByText(/Edit Attendee/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue('Click')).toBeInTheDocument();
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

  it('filters attendees based on search query', () => {
    const attendees: Attendee[] = [
      { firstName: 'Alice', lastName: 'Smith', email: 'alice@example.com', eventDate: '2026-05-20', ticketType: 'standard', eventTitle: 'A', eventDescription: 'A desc', slug: 'alice' },
      { firstName: 'Bob', lastName: 'Jones', email: 'bob@example.com', eventDate: '2026-05-21', ticketType: 'standard', eventTitle: 'B', eventDescription: 'B desc', slug: 'bob' },
    ];

    store.dispatch(addAttendee(attendees[0]));
    store.dispatch(addAttendee(attendees[1]));

    render(
      <Provider store={store}>
        <Router>
          <AttendeeList />
        </Router>
      </Provider>,
    );

    const searchInput = screen.getByPlaceholderText(/search attendees.../i);
    fireEvent.change(searchInput, { target: { value: 'Alice' } });

    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.queryByText('Bob')).not.toBeInTheDocument();
  });

  it('shows "No attendees match your search." when filter results are empty', () => {
    render(
      <Provider store={store}>
        <Router>
          <AttendeeList />
        </Router>
      </Provider>,
    );

    const searchInput = screen.getByPlaceholderText(/search attendees.../i);
    fireEvent.change(searchInput, { target: { value: 'NonExistentName' } });

    expect(screen.getByText(/No attendees match your search./i)).toBeInTheDocument();
  });

  it('sorts attendees when header is clicked', () => {
    const freshStore = configureStore();
    // Use clearAllAttendees to be sure
    freshStore.dispatch(clearAllAttendees());
    freshStore.dispatch(addAttendee({ firstName: 'Apple', lastName: 'A', email: 'a@e.com', eventDate: '2026-01-02', ticketType: 'standard', eventTitle: 'A', eventDescription: 'A', slug: 'a' }));
    freshStore.dispatch(addAttendee({ firstName: 'Zebra', lastName: 'B', email: 'z@e.com', eventDate: '2026-01-01', ticketType: 'standard', eventTitle: 'Z', eventDescription: 'Z', slug: 'z' }));

    render(
      <Provider store={freshStore}>
        <Router>
          <AttendeeList />
        </Router>
      </Provider>,
    );

    // Initial order (sorted by lastName ASC by default): Apple, Zebra
    let rows = screen.getAllByRole('row');
    // rows[0] is header
    expect(rows[1]).toHaveTextContent('Apple');
    expect(rows[2]).toHaveTextContent('Zebra');

    const firstNameHeader = screen.getByRole('columnheader', { name: /First Name/i });

    // Click to sort firstName ASC: Apple, Zebra
    fireEvent.click(firstNameHeader);
    rows = screen.getAllByRole('row');
    expect(rows[1]).toHaveTextContent('Apple');
    expect(rows[2]).toHaveTextContent('Zebra');

    // Click to sort firstName DESC: Zebra, Apple
    fireEvent.click(firstNameHeader);
    rows = screen.getAllByRole('row');
    expect(rows[1]).toHaveTextContent('Zebra');
    expect(rows[2]).toHaveTextContent('Apple');
  });

  it('shows confirmation modal when "Clear All" is clicked', () => {
    render(
      <Provider store={store}>
        <Router>
          <AttendeeList />
        </Router>
      </Provider>,
    );

    const clearAllButton = screen.getByRole('button', { name: /delete all/i });
    fireEvent.click(clearAllButton);

    expect(screen.getByText(/Confirm Clear All/i)).toBeInTheDocument();
    expect(screen.getByText(/Are you sure you want to remove all attendees\?/i)).toBeInTheDocument();
  });
});
