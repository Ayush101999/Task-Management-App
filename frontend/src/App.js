import "./App.css";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import NoteState from "./context/NoteState";
import Note from "./components/Note";
import Alert from "./components/Alert";
import { useState } from "react";

function App() {
  const [alert, setAlert] = useState(null);

  /* Function to set alert */
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };

  return (
    <NoteState>
      <Navbar />
      <Alert alert={alert} />
      <Home showAlert={showAlert} />
      <Note showAlert={showAlert} />
    </NoteState>
  );
}

export default App;
