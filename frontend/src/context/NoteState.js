import { useState } from "react";
import NoteContext from "./noteContext";

/* NoteState component */
/* This component is used to manage the state of the notes. */
const NoteState = (props) => {
  const host = "http://localhost:5000/api/notes";
  const notesIntial = [];
  const [notes, setNotes] = useState(notesIntial);

  /* Function to get all the notes */
  const getNotes = async () => {
    //api call
    const url = `${host}/fetchallnotes`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    setNotes(json);
  };

  /* Function to add a note */
  const addNote = async (title, status, desc, date, priority) => {
    //api call
    const url = `${host}/addnote`;

    // Add a note
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, status, desc, date, priority }),
    });
    const json = await response.json();
    if (json.success === "error") {
      return json.success;
    }
    setNotes(notes.concat(json));
  };

  /* Function to delete a note */
  const deleteNote = async (id) => {
    const url = `${host}/deletenote/${id}`;
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = response.json();
    console.log(json);
    const newNotes = notes.filter((note) => {
      return id !== note._id;
    });
    setNotes(newNotes);
  };
  
  /* Function to edit a note */
  const editNote = async (id, title, status, desc, date, priority) => {
    //api call
    const url = `${host}/updatenote/${id}`;
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, status, desc, date, priority }),
    });
    const json = await response.json();
    console.log(json);

    let newNotes = JSON.parse(JSON.stringify(notes));
    // edit a note
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].status = status;
        newNotes[index].desc = desc;
        newNotes[index].date = date;
        newNotes[index].priority = priority;
        setNotes(newNotes);
        break;
      }
    }
  };
  /* Return the NoteContext.Provider */
  return (
    <NoteContext.Provider
      value={{ notes, getNotes, setNotes, addNote, deleteNote, editNote }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
