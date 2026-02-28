import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import AttendeeListFilters from '../AttendeeListFilters';

describe('AttendeeListFilters', () => {
  const defaultProps = {
    searchQuery: '',
    onSearchChange: vi.fn(),
    startDate: '',
    onStartDateChange: vi.fn(),
    endDate: '',
    onEndDateChange: vi.fn(),
    sortKey: 'lastName' as const,
    onSort: vi.fn(),
    onClearFilters: vi.fn(),
  };

  it('renders correctly with initial values', () => {
    render(<AttendeeListFilters {...defaultProps} />);

    const searchInput = screen.getByPlaceholderText(/search attendees.../i) as HTMLInputElement;
    expect(searchInput.value).toBe('');

    expect(screen.getByLabelText(/from/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/to/i)).toBeInTheDocument();

    // Check if Select is rendered with correct label
    expect(screen.getByLabelText(/sort by/i)).toBeInTheDocument();
  });

  it('calls onStartDateChange and onEndDateChange when date inputs change', () => {
    const onStartDateChange = vi.fn();
    const onEndDateChange = vi.fn();
    render(
      <AttendeeListFilters
        {...defaultProps}
        onStartDateChange={onStartDateChange}
        onEndDateChange={onEndDateChange}
      />,
    );

    const startDateInput = screen.getByLabelText(/from/i);
    const endDateInput = screen.getByLabelText(/to/i);

    fireEvent.change(startDateInput, { target: { value: '2026-05-20' } });
    expect(onStartDateChange).toHaveBeenCalledWith('2026-05-20');

    fireEvent.change(endDateInput, { target: { value: '2026-05-21' } });
    expect(onEndDateChange).toHaveBeenCalledWith('2026-05-21');
  });

  it('calls onSearchChange when search input changes', () => {
    const onSearchChange = vi.fn();
    render(<AttendeeListFilters {...defaultProps} onSearchChange={onSearchChange} />);

    const searchInput = screen.getByPlaceholderText(/search attendees.../i);
    fireEvent.change(searchInput, { target: { value: 'John' } });

    expect(onSearchChange).toHaveBeenCalledWith('John');
  });

  it('calls onSort when sort select changes', () => {
    const onSort = vi.fn();
    render(<AttendeeListFilters {...defaultProps} onSort={onSort} />);

    const select = screen.getByLabelText(/sort by/i);
    fireEvent.change(select, { target: { value: 'firstName' } });

    expect(onSort).toHaveBeenCalledWith('firstName');
  });

  it('calls onClearFilters when clear button is clicked', () => {
    const onClearFilters = vi.fn();
    render(<AttendeeListFilters {...defaultProps} onClearFilters={onClearFilters} />);

    const clearButton = screen.getByRole('button', { name: /clear filters/i });
    fireEvent.click(clearButton);

    expect(onClearFilters).toHaveBeenCalled();
  });
});
