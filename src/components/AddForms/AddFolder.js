import React, { Component } from "react";
import ValidationError from "./ValidationError";
import APIContext from "./../APIContext";
import "./AddFolder.css";

class AddFolder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      folder: {
        name: "",
        touched: false
      }
    };
  }
  static defaultProps = {
    history: {
      push: () => {}
    },

    addFolder: () => {}
  };

  static contextType = APIContext;

  handleSubmit = event => {
    event.preventDefault();

    const folder = { name: event.target.name.value };
    const options = {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(folder)
    };

    fetch(`http://localhost:9090/folders/`, options)
      .then(res => {
        if (!res.ok) return res.json().then(event => Promise.reject(event));
        return res.json();
      })
      .then(folder => {
        this.context.addFolder(folder);
        this.props.history.push(`/folder/${folder.id}`);
      })

      .catch(error => {
        console.error({ error });
      });
  };

  validateName = name => {
    if (!this.state.folder.name) {
      return "Name must not be empty";
    } else if (this.state.folder.name.length < 3) {
      return "Name must be at least 3 characters long";
    }
  };

  render() {
    console.log("state in addfolder", this.state);
    return (
      <form className="add-folder" id="Add" onSubmit={this.handleSubmit}>
        <h2>Add a folder</h2>

        <div className="form-folder">
          <label htmlFor="name">Name *</label>
          <input
            type="text"
            className="folder__control"
            name="name"
            id="name"
            onChange={e =>
              this.setState({ folder: { name: e.target.value, touched: true } })
            }
          />
          {this.state.folder.touched && (
            <ValidationError message={this.validateName()} />
          )}
        </div>

        <div className="add-folder__button__group">
          <button
            type="submit"
            className="add-folder__button"
            disabled={this.validateName()}
          >
            Add Folder
          </button>
        </div>
      </form>
    );
  }
}

export default AddFolder;
