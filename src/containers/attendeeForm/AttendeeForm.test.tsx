import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import AttendeeForm from './AttendeeForm';
import configureStore from '../../configureStore';

describe('AttendeeForm', () => {
  it('renders AttendeeForm with all input fields and a submit button', () => {
    const store = configureStore();
    render(
      <Provider store={store}>
        <Router>
          <AttendeeForm />
        </Router>
      </Provider>,
    );

    expect(screen.getByLabelText(/first name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/last name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/event date/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /add/i })).toBeInTheDocument();
  });
});
