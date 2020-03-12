import React, { Component } from "react";
import ValidationError from "../AddForms/ValidationError";
import config from "../../config";
import APIContext from "./../APIContext";

class EditNote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      note: {}
    };
  }
  static defaultProps = {
    history: {
      push: () => {}
    },

    editNote: () => {}
  };

  static contextType = APIContext;

  componentDidMount() {
    const { noteId } = this.props.match.params;
    fetch(`${config.API_ENDPOINT}/notes/${noteId}`, {
      method: "GET"
    })
      .then(res => {
        if (!res.ok) return res.json().then(event => Promise.reject(event));
        return res.json();
      })
      .then(resNote => {
        this.setState({
          note: resNote
        });
      })

      .catch(error => {
        console.error({ error });
      });
  }

  handleEdit = event => {
    event.preventDefault();
    const editedNote = {
      id: this.props.match.params.noteId,
      name: event.target.name.value,
      content: event.target.content.value,
      folderid: event.target.folderid.value
    };

    const options = {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(editedNote)
    };
    const { noteId } = this.props.match.params;

    fetch(`${config.API_ENDPOINT}/notes/${noteId}`, options)
      .then(res => {
        if (!res.ok) return res.json().then(event => Promise.reject(event));
        return res.json();
      })
      .then(noteRes => {
        console.log("noteRes", noteRes);
        this.context.editNote(noteRes);
        this.props.history.push(`/`);
      })

      .catch(error => {
        console.error({ error });
      });
  };
  validateNote = name => {
    if (this.state.note.name === "") {
      return "Name must not be empty";
    }
  };
  validateFolder = folderid => {
    if (this.state.note.folderid === "...") {
      return "Must identify a folder";
    }
  };
  render() {
    const { folders = [] } = this.context;
    const { note } = this.state;

    return (
      <form className="add-note" id="note-form" onSubmit={this.handleEdit}>
        <h2>Edit note</h2>

        <div className="note-form">
          <label htmlFor="note-name">Name</label>
          <input
            type="text"
            className="folder__control"
            name="name"
            id="note-name"
            value={note.name}
            onChange={e =>
              this.setState({
                note: { name: e.target.value }
              })
            }
          />
          {this.state.note.name === "" && (
            <ValidationError message={this.validateNote()} />
          )}
          <label htmlFor="note-content">Content</label>
          <textarea
            className="folder__control-text"
            name="content"
            id="note-content"
            value={note.content}
            onChange={e =>
              this.setState({
                note: { content: e.target.value }
              })
            }
          />
          <label htmlFor="note-folder-select">Folder</label>
          <select
            id="note-folder-select"
            name="folderid"
            value={note.folderid}
            onChange={e =>
              this.setState({
                note: { folderid: e.target.value }
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
          {this.state.note.folderid === "..." && (
            <ValidationError message={this.validateFolder()} />
          )}
        </div>

        <div className="add-note__button__group">
          <button
            type="submit"
            className="add-note__button"
            disabled={this.validateNote() && this.validateFolder()}
          >
            Edit note
          </button>
        </div>
      </form>
    );
  }
}

export default EditNote;
