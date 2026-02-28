import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import AttendeeListFilters from '../AttendeeListFilters';

describe('AttendeeListFilters', () => {
  const defaultProps = {
    searchQuery: '',
    onSearchChange: vi.fn(),
    sortKey: 'lastName' as const,
    onSort: vi.fn(),
  };

  it('renders correctly with initial values', () => {
    render(<AttendeeListFilters {...defaultProps} />);
    
    const searchInput = screen.getByPlaceholderText(/search attendees.../i) as HTMLInputElement;
    expect(searchInput.value).toBe('');
    
    // Check if Select is rendered with correct label
    expect(screen.getByLabelText(/sort by/i)).toBeInTheDocument();
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
});
