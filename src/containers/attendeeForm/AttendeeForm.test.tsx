import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import AttendeeForm from './AttendeeForm';
import configureStore from '../../configureStore';
import { vi, beforeEach } from 'vitest';

describe('AttendeeForm', () => {
  it('renders AttendeeForm with all input fields and a submit button', () => {
    const store = configureStore();
    render(
      <Provider store={store}>
        <AttendeeForm />
      </Provider>,
    );

    expect(screen.getByLabelText(/first name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/last name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/event date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/event title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/event description/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /add/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument();
  });

  it('calls onSuccess when Cancel button is clicked', () => {
    const store = configureStore();
    const onSuccess = vi.fn();
    render(
      <Provider store={store}>
        <AttendeeForm onSuccess={onSuccess} />
      </Provider>,
    );

    const cancelButton = screen.getByRole('button', { name: /cancel/i });
    fireEvent.click(cancelButton);

    expect(onSuccess).toHaveBeenCalled();
  });

  it('calls onSuccess after successfully saving the form', async () => {
    const store = configureStore();
    const onSuccess = vi.fn();
    const attendee = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      eventDate: '2026-05-20',
      slug: 'john-doe',
    };

    // Add attendee to list so it can be found for editing
    store.dispatch({ type: 'GET_ATTENDEE_LIST_SUCCESSFUL', payload: [attendee] });

    render(
      <Provider store={store}>
        <AttendeeForm slug="john-doe" onSuccess={onSuccess} />
      </Provider>,
    );

    // Click Save
    const saveButton = screen.getByRole('button', { name: /save/i });
    fireEvent.click(saveButton);

    // Should call onSuccess
    await waitFor(() => {
      expect(onSuccess).toHaveBeenCalled();
    });
  });

  it('shows confirmation modal when Delete button is clicked in edit mode', () => {
    const store = configureStore();
    const onSuccess = vi.fn();
    const attendee = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      eventDate: '2026-05-20',
      slug: 'john-doe',
    };

    render(
      <Provider store={store}>
        <AttendeeForm slug="john-doe" onSuccess={onSuccess} />
      </Provider>,
    );

    const deleteButton = screen.getByRole('button', { name: /delete/i });
    fireEvent.click(deleteButton);

    expect(screen.getByText(/Confirm Deletion/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Are you sure you want to delete this attendee\?/i),
    ).toBeInTheDocument();
  });

  it('calls onSuccess when Delete is confirmed in confirmation modal', () => {
    const store = configureStore();
    const onSuccess = vi.fn();
    const attendee = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      eventDate: '2026-05-20',
      slug: 'john-doe',
    };

    render(
      <Provider store={store}>
        <AttendeeForm slug="john-doe" onSuccess={onSuccess} />
      </Provider>,
    );

    // Click delete to open modal
    const deleteButton = screen.getByRole('button', { name: /delete/i });
    fireEvent.click(deleteButton);

    // Click confirm in modal
    const confirmButton = screen.getAllByRole('button', { name: /delete/i })[1]; // First is the main delete button, second is the one in modal
    fireEvent.click(confirmButton);

    expect(onSuccess).toHaveBeenCalled();
  });
});
