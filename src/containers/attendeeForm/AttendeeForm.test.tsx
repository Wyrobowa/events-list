import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import AttendeeForm from './AttendeeForm';
import configureStore from '../../configureStore';
import { vi } from 'vitest';

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
    expect(screen.getByRole('button', { name: /add/i })).toBeInTheDocument();
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
});
