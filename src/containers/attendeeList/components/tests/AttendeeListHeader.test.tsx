import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import AttendeeListHeader from '../AttendeeListHeader';

describe('AttendeeListHeader', () => {
  const defaultProps = {
    attendeeCount: 10,
    selectedCount: 0,
    filteredCount: 10,
    onClearAll: vi.fn(),
    onBulkDelete: vi.fn(),
    onExportCSV: vi.fn(),
    onAdd: vi.fn(),
  };

  it('renders title and add button', () => {
    render(<AttendeeListHeader {...defaultProps} />);
    
    expect(screen.getByText(/Attendees List/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Add Attendee/i })).toBeInTheDocument();
  });

  it('shows Delete All button when attendeeCount > 0', () => {
    render(<AttendeeListHeader {...defaultProps} attendeeCount={5} />);
    expect(screen.getByRole('button', { name: /Delete All/i })).toBeInTheDocument();
  });

  it('hides Delete All button when attendeeCount is 0', () => {
    render(<AttendeeListHeader {...defaultProps} attendeeCount={0} />);
    expect(screen.queryByRole('button', { name: /Delete All/i })).not.toBeInTheDocument();
  });

  it('shows Delete Selected button with count when selectedCount > 0', () => {
    render(<AttendeeListHeader {...defaultProps} selectedCount={3} />);
    expect(screen.getByRole('button', { name: /Delete Selected \(3\)/i })).toBeInTheDocument();
  });

  it('hides Delete Selected button when selectedCount is 0', () => {
    render(<AttendeeListHeader {...defaultProps} selectedCount={0} />);
    expect(screen.queryByRole('button', { name: /Delete Selected/i })).not.toBeInTheDocument();
  });

  it('shows Export CSV button when filteredCount > 0', () => {
    render(<AttendeeListHeader {...defaultProps} filteredCount={1} />);
    expect(screen.getByRole('button', { name: /Export CSV/i })).toBeInTheDocument();
  });

  it('hides Export CSV button when filteredCount is 0', () => {
    render(<AttendeeListHeader {...defaultProps} filteredCount={0} />);
    expect(screen.queryByRole('button', { name: /Export CSV/i })).not.toBeInTheDocument();
  });

  it('calls handlers when buttons are clicked', () => {
    const onAdd = vi.fn();
    const onClearAll = vi.fn();
    const onExportCSV = vi.fn();
    const onBulkDelete = vi.fn();

    render(
      <AttendeeListHeader
        {...defaultProps}
        onAdd={onAdd}
        onClearAll={onClearAll}
        onExportCSV={onExportCSV}
        onBulkDelete={onBulkDelete}
        selectedCount={1}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: /Add Attendee/i }));
    expect(onAdd).toHaveBeenCalled();

    fireEvent.click(screen.getByRole('button', { name: /Delete All/i }));
    expect(onClearAll).toHaveBeenCalled();

    fireEvent.click(screen.getByRole('button', { name: /Export CSV/i }));
    expect(onExportCSV).toHaveBeenCalled();

    fireEvent.click(screen.getByRole('button', { name: /Delete Selected/i }));
    expect(onBulkDelete).toHaveBeenCalled();
  });
});
