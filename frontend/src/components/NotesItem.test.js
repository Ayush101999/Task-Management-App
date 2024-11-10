import React from 'react';
import { render, screen, fireEvent, prettyDOM } from '@testing-library/react';
import '@testing-library/jest-dom'; // for additional matchers
import NotesItem from './NotesItem';
import NoteContext from '../context/noteContext';

const mockDeleteNote = jest.fn();
const mockShowAlert = jest.fn();
const mockUpdateNote = jest.fn();

const note = {
  _id: '1',
  title: 'Test Note',
  status: 'To Do',
  desc: 'Test Description',
  date: '2023-10-01',
  priority: 'low'
};

const renderNotesItem = () => {
  return render(
    <NoteContext.Provider value={{ deleteNote: mockDeleteNote }}>
      <NotesItem note={note} showAlert={mockShowAlert} updateNote={mockUpdateNote} />
    </NoteContext.Provider>
  );
};

test('renders NotesItem component', () => {
  renderNotesItem();
  const titleElement = screen.getByText(/Test Note/i);
  expect(titleElement).toBeInTheDocument();
  const descElement = screen.getByText(/Test Description/i);
  expect(descElement).toBeInTheDocument();
  const statusElement = screen.getByText(/To Do/i);
  expect(statusElement).toBeInTheDocument();
  const priorityElement = screen.getByText(/Priority/i);
  expect(priorityElement).toBeInTheDocument();
  const dateElement = screen.getByText(/Due Date - 2023-10-01/i);
  expect(dateElement).toBeInTheDocument();
});

test('deletes a note', () => {
  renderNotesItem();
  const deleteIcon = screen.getByRole('button', { name: /delete/i });
  fireEvent.click(deleteIcon);
  expect(mockDeleteNote).toHaveBeenCalledWith('1');
  expect(mockShowAlert).toHaveBeenCalledWith('Deleted Successfully', 'success');
});

test('updates a note', () => {
  renderNotesItem();
  const updateIcon = screen.getByRole('button', { name: /edit/i });
  fireEvent.click(updateIcon);
  expect(mockUpdateNote).toHaveBeenCalledWith(note);
});
