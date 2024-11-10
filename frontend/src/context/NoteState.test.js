import React, { act } from 'react';
import { render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'; // for additional matchers
import NoteState from './NoteState';
import NoteContext from './noteContext';

const mockFetch = jest.fn();

global.fetch = mockFetch;

const renderNoteState = (children) => {
  return render(
    <NoteState>
      {children}
    </NoteState>
  );
};

test('fetches notes', async () => {
  const notes = [
    { _id: '1', title: 'Test Note 1', status: 'To Do', desc: 'Description 1', date: '2023-10-01', priority: 'low' },
    { _id: '2', title: 'Test Note 2', status: 'In Progress', desc: 'Description 2', date: '2023-10-02', priority: 'medium' },
  ];

  mockFetch.mockResolvedValueOnce({
    json: async () => notes,
  });

  let contextValue;
  renderNoteState(
    <NoteContext.Consumer>
      {(value) => {
        contextValue = value;
        return null;
      }}
    </NoteContext.Consumer>
  );

  await contextValue.getNotes();

  await waitFor(() => {
    expect(contextValue.notes).toEqual(notes);
  });
});

test('adds a note', async () => {
  const newNote = { _id: '3', title: 'Test Note 3', status: 'Done', desc: 'Description 3', date: '2023-10-03', priority: 'high' };

  mockFetch.mockResolvedValueOnce({
    json: async () => newNote,
  });

  let contextValue;
  renderNoteState(
    <NoteContext.Consumer>
      {(value) => {
        contextValue = value;
        return null;
      }}
    </NoteContext.Consumer>
  );

  await contextValue.addNote(newNote.title, newNote.status, newNote.desc, newNote.date, newNote.priority);

  await waitFor(() => {
    expect(contextValue.notes).toContainEqual(newNote);
  });
});

test('deletes a note', async () => {
  const notes = [
    { _id: '1', title: 'Test Note 1', status: 'To Do', desc: 'Description 1', date: '2023-10-01', priority: 'low' },
    { _id: '2', title: 'Test Note 2', status: 'In Progress', desc: 'Description 2', date: '2023-10-02', priority: 'medium' },
  ];

  mockFetch.mockResolvedValueOnce({
    json: async () => ({}),
  });

  let contextValue;
  renderNoteState(
    <NoteContext.Consumer>
      {(value) => {
        contextValue = value;
        return null;
      }}
    </NoteContext.Consumer>
  );

  await act(async () => {
    contextValue.setNotes(notes);
    await contextValue.deleteNote('1');
  });

  await waitFor(() => {
    expect(contextValue.notes).toEqual([]);
  });
});

test('edits a note', async () => {
  const notes = [
    { _id: '1', title: 'Test Note 1', status: 'To Do', desc: 'Description 1', date: '2023-10-01', priority: 'low' },
    { _id: '2', title: 'Test Note 2', status: 'In Progress', desc: 'Description 2', date: '2023-10-02', priority: 'medium' },
  ];

  const updatedNote = { _id: '1', title: 'Test Note 1', status: 'To Do', desc: 'Description 1', date: '2023-10-01', priority: 'low'};

  mockFetch.mockResolvedValueOnce({
    json: async () => updatedNote,
  });

  let contextValue;
  renderNoteState(
    <NoteContext.Consumer>
      {(value) => {
        contextValue = value;
        return null;
      }}
    </NoteContext.Consumer>
  );

  await act(async () => {
    contextValue.setNotes(notes);
    await contextValue.editNote(updatedNote._id, updatedNote.title, updatedNote.status, updatedNote.desc, updatedNote.date, updatedNote.priority);
  });

  await waitFor(() => {
    const editedNote = contextValue.notes.find(note => note._id === updatedNote._id);
    expect(editedNote).toMatchObject(updatedNote)
  });
});