import React, { useContext } from 'react'
import NoteContext from "../context/noteContext";

/* NotesItem component */
/* This component is used to display the notes on the page. */
const NotesItem = (props) => {

  const context = useContext(NoteContext);
  const { note, updateNote } = props;
  const {deleteNote} = context;

  /* Function to delete the note */
  const handleDelete = ()=>{
    deleteNote(note._id);
    props.showAlert("Deleted Successfully","success");
  }

  /* switch case to change the color of the card based on the priority */
  let cardColor;
  switch(note.priority) {
    case 'low':
        cardColor = 'primary'
        break;
    case 'medium':
        cardColor = 'success'
        break;
    case 'high':
        cardColor = "danger"
        break;
    default:
        cardColor = "dark"
  }
  return (
    <div className= {`card text-bg-${cardColor} mb-3 mx-3`} style={{maxWidth:"20rem"}}>
        <span className={`position-absolute top-0 start-100 translate-middle badge rounded-pill bg-${cardColor==='danger'?'dark':'danger' } p-2`}>
        {note.status} </span>    
      <div className= "card-header">{note.title}</div>
      <div className= "card-body">
        <h5 className= "card-title">{note.desc}</h5>
        <p className= "card-text">
          Priority - {(note.priority !== "title")?`${note.priority}`:'Not mentioned'}
        </p>
        <h6>Due Date - {((note.date == null))? "Not Mentioned":`${note.date}`}</h6>
        <hr />
        <i className="fa-sharp fa-solid fa-trash mx-1" role="button" aria-label="delete" onClick={handleDelete}></i>
        <i className="fa-sharp fa-solid fa-pen-to-square mx-2" role="button" aria-label="edit" onClick={()=>{ updateNote(note)}}></i>
      </div>
    </div>
  )
}

export default NotesItem
