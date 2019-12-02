import React, { Component } from "react";
import ValidationError from "./ValidationError";

import APIContext from "./../APIContext";

class AddNote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: {
        value: "",
        touched: false
      },
      content: {
        value: "",
        touched: false
      },
      folderId: {
        value: "",
        touched: false
      }
    };
  }
  static defaultProps = {
    history: {
      push: () => {}
    },

    addNote: () => {}
  };

  static contextType = APIContext;

  handleSubmit = event => {
    event.preventDefault();
    const newNote = {
      name: event.target.name.value,
      content: event.target.content.value,
      folderId: event.target.folderId.value
    };
    const options = {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(newNote)
    };

    fetch(`http://localhost:9090/notes/`, options)
      .then(res => {
        if (!res.ok) return res.json().then(event => Promise.reject(event));
        return res.json();
      })
      .then(note => {
        this.context.addNote(note);
        this.props.history.push(`/note/${note.id}`);
      })

      .catch(error => {
        console.error({ error });
      });
  };
  validateNote = name => {
    if (!this.state.name.value) {
      return "Name must not be empty";
    } else if (this.state.name.value.length > 1) {
      return "Must also specify a folder";
    }
  };
  validateFolder = folderId => {
    if (!this.state.folderId.value) {
      return "Must identify a folder";
    }
  };
  render() {
    const { folders = [] } = this.context;
    return (
      <form className="add-note" id="note-form" onSubmit={this.handleSubmit}>
        <h2>Add a note</h2>

        <div className="note-form">
          <label htmlFor="note-name">Name</label>
          <input
            type="text"
            className="folder__control"
            name="name"
            id="note-name"
            onChange={e =>
              this.setState({ name: { value: e.target.value, touched: true } })
            }
          />
          {this.state.name.touched && (
            <ValidationError message={this.validateNote()} />
          )}
          <label htmlFor="note-content">Content</label>
          <textarea
            className="folder__control"
            name="content"
            id="note-content"
          />
          <label htmlFor="note-folder-select">Folder</label>
          <select
            id="note-folder-select"
            name="folderId"
            onChange={e =>
              this.setState({
                folderId: { value: e.target.value, touched: true }
              })
            }
          >
            <option value={null}>...</option>
            {folders.map(folder => (
              <option key={folder.id} value={folder.id}>
                {folder.name}
              </option>
            ))}
          </select>
          {this.state.folderId.touched && (
            <ValidationError message={this.validateFolder()} />
          )}
        </div>

        <div className="add-note__button__group">
          <button
            type="submit"
            className="add-note__button"
            disabled={this.validateNote() || this.validateFolder()}
          >
            Add note
          </button>
        </div>
      </form>
    );
  }
}

export default AddNote;
