import React, { useContext, useState } from "react";
import NoteContext from "../context/noteContext";
import "../App.css";

/* Home component is used to add the note to the database and also to the UI */
const Home = (props) => {
  const intialNote = {
    title: "",
    status: "title",
    desc: "",
    date: "",
    priority: "title",
  };
  const [note, setNote] = useState(intialNote);
  const context = useContext(NoteContext);
  const {addNote} = context;

  /* containsSpecialCharacters function is used to check if the string contains special characters */
  function containsSpecialCharacters(str) {
    const regex = /[^a-zA-Z0-9 ]/g;
    return regex.test(str);
  }

  /* handleclick function is used to add the note to the database and also to the UI */
  const handleclick = async (e) => {
    e.preventDefault();
    if (containsSpecialCharacters(note.title) || containsSpecialCharacters(note.desc)) {
      props.showAlert("Special Characters are not allowed", "danger");
      return;
    }
    let success = await addNote(note.title, note.status, note.desc, note.date, note.priority);
    if(success != 'error'){
      props.showAlert("Task Added SucessFully", "success")
    }
    else {
      props.showAlert("Title Already Exists", "danger")
    }
    setNote(intialNote);
  };

  /* onchange function is used to set the value of the input field to the state */
  const onchange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <div className="container bg-dark my-4 py-4" id="home_form">
      <div className="row g-3 container">
        <div className="col-sm mb-3 mt-4">
          <input
            type="text"
            className="form-control"
            placeholder="Enter The Title"
            aria-label="Title"
            name="title"
            value={note.title}
            onChange={onchange}
            required
          />
        </div>
        <div className="col-sm mb-3 mt-4">
          <select
            id="status"
            className="form-control"
            placeholder="Status"
            name="status"
            value={note.status}
            onChange={onchange}
            required
          >
            <option value="title" disabled>
              Status
            </option>
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
        </div>
        <div className="my-3">
          <textarea
            className="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
            placeholder="Enter The Description"
            name="desc"
            value={note.desc}
            onChange={onchange}
          ></textarea>
        </div>
        <div className="col-sm my-3">
          <input
            type="date"
            className="form-control"
            placeholder="Date"
            aria-label="Date"
            name="date"
            value={note.date || ""}
            onChange={onchange}
          />
        </div>
        <div className="col-sm my-3">
          <select
            id="priority"
            className="form-control"
            placeholder="Priority"
            name="priority"
            onChange={onchange}
            value={note.priority}
          >
            <option value="title" disabled>
              Priority
            </option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
      </div>
      <div className="row g-3 container mt-2">
        <div className="col-sm text-center">
          <button
            type="submit"
            className="btn btn-primary"
            id="form_button"
            onClick={handleclick}
            disabled={
              note.title.length === 0 ||
              note.desc.length === 0 ||
              note.status === "title"
            }
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
