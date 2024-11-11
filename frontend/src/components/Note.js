import React, { useContext, useEffect, useRef, useState } from "react";
import NotesItem from "./NotesItem";
import NoteContext from "../context/noteContext";
import "../App.css";

/* Note component */
/* This component is used to display the notes on the page. */
const Note = (props) => {
  const context = useContext(NoteContext);
  const ref = useRef(null);
  const refClose = useRef(null);
  const { notes, getNotes, editNote } = context;

  const intialEditNote = {
    etitle: "",
    estatus: "",
    edesc: "",
    edate: "",
    epriority: "",
  };

  let intialfilter = "All";
  /* useState hooks */
  const [note, setNote] = useState(intialEditNote);
  const [filter, setFilter] = useState(intialfilter);
  const [filterByTitle, setFilterByTitle] = useState("");

  /* useEffect hooks */
  useEffect(() => {
    getNotes();
    // eslint-disable-next-line
  }, []);

  /* Function to open the popup with current details */
  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      estatus: currentNote.status,
      edesc: currentNote.desc,
      edate: currentNote.date,
      epriority: currentNote.priority,
    });
  };

  /* This function edit the note */
  const handleclick = async (e) => {
    e.preventDefault();
    let success = await editNote(
      note.id,
      note.etitle,
      note.estatus,
      note.edesc,
      note.edate,
      note.epriority
    );
    if (success != "error") {
      props.showAlert("Updated Successfully", "success");
    } else {
      props.showAlert("Error Ocurred", "danger");
    }
    refClose.current.click();
  };

  /* Function to filter the notes */
  const filteredNotes = notes.filter((note) => {
    const matchesStatus = filter === "All" || note.status === filter;
    const matchesSearch = note.title
      .toLowerCase()
      .includes(filterByTitle.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  /* Function to handle the change in input fields */
  const onchange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  /* Function to handle the change in filter */
  const onchangeFilter = (e) => {
    setFilter(e.target.value);
  };

  /* Function to handle the change in filter by title */
  const onchangeFilterByTitle = (e) => {
    setFilterByTitle(e.target.value);
  };

  return (
    <div className="container my-5">
      {/* updatenote pop start */}
      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Update Details
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                ref={refClose}
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="row g-3 container">
                  <div className="col-sm mb-3 mt-4">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter The Title"
                      aria-label="Title"
                      name="etitle"
                      value={note.etitle}
                      onChange={onchange}
                      required
                    />
                  </div>
                  <div className="col-sm mb-3 mt-4">
                    <select
                      id="status"
                      className="form-control"
                      placeholder="Status"
                      name="estatus"
                      value={note.estatus}
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
                      name="edesc"
                      value={note.edesc}
                      onChange={onchange}
                    ></textarea>
                  </div>
                  <div className="col-sm my-3">
                    <input
                      type="date"
                      className="form-control"
                      placeholder="Date"
                      aria-label="Date"
                      name="edate"
                      value={note.edate || ""}
                      onChange={onchange}
                    />
                  </div>
                  <div className="col-sm my-3">
                    <select
                      id="priority"
                      className="form-control"
                      placeholder="Priority"
                      name="epriority"
                      onChange={onchange}
                      value={note.epriority}
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
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleclick}
              >
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* updatenote end */}

      <h1 style={{ textAlign: "center", padding: "10px", marginRight: "60px" }}>
        Tasks List
      </h1>
      <div className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid mx-3">
          <i
            className="fa-solid fa-computer mx-3 fa-2x"
            style={{ filter: "invert(1)" }}
          ></i>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul>
            <form className="d-flex mx-5 my-1" role="search" id="filter-box">
              <span id="filter-text">Filter By </span>
              <select
                className="form-control me-2"
                name="filter"
                placeholder="Filter By"
                value={filter}
                onChange={onchangeFilter}
              >
                <option value="All">All</option>
                <option value="To Do">To Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Done">Done</option>
              </select>
            </form>
            <form className="d-flex mx-5 my-1" role="search">
              <span id="filter-text2">Search By </span>
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search Using Title"
                aria-label="Search"
                value={filterByTitle}
                onChange={onchangeFilterByTitle}
              />
            </form>
          </div>
        </div>
      </div>
      <div className="container my-2">
        {filteredNotes.length === 0 && "No Tasks to display"}
      </div>
      <div className="row my-5 mx-3">
        {filteredNotes.map((elem) => {
          return (
            <div className="col-md-4">
              <NotesItem
                key={elem._id}
                note={elem}
                showAlert={props.showAlert}
                updateNote={updateNote}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Note;
