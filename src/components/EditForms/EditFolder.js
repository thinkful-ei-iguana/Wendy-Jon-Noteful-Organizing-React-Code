import React, { Component } from "react";
import ValidationError from "../AddForms/ValidationError";
import APIContext from "./../APIContext";
import config from "../../config";

class EditFolder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      folder: {}
    };
  }

  static defaultProps = {
    history: {
      push: () => {}
    },

    editFolder: () => {}
  };

  static contextType = APIContext;

  componentDidMount() {
    const { folderId } = this.props.match.params;
    fetch(`${config.API_ENDPOINT}/folders/${folderId}`, {
      method: "GET"
    })
      .then(res => {
        if (!res.ok) return res.json().then(event => Promise.reject(event));
        return res.json();
      })
      .then(resFolder => {
        this.setState({
          folder: resFolder
        });
      })

      .catch(error => {
        console.error({ error });
      });
  }

  handleEdit = event => {
    event.preventDefault();
    const name = event.target.name.value;

    const options = {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ name })
    };
    const { folderId } = this.props.match.params;
    fetch(`${config.API_ENDPOINT}/folders/${folderId}`, options)
      .then(res =>
        !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
      )
      .then(folderRes => {
        this.context.editFolder(folderRes);
        this.props.history.push(`/folder/${folderRes.id}`);
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
    const { folder } = this.state;

    return (
      <form className="add-folder" id="Edit" onSubmit={this.handleEdit}>
        <h2>Edit folder</h2>

        <div className="form-folder">
          <label htmlFor="name">Name *</label>
          <input
            type="text"
            className="folder__control"
            name="name"
            id="name"
            value={folder.name}
            onChange={e => this.setState({ folder: { name: e.target.value } })}
          />
          {this.state.folder && (
            <ValidationError message={this.validateName()} />
          )}
        </div>

        <div className="add-folder__button__group">
          <button
            type="submit"
            className="add-folder-btn"
            disabled={this.validateName()}
          >
            Edit Folder
          </button>
        </div>
      </form>
    );
  }
}

export default EditFolder;
