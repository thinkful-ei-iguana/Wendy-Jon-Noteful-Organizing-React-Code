import React from "react";
import ValidationError from "./ValidationError";
import config from '../config';

//add onSubmit to form
//add onChange to input field
export default class AddFolder extends React.Component {
  static defaultProps = {
    history: {
      goBack: () => { }
    },
    match: {
      params: {}
    }
  };

  handleAddFolder = e => {
    //e.preventDefault()
    newName = {this.state.name};
    
    fetch(`${config.API_ENDPOINT}/folders/`, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newName)
    }).then(function (response) {
      return response.json();
    })
  }

  constructor(props) {
    super(props);
    this.state = {
      name: { value: "", touched: false }
    };
  }
  static defaultProps = {
    history: {
      goBack: () => { }
    },
    match: {
      params: {}
    }
  };
  validateName() {
    const name = this.state.name.value.trim();
    if (name.length === 0) {
      return "Name is required";
    } else if (name.length < 3) {
      return "Name must be at least 3 characters long";
    }
  }

  updateName(name) {
    this.setState({
      name: {
        value: name,
        touched: true
      }
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { name } = this.state;
    document.getElementById("Add").reset();
    this.handleAddFolder(name);
    console.log(name);
  }

  render() {
    const nameError = this.validateName();
    return (
      <form
        className="Add-folder"
        id="Add"
        onSubmit={e => this.handleSubmit(e)}
      >
        <label htmlFor="Folder-label">Add Folder Name</label>
        <input
          type="Text"
          className="Folder-input"
          id="Folder-label"
          onChange={e => this.updateName(e.target.value)}
        ></input>
        {this.state.name.touched && <ValidationError message={nameError} />}
        <button
          type="submit"
          className="Add-folder-button"
          disabled={nameError}
          onClick={() => this.props.history.goBack()}
        >
          Add Folder
        </button>
      </form>
    );
  }
}
