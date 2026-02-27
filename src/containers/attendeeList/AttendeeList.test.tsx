import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { vi, beforeEach } from 'vitest';
import AttendeeList from './AttendeeList';
import configureStore from '../../configureStore';
import { addAttendee, clearAllAttendees } from '../../store/slices/attendeeListSlice';

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

  it('filters attendees based on search query', () => {
    const attendees = [
      { firstName: 'Alice', lastName: 'Smith', email: 'alice@example.com', eventDate: '2026-05-20', slug: 'alice' },
      { firstName: 'Bob', lastName: 'Jones', email: 'bob@example.com', eventDate: '2026-05-21', slug: 'bob' },
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
    freshStore.dispatch(addAttendee({ firstName: 'Zebra', lastName: 'A', email: 'z@e.com', eventDate: '2026-01-01', slug: 'z' }));
    freshStore.dispatch(addAttendee({ firstName: 'Apple', lastName: 'B', email: 'a@e.com', eventDate: '2026-01-02', slug: 'a' }));

    render(
      <Provider store={freshStore}>
        <Router>
          <AttendeeList />
        </Router>
      </Provider>,
    );

    const firstNameHeader = screen.getByText(/First Name/i);
    
    // Initial order (as added): Zebra, Apple
    let rows = screen.getAllByRole('row');
    // rows[0] is header
    expect(rows[1]).toHaveTextContent('Zebra');
    expect(rows[2]).toHaveTextContent('Apple');

    // Click to sort ASC: Apple, Zebra
    fireEvent.click(firstNameHeader);
    rows = screen.getAllByRole('row');
    expect(rows[1]).toHaveTextContent('Apple');
    expect(rows[2]).toHaveTextContent('Zebra');

    // Click to sort DESC: Zebra, Apple
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

    const clearAllButton = screen.getByRole('button', { name: /clear all/i });
    fireEvent.click(clearAllButton);

    expect(screen.getByText(/Confirm Clear All/i)).toBeInTheDocument();
    expect(screen.getByText(/Are you sure you want to remove all attendees\?/i)).toBeInTheDocument();
  });
});
