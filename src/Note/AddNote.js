import React from "react";
import ValidationError from "../NotePageNav/ValidationError";
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

  constructor(props) {
    super(props);

    this.state = {
      
      id: '',
      name: ''
    };
  }

  handleAddNote(name) {
    const note = { name };
    const options = {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(note)
    };

    fetch(`${config.API_ENDPOINT}/notes/`, options)
    .then(function (response) {
      return response.json();
    })
      .then(data => {
        this.setState({
          id: " ",
          name: " "
        });
      })
  }




  validateName() {
    const name = this.state.name.trim();
    if (name.length === 0) {
      return "Name is required";
    } else if (name.length < 3) {
      return "Name must be at least 3 characters long";
    }
  }

  updateName(input) {
    this.setState({
      name: input.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const nameError = this.validateName()
    if (nameError) 
    {this.setState({nameError})
  } else {
    const { name } = this.state;
    document.getElementById("Add").reset();
    this.handleAddNote(name);
    console.log(name);
  }
}

  render() {
   
    return (
      <form
        className="Add-note"
        id="Add"
        onSubmit={e => this.handleSubmit(e)}
      >
        <label htmlFor="Note-label">Add Note Name</label>
        <input
          type="Text"
          className="Note-input"
          id="Note-label"
          onChange={e => this.updateName(e.target)}
        ></input>
        {this.state.name && 
          <ValidationError message= {this.state.nameError} />}
        <button
          type="submit"
          className="Add-folder-button"
          disabled= {this.state.nameError}
          onClick={() => this.props.history.goBack()}
        >
          Add Note
        </button>
      </form>
    );
  }
}
