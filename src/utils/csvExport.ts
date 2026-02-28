import { Attendee } from '../types';

export const exportAttendeesToCSV = (attendees: Attendee[]) => {
  if (attendees.length === 0) return;

  const headers = ['First Name', 'Last Name', 'Email', 'Event Date', 'Ticket Type'];
  const csvRows = [
    headers.join(','),
    ...attendees.map((attendee) =>
      [
        `"${attendee.firstName}"`,
        `"${attendee.lastName}"`,
        `"${attendee.email}"`,
        `"${attendee.eventDate}"`,
        `"${attendee.ticketType}"`,
      ].join(','),
    ),
  ];

  const csvContent = csvRows.join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `attendees_${new Date().toISOString().split('T')[0]}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
