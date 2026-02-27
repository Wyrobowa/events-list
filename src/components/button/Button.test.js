import { render, screen, fireEvent } from '@testing-library/react';
import Button from './Button';

describe('Button', () => {
  it('renders Button component with correct text and calls onClick', () => {
    const handleClick = vi.fn();
    render(<Button type="button" text="Click me" onClick={handleClick} />);

    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('type', 'button');

    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
