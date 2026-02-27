import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './Header';

describe('Header', () => {
  it('renders Header with navigation links', () => {
    render(
      <Router>
        <Header />
      </Router>,
    );

    expect(screen.getByRole('button', { name: /attendees list/i })).toBeInTheDocument();
  });
});
