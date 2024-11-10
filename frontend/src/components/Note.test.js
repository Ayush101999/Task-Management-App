import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom'; // for additional matchers
import Note from './Note';
import NoteContext from '../context/noteContext';

const mockGetNotes = jest.fn();
const mockEditNote = jest.fn();
const mockShowAlert = jest.fn();

const notes = [
  { _id: '1', title: 'Test Note 1', status: 'To Do', desc: 'Description 1', date: '2023-10-01', priority: 'low' },
  { _id: '2', title: 'Test Note 2', status: 'In Progress', desc: 'Description 2', date: '2023-10-02', priority: 'medium' },
  { _id: '3', title: 'Test Note 3', status: 'Done', desc: 'Description 3', date: '2023-10-03', priority: 'high' },
];

const renderNote = () => {
  return render(
    <NoteContext.Provider value={{ notes, getNotes: mockGetNotes, editNote: mockEditNote }}>
      <Note showAlert={mockShowAlert} />
    </NoteContext.Provider>
  );
};

test('renders Note component', () => {
  renderNote();
  const titleElement = screen.getByText(/Tasks List/i);
  expect(titleElement).toBeInTheDocument();
});

test('filters notes by status', async () => {
  renderNote();

  const filterSelect = screen.getByPlaceholderText(/Filter By/i);
  fireEvent.change(filterSelect, { target: { value: 'To Do' } });

  await waitFor(() => {
    const filteredNote = screen.getByText(/Test Note 1/i);
    expect(filteredNote).toBeInTheDocument();
  });
});

test('searches notes by title', async () => {
  renderNote();

  const searchInput = screen.getByPlaceholderText(/Search Using Title/i);
  fireEvent.change(searchInput, { target: { value: 'Test Note 2' } });

  await waitFor(() => {
    const searchedNote = screen.getByText(/Test Note 2/i);
    expect(searchedNote).toBeInTheDocument();
  });
});

test('updates a note but some error occured', async () => {
  renderNote();

  const updateButton = screen.getByText(/Launch demo modal/i);
  fireEvent.click(updateButton);

  const titleInput = screen.getByPlaceholderText(/Enter The Title/i);
  const statusSelect = screen.getByPlaceholderText(/Status/i);
  const descTextarea = screen.getByPlaceholderText(/Enter The Description/i);
  const dateInput = screen.getByPlaceholderText(/Date/i);
  const prioritySelect = screen.getByPlaceholderText(/Priority/i);
  const submitButton = screen.getByText(/Update Note/i);

  await act(async () => {
    fireEvent.change(titleInput, { target: { value: 'Updated Title' } });
    fireEvent.change(statusSelect, { target: { value: 'Done' } });
    fireEvent.change(descTextarea, { target: { value: 'Updated Description' } });
    fireEvent.change(dateInput, { target: { value: '2023-10-10' } });
    fireEvent.change(prioritySelect, { target: { value: 'high' } });

    mockEditNote.mockResolvedValueOnce('success');

    fireEvent.click(submitButton);
  });

  await waitFor(() => {
    expect(mockEditNote).toHaveBeenCalledWith(undefined, 'Updated Title', 'Done', 'Updated Description', '2023-10-10', 'high');
    expect(mockShowAlert).toHaveBeenCalledWith('Updated Successfully', 'success');
  });
});

test('updates a note', async () => {
    renderNote();
  
    const updateButton = screen.getByText(/Launch demo modal/i);
    fireEvent.click(updateButton);
  
    const titleInput = screen.getByPlaceholderText(/Enter The Title/i);
    const statusSelect = screen.getByPlaceholderText(/Status/i);
    const descTextarea = screen.getByPlaceholderText(/Enter The Description/i);
    const dateInput = screen.getByPlaceholderText(/Date/i);
    const prioritySelect = screen.getByPlaceholderText(/Priority/i);
    const submitButton = screen.getByText(/Update Note/i);
  
    await act(async () => {
      fireEvent.change(titleInput, { target: { value: 'Updated Title' } });
      fireEvent.change(statusSelect, { target: { value: 'Done' } });
      fireEvent.change(descTextarea, { target: { value: 'Updated Description' } });
      fireEvent.change(dateInput, { target: { value: '2023-10-10' } });
      fireEvent.change(prioritySelect, { target: { value: 'high' } });
  
      mockEditNote.mockResolvedValueOnce('error');
  
      fireEvent.click(submitButton);
    });
  
    await waitFor(() => {
      expect(mockEditNote).toHaveBeenCalledWith(undefined, 'Updated Title', 'Done', 'Updated Description', '2023-10-10', 'high');
      expect(mockShowAlert).toHaveBeenCalledWith('Error Ocurred', 'danger');
    });
  });