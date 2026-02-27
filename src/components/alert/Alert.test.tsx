import { render, screen } from '@testing-library/react';
import Alert from './Alert';

describe('Alert', () => {
  it('renders Alert component with correct message and type', () => {
    render(<Alert type="danger" msg="Error message" />);

    expect(screen.getByText('Error message')).toBeInTheDocument();
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });
});
