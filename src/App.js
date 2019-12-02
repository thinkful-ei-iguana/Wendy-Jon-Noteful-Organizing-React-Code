import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import NavBarFolders from "./components/NavBar/NavBarFolders";
import NavBarNote from "./components/NavBar/NavBarNote";
import FolderPageContent from "./components/PageContent/FolderPageContent";
import NotePageContent from "./components/PageContent/NotePageContent";
import AddFolder from "./components/AddForms/AddFolder";
import AddNote from "./components/AddForms/AddNote";
import FormError from "./components/AddForms/FormError";
import APIContext from "./components/APIContext";

import "./App.css";

class App extends Component {
  state = {
    folders: [],
    notes: []
  };

  componentDidMount() {
    Promise.all([
      fetch("http://localhost:9090/notes"),
      fetch("http://localhost:9090/folders")
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

  renderMenuItems() {
    return (
      <>
        {["/", "/folder/:folderId"].map(path => (
          <Route exact key={path} path={path} component={NavBarFolders} />
        ))}
        <Route path="/note/:noteId" component={NavBarNote} />
        <Route path="/add-folder" component={NavBarNote} />
        <Route path="/add-note" component={NavBarNote} />
      </>
    );
  }
  renderPageContent() {
    return (
      <main>
        {["/", "/folder/:folderId"].map(path => (
          <Route exact path={path} key={path} component={FolderPageContent} />
        ))}
        <Route path="/note/:noteId" component={NotePageContent} />
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
      addNote: this.handleAddNote,
      deleteNote: this.handleDeleteNote
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
