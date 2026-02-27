import { Attendee } from '../types';

const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

export const attendeeService = {
  async fetchAttendees(): Promise<Attendee[]> {
    const response = await fetch(`${API_BASE_URL}/posts`);
    if (!response.ok) throw new Error('Failed to fetch attendees');
    const json = await response.json();
    
    // jsonplaceholder returns an array of posts, we map them to Attendees for consistency
    return json.slice(0, 10).map((post: any) => ({
      firstName: post.title.split(' ')[0],
      lastName: post.title.split(' ')[1] || 'Lastname',
      email: `user${post.id}@example.com`,
      eventDate: '2026-05-20',
      slug: `attendee-${post.id}`,
    }));
  },

  async createAttendee(attendee: Attendee): Promise<number> {
    const response = await fetch(`${API_BASE_URL}/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: `${attendee.firstName} ${attendee.lastName}`,
        body: attendee.email,
        userId: 1,
      }),
    });
    
    if (!response.ok) throw new Error('Failed to create attendee');
    const json = await response.json();
    return json.id;
  },

  async login(username: string): Promise<string> {
    // Mock login logic
    if (username === 'admin') {
      return 'admin';
    }
    throw new Error('Invalid username or password');
  },

  async logout(): Promise<void> {
    // Mock logout logic
    return Promise.resolve();
  }
};
