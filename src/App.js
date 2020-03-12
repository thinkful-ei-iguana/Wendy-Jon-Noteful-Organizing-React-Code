import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import NavBarFolders from "./components/NavBar/NavBarFolders";
import NavBarNote from "./components/NavBar/NavBarNote";
import FolderPageContent from "./components/PageContent/FolderPageContent";
import NotePageContent from "./components/PageContent/NotePageContent";
import AddFolder from "./components/AddForms/AddFolder";
import EditFolder from "./components/EditForms/EditFolder";
import AddNote from "./components/AddForms/AddNote";
import EditNote from "./components/EditForms/EditNote";
import FormError from "./components/AddForms/FormError";
import APIContext from "./components/APIContext";
import config from "./config";
import "./App.css";

class App extends Component {
  state = {
    folders: [],
    notes: []
  };

  componentDidMount() {
    Promise.all([
      fetch(`${config.API_ENDPOINT}/notes`),
      fetch(`${config.API_ENDPOINT}/folders`)
    ])
      .then(([notesRes, foldersRes]) => {
        if (!notesRes.ok) return notesRes.json().then(e => Promise.reject(e));
        if (!foldersRes.ok)
          return foldersRes.json().then(e => Promise.reject(e));
        return Promise.all([notesRes.json(), foldersRes.json()]);
      })
      .then(([notes, folders]) => {
        this.setState({ notes, folders });
      })
      .catch(error => {
        console.error({ error });
      });
  }

  handleAddFolder = folder => {
    this.setState({
      folders: [...this.state.folders, folder]
    });
  };

  handleDeleteFolder = folderId => {
    this.setState({
      folders: this.state.folders.filter(folder => folder.id !== folderId)
    });
  };

  handleEditFolder = editedFolder => {
    const newFolders = this.state.folders.map(folder => {
      console.log(
        folder,
        "folder in shared state",
        editedFolder,
        "editedFolder"
      );
      return folder.id === Number(editedFolder.id) ? editedFolder : folder;
    });

    this.setState({
      folders: newFolders
    });
  };

  handleAddNote = note => {
    this.setState({
      notes: [...this.state.notes, note]
    });
  };

  handleDeleteNote = noteId => {
    this.setState({
      notes: this.state.notes.filter(note => note.id !== noteId)
    });
  };

  handleEditNote = editedNote => {
    console.log("edited Note", editedNote);
    const newNotes = this.state.notes.map(note =>
      Number(note.id) === Number(editedNote.id) ? editedNote : note
    );
    console.log("newnotes", newNotes);
    this.setState({
      notes: newNotes
    });
  };

  renderMenuItems() {
    return (
      <>
        {["/", "/folder", "/folder/:folderId"].map(path => (
          <Route key={path} exact path={path} component={NavBarFolders} />
        ))}
        {["/add-folder", "/folder/:folderId/edit", "/note/edit/:noteId"].map(
          path => (
            <Route key={path} path={path} component={NavBarNote} />
          )
        )}
        <Route exact path="/note/:noteId" component={NavBarNote} />

        <Route path="/add-note" component={NavBarNote} />
      </>
    );
  }
  renderPageContent() {
    return (
      <main>
        {["/", "/folder", "/folder/:folderId"].map(path => (
          <Route exact path={path} key={path} component={FolderPageContent} />
        ))}
        <Route path="/folder/:folderId/edit" component={EditFolder} />
        <Route exact path="/note/:noteId" component={NotePageContent} />
        <Route path="/note/edit/:noteId" component={EditNote} />
        <Route path="/add-folder" component={AddFolder} />
        <Route path="/add-note" component={AddNote} />
      </main>
    );
  }

  render() {
    const value = {
      folders: this.state.folders,
      notes: this.state.notes,
      addFolder: this.handleAddFolder,
      deleteFolder: this.handleDeleteFolder,
      editFolder: this.handleEditFolder,
      addNote: this.handleAddNote,
      deleteNote: this.handleDeleteNote,
      editNote: this.handleEditNote
    };
    return (
      <APIContext.Provider value={value}>
        <header>
          <h1 className="App-header">
            <Link to={"/"} className="App-header">
              Noteful
            </Link>
          </h1>
        </header>
        <div className="container">
          <FormError>
            <div className="menu-container">{this.renderMenuItems()}</div>
            <div className="page-container">{this.renderPageContent()}</div>
          </FormError>
        </div>
      </APIContext.Provider>
    );
  }
}

export default App;
