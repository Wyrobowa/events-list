import { render, screen, fireEvent } from '@testing-library/react';
import InputFormField from './InputFormField';

describe('InputFormField', () => {
  it('renders InputFormField and calls onChange', () => {
    const handleChange = vi.fn();
    render(
      <InputFormField id="test-input" label="Test Label" value="initial" onChange={handleChange} />,
    );

    const input = screen.getByLabelText(/test label/i) as HTMLInputElement;
    expect(input).toBeInTheDocument();
    expect(input.value).toBe('initial');

    fireEvent.change(input, { target: { value: 'new value' } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });
});
