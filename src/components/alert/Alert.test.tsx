import { render, screen } from '@testing-library/react';
import Alert from './Alert';

describe('Alert', () => {
  it('renders Alert component with correct message and type', () => {
    render(<Alert type="danger" msg="Error message" />);

    expect(screen.getByRole('heading', { level: 4 })).toHaveTextContent('Error message');
    expect(screen.getByText('Error message').closest('.alert')).toHaveClass('alert-danger');
  });
});
