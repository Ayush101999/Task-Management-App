import React, { act } from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "./Home";
import NoteContext from "../context/noteContext";

const mockAddNote = jest.fn();
const mockShowAlert = jest.fn();

/* renderHome function is used to render the Home component with the NoteContext.Provider */
const renderHome = () => {
  return render(
    <NoteContext.Provider value={{ addNote: mockAddNote }}>
      <Home showAlert={mockShowAlert} />
    </NoteContext.Provider>
  );
};

/* Test cases for Home component */
test("renders Home component", () => {
  renderHome();
  const titleInput = screen.getByPlaceholderText(/Enter The Title/i);
  expect(titleInput).toBeInTheDocument();
});

test("fills out the form and submits it successfully", async () => {
  renderHome();

  const titleInput = screen.getByPlaceholderText(/Enter The Title/i);
  const statusSelect = screen.getByPlaceholderText(/Status/i);
  const descTextarea = screen.getByPlaceholderText(/Enter The Description/i);
  const dateInput = screen.getByPlaceholderText(/Date/i);
  const prioritySelect = screen.getByPlaceholderText(/Priority/i);
  const submitButton = screen.getByText(/Submit/i);

  await act(async () => {
    fireEvent.change(titleInput, { target: { value: "Test Title" } });
    fireEvent.change(statusSelect, { target: { value: "To Do" } });
    fireEvent.change(descTextarea, { target: { value: "Test Description" } });
    fireEvent.change(dateInput, { target: { value: "2023-10-01" } });
    fireEvent.change(prioritySelect, { target: { value: "high" } });

    mockAddNote.mockResolvedValueOnce("success");

    fireEvent.click(submitButton);
  });

  await waitFor(() => {
    expect(mockAddNote).toHaveBeenCalledWith(
      "Test Title",
      "To Do",
      "Test Description",
      "2023-10-01",
      "high"
    );
    expect(mockShowAlert).toHaveBeenCalledWith(
      "Task Added SucessFully",
      "success"
    );
  });
});

test("shows alert if title already exists", async () => {
  renderHome();

  const titleInput = screen.getByPlaceholderText(/Enter The Title/i);
  const statusSelect = screen.getByPlaceholderText(/Status/i);
  const descTextarea = screen.getByPlaceholderText(/Enter The Description/i);
  const dateInput = screen.getByPlaceholderText(/Date/i);
  const prioritySelect = screen.getByPlaceholderText(/Priority/i);
  const submitButton = screen.getByText(/Submit/i);

  await act(async () => {
    fireEvent.change(titleInput, { target: { value: "Test Title" } });
    fireEvent.change(statusSelect, { target: { value: "To Do" } });
    fireEvent.change(descTextarea, { target: { value: "Test Description" } });
    fireEvent.change(dateInput, { target: { value: "2023-10-01" } });
    fireEvent.change(prioritySelect, { target: { value: "high" } });

    mockAddNote.mockResolvedValueOnce("error");

    fireEvent.click(submitButton);
  });
  await waitFor(() => {
    expect(mockAddNote).toHaveBeenCalledWith(
      "Test Title",
      "To Do",
      "Test Description",
      "2023-10-01",
      "high"
    );
    expect(mockShowAlert).toHaveBeenCalledWith(
      "Title Already Exists",
      "danger"
    );
  });
});
