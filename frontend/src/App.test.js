import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import App from './App';

test('renders Navbar component', () => {
  render(<App />);
  const navbarElement = screen.getByText(/Task Management/i);
  expect(navbarElement).toBeInTheDocument();
});

test('renders Home component', () => {
  render(<App />);
  const homeElement = screen.getByText(/Submit/i); // Adjust the text based on your Home component
  expect(homeElement).toBeInTheDocument();
});

test('renders Note component', () => {
  render(<App />);
  const noteElement = screen.getByText(/Note/i);
  expect(noteElement).toBeInTheDocument();
});

