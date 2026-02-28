import { describe, it, expect, vi } from 'vitest';
import { exportAttendeesToCSV } from '../csvExport';
import { Attendee } from '../../types';

describe('exportAttendeesToCSV', () => {
  it('should not do anything if attendee list is empty', () => {
    const createObjectURLSpy = vi.spyOn(URL, 'createObjectURL');
    exportAttendeesToCSV([]);
    expect(createObjectURLSpy).not.toHaveBeenCalled();
  });

  it('should generate CSV and trigger download', () => {
    const attendees: Attendee[] = [
      {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@doe.com',
        eventDate: '2026-05-20',
        ticketType: 'standard',
        eventTitle: 'Event 1',
        eventDescription: 'Desc 1',
        slug: 'john-doe',
      },
    ];

    // Mock DOM and URL methods
    const mockUrl = 'blob:mock-url';
    const createObjectURLSpy = vi.spyOn(URL, 'createObjectURL').mockReturnValue(mockUrl);
    const revokeObjectURLSpy = vi.spyOn(URL, 'revokeObjectURL').mockImplementation(() => {});

    const appendChildSpy = vi.spyOn(document.body, 'appendChild');
    const removeChildSpy = vi.spyOn(document.body, 'removeChild');

    // We can't easily mock the 'a' click but we can check if it was created and configured
    const mockAnchor = document.createElement('a');
    const createElementSpy = vi.spyOn(document, 'createElement').mockReturnValue(mockAnchor);
    const clickSpy = vi.spyOn(mockAnchor, 'click').mockImplementation(() => {});

    exportAttendeesToCSV(attendees);

    expect(createObjectURLSpy).toHaveBeenCalled();
    expect(createElementSpy).toHaveBeenCalledWith('a');
    expect(mockAnchor.getAttribute('href')).toBe(mockUrl);
    expect(mockAnchor.getAttribute('download')).toMatch(/^attendees_\d{4}-\d{2}-\d{2}\.csv$/);
    expect(appendChildSpy).toHaveBeenCalledWith(mockAnchor);
    expect(clickSpy).toHaveBeenCalled();
    expect(removeChildSpy).toHaveBeenCalledWith(mockAnchor);
    expect(revokeObjectURLSpy).toHaveBeenCalledWith(mockUrl);

    vi.restoreAllMocks();
  });
});
